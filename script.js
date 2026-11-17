const map = L.map('map').setView([51.4416, 5.4697], 13);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors',
    className: 'map-tiles'
}).addTo(map);


const marker = L.marker([51.4416, 5.4697]).addTo(map);


marker.bindPopup("Eindhoven - Air Quality Monitoring Location");

const legend = L.control({ position: 'bottomleft' });

legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'map-legend');
    div.innerHTML = `
        <h4>Legend: air quality index</h4>
        <div><span class="dot" style="background:#00e400"></span>0-50 Good</div>
        <div><span class="dot" style="background:#ffff00"></span>51-100 Moderate</div>
        <div><span class="dot" style="background:#ff7e00"></span>101-150 Unhealthy for sensitive groups</div>
        <div><span class="dot" style="background:#ff0000"></span>151-200 Unhealthy</div>
        <div><span class="dot" style="background:#8f3f97"></span>201-300 Very unhealthy</div>
        <div><span class="dot" style="background:#7e0023"></span>301-500 Hazardous</div>
        <div><span class="dot no-data"></span>No data or offline</div>
    `;
    return div;
};

legend.addTo(map);