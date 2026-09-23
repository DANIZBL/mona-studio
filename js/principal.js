/*============================================
HEADER
============================ */
document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".banner-video");
  const title = document.getElementById("bannerTitle");
  const description = document.getElementById("bannerDescription");

  const banners = [
    {
      video: "../src/vid/video_header2.mp4",
      title: "MONA",
      description:
        "Es un espacio pensado para que te sientas cómoda, cuidada y segura desde el primer momento.",
    },
    {
      video: "../src/vid/video_header5.mp4",
      title: "MONA",
      description:
        "Es un espacio pensado para que te sientas cómoda, cuidada y segura desde el primer momento.",
    },

    {
      video: "../src/vid/video_header3.mp4",
      title: "MAKE UP Y PEINADO",
      description:
        "Un día único merece un look que te haga sentir completamente vos.",
    },

    {
      video: "../src/vid/video_header1.mp4",
      title: "QUINCEAÑERAS",
      description:
        "Maquillaje y peinado pensados para que disfrutes y brilles en cada ocasión.",
    },
    {
      video: "../src/vid/video_header4.mp4",
      title: "MAKE UP Y PEINADO",
      description:
        "Un día único merece un look que te haga sentir completamente vos.",
    },
  ];

  let indice = 0;

  function mostrarBanner(index) {
    const banner = banners[index];

    title.style.opacity = "0";
    description.style.opacity = "0";

    video.style.opacity = "0";

    setTimeout(() => {
      video.src = banner.video;

      title.textContent = banner.title;
      description.textContent = banner.description;

      video.load();

      video.play().catch((error) => {
        console.log("El navegador bloqueó la reproducción:", error);
      });

      video.style.opacity = "1";
      title.style.opacity = "1";
      description.style.opacity = "1";
    }, 500);
  }

  function siguienteBanner() {
    indice++;

    if (indice >= banners.length) {
      indice = 0;
    }

    mostrarBanner(indice);
  }

  video.addEventListener("ended", siguienteBanner);

  mostrarBanner(indice);
});
/*===================== SLIDER ======================== */
const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function changeSlide() {
  slides[currentSlide].classList.remove("active");

  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  slides[currentSlide].classList.add("active");
}

setInterval(changeSlide, 4000);

/*==================SERVICIOS=========================== */

/*====================CURSOS======================= */

const container = document.querySelector(".cursos-section");
const dots = document.querySelectorAll(".dot");

container.addEventListener("scroll", () => {
  const scrollLeft = container.scrollLeft;
  const cardWidth = container.querySelector(".curso-card").offsetWidth + 10;

  const index = Math.round(scrollLeft / cardWidth);

  dots.forEach((dot) => dot.classList.remove("active"));

  if (dots[index]) {
    dots[index].classList.add("active");
  }
});

/*====================DESCUENTOS========================= */
const PRODUCTS_URL =
  "https://monastudiobackend-production.up.railway.app/api/v1/products?limit=500";

const discountGrid = document.getElementById("discount-products-grid");

let products = [];

initDiscounts();

async function initDiscounts() {
  // Si la sección no existe en la página, no hacemos nada
  if (!discountGrid) return;

  try {
    const response = await fetch(PRODUCTS_URL);

    if (!response.ok) {
      throw new Error("Error al obtener los productos");
    }

    products = await response.json();

    // Solo productos activos
    products = products.filter((product) => product.active);

    renderDiscountProducts();
  } catch (error) {
    console.error(error);

    discountGrid.innerHTML = `
      <p class="empty-discounts">
        No pudimos cargar las ofertas.
      </p>
    `;
  }
}

function renderDiscountProducts() {
  const discountedProducts = products
    .filter(
      (product) =>
        product.discountedPrice !== null && Number(product.discountedPrice) > 0
    )
    .slice(0, 4);

  if (!discountedProducts.length) {
    discountGrid.innerHTML = `
      <p class="empty-discounts">
        Próximamente tendremos nuevas ofertas.
      </p>
    `;
    return;
  }

  discountGrid.innerHTML = discountedProducts.map(createDiscountCard).join("");
}

function createDiscountCard(product) {
  const image = product.images?.[0]?.url || "./src/img/no-image.png";

  const price = Number(product.price).toLocaleString("es-AR");

  const discountedPrice = Number(product.discountedPrice).toLocaleString(
    "es-AR"
  );

  const discountPercentage = Math.round(
    ((Number(product.price) - Number(product.discountedPrice)) /
      Number(product.price)) *
      100
  );

  return `
    <article class="product-card">

      <div class="discount-image-wrapper">
        <span class="discount-badge">
          -${discountPercentage}%
        </span>

        <img
          src="${image}"
          alt="${product.nombre}"
        >
      </div>

      <h3>${product.nombre}</h3>

      <div class="discount-prices">
        <span class="old-price">
          $${price}
        </span>

        <span class="product-price">
          $${discountedPrice}
        </span>
      </div>

      <button
        class="product-btn"
        onclick="goToProduct('${product.id}')"
      >
        Ver producto
      </button>

    </article>
  `;
}

