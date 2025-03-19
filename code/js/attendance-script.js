
export function initAttendanceSection(phone) {
    initConfirmAttendanceBtn(phone);
}

function initConfirmAttendanceBtn(phone) {
    console.log("phone:" + phone);
    document.getElementById("btn-confirm-attendance").addEventListener("click", function() {
        let numero = phone;
        let mensaje = "Hola, quiero más información";
        let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;   
        window.open(url, "_blank");
    });
}