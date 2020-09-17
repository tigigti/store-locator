import "./style.scss";
import "./hereMap";
import { platform, map } from "./hereMap";

const storeFinderForm = document.querySelector("#store-finder-form");

const service = platform.getSearchService();

storeFinderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log(e.target.elements["location"].value);
    const query = e.target.elements["location"].value;
    service.geocode(
        {
            q: query,
        },
        (res) => {
            res.items.forEach((item) => {
                // map.addObject(new H.map.Marker(item.position));
                map.setCenter(item.position);
                map.setZoom(14);
            });
        }
    );
});
