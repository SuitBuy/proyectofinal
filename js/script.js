

//Menu hamburguesa

document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("menu");
  const toggle = document.getElementById("menu-toggle");

  toggle.addEventListener("click", function () {
    menu.classList.toggle("activo");
    toggle.classList.toggle("activo");
  });
});

//Para el banner 
let indice = 0;
const imagenes = document.querySelectorAll(".carrusel-img");

function mostrarSiguienteImagen() {
  imagenes[indice].classList.remove("activa");
  indice = (indice + 1) % imagenes.length;
  imagenes[indice].classList.add("activa");
}
imagenes[0].classList.add("activa");
setInterval(mostrarSiguienteImagen, 3000);


//para nuestros valores 
function mostrarValores(n) {
  document.querySelectorAll('.valor').forEach((val, index) => {
    val.classList.remove('active');
    if (index === n - 1) val.classList.add('active');
  });

  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.classList.remove('active');
    if (index === n - 1) dot.classList.add('active');
  });
}


//para la seccion de comentarios
const form = document.getElementById("form-comentarios");
const contenedorComentarios = document.getElementById("comentarios-container");
let comentarios = [];
let posicion = 0;

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();
  const calificacion = document.querySelector('input[name="estrella"]:checked');

  if (!nombre || !correo || !mensaje || !calificacion) {
    alert("Por favor, completa todos los campos, incluyendo la calificación.");
    return;
  }

  // Guardamos el comentario
  comentarios.push({
    nombre: nombre,
    estrellas: parseInt(calificacion.value),
    mensaje: mensaje
  });

  form.reset();
  mostrarComentarios();
});

// Renderizar comentarios (máx. 4 por vista)
function mostrarComentarios() {
  contenedorComentarios.innerHTML = "";

  comentarios.forEach(comentario => {
    const card = document.createElement("div");
    card.className = "comentario-card";

    const estrellasHtml = "★".repeat(comentario.estrellas) + "☆".repeat(5 - comentario.estrellas);

    card.innerHTML = `
      <h4>${comentario.nombre}</h4>
      <div class="estrellas">${estrellasHtml}</div>
      <p>${comentario.mensaje}</p>
    `;
    contenedorComentarios.appendChild(card);
  });

  actualizarVista();
}

function actualizarVista() {
  const ancho = 270; // ancho aproximado de cada tarjeta + padding
  const total = comentarios.length;
  const offset = posicion * ancho * 4;
  contenedorComentarios.style.transform = `translateX(-${offset}px)`;
}

// Botones de navegación
document.querySelector(".slider-prev").addEventListener("click", () => {
  if (posicion > 0) {
    posicion--;
    actualizarVista();
  }
});

document.querySelector(".slider-next").addEventListener("click", () => {
  const totalPages = Math.ceil(comentarios.length / 4);
  if (posicion < totalPages - 1) {
    posicion++;
    actualizarVista();
  }
});








// reservas.js

/*document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form-reserva');
  const mensaje = document.getElementById('mensaje-reserva');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validación básica
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const personas = document.getElementById('personas').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const sucursal = document.getElementById('sucursal').value;
    const terminos = document.getElementById('terminos').checked;

    if (!nombre || !email || !telefono || !personas || !fecha || !hora || !sucursal || !terminos) {
      mensaje.style.color = 'red';
      mensaje.textContent = 'Por favor, completa todos los campos requeridos.';
      return;
    }

    // Aquí puedes agregar la lógica para enviar los datos al servidor
    // Por ejemplo, usando fetch() para enviar los datos a una API

    // Simulación de envío exitoso
    mensaje.style.color = 'green';
    mensaje.textContent = '¡Reserva realizada con éxito! Nos pondremos en contacto contigo pronto.';
    form.reset();
  });
});
*/


// Simulación de disponibilidad de mesas

const horarios = [
  "12:00 pm", "12:30 pm", "1:00 pm", "1:30 pm",
  "2:00 pm", "2:30 pm", "3:00 pm", "3:30 pm"
];

let diaOffset = 0;

function cambiarDia(offset) {
  diaOffset += offset;
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + diaOffset);
  document.getElementById("fechaActual").textContent = fecha.toLocaleDateString("es-PE", {
    weekday: "long", year: "numeric", month: "short", day: "numeric"
  });
  cargarHorarios();
}

function cargarHorarios() {
  const contenedor = document.getElementById("horarios");
  contenedor.innerHTML = "";
  horarios.forEach(hora => {
    const btn = document.createElement("button");
    btn.textContent = hora;
    btn.onclick = () => {
      document.querySelectorAll("#horarios button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    };
    contenedor.appendChild(btn);
  });
}

document.getElementById("reservaForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Reserva enviada con éxito.");
});

cambiarDia(0); 


