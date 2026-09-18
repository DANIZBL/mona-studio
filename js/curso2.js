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
    src: "../src/img/auto_maq1.webp",
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
    src: "../src/img/auto_maq3.webp",
    alt: "Técnicas de auto-maquillaje",
  },
  {
    type: "video",
    src: "../src/vid/auto-maq4.mp4",
    alt: "Maquillaje",
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
