// =========================================================
// GALERÍA QUINCEAÑERAS
// =========================================================

const quinceanerasGalleryItems = [
  {
    type: "image",
    src: "../src/img/quince1.webp",
    alt: "Maquillaje para quinceañera",
  },

  {
    type: "video",
    src: "../src/vid/quince1.mp4",
  },

  {
    type: "image",
    src: "../src/img/quince2.webp",
    alt: "Look de quinceañera",
  },

  {
    type: "video",
    src: "../src/vid/quince2.mp4",
  },

  {
    type: "image",
    src: "../src/img/quince3.webp",
    alt: "Maquillaje y peinado de quinceañera",
  },

  {
    type: "image",
    src: "../src/img/quince4.webp",
    alt: "Look para quinceañera",
  },

  {
    type: "video",
    src: "../src/vid/quince3.mp4",
  },

  {
    type: "image",
    src: "../src/img/quince5.webp",
    alt: "Maquillaje de quinceañera",
  },
];

// =========================================================
// CONTENEDOR
// =========================================================

const quinceanerasGallery = document.getElementById("quinceanerasGallery");

// =========================================================
// CREAR GALERÍA
// =========================================================

quinceanerasGalleryItems.forEach((item) => {
  const quinceanerasGalleryItem = document.createElement("div");

  quinceanerasGalleryItem.classList.add("quinceaneras-gallery-item");

  // =======================================================
  // IMAGEN
  // =======================================================

  if (item.type === "image") {
    const img = document.createElement("img");

    img.src = item.src;

    img.alt = item.alt || "Galería de quinceañeras";

    img.loading = "lazy";

    quinceanerasGalleryItem.appendChild(img);
  }

  // =======================================================
  // VIDEO
  // =======================================================

  if (item.type === "video") {
    const video = document.createElement("video");

    video.src = item.src;

    // AUTOPLAY + LOOP

    video.muted = true;

    video.loop = true;

    video.autoplay = true;

    video.playsInline = true;

    // Compatibilidad móvil

    video.setAttribute("muted", "");

    video.setAttribute("autoplay", "");

    video.setAttribute("playsinline", "");

    video.setAttribute("webkit-playsinline", "");

    // Controles

    video.controls = true;

    // Carga

    video.preload = "auto";

    // Reproducir

    video.play().catch((error) => {
      console.log("Autoplay bloqueado:", error);
    });

    // Error

    video.addEventListener("error", () => {
      console.error("No se pudo cargar el video:", item.src);
    });

    quinceanerasGalleryItem.appendChild(video);
  }

  // =======================================================
  // AGREGAR ELEMENTO
  // =======================================================

  quinceanerasGallery.appendChild(quinceanerasGalleryItem);
});

const reviews = [
  {
    text: "Gracias por todo, me quedo intacto el peinado y el maquillaje a pesar de la calorrr ",
    time: "21:43",
  },
  {
    text: "Nuevamente paso por aca para agradecer por el servicio! Muy buena atención, muy amable y cálida la profesional ❤️ Me sentí muy conforme y cómoda!!❤️Gracias. que tengan linda semana!!.",
    time: "22:16",
  },

  {
    text: "Siii, súper bien!❤️ muchas gracias chicas!!! Son un amor,da gusto ir. Además un 1000 su trabajo. Buenas semana!!!😍",
    time: "23:07",
  },
  {
    text: "Gracias por dejarnos tan hermosas! Un trabajo impecable y la atención un 100❤️",
    time: "19:30",
  },
  {
    text: "El mejor lugar del mundo ❤️❤️❤️",
    time: "16:40",
  },
  {
    text: "Soy fan de la estética del lugar,la atención y los servicios 10/10",
    time: "18:25",
  },
  {
    text: "Ame!!! Excelente servicios, el mejor lugar para mimarse ❤️",
    time: "14:18",
  },
  {
    text: "Soy fan de ustedes",
    time: "13:20",
  },
  {
    text: "Hola! Gracias por atender tan bien a mi hija el sábado",
    time: "12:18",
  },
  {
    text: "Muchas gracias!!! Me encantó y me duró toda la noche tanto peinado como maquillaje 😍",
    time: "10:46",
  },
];

let currentReview = 0;

const reviewText = document.getElementById("review-text");
const reviewName = document.getElementById("review-name");
const reviewTime = document.getElementById("review-time");
const reviewDots = document.getElementById("review-dots");

function showReview(index) {
  const review = reviews[index];

  reviewText.textContent = review.text;
  reviewName.textContent = review.name;
  reviewTime.textContent = review.time;

  reviewDots.innerHTML = "";

  reviews.forEach((_, i) => {
    const dot = document.createElement("span");

    dot.classList.add("review-dot");

    if (i === index) {
      dot.classList.add("active");
    }

    reviewDots.appendChild(dot);
  });
}

showReview(currentReview);

setInterval(() => {
  const message = document.querySelector(".review-message");

  message.classList.add("review-changing");

  setTimeout(() => {
    currentReview++;

    if (currentReview >= reviews.length) {
      currentReview = 0;
    }

    showReview(currentReview);

    message.classList.remove("review-changing");
  }, 350);
}, 5000);
