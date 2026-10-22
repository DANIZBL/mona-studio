/* =====================================================
   GALERÍA DE SERVICIOS
===================================================== */

/* =====================================================
   ELEMENTOS
===================================================== */

const galeria = document.querySelector(".servicio-galeria");

const lightbox = document.getElementById("galeriaLightbox");

const lightboxMedia = document.getElementById("lightboxMedia");

const botonCerrar = document.getElementById("lightboxCerrar");

const botonAnterior = document.getElementById("lightboxAnterior");

const botonSiguiente = document.getElementById("lightboxSiguiente");

/* =====================================================
   ELEMENTOS DE LA GALERÍA
===================================================== */

const elementosGaleria = galeria
  ? Array.from(galeria.querySelectorAll(".galeria-item"))
  : [];

/* =====================================================
   ÍNDICE ACTUAL
===================================================== */

let indiceActual = 0;

/* =====================================================
   OBTENER MEDIA
===================================================== */

function obtenerMedia(elemento) {
  return elemento.querySelector("img, video");
}

/* =====================================================
   ABRIR LIGHTBOX
===================================================== */

function abrirLightbox(indice) {
  if (!elementosGaleria.length) {
    return;
  }

  indiceActual = indice;

  mostrarElemento(indiceActual);

  lightbox.classList.add("activo");

  lightbox.setAttribute("aria-hidden", "false");

  document.body.classList.add("lightbox-abierto");
}

/* =====================================================
   MOSTRAR ELEMENTO
===================================================== */

function mostrarElemento(indice) {
  const elemento = elementosGaleria[indice];

  if (!elemento) {
    return;
  }

  const media = obtenerMedia(elemento);

  if (!media) {
    return;
  }

  /*
        Limpiar elemento anterior.
    */

  lightboxMedia.innerHTML = "";

  /* =================================================
       SI ES IMAGEN
    ================================================= */

  if (media.tagName.toLowerCase() === "img") {
    const imagen = document.createElement("img");

    imagen.src = media.currentSrc || media.src;

    imagen.alt = media.alt || "";

    lightboxMedia.appendChild(imagen);
  } else if (media.tagName.toLowerCase() === "video") {
    /* =================================================
       SI ES VIDEO
    ================================================= */
    const video = document.createElement("video");

    video.src = media.currentSrc || media.src;

    video.controls = true;

    video.autoplay = true;

    video.playsInline = true;

    video.preload = "metadata";

    lightboxMedia.appendChild(video);

    /*
            Intentar reproducir
            automáticamente.
        */

    video.play().catch(() => {});
  }
}

/* =====================================================
   CERRAR LIGHTBOX
===================================================== */

function cerrarLightbox() {
  lightbox.classList.remove("activo");

  lightbox.setAttribute("aria-hidden", "true");

  document.body.classList.remove("lightbox-abierto");

  /*
        Al eliminar el contenido
        también detenemos cualquier
        video que estuviera reproduciéndose.
    */

  lightboxMedia.innerHTML = "";
}

/* =====================================================
   SIGUIENTE
===================================================== */

function siguiente() {
  indiceActual++;

  if (indiceActual >= elementosGaleria.length) {
    indiceActual = 0;
  }

  mostrarElemento(indiceActual);
}

/* =====================================================
   ANTERIOR
===================================================== */

function anterior() {
  indiceActual--;

  if (indiceActual < 0) {
    indiceActual = elementosGaleria.length - 1;
  }

  mostrarElemento(indiceActual);
}

/* =====================================================
   CLICK EN GALERÍA
===================================================== */

elementosGaleria.forEach((elemento, indice) => {
  elemento.addEventListener("click", () => {
    abrirLightbox(indice);
  });
});

/* =====================================================
   BOTÓN CERRAR
===================================================== */

botonCerrar.addEventListener("click", cerrarLightbox);

/* =====================================================
   BOTÓN ANTERIOR
===================================================== */

