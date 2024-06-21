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


map.on('click', (event) => {
    console.log('click', event, event.latlng);
    var marker = L.marker(selectedCoordinates).addTo(map);

    const coordinateClick = [event.latlng.lat, event.latlng.lng];
    var markerClick = L.circle(coordinateClick, { color: 'red', radius: 10 }).addTo(map);

    const latlngs = [selectedCoordinates, coordinateClick];

    let polyline = L.polyline(latlngs, { color: 'red' }).addTo(map);
    let distancephoto = map.distance(selectedCoordinates, coordinateClick);
    
    distancephoto = (Math.round(distancephoto))/1000;
    console.log (distancephoto)
    const listephoto = document.getElementById('photo');
    const score = document.createElement('p');
    score.innerText = new Intl.NumberFormat('fr-FR').format(distancephoto) + 'km';
    console.log('buildScore', distancephoto, selectedCoordinates, coordinateClick);
    listephoto.insertBefore(score, listephoto.firstChild);
    map.flyTo(selectedCoordinates, 16);
    
    
    
    nouveauTirage();
});


let tirage;
let selectedPhoto;
let selectedCoordinates;
let listephoto = document.getElementById("photo");

const nouveauTirage = () => {
    tirage = Math.random() * (photos.length - 1)
    tirage = Math.round(tirage);

    selectedPhoto = photos[tirage];
    selectedCoordinates = coordinates[tirage];
    console.log(selectedPhoto, selectedCoordinates);

    const image = document.createElement('img');
    image.src = selectedPhoto;
    image.classList.add('photo-choisie');
    

    listephoto.insertBefore(image, listephoto.firstChild);
}
nouveauTirage();





