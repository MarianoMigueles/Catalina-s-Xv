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