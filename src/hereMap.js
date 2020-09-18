import H from "@here/maps-api-for-javascript/bin/mapsjs.bundle";
import { hereMapKey } from "../keys";
import csvData from "./Emma_Belgium_Stores.csv";

const tryBuyCheckbox = document.querySelector("#trybuy");
const buyOnlyCheckbox = document.querySelector("#buyonly");

tryBuyCheckbox.addEventListener("change", (e) => {
    tryBuy = e.target.checked ? 1 : 0;
    clusteredDataProvider.setTheme(customTheme);
});

buyOnlyCheckbox.addEventListener("change", (e) => {
    buyOnly = e.target.checked ? 1 : 0;
    clusteredDataProvider.setTheme(customTheme);
});

let tryBuy = 0;
let buyOnly = 0;

let clusteredDataProvider;
let customTheme;

function startClustering(map, data) {
    // First we need to create an array of DataPoint objects,
    // for the ClusterProvider
    var dataPoints = data.map(function (item) {
        return new H.clustering.DataPoint(item.lat, item.lng, null, item);
    });

    // Create a clustering provider with custom options for clusterizing the input
    clusteredDataProvider = new H.clustering.Provider(dataPoints, {
        clusteringOptions: {
            // Maximum radius of the neighbourhood
            eps: 32,
            // minimum weight of points required to form a cluster
            minWeight: 2,
        },
    });

    const defaultTheme = clusteredDataProvider.getTheme();

    customTheme = {
        getClusterPresentation: function (cluster) {
            //Keep the default theme for clusters
            // const data = cluster.getData();
            const clusterMarker = defaultTheme.getClusterPresentation.call(defaultTheme, cluster);

            // clusterMarker.setData(data);
            return clusterMarker;
        },
        getNoisePresentation: function (noisePoint) {
            // Get a reference to data object our noise points
            const data = noisePoint.getData();
            // Create a marker for the noisePoint
            let isVisible = true;

            if ((tryBuy == 1 && data.trybuy == 0) || (buyOnly == 1 && data.canbuy == 0)) {
                isVisible = false;
            }

            const noiseMarker = new H.map.Marker(noisePoint.getPosition(), {
                min: noisePoint.getMinZoom(),
                visibility: isVisible,
            });

            noiseMarker.setData(data);
            return noiseMarker;
        },
    };

    clusteredDataProvider.setTheme(customTheme);

    // Create a layer tha will consume objects from our clustering provider
    var clusteringLayer = new H.map.layer.ObjectLayer(clusteredDataProvider);

    // To make objects from clustering provder visible,
    // we need to add our layer to the map
    map.addLayer(clusteringLayer);

    clusteredDataProvider.addEventListener("tap", (e) => {
        console.log(e.target.getData());
        map.setCenter(e.target.getGeometry());
    });
}

// Initialize the platform object:
export const platform = new H.service.Platform({
    apikey: hereMapKey,
});

// Obtain the default map types from the platform object
const maptypes = platform.createDefaultLayers();

// Instantiate (and display) a map object:
export const map = new H.Map(document.getElementById("map"), maptypes.vector.normal.map, {
    zoom: 10,
    center: { lng: 4.36, lat: 50.84 },
});

const mapEvents = new H.mapevents.MapEvents(map);
const behavior = new H.mapevents.Behavior(mapEvents);

map.addEventListener("mapviewchangeend", (e) => {
    // const bounds = map.getViewModel().getLookAtData().bounds;
    const { aa, la, da, ia } = map.getViewModel().getLookAtData().bounds.getBoundingBox();
    console.log(aa, la);
    for (let i = 0; i < stores.length; i++) {
        const { lat, lng } = stores[i];
        if (la <= lat && lat <= ia && aa <= lng && lng <= da) {
            console.log(lat, lng, "is in bounds");
        } else {
            console.log(lat, lng, "is outside bounds");
        }
    }
});

// for (let store in csvData) {
//     const coords = {
//         lat: csvData[store][7],
//         lng: csvData[store][8],
//     };

//     const marker = new H.map.Marker(coords);
//     map.addObject(marker);
// }

const stores = [];

for (let i = 1; i < csvData.length; i++) {
    const store = {
        lat: csvData[i][7],
        lng: csvData[i][8],
        name: csvData[i][0],
        canbuy: csvData[i][10],
        trybuy: csvData[i][11],
    };

    stores.push(store);
    // const marker = new H.map.Marker(coords);
    // map.addObject(marker);
}

startClustering(map, stores);