botonAnterior.addEventListener("click", anterior);

/* =====================================================
   BOTÓN SIGUIENTE
===================================================== */

botonSiguiente.addEventListener("click", siguiente);

/* =====================================================
   CLICK EN EL FONDO
===================================================== */

lightbox.addEventListener("click", (event) => {
  /*
            Si se hace click directamente
            sobre el fondo negro.
        */

  if (event.target === lightbox) {
    cerrarLightbox();
  }
});

/* =====================================================
   TECLADO
===================================================== */

document.addEventListener("keydown", (event) => {
  /*
            Solo actuar si el lightbox
            está abierto.
        */

  if (!lightbox.classList.contains("activo")) {
    return;
  }

  /* ESC */

  if (event.key === "Escape") {
    cerrarLightbox();
  }

  /* IZQUIERDA */

  if (event.key === "ArrowLeft") {
    anterior();
  }

  /* DERECHA */

  if (event.key === "ArrowRight") {
    siguiente();
  }
});

/* =====================================================
   WHATSAPP
===================================================== */

const whatsappNumber = "3434403870";

document.querySelectorAll(".whatsapp-btn").forEach((button) => {
  const message = button.dataset.message;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  button.href = whatsappUrl;
  button.target = "_blank";
  button.rel = "noopener noreferrer";
});

/*======================================= */

const videoStaff = document.querySelector(".makeup-staff-video");
const modalStaff = document.querySelector(".makeup-staff-modal");
const videoStaffGrande = document.querySelector(".makeup-staff-video-grande");

// Abrir el video ampliado
videoStaff.addEventListener("click", async () => {
  if (modalStaff.open) return;

  const tiempo = videoStaff.currentTime;
  const sonidoActivado = !videoStaff.muted;

  // Pausar la vista previa para evitar audio duplicado
  videoStaff.pause();

  videoStaffGrande.muted = !sonidoActivado;

  modalStaff.showModal();

  try {
    if (videoStaffGrande.readyState < 1) {
      await new Promise((resolve) => {
        videoStaffGrande.addEventListener("loadedmetadata", resolve, {
          once: true,
        });
      });
    }

    videoStaffGrande.currentTime = tiempo;

    await videoStaffGrande.play();
  } catch (error) {
    console.warn("No se pudo reproducir el video del staff:", error);
  }
});

// Cerrar al tocar el fondo oscuro
modalStaff.addEventListener("click", (event) => {
  if (event.target === modalStaff) {
    modalStaff.close();
  }
});

// Sincronizar y reanudar al cerrar
// También funciona al pulsar Escape
modalStaff.addEventListener("close", () => {
  const tiempo = videoStaffGrande.currentTime;
  const sonidoActivado = !videoStaffGrande.muted;

  videoStaffGrande.pause();

  videoStaff.currentTime = tiempo;
  videoStaff.muted = !sonidoActivado;

  videoStaff.play().catch(() => {});
});

/* ==========================================
   TESTIMONIOS DE REGI
   UN MENSAJE A LA VEZ
========================================== */

const testimoniosRegi = [
  "Regi una genia total. No la cambio por nada",

  "Desde que conocí el lifting de Regi no pude dejarlo nunca más. Es un viaje de ida.",

  "Ame!!! Excelente servicios, el mejor lugar para mimarse ❤️",

  "Nuevamente paso por aca para agradecer por el servicio! Muy buena atención, muy amable y cálida la profesional ❤️ Me sentí muy conforme y cómoda!!❤️Gracias. que tengan linda semana!!",
];

