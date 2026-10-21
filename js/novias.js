/*==========================================
HERO

======================== */
const heroImages = document.querySelectorAll(".novias-hero-image");

let currentHeroImage = 0;

function changeHeroImage() {
  heroImages[currentHeroImage].classList.remove("active");

  currentHeroImage++;

  if (currentHeroImage >= heroImages.length) {
    currentHeroImage = 0;
  }

  heroImages[currentHeroImage].classList.add("active");
}

setInterval(changeHeroImage, 6000);

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.querySelector(".experience-image");

  if (!contenedor) return;

  const imagenes = contenedor.querySelectorAll(".experience-slide");

  if (imagenes.length <= 1) return;

  let indiceActual = 0;

  setInterval(() => {
    imagenes[indiceActual].classList.remove("active");

    indiceActual = (indiceActual + 1) % imagenes.length;

    imagenes[indiceActual].classList.add("active");
  }, 4000);
});

/*==================================================
          GALERÍAS MONA STUDIO: FOTOS Y VIDEOS
==================================================*/

const gallerySections = document.querySelectorAll(".novias-gallery");

const galleryModal = document.getElementById("galleryModal");
const galleryModalContent = document.getElementById("galleryModalContent");
const galleryModalImage = document.getElementById("galleryModalImage");
const galleryModalVideo = document.getElementById("galleryModalVideo");

const galleryClose = document.getElementById("galleryClose");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");
const galleryCounter = document.getElementById("galleryCounter");

let currentGalleryItems = [];
let currentImage = 0;

let touchStartX = 0;
let touchEndX = 0;

/*==================================================
                OBTENER ELEMENTOS
==================================================*/

function getGalleryItems(section) {
  return Array.from(
    section.querySelectorAll(".gallery-grid img, .gallery-grid video")
  );
}

/*==================================================
                  ABRIR GALERÍA
==================================================*/

function openGallery(items, index) {
  currentGalleryItems = items;
  currentImage = index;

  updateGallery();

  galleryModal.classList.add("active");
  document.body.classList.add("gallery-open");
}

/*==================================================
                  CERRAR GALERÍA
==================================================*/

function closeGallery() {
  galleryModal.classList.remove("active");
  document.body.classList.remove("gallery-open");

  galleryModalVideo.pause();
  galleryModalVideo.removeAttribute("src");
  galleryModalVideo.load();
}

/*==================================================
                ACTUALIZAR VISOR
==================================================*/

function updateGallery() {
  if (!currentGalleryItems.length) return;

  const item = currentGalleryItems[currentImage];

  // Detener y limpiar el video anterior
  galleryModalVideo.pause();
  galleryModalVideo.removeAttribute("src");
  galleryModalVideo.load();

  if (item.tagName === "VIDEO") {
    galleryModalImage.style.display = "none";
    galleryModalVideo.style.display = "block";

    galleryModalVideo.src = item.currentSrc || item.src;
    galleryModalVideo.poster = item.poster || "";
    galleryModalVideo.currentTime = 0;
  } else {
    galleryModalVideo.style.display = "none";
    galleryModalImage.style.display = "block";

    galleryModalImage.src = item.src;
    galleryModalImage.alt = item.alt || "";
  }

  galleryCounter.textContent = `${currentImage + 1} / ${
    currentGalleryItems.length
  }`;
}

/*==================================================
                    SIGUIENTE
==================================================*/

function nextImage() {
  if (!currentGalleryItems.length) return;

  currentImage = (currentImage + 1) % currentGalleryItems.length;
  updateGallery();
}

/*==================================================
                    ANTERIOR
==================================================*/

function previousImage() {
  if (!currentGalleryItems.length) return;

  currentImage =
    (currentImage - 1 + currentGalleryItems.length) %
    currentGalleryItems.length;

  updateGallery();
}

/*==================================================
          CONFIGURAR TODAS LAS GALERÍAS
==================================================*/

gallerySections.forEach((section) => {
  const items = getGalleryItems(section);

  items.forEach((item, index) => {
    item.setAttribute("draggable", "false");

    if (item.tagName === "VIDEO") {
      item.muted = true;
      item.playsInline = true;
      item.preload = "metadata";
    }

    item.addEventListener("click", () => {
      openGallery(items, index);
    });
  });
});

/*==================================================
                      BOTONES
==================================================*/

galleryClose.addEventListener("click", closeGallery);
galleryNext.addEventListener("click", nextImage);
galleryPrev.addEventListener("click", previousImage);

/*==================================================
                CERRAR AL HACER CLICK AFUERA
==================================================*/

galleryModal.addEventListener("click", (e) => {
  if (e.target === galleryModal) {
    closeGallery();
  }
});

