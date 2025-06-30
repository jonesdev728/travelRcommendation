let travelData = null;

document.addEventListener('DOMContentLoaded', () => {
  // load JSON once
  fetch('travel_recommendation_api.json')
    .then(r => r.json())
    .then(data => travelData = data)
    .catch(err => console.error('Couldn’t load JSON:', err));

  const btn = document.getElementById('search-btn');
  const clr = document.getElementById('clear-btn');
  if (btn) btn.addEventListener('click', handleSearch);
  if (clr) clr.addEventListener('click', clearResults);
});

function handleSearch(e) {
  e.preventDefault();
  const q = document.getElementById('search-input').value.trim().toLowerCase();
  if (!q || !travelData) return;

  let results = [];

  // beach
  if (['beach','beaches'].includes(q)) {
    results = travelData.beaches;
  }
  // temple
  else if (['temple','temples'].includes(q)) {
    results = travelData.temples;
  }
  // country by name
  else {
    const country = travelData.countries.find(c => c.name.toLowerCase() === q);
    if (country) {
      results = country.cities;
    }
  }

  displayResults(results);
}

function displayResults(items) {
  const container = document.getElementById('results');
  container.innerHTML = '';

  if (!items || items.length === 0) {
    container.innerHTML = '<p>No matches found.</p>';
    return;
  }

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = item.imageUrl;           // make sure these point to your real files
    img.alt = item.name;
    card.appendChild(img);

    const info = document.createElement('div');
    info.className = 'info';
    info.innerHTML = `<h3>${item.name}</h3><p>${item.description}</p>`;
    card.appendChild(info);

    container.appendChild(card);
  });
}

function clearResults(e) {
  e.preventDefault();
  document.getElementById('results').innerHTML = '';
  document.getElementById('search-input').value = '';
}

function showTXTime() {
    const opts = {
      timeZone: 'America/Texas', 
      hour12: true, 
      hour: 'numeric', 
      minute: 'numeric', 
      second: 'numeric'
    };
    const tx = new Date().toLocaleTimeString('en-US', opts);
    document.getElementById('tx-time').textContent = 'TX Time: ' + tx;
  }
  
  setInterval(showNYTime, 1000);
  