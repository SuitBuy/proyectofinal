
const contenedorTarjetas = document.getElementById("productos-container");

function crearTarjetasProductosInicio(productos){
  productos.forEach(producto => {
    const nuevoProducto = document.createElement("div");
    nuevoProducto.classList = "tarjeta-producto";
    nuevoProducto.innerHTML = `
    <article class="promo-card">
                <img src="./img/productos/${producto.id}.jpg" alt="imagen_producto" />
                <div class="promo-content">
                    <p class="promo-titulo">${producto.nombre} <span class="promo-precio">S/${producto.precio}</span></p>
                    <p class="promo-description">${producto.descripcion}</p>
                    <div class="promo-actions">
                        <a href="#">Ver términos y condiciones</a>
                        <button><span>ORDENAR</span><i class="fas fa-shopping-bag"></i></button>
                    </div>
                </div>
    </article>`
    contenedorTarjetas.appendChild(nuevoProducto);
    nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", () => {
      agregarAlCarrito(producto);
    });
  });
}

crearTarjetasProductosInicio(productos);