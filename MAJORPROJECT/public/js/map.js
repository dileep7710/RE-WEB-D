mapboxgl.accessToken = mapToken;

// Agar purani listing me coordinates empty [] hain, toh default coordinates use karein taaki map crash na ho
const coordinates = (listing.geometry && listing.geometry.coordinates && listing.geometry.coordinates.length === 2)
    ? listing.geometry.coordinates
    : [77.2090, 28.6139]; // Default: New Delhi

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: "mapbox://styles/mapbox/dark-v11",
    center: coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h4>${listing.title}</h4><p>Exact Location provided after booking</p>`
    ))
    .addTo(map);
