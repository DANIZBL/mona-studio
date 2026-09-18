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
