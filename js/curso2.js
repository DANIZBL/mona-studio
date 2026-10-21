// =========================================================
// GALERÍA AUTO-MAQUILLAJE
// =========================================================

const automaquillajeGalleryItems = [
  {
    type: "video",
    src: "../src/vid/auto-maq1.mp4",
    alt: "Auto-maquillaje",
  },
  {
    type: "image",
    src: "../src/img/curso2_1.webp",
    alt: "Auto-maquillaje",
  },

  {
    type: "image",
    src: "../src/img/auto_maq2.webp",
  },
  {
    type: "image",
    src: "../src/img/img_curso2_1.png",
  },

  {
    type: "video",
    src: "../src/vid/auto-maq2.mp4",
    alt: "Curso de auto-maquillaje",
  },

  {
    type: "video",
    src: "../src/vid/auto-maq3.mp4",
  },

  {
    type: "image",
    src: "../src/img/curso2_2.webp",
    alt: "Técnicas de auto-maquillaje",
  },
  {
    type: "image",
    src: "../src/img/curso2_3.webp",
    alt: "Técnicas de auto-maquillaje",
  },
];

// =========================================================
// CONTENEDOR
// =========================================================

const automaquillajeGallery = document.getElementById("automaquillajeGallery");

// =========================================================
// CREAR GALERÍA
// =========================================================

automaquillajeGalleryItems.forEach((item) => {
  const automaquillajeGalleryItem = document.createElement("div");

  automaquillajeGalleryItem.classList.add("automaquillaje-gallery-item");

  // =======================================================
  // IMAGEN
  // =======================================================

  if (item.type === "image") {
    const img = document.createElement("img");

    img.src = item.src;

    img.alt = item.alt || "Galería de auto-maquillaje";

    img.loading = "lazy";

    automaquillajeGalleryItem.appendChild(img);
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

    // Compatibilidad con navegadores móviles

    video.setAttribute("muted", "");

    video.setAttribute("autoplay", "");

    video.setAttribute("playsinline", "");

    video.setAttribute("webkit-playsinline", "");

    // =====================================================
    // CONTROLES
    // =====================================================

    video.controls = true;

    // =====================================================
    // CARGA
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

    automaquillajeGalleryItem.appendChild(video);
  }

  // =======================================================
  // AGREGAR A LA GALERÍA
  // =======================================================

  automaquillajeGallery.appendChild(automaquillajeGalleryItem);
});

/* =========================
   RESEÑAS DE QUINCEAÑERAS
========================= */

const quinceReviews = [
  {
    text: "LO AME. Sos excelente explicando, había hecho uno antes donde no aprendi nadaPero de este me fui entendiendo todo. Super recomendado",
    time: "21:43",
  },
  {
    text: "No hice ninguno pero confirmo que sos la mas capa y talentosa. SI ESTAN LEYENDO ESTO HAGAN UN CUSO CON ANTO",
    time: "22:16",
  },
  {
    text: "Tremendo curso!!! Y vos la mas capa ❤️",
    time: "23:07",
  },
  {
    text: "Lo amé. me encata maquillarme ahora y lo súper recomiendo",
    time: "19:30",
  },
  {
    text: "Por primera vez entendi todo!! comendadisima 100% 🙌❤️👏",
    time: "15:22",
  },
  {
    text: "Hice el extendido y lo recomiendo 100porcientooo, lo mejor es que sean tan personalizado, aprendes de 0 todo y conociendo que queda bien en vos, comoaprovechar los productos... gracias por tanta paciencia jaja 🙌❤️",
    time: "18:15",
  },
  {
    text: "Hermosa tu paciencia y como explicas. 100% recomendado ❤.Amo el detalle de apunte",
    time: "12:07",
  },
  {
    text: "Aprendí muchísimo, me saque dudas y descubrí varios usos para productos queya tenía ❤️",
    time: "22:45",
  },
];

let quinceCurrentReview = 0;

const quinceReviewText = document.getElementById("quince-review-text");

const quinceReviewName = document.getElementById("quince-review-name");

const quinceReviewTime = document.getElementById("quince-review-time");

const quinceReviewDots = document.getElementById("quince-review-dots");

const quinceReviewMessage = document.querySelector(".quince-review-message");

function showQuinceReview(index) {
  const review = quinceReviews[index];

  quinceReviewText.textContent = review.text;
  quinceReviewName.textContent = review.name;
  quinceReviewTime.textContent = review.time;

  quinceReviewDots.innerHTML = "";

  quinceReviews.forEach((_, i) => {
    const dot = document.createElement("span");

    dot.classList.add("quince-review-dot");

    if (i === index) {
      dot.classList.add("active");
    }

    quinceReviewDots.appendChild(dot);
  });
}

/* Mostrar la primera reseña */

if (
  quinceReviewText &&
  quinceReviewName &&
  quinceReviewTime &&
  quinceReviewDots &&
  quinceReviewMessage
) {
  showQuinceReview(quinceCurrentReview);

  /* Cambiar la reseña cada 5 segundos */

  setInterval(() => {
    quinceReviewMessage.classList.add("quince-review-changing");

    setTimeout(() => {
      quinceCurrentReview++;

      if (quinceCurrentReview >= quinceReviews.length) {
        quinceCurrentReview = 0;
      }

      showQuinceReview(quinceCurrentReview);

      quinceReviewMessage.classList.remove("quince-review-changing");
    }, 350);
  }, 5000);
}

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
