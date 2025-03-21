
export function initAttendanceSection(phone) {
    initConfirmAttendanceBtn(phone);
}

function initConfirmAttendanceBtn(phone) {
    let acceptMessege = "Hola, quiero más información";
    let rejectionMessege = "Hola, no quiero más información";
    let url;

    document.getElementById("btn-confirm-attendance").addEventListener("click", function() { 
        url = getUrl(acceptMessege);
        window.open(url, "_blank");
    });

    document.getElementById("btn-decline-attendance").addEventListener("click", function() {
        url = getUrl(rejectionMessege);
        window.open(url, "_blank");
    });

    function getUrl(messege) {
        return `https://wa.me/${phone}?text=${encodeURIComponent(messege)}`;  
    }
}