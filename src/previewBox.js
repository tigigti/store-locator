const previewBox = document.querySelector("#previewBox");
const storeContainer = previewBox.querySelector(".store-container");
const bottomAppBar = document.querySelector(".bottom-app-bar");

let mapVisible = false;

export const displayStore = (store, lat, lng) => {
    storeContainer.innerHTML += `
    <div class="store-item">
        <div><span class="store-item__name">${store.name}</span><span class="breadcrumb trybuy ${
        store.trybuy == 1 ? "" : "breadcrumb--hidden"
    }">Try & Buy</span><span class="breadcrumb ${store.canbuy == 1 ? "" : "breadcrumb--hidden"}">Buy Only</span>
    <div style="margin-top: 12px;" class="store-item__adress">${store.adress}</div>
    <div class="store-item__adress">${store.postcode} ${store.city}</div>
    <div style="margin-top: 8px"><a href="#" onclick="centerMap(${lat},${lng})">See in Maps</a></div>
    <div style="margin-top: 8px;">${store.hours}</div>
    <div>${store.hoursWeekend}</div>
    <div style="margin-top: 8px;">Phone: ${store.phone}</div>
    <div  style="margin-top: 12px;">Mattress available to buy:</div>
    <div>${store.matType}</div>
    </div>`;
};

export const clearPreview = () => {
    storeContainer.innerHTML = "";
};

export const hidePreview = () => {
    previewBox.classList.add("map-container__preview-box--hidden");
    bottomAppBar.innerHTML = `<i class="fa fa-list" aria-hidden="true"></i> Show List`;
    mapVisible = true;
};

export const showPreview = () => {
    previewBox.classList.remove("map-container__preview-box--hidden");
    bottomAppBar.innerHTML = `<i class="fa fa-map-marker" aria-hidden="true"></i> Show Map`;
    mapVisible = false;
};

bottomAppBar.addEventListener("click", (e) => {
    mapVisible = !mapVisible;
    if (mapVisible) {
        hidePreview();
    } else {
        showPreview();
    }
});
