import Swal from "sweetalert2";

const AlertTopEnd = (cls, msg) => {
    Swal.fire({
        position: "top-end",
        icon: cls,
        title: msg,
        showConfirmButton: false,
        toast:true,
        timer: 1800
    })
}

export default AlertTopEnd