function iniciarTestimoniosRegi() {
  const contenedor = document.getElementById("regiTestimoniosChat");

  if (!contenedor || contenedor.dataset.iniciado === "true") return;

  contenedor.dataset.iniciado = "true";

  const movimientoReducido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let indice = 0;
  let mensajeActual = null;
  let temporizador = null;

  function mostrarSiguienteTestimonio() {
    const nuevoMensaje = document.createElement("article");
    nuevoMensaje.className = "regi-mensaje";

    const texto = document.createElement("p");
    texto.className = "regi-mensaje-texto";
    texto.textContent = `“${testimoniosRegi[indice]}”`;

    const pie = document.createElement("div");
    pie.className = "regi-mensaje-pie";

    const etiqueta = document.createElement("span");
    etiqueta.textContent = "Opinión de clienta";

    const checks = document.createElement("span");
    checks.className = "regi-mensaje-check";
    checks.setAttribute("aria-hidden", "true");
    checks.textContent = "✓✓";

    pie.append(etiqueta, checks);
    nuevoMensaje.append(texto, pie);

    // El nuevo mensaje ocupa exactamente la misma posición.
    contenedor.appendChild(nuevoMensaje);

    if (mensajeActual) {
      const anterior = mensajeActual;
      anterior.classList.remove("regi-mensaje-visible");
      anterior.classList.add("regi-mensaje-saliendo");

      if (movimientoReducido) {
        anterior.remove();
      } else {
        anterior.addEventListener(
          "transitionend",
          (evento) => {
            if (
              evento.target === anterior &&
              evento.propertyName === "opacity"
            ) {
              anterior.remove();
            }
          },
          { once: true }
        );

        // Respaldo por si no se dispara transitionend.
        window.setTimeout(() => anterior.remove(), 700);
      }
    }

    mensajeActual = nuevoMensaje;

    if (movimientoReducido) {
      nuevoMensaje.classList.add("regi-mensaje-visible");
    } else {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          nuevoMensaje.classList.add("regi-mensaje-visible");
        });
      });
    }

    indice = (indice + 1) % testimoniosRegi.length;
  }

  mostrarSiguienteTestimonio();

  // Cambia el mensaje cada 4,5 segundos.
  temporizador = window.setInterval(mostrarSiguienteTestimonio, 4500);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarTestimoniosRegi, {
    once: true,
  });
} else {
  iniciarTestimoniosRegi();
}

/* ==========================================
   TESTIMONIOS DE PERFILADO
========================================== */

const testimoniosPerfilado = [
  "Es increíble, rapidísimo. En 15 minutos me voy con las cejas perfectas y sin siquiera una pelusita. Lo super recomiendo",
  "Desde que conocí el perfilado con hilo no pude depilarme con nada más las cejas. La técnica es perfección y Regi hiper cuidadosa y perfeccionista.",
  "Me encantó cómo quedaron mis cejas. ¡Súper recomendable!",
  "Una experiencia hermosa, con una atención muy cálida.",
];

function iniciarTestimoniosPerfilado() {
  const contenedor = document.getElementById("perfiladoTestimoniosChat");

  if (!contenedor || contenedor.dataset.iniciado === "true") {
    return;
  }

  contenedor.dataset.iniciado = "true";

  const movimientoReducido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let indice = 0;
  let mensajeActual = null;

  function mostrarSiguienteTestimonio() {
    const nuevoMensaje = document.createElement("article");
    nuevoMensaje.className = "perfilado-mensaje";

    const texto = document.createElement("p");
    texto.className = "perfilado-mensaje-texto";
    texto.textContent = `“${testimoniosPerfilado[indice]}”`;

    const pie = document.createElement("div");
    pie.className = "perfilado-mensaje-pie";

    const etiqueta = document.createElement("span");
    etiqueta.textContent = "Opinión de clienta";

    const checks = document.createElement("span");
    checks.className = "perfilado-mensaje-check";
    checks.setAttribute("aria-hidden", "true");
    checks.textContent = "✓✓";

    pie.append(etiqueta, checks);
    nuevoMensaje.append(texto, pie);
    contenedor.appendChild(nuevoMensaje);

    if (mensajeActual) {
      const anterior = mensajeActual;

      anterior.classList.remove("perfilado-mensaje-visible");

      anterior.classList.add("perfilado-mensaje-saliendo");

      if (movimientoReducido) {
        anterior.remove();
      } else {
        anterior.addEventListener("transitionend", (evento) => {
          if (evento.target === anterior && evento.propertyName === "opacity") {
            anterior.remove();
          }
        });

        window.setTimeout(() => anterior.remove(), 700);
      }
    }

    mensajeActual = nuevoMensaje;

    if (movimientoReducido) {
      nuevoMensaje.classList.add("perfilado-mensaje-visible");
    } else {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          nuevoMensaje.classList.add("perfilado-mensaje-visible");
        });
      });
    }

    indice = (indice + 1) % testimoniosPerfilado.length;
  }

  mostrarSiguienteTestimonio();

  window.setInterval(mostrarSiguienteTestimonio, 4500);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarTestimoniosPerfilado, {
    once: true,
  });
} else {
  iniciarTestimoniosPerfilado();
}