/*==================================================
                      TECLADO
==================================================*/

document.addEventListener("keydown", (e) => {
  if (!galleryModal.classList.contains("active")) return;

  if (e.key === "Escape") closeGallery();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") previousImage();
});

/*==================================================
                  SWIPE CELULAR
==================================================*/

galleryModalContent.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

galleryModalContent.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;

  const distance = touchStartX - touchEndX;

  if (Math.abs(distance) < 60) return;

  if (distance > 0) {
    nextImage();
  } else {
    previousImage();
  }
});

/*==================================================
                  PREVENIR DRAG
==================================================*/

galleryModalImage.setAttribute("draggable", "false");
galleryModalVideo.setAttribute("draggable", "false");

/*================================================
  PRELOAD DE IMÁGENES DE EXPERIENCIA MONA
================================================*/

const galleryImages = document.querySelectorAll(
  ".experience-image .experience-slide"
);

galleryImages.forEach((image) => {
  const preload = new Image();
  preload.src = image.src;
});

document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(
    ".novias-testimonial blockquote, .novias-hero-testimonial blockquote"
  );

  const testimonios = [
    "El maquillaje quedó impecable durante toda la fiesta. ¡Volvería a elegirlas mil veces!",

    "Hola anto!!! No se me corrio el maquillaje en toda la noche, ni un retoque me hice! Estuvo todo increíble, te quería agradecer por tu trabajo y profesionalismo! La pasamos increíble ayer",

    "Más que un servicio, fue una experiencia hermosa. Gracias por hacerme sentir tan especial.",
    "Gracias chicas por todo. Salio todo muy hermoso y me duro mucho el maquillaje y peinado. A la gente le gusto mucho tambien",

    "Nunca imaginé sentirme tan cómoda frente a una cámara. El maquillaje quedó perfecto.",

    "Mi mamá, mis hermanas y yo disfrutamos muchísimo de la preparación. Fue un momento inolvidable.",

    "Lloré de emoción cuando me vi al espejo. Gracias por hacer realidad el look que siempre soñé.",

    "Recibí elogios toda la noche. El peinado y el maquillaje duraron impecables hasta el final.",

    "Fue una experiencia hermosa desde el primer contacto. Súper recomendable.",
  ];

  let indice = 0;

  testimonials.forEach((testimonial) => {
    testimonial.style.transition = "opacity .6s ease, transform .6s ease";
  });

  function cambiarTestimonio() {
    testimonials.forEach((testimonial) => {
      testimonial.style.opacity = "0";
      testimonial.style.transform = "translateY(-20px)";
    });

    setTimeout(() => {
      indice = (indice + 1) % testimonios.length;

      testimonials.forEach((testimonial) => {
        testimonial.textContent = `"${testimonios[indice]}"`;

        testimonial.style.transform = "translateY(20px)";
      });

      requestAnimationFrame(() => {
        testimonials.forEach((testimonial) => {
          testimonial.style.opacity = "1";
          testimonial.style.transform = "translateY(0)";
        });
      });
    }, 600);
  }

  setInterval(cambiarTestimonio, 5000);
});

/*================================================
WHATSAPP
======================================*/

const noviasBtn = document.querySelector(".novias-btn");

if (noviasBtn) {
  const whatsappNumber = "3434403870";
  const message = noviasBtn.dataset.message;

  noviasBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  });
}

/*===========================================*/

const videoNovias = document.querySelector(".novias-video");
const modalNovias = document.querySelector(".novias-video-modal");
const videoNoviasGrande = document.querySelector(".novias-video-grande");

const videoNoviasPlay = document.querySelector(".novias-video-play");
const videoNoviasSound = document.querySelector(".novias-video-sound");

// =====================================================
// ACTUALIZAR ICONO PLAY / PAUSA
// =====================================================

function actualizarIconoPlay() {
  if (!videoNoviasPlay) return;

  const pausado = videoNovias.paused;

  videoNoviasPlay.classList.toggle("is-paused", pausado);

  videoNoviasPlay.setAttribute(
    "aria-label",
    pausado ? "Reproducir video" : "Pausar video"
  );
}

// =====================================================
// ACTUALIZAR ICONO DE SONIDO
// =====================================================

function actualizarIconoSonido() {
  if (!videoNoviasSound) return;

  const sonidoActivado = !videoNovias.muted;

  videoNoviasSound.classList.toggle("is-unmuted", sonidoActivado);

  videoNoviasSound.setAttribute(
    "aria-label",
    sonidoActivado ? "Silenciar video" : "Activar sonido"
  );
}

// =====================================================
// PLAY / PAUSA EN LA VISTA PREVIA
// =====================================================

