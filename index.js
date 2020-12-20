const search = document.getElementById('search');
const provider = document.getElementById('provider');
const category = document.getElementById('category');
const resultCount = document.getElementById('resultCount');
const content = document.getElementById('content');
const submitButton = document.getElementById('submitButton');
const API_URL = 'https://stream.herokuapp.com/';

document.onkeyup = (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    submitButton.click();
  }
};

let providerArray = [];
let categoryArray = [];

function setProviders(data) {
  providerArray = data.filter((d) => d.name !== 'Torrent9');
  provider.innerHTML = providerArray
    .map((d) => `<option value="${d.name}">${d.name}</option>`)
    .join('');
  onProviderChange();
}

function setContent(data) {
  if (typeof myVar === 'string' || myVar instanceof String) {
    content.innerHTML = data;
    return;
  }
  content.innerHTML = data
    .map(
      (d) =>
        `<div class="torrent"> <h2>${d.title}</h2> <div class="info">

        <p style="padding-right: 2rem">Seeds:${d.seeds}</p><p>Size:${
          d.size
        }</p></div>  <a target="_blank" href="${API_URL}magnet/${d.magnet}">${
          d.magnet ? 'Click to view' : ''
        }</a>  </div>`,
    )
    .join('');
}

fetch(`${API_URL}providers`)
  .then((data) => data.json())
  .then((data) => setProviders(data))
  .catch((err) => console.error(err));

function onSubmitPressed() {
  content.innerHTML = `<image src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/source.gif"/>`;

  fetch(
    `${API_URL}search/${provider.value}${search.value ? '/' : ''}${
      search.value
    }/${category.value}/${resultCount.value}`,
  )
    .then((data) => data.json())
    .then((data) => setContent(data))
    .catch((err) => console.error(err));
}

function onProviderChange() {
  const newProviderName = provider.value;
  const newProvider = providerArray.find((p) => p.name === newProviderName);
  category.innerHTML = newProvider.categories
    .map((c) => `<option value="${c}">${c}</option>`)
    .join('');
}
