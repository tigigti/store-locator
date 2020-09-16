import "./style.scss";

function component() {
    const el = document.createElement("div");

    el.innerHTML = "Hello warudoo";
    el.classList.add("hello");

    return el;
}

document.body.appendChild(component());
