const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/invoices', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const cryptoSchema = new mongoose.Schema({
  name: String,
  last: Number,
  buy: Number,
  sell: Number,
  volume: Number,
  base_unit: String,
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

async function fetchAndStoreData() {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const tickers = Object.values(response.data).slice(0, 10);

    await Crypto.deleteMany({});

    for (const ticker of tickers) {
      const crypto = new Crypto({
        name: ticker.name,
        last: parseFloat(ticker.last),
        buy: parseFloat(ticker.buy),
        sell: parseFloat(ticker.sell),
        volume: parseFloat(ticker.volume),
        base_unit: ticker.base_unit,
      });
      await crypto.save();
    }

    console.log('Data updated successfully');
  } catch (error) {
    console.error('Error fetching and storing data:', error);
  }
}

cron.schedule('*/5 * * * *', fetchAndStoreData);

app.get('/api/tickers', async (req, res) => {
  try {
    const tickers = await Crypto.find().sort('name');
    res.json(tickers);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const count = await Crypto.countDocuments();
    const lastUpdated = await Crypto.findOne().sort('-_id');
    res.json({
      count,
      lastUpdated: lastUpdated ? lastUpdated.updatedAt : null,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Error fetching stats' });
  }
});

app.use(express.static('public'));

app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).sendFile(__dirname + '/public/500.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

fetchAndStoreData();