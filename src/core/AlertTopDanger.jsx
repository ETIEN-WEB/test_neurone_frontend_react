import Swal from "sweetalert2";

// Message d'erreur qui dure avant disparaitre
const AlertTopDanger = (msg) => {
    Swal.fire({
        position: "top-end",
        showCloseButton: true,
        icon: "warning",
        title: msg,
        showConfirmButton: false,
        toast:true,
        timer: 8000
    })
}

export default AlertTopDanger;