function goToProduct(id) {
  window.location.href = `producto-detalle.html?id=${id}`;
}

/*=============== NOVIAS==================== */

const slidesNovias = document.querySelectorAll(".slider-novias .slide-novias");

let actualNovias = 0;

function cambiarSlideNovias() {
  slidesNovias[actualNovias].classList.remove("active");

  actualNovias++;

  if (actualNovias >= slidesNovias.length) {
    actualNovias = 0;
  }

  slidesNovias[actualNovias].classList.add("active");
}

setInterval(cambiarSlideNovias, 4000);

// =========================================================
// SLIDER EGRESADAS
// =========================================================

const egresadasImages = [
  {
    src: "./src/img/egre5.webp",
    alt: "Maquillaje y peinado para egresadas",
  },

  {
    src: "./src/img/egre6.webp",
    alt: "Maquillaje para egresadas",
  },

  {
    src: "./src/img/egre4.webp",
    alt: "Look de egresada",
  },
];

// =========================================================
// ELEMENTO IMAGEN
// =========================================================

const egresadasImage = document.querySelector(".egresadas-image img");

// =========================================================
// CONTROL DEL SLIDER
// =========================================================

let egresadasCurrentIndex = 0;

// =========================================================
// CAMBIAR IMAGEN
// =========================================================

function cambiarEgresadasImage() {
  // Comenzar fade out
  egresadasImage.classList.add("fade-out");

  // Esperar a que termine el fade
  setTimeout(() => {
    egresadasCurrentIndex++;

    // Volver a la primera imagen
    if (egresadasCurrentIndex >= egresadasImages.length) {
      egresadasCurrentIndex = 0;
    }

    const image = egresadasImages[egresadasCurrentIndex];

    // Cambiar imagen
    egresadasImage.src = image.src;

    egresadasImage.alt = image.alt;

    // Volver a mostrar
    egresadasImage.classList.remove("fade-out");
  }, 700);
}

// =========================================================
// CAMBIO AUTOMÁTICO
// =========================================================

setInterval(cambiarEgresadasImage, 4000);

// =========================================================
// TESTIMONIOS
// =========================================================

const testimoniosItems = [
  {
    mensaje: "Me senti muy acompañada, un 10 los cursos!",
  },

  {
    mensaje:
      "La atención fue excelente. Me hicieron sentir súper cómoda desde el primer momento.",
  },

  {
    mensaje:
      "Aun no termine el curso y ya empece a tener mis primeras clientas",
  },

  {
    mensaje: "Hermoso todo, gracias!",
  },

  {
    mensaje: "Excelente modalidad, lo recomiendo",
  },
];

// =========================================================
// CONTENEDOR
// =========================================================

const testimoniosGallery = document.getElementById("testimoniosGallery");

// =========================================================
// CONTROL
// =========================================================

let testimoniosCurrentIndex = 0;

// =========================================================
// MOSTRAR TESTIMONIO
// =========================================================

function mostrarTestimonio() {
  const testimonio = testimoniosItems[testimoniosCurrentIndex];

  // Limpiar anterior
  testimoniosGallery.innerHTML = "";

  // Crear burbuja
  const burbuja = document.createElement("div");

  burbuja.classList.add("testimonio-burbuja");

  // Nombre
  const nombre = document.createElement("h3");

  nombre.textContent = testimonio.nombre;

  // Mensaje
  const mensaje = document.createElement("p");

  mensaje.textContent = testimonio.mensaje;

  // Hora
  const hora = document.createElement("span");

  hora.classList.add("testimonio-hora");

  hora.textContent = "20:45 ✓✓";

  // Agregar contenido
  burbuja.appendChild(nombre);

  burbuja.appendChild(mensaje);

  burbuja.appendChild(hora);

  // Agregar al contenedor
  testimoniosGallery.appendChild(burbuja);

  // Animación
  requestAnimationFrame(() => {
    burbuja.classList.add("mostrar");
  });
}

// =========================================================
// SIGUIENTE TESTIMONIO
// =========================================================

function siguienteTestimonio() {
  const burbujaActual = document.querySelector(".testimonio-burbuja");

  if (!burbujaActual) return;

  // Salida
  burbujaActual.classList.remove("mostrar");

  burbujaActual.classList.add("ocultar");

  // Esperar animación
  setTimeout(() => {
    testimoniosCurrentIndex++;

    // Volver al primero
    if (testimoniosCurrentIndex >= testimoniosItems.length) {
      testimoniosCurrentIndex = 0;
    }

    mostrarTestimonio();
  }, 600);
}

// =========================================================
// INICIAR
// =========================================================

if (testimoniosGallery && testimoniosItems.length > 0) {
  mostrarTestimonio();

  setInterval(siguienteTestimonio, 4500);
}
