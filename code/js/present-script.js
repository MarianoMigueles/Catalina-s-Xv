import {copyTextIntoClipboard as copyPresentAlias, addCopyInterface as addPresentInterface} from "./script.js"

export function initPresentSection() {
    initPresentBtn();
}

function initPresentBtn() {
    const BTN = document.getElementById("btn-present-pay-metod");
    BTN.addEventListener("click", () => {
        const ALIAS = BTN.getAttribute("data-alias");
        copyPresentAlias(ALIAS);
        const interfaseInfo = `
            <p>Se ha copiado el alias en el portapapeles</p>
            <span>Gracias por el regalo. ;)</span>
        `
        addPresentInterface(interfaseInfo);
    });
}