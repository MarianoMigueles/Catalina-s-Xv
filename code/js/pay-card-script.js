import {copyTextIntoClipboard} from "./script.js"

export function initPayCardSection(phoneOwnerName, phoneNumber) {
    const MAIN = document.querySelector('.main-content')
    const PAY_CARD_STRUCTURE = getPayCardStructure();
    const LAST_CHILD = MAIN.lastElementChild;
    MAIN.insertBefore(PAY_CARD_STRUCTURE, LAST_CHILD)
    initOnClickPayInformationBtn(phoneOwnerName, phoneNumber)
}

function getPayCardStructure() {
    const SECTION = document.createElement('section');
    SECTION.id = "pay-card-info-section";
    SECTION.classList.add("page-content-container", "center-content");
    SECTION.innerHTML = `
                <div class="pay-card-info center-content card-container">
                    <div class="pay-card-header center-content">
                        <h2>Valor de la tarjeta</h2>
                        <span>$ 25.000</span>
                    </div>
                    <div class="pay-card-body center-content">
                        <h3>Incluye:</h3>
                        <ul>
                            <li>Servicio de lunch</li>
                            <li>Cena</li>
                            <li>Postre</li>
                            <li>Barra de tragos</li>
                            <li>Mesa dulce</li>
                            <li>Desayuno</li>
                        </ul>
                    </div>
                    <div class="pay-card-footer center-content">
                        <h3>Modo de pago</h3>
                        <div class="pay-metod center-content">
                            <img src="assets/svgs/mercado-pago.svg" alt="mercado pago icon">
                            <button id="btn-pay-card-metod" class="btn-pay-metod-text center-content" data-alias="cata.valen.aran">
                                <span>Alias: cata.valen.aran</span>
                                <span>Martin Facundo Aranda</span>
                            </button>
                        </div>
                    </div>
                </div>
    `;
    return SECTION;
}

function initOnClickPayInformationBtn(phoneOwnerName, phoneNumber) {
    const BTN = document.getElementById("btn-pay-card-metod");
    BTN.addEventListener("click", () => {
        const ALIAS = BTN.getAttribute("data-alias");
        copyTextIntoClipboard(ALIAS);
        addPayInterface(phoneOwnerName, phoneNumber);
    });
}

function addPayInterface(phoneOwnerName, phoneNumber) {
    const DIV = document.createElement("div");
    DIV.classList.add("pay-interface", "center-content");
    DIV.innerHTML = `
        <div class="pay-interface-content card-container center-content">
            <h2>¡Copiado!</h2>
            <p>Alias copiado en el portapapeles. Por favor, una vez hecha la tranferencia envia el comproante al siguiente numero:</p>
            <div class="number-container center-content">
                <span>${phoneOwnerName}</span>
                <span>${phoneNumber}</span>
            </div>
            <button id="close-btn" class="btn-opaque-background">Cerrar</button>
        </div>
    ` 
    const BODY = document.body;
    BODY.style.overflow = 'hidden'
    BODY.appendChild(DIV);

    document.getElementById('close-btn').addEventListener("click", () => {
        removePayInterface()
    })
}

function removePayInterface() {
    document.querySelector(".pay-interface").remove();
    document.body.style.overflow = 'auto'
}