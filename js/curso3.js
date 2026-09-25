// =========================================================
// GALERÍA PERFECCIONAMIENTO
// =========================================================

const perfeccionamientoGalleryItems = [
  {
    type: "image",
    src: "../src/img/pieles1.webp",
    alt: "Perfeccionamiento en maquillaje",
  },

  {
    type: "image",
    src: "../src/img/pieles2.webp",
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
    src: "../src/img/novias10.webp",
    alt: "Maquillaje para novia",
  },

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
