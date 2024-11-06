
# HodlInfo Clone

This project is a clone of the HodlInfo website, which displays cryptocurrency prices and related information. It's built using Node.js, Express, MongoDB, and vanilla JavaScript for the frontend.

## Features

- Displays real-time cryptocurrency data fetched from the WazirX API
- Shows the best price to trade, average BTC/INR price
- Displays percentage changes for different time periods (5 mins, 1 hour, 1 day, 7 days)
- Responsive design that works on desktop and mobile devices
- Dark/Light theme toggle

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later) installed
- MongoDB installed and running
- Git (optional, for cloning the repository)

## Installation

1. Clone the repository (or download the ZIP file and extract it):

   ```bash
   git clone https://github.com/Yashwanth023/NodejsAssignment_QuadBTech.git
   cd hodlinfo-clone
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:

   ```
   MONGODB_URI=mongodb://localhost/hodlinfo
   PORT=3000
   ```

   Adjust the `MONGODB_URI` if your MongoDB is running on a different host or port.

## Usage

1. Start the server:

   ```bash
   node server.js
   ```

2. Open a web browser and navigate to `http://localhost:3000`

The application will fetch data from the WazirX API every 5 minutes and update the display accordingly. The countdown timer shows when the next update will occur.

## Project Structure

```
hodlinfo-clone/
│
├── public/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── 404.html
│   └── 500.html
│
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## Customization

- To change the update interval, modify the cron schedule in `server.js`
- To add more cryptocurrencies or change the display, update the frontend files in the `public` directory

## Contributing

Contributions to this project are welcome. Please fork the repository and create a pull request with your changes.

## Acknowledgements

- Data provided by [WazirX API](https://api.wazirx.com/api/v2/tickers)
- Inspired by [HodlInfo](https://hodlinfo.com)
