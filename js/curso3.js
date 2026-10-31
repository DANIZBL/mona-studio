// =========================================================
// GALERÍA PERFECCIONAMIENTO
// =========================================================

const perfeccionamientoGalleryItems = [
  {
    type: "image",
    src: "../src/img/curso3_3.webp",
    alt: "Perfeccionamiento en maquillaje",
  },

  {
    type: "image",
    src: "../src/img/curso3_4.webp",
    alt: "Técnica de maquillaje",
  },

  {
    type: "image",
    src: "../src/img/pieles3.webp",
    alt: "Curso de perfeccionamiento",
  },

  {
    type: "image",
    src: "../src/img/pieles4.webp",
    alt: "Perfeccionamiento profesional",
  },
];

// =========================================================
// CONTENEDOR
// =========================================================

const perfeccionamientoGallery = document.getElementById(
  "perfeccionamientoGallery"
);

// =========================================================
// CREAR GALERÍA
// =========================================================

perfeccionamientoGalleryItems.forEach((item) => {
  const perfeccionamientoGalleryItem = document.createElement("div");

  perfeccionamientoGalleryItem.classList.add("perfeccionamiento-gallery-item");

  // =======================================================
  // IMAGEN
  // =======================================================

  if (item.type === "image") {
    const img = document.createElement("img");

    img.src = item.src;

    img.alt = item.alt || "Galería de perfeccionamiento";

    img.loading = "lazy";

    perfeccionamientoGalleryItem.appendChild(img);
  }

  // =======================================================
  // VIDEO
  // =======================================================

  if (item.type === "video") {
    const video = document.createElement("video");

    video.src = item.src;

    // =====================================================
    // AUTOPLAY + LOOP
    // =====================================================

    video.muted = true;

    video.loop = true;

    video.autoplay = true;

    video.playsInline = true;

    // Compatibilidad con dispositivos móviles

    video.setAttribute("muted", "");

    video.setAttribute("autoplay", "");

    video.setAttribute("playsinline", "");

    video.setAttribute("webkit-playsinline", "");

    // =====================================================
    // CONTROLES
    // =====================================================

    video.controls = true;

    // =====================================================
    // PRELOAD
    // =====================================================

    video.preload = "auto";

    // =====================================================
    // REPRODUCIR
    // =====================================================

    video.play().catch((error) => {
      console.log("Autoplay bloqueado:", error);
    });

    // =====================================================
    // ERROR
    // =====================================================

    video.addEventListener("error", () => {
      console.error("No se pudo cargar el video:", item.src);
    });

    perfeccionamientoGalleryItem.appendChild(video);
  }

  // =======================================================
  // AGREGAR ELEMENTO
  // =======================================================

  perfeccionamientoGallery.appendChild(perfeccionamientoGalleryItem);
});

// =========================================================
// GALERÍA NOVIAS
// =========================================================

const galeriaNoviasItems = [
  {
    type: "image",
    src: "../src/img/novias2.webp",
    alt: "Maquillaje de novia",
  },
  {
    type: "image",
    src: "../src/img/quince1.webp",
    alt: "Look de novia",
  },
  {
    type: "image",
    src: "../src/img/novias14.webp",
    alt: "Maquillaje para novia",
  },
  {
    type: "image",
    src: "../src/img/quince6.webp",
    alt: "Maquillaje profesional para novia",
  },
];

// =========================================================
// CONTENEDOR
// =========================================================

const galeriaNovias = document.getElementById("galeriaNovias");

// =========================================================
// CREAR GALERÍA
// =========================================================

galeriaNoviasItems.forEach((item) => {
  const galeriaNoviasItem = document.createElement("div");

  galeriaNoviasItem.classList.add("galeria-novias-item");

  // =======================================================
  // IMAGEN
  // =======================================================

  if (item.type === "image") {
    const img = document.createElement("img");

    img.src = item.src;

    img.alt = item.alt || "Galería de novias";

    img.loading = "lazy";

    galeriaNoviasItem.appendChild(img);
  }

  // =======================================================
  // VIDEO
  // =======================================================

  if (item.type === "video") {
    const video = document.createElement("video");

    video.src = item.src;

    // =====================================================
    // AUTOPLAY + LOOP
    // =====================================================

    video.muted = true;

    video.loop = true;

    video.autoplay = true;

    video.playsInline = true;

    // Compatibilidad con dispositivos móviles

    video.setAttribute("muted", "");

    video.setAttribute("autoplay", "");

    video.setAttribute("playsinline", "");

    video.setAttribute("webkit-playsinline", "");

    // =====================================================
    // CONTROLES
    // =====================================================

    video.controls = true;

    // =====================================================
    // PRELOAD
    // =====================================================

    video.preload = "auto";

    // =====================================================
    // REPRODUCIR
    // =====================================================

    video.play().catch((error) => {
      console.log("Autoplay bloqueado:", error);
    });

    // =====================================================
    // ERROR
    // =====================================================

    video.addEventListener("error", () => {
      console.error("No se pudo cargar el video:", item.src);
    });

    galeriaNoviasItem.appendChild(video);
  }

  // =======================================================
  // AGREGAR ELEMENTO
  // =======================================================

  galeriaNovias.appendChild(galeriaNoviasItem);
});

