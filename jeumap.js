// create map center on france

const map = L.map('map').setView([47.29, 2.77], 5);

// add orthophotos layer

const layer = "ORTHOIMAGERY.ORTHOPHOTOS";
const format = "image/jpeg";

const layerAncien = "ORTHOIMAGERY.ORTHOPHOTOS.1950-1965";
const formatAncien = "image/png";

L.tileLayer(
    "https://data.geopf.fr/wmts?" +
    "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
    "&STYLE=normal" +
    "&TILEMATRIXSET=PM" +
    "&FORMAT=" + format +
    "&LAYER=" + layer +
    "&TILEMATRIX={z}" +
    "&TILEROW={y}" +
    "&TILECOL={x}",
    {
        minZoom: 0,
        maxZoom: 19,
        attribution: "IGN-F/Geoportail",
        tileSize: 256 // les tuiles du Géooportail font 256x256px
    }
).addTo(map);

// load geojson data
// L.geoJSON(GEOPHOTO_DATA).addTo(map);
let photos = [];
let coordinates = [];
L.geoJSON(GEOPHOTO_DATA, {
    onEachFeature: (feature) => {
        console.log(feature);
        const photo = feature.properties.photo;
        const coordinate = [
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0],
        ];
        if (photo) {
            photos.push(photo);
            coordinates.push(coordinate);
        }
    }
});

// console.log(photos);

let tirage = Math.random() * (photos.length - 1)
tirage = Math.round(tirage);

let selectedPhoto = photos[tirage];
let selectedCoordinates = coordinates[tirage];
console.log(selectedPhoto, selectedCoordinates);

const image = document.createElement('img');
image.src = selectedPhoto;
image.classList.add('photo-choisie');

let listephoto = document.getElementById("photo");
listephoto.appendChild(image);


map.on('click', (event) => {
    console.log('click', event, event.latlng); 
    var marker = L.marker(selectedCoordinates).addTo(map);

});


