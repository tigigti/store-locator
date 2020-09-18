import H from "@here/maps-api-for-javascript/bin/mapsjs.bundle";
import { hereMapKey } from "../keys";
import csvData from "./Emma_Belgium_Stores.csv";
import { displayStore, clearPreview } from "./previewBox";

const tryBuyCheckbox = document.querySelector("#trybuy");
const buyOnlyCheckbox = document.querySelector("#buyonly");
const storeSelect = document.querySelector("#stores");
const mattressSelect = document.querySelector("#mattresses");

const stores = [];

for (let i = 1; i < csvData.length; i++) {
    const store = {
        lat: csvData[i][7],
        lng: csvData[i][8],
        name: csvData[i][0],
        canbuy: csvData[i][10],
        trybuy: csvData[i][11],
        matType: csvData[i][9],
        adress: csvData[i][1],
        postcode: csvData[i][2],
        city: csvData[i][3],
        phone: csvData[i][4],
        hours: csvData[i][5],
        hoursWeekend: csvData[i][6],
        
    };

    stores.push(store);
}

tryBuyCheckbox.addEventListener("change", (e) => {
    tryBuy = e.target.checked ? 1 : 0;
    clusteredDataProvider.setTheme(customTheme);
});

buyOnlyCheckbox.addEventListener("change", (e) => {
    buyOnly = e.target.checked ? 1 : 0;
    clusteredDataProvider.setTheme(customTheme);
});

storeSelect.addEventListener("change", (e) => {
    store = e.target.value;
    clusteredDataProvider.setTheme(customTheme);
    // startClustering(map, stores);
});
mattressSelect.addEventListener("change", (e) => {
    mattress = e.target.value;
    // clusteredDataProvider.removeEventListener("tap", markerClick);
    clusteredDataProvider.setTheme(customTheme);
    // startClustering(map, stores);
});

let tryBuy = 0;
let buyOnly = 0;
let store = "all";
let mattress = "all";

let clusteredDataProvider;
let customTheme;
let clusteringLayer;

function startClustering(map, data) {
    // First we need to create an array of DataPoint objects,
    // for the ClusterProvider
    var dataPoints = data.map(function (item) {
        return new H.clustering.DataPoint(item.lat, item.lng, null, item);
    });

    var filteredPoints = dataPoints.filter((data) => {
        if ((tryBuy == 1 && data.trybuy == 0) || (buyOnly == 1 && data.canbuy == 0)) {
            return false;
        }

        if ((store !== "all" && store !== data.name) || (mattress !== "all" && mattress !== data.matType)) {
            return false;
        }
        return true;
    });

    // Create a clustering provider with custom options for clusterizing the input
    clusteredDataProvider = new H.clustering.Provider(filteredPoints, {
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
            // console.log(data);
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

            if ((store !== "all" && store !== data.name) || (mattress !== "all" && mattress !== data.matType)) {
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
    clusteringLayer = new H.map.layer.ObjectLayer(clusteredDataProvider);

    // To make objects from clustering provder visible,
    // we need to add our layer to the map
    map.addLayer(clusteringLayer);

    clusteredDataProvider.addEventListener("tap", markerClick);
}

const markerClick = (e) => {
    console.log(e.target.getData());
    map.setCenter(e.target.getGeometry());
};

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
    clearPreview();
    const { aa, la, da, ia } = map.getViewModel().getLookAtData().bounds.getBoundingBox();
    for (let i = 0; i < stores.length; i++) {
        const { lat, lng } = stores[i];
        if (la <= lat && lat <= ia && aa <= lng && lng <= da) {
            displayStore(stores[i]);
        }
    }
});

startClustering(map, stores);
