
export function initAttendanceSection(phone, acceptMessege, rejectionMessege) {
    initConfirmAttendanceBtn(phone, acceptMessege, rejectionMessege);
}

function initConfirmAttendanceBtn(phone, acceptMessege, rejectionMessege) {
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