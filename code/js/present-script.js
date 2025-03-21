import {copyTextIntoClipboard as copyPresentAlias} from "./script.js"

export function initPresentSection() {
    initPresentBtn();
}

function initPresentBtn() {
    const BTN = document.getElementById("btn-present-pay-metod");
    BTN.addEventListener("click", () => {
        const ALIAS = BTN.getAttribute("data-alias");
        copyPresentAlias(ALIAS);
        alert("Alias copiado en el portapapeles");
    });
}