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
                GALERÍA MONA
==================================================*/

const galleryImages = document.querySelectorAll(".gallery-grid img");

const galleryModal = document.getElementById("galleryModal");

const galleryModalImage = document.getElementById("galleryModalImage");

const galleryClose = document.getElementById("galleryClose");

const galleryPrev = document.getElementById("galleryPrev");

const galleryNext = document.getElementById("galleryNext");

const galleryCounter = document.getElementById("galleryCounter");

let currentImage = 0;

let touchStartX = 0;

let touchEndX = 0;

/*==================================================
            ABRIR GALERÍA
==================================================*/

function openGallery(index) {
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
}

/*==================================================
            ACTUALIZAR IMAGEN
==================================================*/

function updateGallery() {
  galleryModalImage.src = galleryImages[currentImage].src;

  galleryModalImage.alt = galleryImages[currentImage].alt;

  galleryCounter.textContent = `${currentImage + 1} / ${galleryImages.length}`;
}

/*==================================================
            SIGUIENTE
==================================================*/

function nextImage() {
  currentImage++;

  if (currentImage >= galleryImages.length) {
    currentImage = 0;
  }

  updateGallery();
}

/*==================================================
            ANTERIOR
==================================================*/

function previousImage() {
  currentImage--;

  if (currentImage < 0) {
    currentImage = galleryImages.length - 1;
  }

  updateGallery();
}

/*==================================================
            CLICK EN LAS IMÁGENES
==================================================*/

galleryImages.forEach((image, index) => {
  image.addEventListener("click", () => {
    openGallery(index);
  });
});

/*==================================================
            BOTONES
==================================================*/

galleryClose.addEventListener("click", closeGallery);

galleryNext.addEventListener("click", nextImage);

galleryPrev.addEventListener("click", previousImage);

/*==================================================
        CERRAR HACIENDO CLICK AFUERA
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

  switch (e.key) {
    case "Escape":
      closeGallery();

      break;

    case "ArrowRight":
      nextImage();

      break;

    case "ArrowLeft":
      previousImage();

      break;
  }
});

/*==================================================
            SWIPE CELULAR
==================================================*/

galleryModal.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

galleryModal.addEventListener("touchend", (e) => {
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

galleryImages.forEach((image) => {
  image.setAttribute("draggable", "false");
});

galleryModalImage.setAttribute("draggable", "false");

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
    "No fue solamente maquillaje y peinado. Fue uno de los momentos más lindos de todo nuestro casamiento.",

    "Me sentí hermosa desde el primer momento. Todo salió exactamente como lo soñaba.",

    "La tranquilidad que me transmitieron hizo que disfrutara cada segundo de mi gran día.",

    "El maquillaje quedó impecable durante toda la fiesta. ¡Volvería a elegirlas mil veces!",

    "Más que un servicio, fue una experiencia hermosa. Gracias por hacerme sentir tan especial.",

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
