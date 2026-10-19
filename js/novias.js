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

/*==================================================
            PRELOAD
==================================================*/

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
