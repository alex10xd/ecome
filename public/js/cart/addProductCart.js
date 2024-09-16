const createAlert = ({type, title, timer}) => {
  Swal.fire({
    position: "top-end",
    icon: type,
    title,
    showConfirmButton: false,
    timer
  });
}


toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}


async function addProductCart(id) {
  const server = "http://localhost:3030"
  try {
    const { ok, msg } = await fetch(`${server}/api/carrito/agregar/${id}`, {
      method: "PATCH",
    }).then((res) => res.json());

    ok && 
    toastr["success"]("Producto agregado al carrito con éxito");
    setTimeout(() => {
      location.href = "/carrito"
    }, 2000);
   
  } catch (error) {
    console.error(error.message);
  }
};