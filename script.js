const map = L.map('map').setView([51.4416, 5.4697], 13);

// Add map tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add marker
const marker = L.marker([51.4416, 5.4697]).addTo(map);

// Add popup
marker.bindPopup("Eindhoven - Air Quality Monitoring Location");