import "./style.scss";
// import "./hereMap";
import { platform, map } from "./hereMap";
// import csvData from "./Emma_Belgium_Stores.csv";

const storeFinderForm = document.querySelector("#store-finder-form");

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

