function agregarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("productos"));
    console.log(memoria);
    let cuenta = 0;
    if (!memoria) {
        const nuevoProducto = getNuevoProfuctoParaMemoria(producto);
        localStorage.setItem("productos", JSON.stringify([nuevoProducto]));
        cuenta = 1;
    } else {
        const indiceProducto = memoria.findIndex(productos => productos.id === producto.id);
        console.log(indiceProducto);
        const nuevaMemoria = memoria;
        if (indiceProducto === -1) {
            nuevaMemoria.push(getNuevoProfuctoParaMemoria(producto))
            cuenta = 1;
        } else {
            nuevaMemoria[indiceProducto].cantidad++;
            cuenta = nuevaMemoria[indiceProducto].cantidad;
        }
        localStorage.setItem("productos", JSON.stringify(memoria));
    }
    actualizarNumeroCarrito();
    return cuenta;

}

function restarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("productos"));
    const indiceProducto = memoria.findIndex(productos => productos.id === producto.id);
    if (memoria[indiceProducto].cantidad == 1) {
        memoria.splice(indiceProducto, 1);
    } else {
        memoria[indiceProducto].cantidad--;
    }
    localStorage.setItem("productos", JSON.stringify(memoria));
    actualizarNumeroCarrito()

}
function getNuevoProfuctoParaMemoria(producto) {
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}
const cuentaCarritoElment = document.getElementById("cuenta-carrito");
function actualizarNumeroCarrito() {
    const memoria = JSON.parse(localStorage.getItem("productos"));
    if (memoria && memoria.length > 0) {
        const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
        cuentaCarritoElment.innerText = cuenta;
    } else {
        cuentaCarritoElment.innerText = 0;
    }
}
actualizarNumeroCarrito()
