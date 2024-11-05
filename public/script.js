let darkTheme = true;

function fetchData() {
    fetch('/api/tickers')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#cryptoTable tbody');
            tableBody.innerHTML = '';
            let totalPrice = 0;
            data.forEach((crypto, index) => {
                totalPrice += crypto.last;
                const difference = ((crypto.sell - crypto.buy) / crypto.buy * 100).toFixed(2);
                const savings = (crypto.sell - crypto.buy).toFixed(2);
                const row = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${crypto.name}</td>
                        <td>₹ ${crypto.last.toFixed(2)}</td>
                        <td>₹ ${crypto.buy.toFixed(2)} / ₹ ${crypto.sell.toFixed(2)}</td>
                        <td>${difference}%</td>
                        <td>₹ ${savings}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
            const averagePrice = (totalPrice / data.length).toFixed(2);
            document.getElementById('averagePrice').textContent = `₹ ${averagePrice}`;
        })
        .catch(error => console.error('Error fetching data:', error));

    fetch('/api/stats')
        .then(response => response.json())
        .then(data => {
            document.getElementById('cryptoCount').textContent = data.count;
        })
        .catch(error => console.error('Error fetching stats:', error));
}

function updateCountdown() {
    const countdownElement = document.getElementById('countdown');
    let seconds = 60;
    
    function tick() {
        seconds--;
        countdownElement.textContent = seconds;
        if (seconds > 0) {
            setTimeout(tick, 1000);
        } else {
            fetchData();
            seconds = 60;
            tick();
        }
    }
    
    tick();
}

function toggleTheme() {
    darkTheme = !darkTheme;
    document.body.classList.toggle('light-theme', !darkTheme);
}

document.getElementById('themeToggle').addEventListener('change', toggleTheme);

fetchData();
updateCountdown();