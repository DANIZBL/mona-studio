document.querySelectorAll(".module").forEach((module) => {
  const header = module.querySelector(".module-header");

  header.addEventListener("click", () => {
    module.classList.toggle("open");
  });
});

const galleryItems = [
  {
    type: "image",
    src: "../src/img/maquillaje_p1.webp",
    alt: "Maquillaje social",
  },

  {
    type: "video",
    src: "../src/vid/maquillaje_p2.mp4",
  },

  {
    type: "image",
    src: "../src/img/maquillaje_p3.webp",
    alt: "Makeup",
  },

  {
    type: "video",
    src: "../src/vid/maquillaje_p5.mp4",
  },

  {
    type: "image",
    src: "../src/img/maquillaje_p4.webp",
    alt: "Peinado",
  },

  {
    type: "image",
    src: "../src/img/maquillaje_p5.webp",
    alt: "Novias",
  },

  {
    type: "video",
    src: "../src/vid/maquillaje_p6.mp4",
    alt: "Egresadas",
  },
  {
    type: "image",
    src: "../src/img/maquillaje_p2.webp",
    alt: "Egresadas",
  },
];

const gallery = document.getElementById("mediaGallery");

galleryItems.forEach((item) => {
  const galleryItem = document.createElement("div");
  galleryItem.classList.add("media-gallery-item");

  // =========================
  // IMAGEN
  // =========================

  if (item.type === "image") {
    const img = document.createElement("img");

    img.src = item.src;
    img.alt = item.alt || "Galería";
    img.loading = "lazy";

    galleryItem.appendChild(img);
  }

  // =========================
  // VIDEO
  // =========================

  if (item.type === "video") {
    const video = document.createElement("video");

    video.src = item.src;

    // =========================
    // AUTOPLAY + LOOP
    // =========================

    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;

    // Compatibilidad con navegadores móviles
    video.setAttribute("muted", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    // Controles del video
    video.controls = true;

    // Cargar video
    video.preload = "auto";

    // =========================
    // REPRODUCIR
    // =========================

    video.play().catch((error) => {
      console.log("Autoplay bloqueado:", error);
    });

    // =========================
    // ERROR
    // =========================

    video.addEventListener("error", () => {
      console.error("No se pudo cargar el video:", item.src);
    });

    galleryItem.appendChild(video);
  }

  gallery.appendChild(galleryItem);
});

// =========================================================
// GALERÍA MAQUILLAJE PROFESIONAL
// =========================================================

const perfeccionamientoVideosGalleryItems = [
  {
    type: "video",
    src: "../src/vid/galeria_perfeccionamiento2.mp4",
  },

  {
    type: "video",
    src: "../src/vid/galeria_perfeccionamiento1.mp4",
  },

  {
    type: "video",
    src: "../src/vid/galeria_perfeccionamiento3.mp4",
  },
];

// =========================================================
// CONTENEDOR
// =========================================================

const perfeccionamientoVideosGallery = document.getElementById(
  "perfeccionamientoVideosGallery"
);

// =========================================================
// CREAR GALERÍA
// =========================================================

perfeccionamientoVideosGalleryItems.forEach((item) => {
  const perfeccionamientoVideosGalleryItem = document.createElement("div");

  perfeccionamientoVideosGalleryItem.classList.add(
    "perfeccionamiento-videos-gallery-item"
  );

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

    perfeccionamientoVideosGalleryItem.appendChild(video);
  }

  // =======================================================
  // AGREGAR ELEMENTO
  // =======================================================

  perfeccionamientoVideosGallery.appendChild(
    perfeccionamientoVideosGalleryItem
  );
});
