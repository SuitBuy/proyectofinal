const contenedorTarjetas = document.getElementById("productos-container"); // Contenedor donde se mostrarán los productos.

function crearTarjetasProductosInicio(productos) {
  productos.forEach(producto => {
    const nuevoProducto = document.createElement("div"); // Crea un div para cada tarjeta de producto.
    nuevoProducto.classList = "tarjeta-producto";
    nuevoProducto.innerHTML = `
      <article class="promo-card">
        <img src="./img/productos/${producto.id}.jpg" alt="imagen_producto" />
        <div class="promo-content">
          <p class="promo-titulo">${producto.nombre} <span class="promo-precio">S/${producto.precio}</span></p>
          <div>
            <a class="promo-description">${producto.descripcion}</a>
          </div>
          <div class="promo-actions">
            <button><span>ORDENAR</span><i class="fas fa-shopping-bag"></i></button>
          </div>
        </div>
      </article>`;
    contenedorTarjetas.appendChild(nuevoProducto); // Agrega la tarjeta al contenedor principal.
    
    // Añade un "evento" al botón "ORDENAR" para agregar el producto al carrito.
    nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", () => {
      agregarAlCarrito(producto); 
    });
  });
}

crearTarjetasProductosInicio(productos); // Llama a la función para mostrar los productos.