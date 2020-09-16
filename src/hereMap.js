import H from "@here/maps-api-for-javascript/bin/mapsjs.bundle";
import { hereMapKey } from "../keys";

// Initialize the platform object:
var platform = new H.service.Platform({
    apikey: hereMapKey,
});

// Obtain the default map types from the platform object
var maptypes = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(document.getElementById("map"), maptypes.vector.normal.map, {
    zoom: 10,
    center: { lng: 13.4, lat: 52.51 },
});

// console.log(map);
