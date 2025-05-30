function agregarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("productos"));
    console.log(memoria);
    if (!memoria) {
        const nuevoProducto = getNuevoProfuctoParaMemoria(producto);
        localStorage.setItem("productos", JSON.stringify([nuevoProducto]));
    } else {
        const indiceProducto = memoria.findIndex(productos => productos.id === producto.id);
        console.log(indiceProducto);
        const nuevaMemoria = memoria;
        if (indiceProducto === -1) {
            nuevaMemoria.push(getNuevoProfuctoParaMemoria(producto))
        } else {
            nuevaMemoria[indiceProducto].cantidad++;
        }
        localStorage.setItem("productos", JSON.stringify(memoria));
    }
    actualizarNumeroCarrito();
}
function getNuevoProfuctoParaMemoria(producto) {
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}
const cuentaCarritoElment = document.getElementById("cuenta-carrito");
function actualizarNumeroCarrito() {
    const memoria = JSON.parse(localStorage.getItem("productos"));
    const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
    cuentaCarritoElment.innerText = cuenta;
}
actualizarNumeroCarrito();
