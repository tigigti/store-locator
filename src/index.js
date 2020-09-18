import "./style.scss";
import { platform, map } from "./hereMap";
import csvData from "./Emma_Belgium_Stores.csv";
import { hidePreview, showPreview } from "./previewBox";

const storeFinderForm = document.querySelector("#store-finder-form");
const storeSelect = document.querySelector("#stores");
const mattressSelect = document.querySelector("#mattresses");
const previewBox = document.querySelector("#previewBox");
const closePopUp = document.querySelector(".pop-up__close-btn");
const popUp = document.querySelector(".pop-up");
const responsiveToggle = document.querySelector("#responsiveToggle");
const toggleIcon = responsiveToggle.querySelector("span i");

let formCollapsed = false;

const service = platform.getSearchService();

storeFinderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = e.target.elements["location"].value;
    if (query != "") {
        service.geocode(
            {
                q: query,
            },
            (res) => {
                res.items.forEach((item) => {
                    map.setCenter(item.position);
                    map.setZoom(13);
                });
            }
        );
    }
});

const removeDuplicates = (array) => {
    return [...new Set(array)];
};

// Name: 0
// Type: 9
let storeNames = [];
let typeNames = [];
for (let i = 1; i < csvData.length; i++) {
    storeNames.push(csvData[i][0]);
    typeNames.push(csvData[i][9]);
}

const createOptions = (select, data) => {
    const singleEntries = removeDuplicates(data);
    for (let i = 0; i < singleEntries.length; i++) {
        select.innerHTML += `
            <option>${singleEntries[i]}</option>
        `;
    }
};

createOptions(storeSelect, storeNames);
createOptions(mattressSelect, typeNames);

previewBox.addEventListener("click", (e) => {
    if (e.target.classList.contains("trybuy")) {
        popUp.classList.add("pop-up--visible");
    }
});

closePopUp.addEventListener("click", (e) => {
    console.log("clicked");
    popUp.classList.remove("pop-up--visible");
    console.log(popUp.classList);
});

responsiveToggle.addEventListener("click", (e) => {
    formCollapsed = !formCollapsed;
    if (formCollapsed) {
        storeSelect.parentElement.classList.add("hide-mobile");
        mattressSelect.parentElement.classList.add("hide-mobile");
        toggleIcon.classList.remove("fa-angle-up");
        toggleIcon.classList.add("fa-angle-down");
    } else {
        storeSelect.parentElement.classList.remove("hide-mobile");
        mattressSelect.parentElement.classList.remove("hide-mobile");
        toggleIcon.classList.remove("fa-angle-down");
        toggleIcon.classList.add("fa-angle-up");
    }
    map.getViewPort().resize();
});
