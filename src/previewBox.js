const previewBox = document.querySelector("#previewBox");
const storeContainer = previewBox.querySelector(".store-container");

export const displayStore = (store, lat, lng) => {
    function fuckyou() {
        console.log("fuck you");
    }

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
