import {getPageData, getApiDate} from "./extern-api-data.js"
import {initClockStructure} from "./clock-script.js"
import {initLocationBtn} from "./location-script.js"
import {initAttendanceSection} from "./attendance-script.js"
import {initPayCardSection} from "./pay-card-script.js"

document.addEventListener("DOMContentLoaded", async () => {
    const PAGE_DATA = await getPageData();
    const API_DATE = await getApiDate();

    await Promise.all([PAGE_DATA, API_DATE]);

    initClockStructure(PAGE_DATA.eventDate);
    initLocationBtn(PAGE_DATA.placeLocationUrl);

    const urlParams = new URLSearchParams(window.location.search);

    if(urlParams.has("name")) {
        const NAME = urlParams.get("name");
        const ACTUAL_MEMBER = PAGE_DATA.members.find(member => member.name === NAME);
        
        if(ACTUAL_MEMBER) {
            initAttendanceSection(ACTUAL_MEMBER.phone);
        } else {
            initAttendanceSection(PAGE_DATA.members[0].phone);
        }
        
    } else {
        initAttendanceSection(PAGE_DATA.members[0].phone);
    }

    if (urlParams.has("is-pay-card-displayed")) {
        initPayCardSection()
    }       

    document.querySelector(".page-loading").style.display = "none";
    document.body.classList.remove("loading")
});



