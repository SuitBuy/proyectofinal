
const contenedorTarjetas = document.getElementById("productos-container");
const unidadesElment = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const carritoVacioElment = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales");


function crearTarjetasProductosInicio() {
  contenedorTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("productos"));
  console.log(productos);
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      const nuevoProducto = document.createElement("div");
      nuevoProducto.classList = "tarjeta-producto";
      nuevoProducto.innerHTML = `
    <article class="promo-card">
                <img src="./img/productos/${producto.id}.jpg" alt="imagen_producto" />
                <div class="promo-content">
                    <p class="promo-titulo">${producto.nombre} <span class="promo-precio">S/${producto.precio}</span></p>
                    <p class="promo-description">${producto.descripcion}</p>
                    <div class="promo-actions">
  <div class="cantidad-control">
    <button class="btn-menos">−</button>
    <span class="cantidad">${producto.cantidad}</span>
    <button class="btn-mas">+</button>
  </div>
                </div>
    </article>`
      contenedorTarjetas.appendChild(nuevoProducto);
      nuevoProducto.getElementsByTagName("button")[1].addEventListener("click", (e) => {
        const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
        cuentaElement.innerText = agregarAlCarrito(producto);
        actualizarTotales();
      });
      nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", (e) => {
        restarAlCarrito(producto)
        crearTarjetasProductosInicio();
        actualizarTotales();

      });
    });
  }
}


crearTarjetasProductosInicio();
actualizarTotales();



function actualizarTotales() {
  const productos = JSON.parse(localStorage.getItem("productos"));
  let unidades = 0;
  let precio = 0;
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      unidades += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    });
    unidadesElment.innerText = unidades;
    precioElement.innerText = precio;
  }
  revisarMensajeVacio();
}



function revisarMensajeVacio() {
  const productos = JSON.parse(localStorage.getItem("productos"));
  carritoVacioElment.classList.toggle("escondido", productos && productos.length > 0);
  totalesElement.classList.toggle("escondido", !(productos && productos.length > 0));

}
revisarMensajeVacio();

function reiniciarCarrito(){

  
}
