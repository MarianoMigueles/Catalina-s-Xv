import {getPageData, getApiDate} from "./extern-api-data.js"
import {initClockStructure} from "./clock-script.js"
import {initLocationBtn} from "./location-script.js"
import {initAttendanceSection} from "./attendance-script.js"
import {initPayCardSection} from "./pay-card-script.js"
import {initPresentSection} from "./present-script.js"

document.addEventListener("DOMContentLoaded", async () => {
    const URL_PARAMS = new URLSearchParams(window.location.search);

    if(!URL_PARAMS.has("name"))  {
        console.error("No se ha encontrado el parametro 'name' en la url")
        return
    } 

    const PAGE_DATA = await getPageData();
    const API_DATE = await getApiDate();

    await Promise.all([PAGE_DATA, API_DATE]);

    initClockStructure(PAGE_DATA.eventDate);
    initLocationBtn(PAGE_DATA.placeLocationUrl);

    let name = URL_PARAMS.get("name");
    const ACTUAL_MEMBER = PAGE_DATA.members.find(member => member.name === name);
    const acceptMessege = PAGE_DATA.attendance.acceptMessege
    const rejectionMessege = PAGE_DATA.attendance.rejectionMessege

    if(ACTUAL_MEMBER) {
        initAttendanceSection(ACTUAL_MEMBER.phone, acceptMessege, rejectionMessege);
    } else {
        initAttendanceSection(PAGE_DATA.members[0].phone, acceptMessege, rejectionMessege);
        name = PAGE_DATA.members[0].name
    }

    if (URL_PARAMS.has("is-pay-card-displayed")) {
        initPayCardSection(name, PAGE_DATA.members[0].phone);
    }
    
    initPresentSection()

    document.querySelector(".page-loading").style.display = "none";
    document.body.classList.remove("loading")
});

export function copyTextIntoClipboard(text) {
    navigator.clipboard.writeText(text)
}

export function addCopyInterface(data) {
    const DIV = document.createElement("div");
    DIV.classList.add("pay-interface", "center-content");
    DIV.innerHTML = `
        <div class="copy-copy-interface-content card-container center-content">
            <h2>¡Copiado!</h2>
            <div class="copy-interface-content center-content">
                ${data}
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