/* ==========================================
   SISTEMA DE INSCRIPCIÓN A CURSOS
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // CONFIGURACIÓN
  // ==========================================

  // Reemplazar por el número de WhatsApp de destino.
  // Formato internacional, solo números.
  // Ejemplo Argentina: 5491123456789

  const NUMERO_WHATSAPP = "3434403870";

  // ==========================================
  // ELEMENTOS DEL DOM
  // ==========================================

  const modal = document.getElementById("modalInscripcion");

  const cerrarBtn = document.getElementById("cerrarInscripcion");

  const formulario = document.getElementById("formularioInscripcion");

  const nombreCurso = document.getElementById("nombreCursoSeleccionado");

  const campoNombre = document.getElementById("inscripcionNombre");

  const campoEdad = document.getElementById("inscripcionEdad");

  const campoTelefono = document.getElementById("inscripcionTelefono");

  const campoCorreo = document.getElementById("inscripcionCorreo");

  const botonesInscripcion = document.querySelectorAll(".js-abrir-inscripcion");

  // Elemento que tenía el foco antes de abrir el modal.
  let elementoAnterior = null;

  // ==========================================
  // ABRIR MODAL
  // ==========================================

  function abrirModal(curso, boton) {
    elementoAnterior = boton;

    // Mostrar el curso seleccionado.
    nombreCurso.textContent = curso;

    // Abrir ventana.
    modal.classList.add("is-visible");
    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("inscripcion-modal-abierto");

    // Enfocar el primer campo.
    requestAnimationFrame(() => {
      campoNombre.focus();
    });
  }

  // ==========================================
  // CERRAR MODAL
  // ==========================================

  function cerrarModal() {
    modal.classList.remove("is-visible");
    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("inscripcion-modal-abierto");

    // Devolver el foco al botón que abrió el formulario.
    if (elementoAnterior) {
      elementoAnterior.focus();
    }
  }

  // ==========================================
  // EVENTOS DE LOS BOTONES DE INSCRIPCIÓN
  // ==========================================

  botonesInscripcion.forEach((boton) => {
    boton.addEventListener("click", () => {
      const curso = boton.dataset.curso?.trim();

      if (!curso) {
        console.error(
          "El botón de inscripción necesita un atributo data-curso."
        );
        return;
      }

      abrirModal(curso, boton);
    });
  });

  // ==========================================
  // CERRAR CON LA X
  // ==========================================

  cerrarBtn.addEventListener("click", cerrarModal);

  // ==========================================
  // CERRAR AL HACER CLIC EN EL FONDO
  // ==========================================

  modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
      cerrarModal();
    }
  });

  // ==========================================
  // CERRAR CON LA TECLA ESCAPE
  // ==========================================

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && modal.classList.contains("is-visible")) {
      cerrarModal();
    }
  });

  // ==========================================
  // ENVIAR INSCRIPCIÓN A WHATSAPP
  // ==========================================

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    // Validar campos obligatorios y formatos.
    if (!formulario.reportValidity()) {
      return;
    }

    // Verificar que el número de WhatsApp esté configurado.
    const numero = NUMERO_WHATSAPP.replace(/\D/g, "");

    if (!numero) {
      alert(
        "El formulario todavía no tiene configurado el número de WhatsApp."
      );
      return;
    }

    // Obtener los datos del formulario.
    const curso = nombreCurso.textContent.trim();

    const nombre = campoNombre.value.trim();

    const edad = campoEdad.value.trim();

    const telefono = campoTelefono.value.trim();

    const correo = campoCorreo.value.trim();

    // Verificar que todos los datos estén completos.
    if (!curso || !nombre || !edad || !telefono || !correo) {
      alert("Por favor, completá todos los campos.");
      return;
    }

    // Validar que la edad sea un número entero entre 1 y 120.
    const edadNumero = Number(edad);

    if (!Number.isInteger(edadNumero) || edadNumero < 1 || edadNumero > 120) {
      alert("Por favor, ingresá una edad válida entre 1 y 120 años.");
      campoEdad.focus();
      return;
    }

    // Construir el mensaje de inscripción.
    const mensaje = `Hola, quiero inscribirme al curso "${curso}".

Estos son mis datos:

Nombre completo: ${nombre}
Edad: ${edadNumero} años
Teléfono: ${telefono}
Correo electrónico: ${correo}`;

    // Codificar el mensaje para la URL.
    const mensajeCodificado = encodeURIComponent(mensaje);

    // Crear el enlace de WhatsApp.
    const urlWhatsApp = `https://wa.me/${numero}?text=${mensajeCodificado}`;

    // Abrir WhatsApp con el mensaje preparado.
    window.open(urlWhatsApp, "_blank", "noopener,noreferrer");
  });
});
