'use strict'
//Elements
const ipElem = document.getElementsByClassName('--ip')[0]
const locationElem = document.getElementsByClassName('--location')[0]
const timezoneElem = document.getElementsByClassName('--timezone')[0]
const ispElem = document.getElementsByClassName('--isp')[0]
const inputElem = document.getElementsByClassName('header__input')[0]

//Variables
const apiKey = 'at_1YHwLHm6CIuPnmEp5B6VUTt5cZrcK'
let ip = ''
let map = L.map('map', { zoomControl: false });
let marker;
//Functions

async function getAndDisplayData(ip) {
    await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            inputElem.value = ''
            inputElem.placeholder = 'Please enter a valid address'
        })
        .then(data => {
            ipElem.innerText = data.ip
            locationElem.innerText = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`
            timezoneElem.innerText = data.location.timezone
            ispElem.innerText = data.isp
            displayMap(data.location.lat, data.location.lng)
        })
        .catch((error) => {
            console.log(error)
        });
}
function search() {
    ip = inputElem.value
    getAndDisplayData(ip)
}
function displayMap(lat, lng) {
    map.setView([lat, lng], 13);
    marker = L.marker([lat, lng]).addTo(map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
}

//onInit
getAndDisplayData('')