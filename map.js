var map = L.map('map').setView([48.00864892110505,  0.19982514069420176
    ], 10);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 21,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([47.952576360090916,0.2101494091221241
    ]).addTo(map);