// =========================================================
// GALERÍA EGRESADAS
// =========================================================

const egresadasGalleryItems = [
  {
    type: "image",
    src: "../src/img/egre1.webp",
    alt: "Maquillaje para egresadas",
  },

  {
    type: "video",
    src: "../src/vid/egresadas3.mp4",
  },

  {
    type: "image",
    src: "../src/img/egre2.webp",
    alt: "Look de egresada",
  },

  {
    type: "video",
    src: "../src/vid/egresadas2.mp4",
  },

  {
    type: "image",
    src: "../src/img/egre3.webp",
    alt: "Maquillaje y peinado para egresadas",
  },

  {
    type: "image",
    src: "../src/img/egre4.webp",
    alt: "Look para egresada",
  },

  {
    type: "video",
    src: "../src/vid/egresadas1.mp4",
  },

  {
    type: "image",
    src: "../src/img/egre5.webp",
    alt: "Maquillaje de egresada",
  },
];

// =========================================================
// CONTENEDOR
// =========================================================

const egresadasGallery = document.getElementById("egresadasGallery");

// =========================================================
// CREAR GALERÍA
// =========================================================

egresadasGalleryItems.forEach((item) => {
  const egresadasGalleryItem = document.createElement("div");

  egresadasGalleryItem.classList.add("egresadas-gallery-item");

  // =======================================================
  // IMAGEN
  // =======================================================

  if (item.type === "image") {
    const img = document.createElement("img");

    img.src = item.src;

    img.alt = item.alt || "Galería de egresadas";

    img.loading = "lazy";

    egresadasGalleryItem.appendChild(img);
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

    egresadasGalleryItem.appendChild(video);
  }

  // =======================================================
  // AGREGAR A LA GALERÍA
  // =======================================================

  egresadasGallery.appendChild(egresadasGalleryItem);
});
