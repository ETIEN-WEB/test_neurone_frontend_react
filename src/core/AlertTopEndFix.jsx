import Swal from "sweetalert2";

const AlertTopEndFix = (msg) => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: msg,
        showConfirmButton: false,
        toast:true,
        timer: 1500
    })
}
export default AlertTopEndFix