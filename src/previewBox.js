const previewBox = document.querySelector("#previewBox");
const storeContainer = previewBox.querySelector(".store-container");

export const displayStore = (store) => {
    storeContainer.innerHTML += `
    <div class="store-item">
        <div><span>${store.name}</span><span class="breadcrumb ${
        store.trybuy == 1 ? "" : "breadcrumb--hidden"
    }">Try & Buy</span><span class="breadcrumb ${store.canbuy == 1 ? "" : "breadcrumb--hidden"}">Buy Only</span>
    <div style="margin-top: 12px;">${store.adress}</div>
    <div>${store.postcode} ${store.city}</div>
    <div><a href="#">See in Maps</a></div>
    <div style="margin-top: 8px;">${store.hours}</div>
    <div>${store.hoursWeekend}</div>
    <div style="margin-top: 8px;">${store.phone}</div>
    <div  style="margin-top: 12px;">Mattress available to buy:</div>
    <div>${store.matType}</div>
    </div>`;
};

export const clearPreview = () => {
    storeContainer.innerHTML = "";
};
