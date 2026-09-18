// ==================== CARRITO ====================

const cart = document.querySelector(".cart");

if (cart) {
  cart.addEventListener("click", () => {
    cart.classList.add("clicked");

    setTimeout(() => {
      cart.classList.remove("clicked");
    }, 200);
  });
}

// ==================== HEADER SCROLL ====================

const header = document.querySelector(".main-header");

if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// ==================== MENÚ MOBILE ====================

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
const overlay = document.querySelector(".overlay");

hamburger?.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav?.classList.toggle("active");
  overlay?.classList.toggle("active");
});

overlay?.addEventListener("click", () => {
  hamburger?.classList.remove("active");
  nav?.classList.remove("active");
  overlay?.classList.remove("active");
});

// ==================== BUSCADOR ====================

const searchToggle = document.querySelector(".search-toggle");
const mobileSearchToggle = document.querySelector(".mobile-search-toggle");

const searchBox = document.querySelector(".search-box");
const searchInput = document.getElementById("header-search");
const searchResults = document.getElementById("search-results");

const SEARCH_PRODUCTS_URL =
  "https://monastudiobackend-production.up.railway.app/api/v1/products?limit=500";

let headerProducts = [];

// ==================== CARGAR PRODUCTOS ====================

async function loadHeaderProducts() {
  try {
    const response = await fetch(SEARCH_PRODUCTS_URL);

    if (!response.ok) {
      throw new Error("Error al cargar productos");
    }

    const data = await response.json();

    headerProducts = data.filter((p) => p.active);
  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}

loadHeaderProducts();

// ==================== ABRIR BUSCADOR DESKTOP ====================

searchToggle?.addEventListener("click", () => {
  searchBox?.classList.toggle("active");

  if (searchBox?.classList.contains("active")) {
    searchInput?.focus();
  }
});

// ==================== ABRIR BUSCADOR MOBILE ====================

mobileSearchToggle?.addEventListener("click", () => {
  searchBox?.classList.toggle("active");

  if (searchBox?.classList.contains("active")) {
    searchInput?.focus();
  }
});

// ==================== BUSCAR MIENTRAS ESCRIBE ====================

searchInput?.addEventListener("input", () => {
  const value = searchInput.value.trim().toLowerCase();

  if (!value) {
    searchResults.innerHTML = "";
    return;
  }

  const results = headerProducts
    .filter((product) => product.nombre.toLowerCase().includes(value))
    .slice(0, 6);

  renderSearchResults(results);
});

// ==================== ENTER -> IR A PRODUCTOS ====================

searchInput?.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;

  const value = searchInput.value.trim();

  if (!value) return;

  window.location.href = `productos.html?search=${encodeURIComponent(value)}`;
});

// ==================== RENDER RESULTADOS ====================

function renderSearchResults(results) {
  if (!results.length) {
    searchResults.innerHTML = `
      <div class="search-item">
        No encontramos productos.
      </div>
    `;

    return;
  }

  searchResults.innerHTML = results
    .map((product) => {
      const image = product.images?.[0]?.url || "./assets/img/no-image.png";

      const price = Number(product.price).toLocaleString("es-AR");

      return `
        <div
          class="search-item"
          data-id="${product.id}"
        >
          <img
            src="${image}"
            alt="${product.nombre}"
          >

          <div class="search-info">
            <h4>${product.nombre}</h4>
            <p>$${price}</p>
          </div>
        </div>
      `;
    })
    .join("");

  document.querySelectorAll(".search-item").forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.dataset.id;

      goToProduct(id);
    });
  });
}

// ==================== IR AL PRODUCTO ====================

function goToProduct(id) {
  window.location.href = `producto-detalle.html?id=${id}`;
}

// ==================== CERRAR BUSCADOR AL HACER CLICK AFUERA ====================

document.addEventListener("click", (e) => {
  const insideSearch = e.target.closest(".search-container");

  const mobileButton = e.target.closest(".mobile-search-toggle");

  if (
    !insideSearch &&
    !mobileButton &&
    searchBox?.classList.contains("active")
  ) {
    searchBox.classList.remove("active");
  }
});