videoNoviasPlay?.addEventListener("click", async (event) => {
  event.stopPropagation();

  if (videoNovias.paused) {
    try {
      await videoNovias.play();
    } catch (error) {
      console.warn("No se pudo reproducir el video:", error);
    }
  } else {
    videoNovias.pause();
  }

  actualizarIconoPlay();
});

// =====================================================
// ACTIVAR / DESACTIVAR SONIDO EN LA VISTA PREVIA
// =====================================================

videoNoviasSound?.addEventListener("click", (event) => {
  event.stopPropagation();

  videoNovias.muted = !videoNovias.muted;

  // Si se activa el sonido, intentar iniciar la reproducción
  if (!videoNovias.muted && videoNovias.paused) {
    videoNovias.play().catch(() => {});
  }

  actualizarIconoSonido();
  actualizarIconoPlay();
});

// Mantener los iconos sincronizados con el video
videoNovias.addEventListener("play", actualizarIconoPlay);
videoNovias.addEventListener("pause", actualizarIconoPlay);
videoNovias.addEventListener("volumechange", actualizarIconoSonido);

// Estado inicial
actualizarIconoPlay();
actualizarIconoSonido();

// =====================================================
// ABRIR VIDEO AMPLIADO
// =====================================================

videoNovias.addEventListener("click", async () => {
  if (modalNovias.open) return;

  const tiempo = videoNovias.currentTime;
  const sonidoActivado = !videoNovias.muted;
  const estabaPausado = videoNovias.paused;

  // Evitar reproducir ambos videos al mismo tiempo
  videoNovias.pause();

  videoNoviasGrande.muted = !sonidoActivado;
  modalNovias.showModal();

  try {
    if (videoNoviasGrande.readyState < 1) {
      await new Promise((resolve) => {
        videoNoviasGrande.addEventListener("loadedmetadata", resolve, {
          once: true,
        });
      });
    }

    videoNoviasGrande.currentTime = tiempo;

    if (!estabaPausado) {
      await videoNoviasGrande.play();
    }
  } catch (error) {
    console.warn("No se pudo reproducir el video ampliado:", error);
  }
});

// =====================================================
// CERRAR AL HACER CLIC EN EL FONDO OSCURO
// =====================================================

modalNovias.addEventListener("click", (event) => {
  if (event.target === modalNovias) {
    modalNovias.close();
  }
});

// =====================================================
// SINCRONIZAR Y REANUDAR AL CERRAR
// =====================================================

modalNovias.addEventListener("close", () => {
  const tiempo = videoNoviasGrande.currentTime;
  const sonidoActivado = !videoNoviasGrande.muted;
  const estabaPausado = videoNoviasGrande.paused;

  videoNoviasGrande.pause();

  videoNovias.currentTime = tiempo;
  videoNovias.muted = !sonidoActivado;

  if (!estabaPausado) {
    videoNovias.play().catch(() => {});
  }

  actualizarIconoPlay();
  actualizarIconoSonido();
});

/* =====================================================
   GALERÍA DE VIDEOS 3
===================================================== */

/* =========================
   VIDEOS
========================= */

const galleria3VideosItems = [
  {
    type: "video",
    src: "../src/img_servicios/exp_mona6.mp4",
  },
  {
    type: "video",
    src: "../src/img_servicios/exp_mona7.mp4",
  },
  {
    type: "video",
    src: "../src/img_servicios/exp_mona8.mp4",
  },
];

/* =========================
   CONTENEDOR
========================= */

const galleria3VideosGallery = document.getElementById(
  "galleria3VideosGallery"
);

/* =========================
   VALIDAR CONTENEDOR
========================= */

if (galleria3VideosGallery) {
  /* =========================
     CREAR GALERÍA
  ========================= */

  galleria3VideosItems.forEach((item) => {
    const galleryItem = document.createElement("div");

    galleryItem.classList.add("galleria-3-item");

    /* =========================
       CREAR VIDEO
    ========================= */

    if (item.type === "video") {
      const video = document.createElement("video");

      video.src = item.src;

      /* AUTOPLAY + LOOP */

      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.playsInline = true;

      video.setAttribute("muted", "");
      video.setAttribute("autoplay", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");

      /* CONTROLES */

      video.controls = true;

      /* CARGA */

      video.preload = "auto";

      /* REPRODUCCIÓN */

      video.play().catch((error) => {
        console.log("Autoplay bloqueado:", error);
      });

      /* ERROR */

      video.addEventListener("error", () => {
        console.error("No se pudo cargar el video:", item.src);
      });

      /* AGREGAR VIDEO */

      galleryItem.appendChild(video);
    }

    /* =========================
       AGREGAR A LA GALERÍA
    ========================= */

    galleria3VideosGallery.appendChild(galleryItem);
  });
}

/* ============================================== */
