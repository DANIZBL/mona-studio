// =========================================================
// GALERÍA EGRESADAS
// =========================================================

const egresadasGalleryItems = [
  {
    type: "image",
    src: "../src/img/egre7.webp",
    alt: "Maquillaje para egresadas",
  },

  {
    type: "video",
    src: "../src/vid/egresadas4.mp4",
  },

  {
    type: "image",
    src: "../src/img/egre4.webp",
    alt: "Look de egresada",
  },

  {
    type: "video",
    src: "../src/vid/egresadas2.mp4",
  },

  {
    type: "image",
    src: "../src/img/egre9.webp",
    alt: "Maquillaje y peinado para egresadas",
  },

  {
    type: "image",
    src: "../src/img/egre12.webp",
    alt: "Look para egresada",
  },

  {
    type: "image",
    src: "../src/img/egre8.webp",
    alt: "Look para egresada",
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

/* =========================
   VIDEOS
========================= */

const momentosEnFamiliaItems = [
  {
    type: "image",
    src: "../src/img/egre11.webp",
  },
  {
    type: "image",
    src: "../src/img/egre10.webp",
  },
];

/* =========================
   CONTENEDOR
========================= */

const momentosEnFamiliaGallery = document.getElementById(
  "momentosEnFamiliaGallery"
);

/* =========================
   VALIDAR CONTENEDOR
========================= */

if (momentosEnFamiliaGallery) {
  /* =========================
     CREAR GALERÍA
  ========================= */

  momentosEnFamiliaItems.forEach((item) => {
    const galleryItem = document.createElement("div");

    galleryItem.classList.add("momentos-en-familia-item");

    /* =========================
       CREAR VIDEO
    ========================= */

    if (item.type === "video") {
      const video = document.createElement("video");

      video.src = item.src;
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.playsInline = true;
      video.controls = true;
      video.preload = "auto";

      video.setAttribute("muted", "");
      video.setAttribute("autoplay", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");

      video.play().catch((error) => {
        console.log("Autoplay bloqueado:", error);
      });

      galleryItem.appendChild(video);
    } else if (item.type === "image") {
      /* =========================
   CREAR IMAGEN
========================= */
      const img = document.createElement("img");

      img.src = item.src;
      img.alt = "Momentos en familia";
      img.loading = "lazy";

      galleryItem.appendChild(img);
    }

    /* =========================
       AGREGAR A LA GALERÍA
    ========================= */

    momentosEnFamiliaGallery.appendChild(galleryItem);
  });
}

/* =========================================================
   GALERÍA EGRESADAS AYD
========================================================= */

// 1. VIDEOS DE LA GALERÍA
// Reemplazá estas rutas por las de tus videos reales.

const egresadasAydVideos = [
  "../src/vid/egresadas_ayd1.mp4",
  "../src/vid/egresadas_ayd2.mp4",
  "../src/vid/egresadas_ayd3.mp4",
  "../src/vid/egresadas_ayd4.mp4",
  "../src/vid/egresadas_ayd5.mp4",
  "../src/img_servicios/Egresada6.MP4",
];

// 2. ELEMENTOS DEL HTML

const egresadasAydGallery = document.getElementById("egresadasAydGallery");

const egresadasAydModal = document.getElementById("egresadasAydModal");

const egresadasAydVideoGrande = document.getElementById(
  "egresadasAydVideoGrande"
);

let egresadasAydVideoActivo = null;

// 3. CREAR LAS TARJETAS

egresadasAydVideos.forEach((ruta, index) => {
  const card = document.createElement("div");
  card.className = "egresadas-ayd-card";

  // Video de vista previa
  const video = document.createElement("video");

  video.src = ruta;
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.preload = "metadata";
  video.setAttribute("aria-label", `Video de egresadas ${index + 1}`);

  // Capa de controles
  const controls = document.createElement("div");
  controls.className = "egresadas-ayd-controls";

  // Botón play / pausa
  const playButton = document.createElement("button");

  playButton.type = "button";
  playButton.className = "egresadas-ayd-control";
  playButton.textContent = "Ⅱ";
  playButton.setAttribute("aria-label", "Pausar video");

  playButton.addEventListener("click", (event) => {
    event.stopPropagation();

    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });

  video.addEventListener("play", () => {
    playButton.textContent = "Ⅱ";
    playButton.setAttribute("aria-label", "Pausar video");
  });

  video.addEventListener("pause", () => {
    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", "Reproducir video");
  });

  // Botón de sonido
  const soundButton = document.createElement("button");

  soundButton.type = "button";
  soundButton.className = "egresadas-ayd-control";
  soundButton.textContent = "🔇";
  soundButton.setAttribute("aria-label", "Activar sonido");

  soundButton.addEventListener("click", (event) => {
    event.stopPropagation();

    video.muted = !video.muted;

    soundButton.textContent = video.muted ? "🔇" : "🔊";
    soundButton.setAttribute(
      "aria-label",
      video.muted ? "Activar sonido" : "Silenciar video"
    );
  });

  controls.append(playButton, soundButton);
  card.append(video, controls);

  // Abrir video en grande al hacer clic en la tarjeta
  card.addEventListener("click", () => {
    abrirVideoEgresadasAyd(video);
  });

  // Añadir tarjeta a la galería
  egresadasAydGallery.appendChild(card);

  // Intentar iniciar la reproducción automática
  video.play().catch(() => {
    // Algunos navegadores pueden bloquear el autoplay.
  });
});

// 4. ABRIR VIDEO EN GRANDE

function abrirVideoEgresadasAyd(videoOriginal) {
  egresadasAydVideoActivo = videoOriginal;

  egresadasAydVideoGrande.src = videoOriginal.currentSrc || videoOriginal.src;
  egresadasAydVideoGrande.muted = true;
  egresadasAydVideoGrande.currentTime = videoOriginal.currentTime || 0;

  egresadasAydModal.classList.add("is-open");
  egresadasAydModal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  egresadasAydVideoGrande.play().catch(() => {});
}

// 5. CERRAR AL HACER CLIC FUERA DEL VIDEO

egresadasAydModal.addEventListener("click", (event) => {
  if (event.target === egresadasAydModal) {
    cerrarVideoEgresadasAyd();
  }
});

// Evitar que el clic sobre el video cierre el modal
egresadasAydVideoGrande.addEventListener("click", (event) => {
  event.stopPropagation();
});

// 6. CERRAR CON ESCAPE

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    egresadasAydModal.classList.contains("is-open")
  ) {
    cerrarVideoEgresadasAyd();
  }
});

// 7. RESTAURAR LA VISTA PREVIA AL CERRAR

function cerrarVideoEgresadasAyd() {
  egresadasAydVideoGrande.pause();
  egresadasAydVideoGrande.removeAttribute("src");
  egresadasAydVideoGrande.load();

  egresadasAydModal.classList.remove("is-open");
  egresadasAydModal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  if (egresadasAydVideoActivo) {
    egresadasAydVideoActivo.play().catch(() => {});
  }

  egresadasAydVideoActivo = null;
}

/* =====================================================
   WHATSAPP
===================================================== */

const whatsappNumber = "3434403870";

document.querySelectorAll(".whatsapp-btn").forEach((button) => {
  const message = button.dataset.message;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  button.href = whatsappUrl;
  button.target = "_blank";
  button.rel = "noopener noreferrer";
});