/* ==========================================
   TESTIMONIOS DE LIMPIEZA FACIAL
========================================== */

const testimoniosLimpiezaFacial = [
  "Me encantó la experiencia. Mi piel quedó hermosa y luminosa.",
  "Excelente atención, un momento de relajación para mí.",
  "Me sentí súper cómoda y salí feliz con el resultado.",
  "Un servicio hermoso, con mucha dedicación y cuidado.",
];

function iniciarTestimoniosLimpiezaFacial() {
  const contenedor = document.getElementById("limpiezaFacialTestimoniosChat");

  if (!contenedor || contenedor.dataset.iniciado === "true") {
    return;
  }

  contenedor.dataset.iniciado = "true";

  const movimientoReducido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let indice = 0;
  let mensajeActual = null;

  function mostrarSiguienteTestimonio() {
    const nuevoMensaje = document.createElement("article");
    nuevoMensaje.className = "limpieza-facial-mensaje";

    const texto = document.createElement("p");
    texto.className = "limpieza-facial-mensaje-texto";
    texto.textContent = `“${testimoniosLimpiezaFacial[indice]}”`;

    const pie = document.createElement("div");
    pie.className = "limpieza-facial-mensaje-pie";

    const etiqueta = document.createElement("span");
    etiqueta.textContent = "Opinión de clienta";

    const checks = document.createElement("span");
    checks.className = "limpieza-facial-mensaje-check";
    checks.setAttribute("aria-hidden", "true");
    checks.textContent = "✓✓";

    pie.append(etiqueta, checks);
    nuevoMensaje.append(texto, pie);
    contenedor.appendChild(nuevoMensaje);

    if (mensajeActual) {
      const anterior = mensajeActual;

      anterior.classList.remove("limpieza-facial-mensaje-visible");

      anterior.classList.add("limpieza-facial-mensaje-saliendo");

      if (movimientoReducido) {
        anterior.remove();
      } else {
        anterior.addEventListener(
          "transitionend",
          (evento) => {
            if (
              evento.target === anterior &&
              evento.propertyName === "opacity"
            ) {
              anterior.remove();
            }
          },
          { once: true }
        );

        window.setTimeout(() => anterior.remove(), 700);
      }
    }

    mensajeActual = nuevoMensaje;

    if (movimientoReducido) {
      nuevoMensaje.classList.add("limpieza-facial-mensaje-visible");
    } else {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          nuevoMensaje.classList.add("limpieza-facial-mensaje-visible");
        });
      });
    }

    indice = (indice + 1) % testimoniosLimpiezaFacial.length;
  }

  mostrarSiguienteTestimonio();

  window.setInterval(mostrarSiguienteTestimonio, 4500);
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    iniciarTestimoniosLimpiezaFacial,
    { once: true }
  );
} else {
  iniciarTestimoniosLimpiezaFacial();
}
