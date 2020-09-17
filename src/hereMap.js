import H from "@here/maps-api-for-javascript/bin/mapsjs.bundle";
import { hereMapKey } from "../keys";
import csvData from "./Emma_Belgium_Stores.csv";

// Initialize the platform object:
const platform = new H.service.Platform({
    apikey: hereMapKey,
});

// Obtain the default map types from the platform object
const maptypes = platform.createDefaultLayers();

// Instantiate (and display) a map object:
const map = new H.Map(document.getElementById("map"), maptypes.vector.normal.map, {
    zoom: 10,
    center: { lng: 4.36, lat: 50.84 },
});

const mapEvents = new H.mapevents.MapEvents(map);

map.addEventListener("tap", (e) => {
    console.log(e.type, e.currentPointer.type);
});

const behavior = new H.mapevents.Behavior(mapEvents);

const coords = { lat: 50.84, lng: 4.36 };
const marker = new H.map.Marker(coords);

for (let store in csvData) {
    // console.log("lat: ", csvData[store][7], "long: ", csvData[store][8]);
    const coords = {
        lat: csvData[store][7],
        lng: csvData[store][8],
    };
    console.log(coords);

    const marker = new H.map.Marker(coords);
    map.addObject(marker);
}

map.addObject(marker);

// console.log(map);
