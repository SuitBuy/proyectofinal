const contenedorTarjetas = document.getElementById("productos-container");
const unidadesElment = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const carritoVacioElment = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales");
const reiniciarCarritoElement = document.getElementById("reiniciar-carrito");

function crearTarjetasProductosInicio() {
  contenedorTarjetas.innerHTML = "";
  // Obtenemos los productos del almacenamiento local (localStorage).
  const productos = JSON.parse(localStorage.getItem("productos"));
  console.log(productos);
  // Verificamos si hay productos para mostrar.
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
          </div>
        </article>`;
      contenedorTarjetas.appendChild(nuevoProducto);
      // Agregamos un evento para el botón de "agregar al carrito".
      nuevoProducto.getElementsByTagName("button")[1].addEventListener("click", (e) => {
        const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
        // Actualizamos la cantidad y los totales del carrito.
        cuentaElement.innerText = agregarAlCarrito(producto);
        actualizarTotales();
      });
      // Agregamos un evento para el botón de "restar del carrito".
      nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", (e) => {
        restarAlCarrito(producto);
        // Volvemos a renderizar las tarjetas para reflejar los cambios.
        crearTarjetasProductosInicio();
        actualizarTotales();
      });
    });
  }
}

crearTarjetasProductosInicio();
actualizarTotales();

function actualizarTotales() {
  // Obtenemos los productos almacenados en el localStorage. Si no hay, será null.
  const productos = JSON.parse(localStorage.getItem("productos"));
  let unidades = 0; // Inicializamos el contador de unidades a cero.
  let precio = 0; // Inicializamos el contador de precio total a cero.

  // Verificamos si existen productos y si la lista de productos no está vacía.
  if (productos && productos.length > 0) {
    // Iteramos sobre cada producto en el array de productos.
    productos.forEach((producto) => {
      unidades += producto.cantidad; // Sumamos la cantidad de cada producto al total de unidades.
      precio += producto.precio * producto.cantidad; // Calculamos el subtotal de cada producto y lo sumamos al precio total.
    });
    // Actualizamos los elementos HTML en la página con los valores calculados de unidades y precio.
    unidadesElment.innerText = unidades; // Muestra el número total de unidades.
    precioElement.innerText = precio; // Muestra el precio total.
  }
  revisarMensajeVacio();
}

function revisarMensajeVacio() {
  const productos = JSON.parse(localStorage.getItem("productos"));
  // Alternamos la clase "escondido" para mostrar u ocultar el mensaje de carrito vacío y los totales.
  carritoVacioElment.classList.toggle("escondido", productos && productos.length > 0);
  totalesElement.classList.toggle("escondido", !(productos && productos.length > 0));
}
revisarMensajeVacio();

if (reiniciarCarritoElement) {
  // Añadimos un evento de clic al botón de reiniciar carrito.
  reiniciarCarritoElement.addEventListener("click", reiniciarCarrito);
}
function reiniciarCarrito() {
  // Eliminamos los productos del almacenamiento local.
  localStorage.removeItem("productos");
  actualizarTotales();
  crearTarjetasProductosInicio();
  //actualiza un número en el icono del carrito.
  actualizarNumeroCarrito();
}