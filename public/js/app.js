const input = document.querySelector('.input');
const output1 = document.querySelector('.output1');
const weatherForm = document.querySelector('form');

// Display the UI func.
const displayData = (data) => {
  if (data.error) {
    output1.textContent = data.error;
  } else {
    const htmlMarkup = `
    <img src=${data.iconUrl}>
    <div class="location">${data.location}</div>
    <div class="forcast">${data.forcast}</div>
    <div class="wind">${data.wind}</div>
    <div class="time">${data.time}</div>
    `;
    output1.innerHTML = htmlMarkup;
  }
};

// Fetch data from API.
const getData = async (address) => {
  const forcastUrlAPI = `/weather?address=${address}`;

  const res = await fetch(forcastUrlAPI);
  const data = await res.json();

  // Display UI.
  displayData(data);
};

// Event handlers.
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const address = input.value;

  // Start loading.
  output1.textContent = 'Loading...';

  // Fetch data and display it.
  getData(address);

  // Clear input.
  input.value = '';
});
