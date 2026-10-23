// =====================================================
// HEADER - MONA STUDIO (HTML CENTRALIZADO)
// Este archivo se carga en cada página y genera el header
// antes de inicializar sus menús, buscador y carrito.
// =====================================================

(function renderSharedHeader() {
  const headerContainer = document.getElementById("header-container");

  // Si la página no incluye el contenedor, no insertamos el header.
  if (!headerContainer || headerContainer.dataset.rendered === "true") return;

  headerContainer.innerHTML = `<!-- ============================HEDER========================== -->
    <header class="main-header">
      <div class="mobile-header">
        <div class="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <a href="/index.html">
          <img src="/src/img/logomona.webp" alt="Logo" class="mobile-logo" />
        </a>

        <div class="mobile-actions">
          <button class="mobile-search-toggle">
            <img src="/src/img/lupa.svg" alt="Buscar" />
          </button>

          <div class="cart">
            <button class="cart-icon">
              <img src="/src/img/carrito.svg" alt="" />
            </button>

            <span class="cart-count">0</span>
          </div>
        </div>
      </div>

      <nav class="nav">
        <a class="boton" href="/index.html">INICIO</a>

        <!-- ---- MENU SERVICIOS ---- -->
        <div class="servicios-dropdown">
          <button
            type="button"
            class="boton servicios-toggle"
            aria-expanded="false"
            aria-controls="servicios-menu"
          >
            SERVICIOS
            <span class="servicios-flecha" aria-hidden="true">⌄</span>
          </button>

          <div class="servicios-menu" id="servicios-menu" hidden>
            <a href="/lifting.html" class="servicios-menu-link">
              Lifting
            </a>

            <a href="/perfilado.html" class="servicios-menu-link">
              Perfilado de cejas
            </a>

            <a
              href="/laminado_cejas.html"
              class="servicios-menu-link"
            >
              Laminado de cejas
            </a>

            <a
              href="/limpieza_facil.html"
              class="servicios-menu-link"
            >
              Limpiezas faciales
            </a>

            <a href="/peelings.html" class="servicios-menu-link">
              Tratamientos faciales
            </a>

            <a
              href="/masajes_corporales.html"
              class="servicios-menu-link"
            >
              Masajes corporales
            </a>

            <a href="/spa_facial.html" class="servicios-menu-link">
              Spa facial
            </a>

            <a href="/manicura.html" class="servicios-menu-link">
              Manicura - Pedicura
            </a>

            <a href="/novias.html" class="servicios-menu-link"> Novias </a>

            <a href="/egresadas.html" class="servicios-menu-link"> Egresadas </a>

            <a href="/quinceañeras.html" class="servicios-menu-link">
              Quinceañeras
            </a>

            <a href="/servicios/social.html" class="servicios-menu-link">
              MUNDO MONA
            </a>
          </div>
        </div>
        <!-- ---- FIN MENU SERVICIOS ---- -->

        <!-- ----MENU CURSOS---- -->
        <div class="cursos-dropdown">
          <button
            type="button"
            class="boton cursos-toggle"
            aria-expanded="false"
            aria-controls="cursos-menu"
          >
            CURSOS
            <span class="cursos-flecha" aria-hidden="true">⌄</span>
          </button>

          <div class="cursos-menu" id="cursos-menu" hidden>
            <a href="/curso1.html" class="cursos-menu-link"
              >MAQUILLAJE PROFESIONAL INICIAL</a
            >
            <a href="/curso2.html" class="cursos-menu-link"
              >CURSO DE AUTO MAQUILLAJE</a
            >
            <a href="/curso3.html" class="cursos-menu-link"
              >PERFECCIONAMIENTOS DE MAQUILLAJE</a
            >
          </div>
        </div>
        <!------------------------------->
        <a href="/index.html">
          <img src="./src/img/logomona.webp" alt="Logo" class="logo" />
        </a>

        <a class="boton" href="/productos.html">TIENDA</a>

        <a class="boton" href="/info.html">INFO Y CONTACTO</a>

        <div class="search-container">
          <button class="search-toggle">
            <img src="./src/img/lupa.svg" alt="Buscar" />
          </button>

          <div class="search-box">
            <input
              type="text"
              id="header-search"
              placeholder="Buscar productos..."
              autocomplete="off"
            />

            <div id="search-results"></div>
          </div>
        </div>

        <div class="cart">
          <button class="cart-icon">
            <img src="./src/img/carrito.svg" alt="" />
          </button>
          <span class="cart-count">0</span>
        </div>
      </nav>
    </header>
    <div class="overlay"></div>
    <!-- ====================================================== -->`;
  headerContainer.dataset.rendered = "true";
})();

// =====================================================
// HEADER - MONA STUDIO
// =====================================================

/* ==========================================
   DESPLEGABLE DE CURSOS
========================================== */

function initCursosDropdown() {
  const dropdowns = document.querySelectorAll(".cursos-dropdown");

  dropdowns.forEach((dropdown) => {
    // Evitar inicializar dos veces el mismo menú
    if (dropdown.dataset.initialized === "true") return;
    dropdown.dataset.initialized = "true";

    const toggle = dropdown.querySelector(".cursos-toggle");
    const menu = dropdown.querySelector(".cursos-menu");

    if (!toggle || !menu) return;

    function abrirMenu() {
      dropdown.classList.add("is-open");
      menu.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
    }

    function cerrarMenu() {
      dropdown.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");

      menu.hidden = true;
    }

    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const estaAbierto = dropdown.classList.contains("is-open");

      // Cerrar otros desplegables de cursos
      dropdowns.forEach((otroDropdown) => {
        if (otroDropdown !== dropdown) {
          otroDropdown.classList.remove("is-open");

          const otroToggle = otroDropdown.querySelector(".cursos-toggle");
          const otroMenu = otroDropdown.querySelector(".cursos-menu");

          otroToggle?.setAttribute("aria-expanded", "false");

          if (otroMenu) otroMenu.hidden = true;
        }
      });

      if (estaAbierto) {
        cerrarMenu();
      } else {
        abrirMenu();
      }
    });

    // Cerrar al seleccionar una opción
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", cerrarMenu);
    });

    // Cerrar al hacer clic fuera
    document.addEventListener("click", (event) => {
      if (!dropdown.contains(event.target)) {
        cerrarMenu();
      }
    });

    // Cerrar con Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        cerrarMenu();
      }
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCursosDropdown);
} else {
  initCursosDropdown();
}

// =====================================================
// DESPLEGABLE DE SERVICIOS - MONA STUDIO
// =====================================================

function initServiciosDropdown() {
  const dropdowns = document.querySelectorAll(".servicios-dropdown");

  dropdowns.forEach((dropdown) => {
    // Evitar inicializar dos veces el mismo menú
    if (dropdown.dataset.initialized === "true") return;
    dropdown.dataset.initialized = "true";

    const toggle = dropdown.querySelector(".servicios-toggle");
    const menu = dropdown.querySelector(".servicios-menu");

    if (!toggle || !menu) return;

    function abrirMenuServicios() {
      dropdown.classList.add("is-open");
      menu.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
    }

    function cerrarMenuServicios() {
      dropdown.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    }

    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const estaAbierto = dropdown.classList.contains("is-open");

      // Cerrar los otros menús desplegables del header
      document
        .querySelectorAll(".cursos-dropdown, .servicios-dropdown")
        .forEach((otroDropdown) => {
          if (otroDropdown === dropdown) return;

          otroDropdown.classList.remove("is-open");

          const otroToggle = otroDropdown.querySelector(
            ".cursos-toggle, .servicios-toggle"
          );

          const otroMenu = otroDropdown.querySelector(
            ".cursos-menu, .servicios-menu"
          );

          otroToggle?.setAttribute("aria-expanded", "false");

          if (otroMenu) otroMenu.hidden = true;
        });

      if (estaAbierto) {
        cerrarMenuServicios();
      } else {
        abrirMenuServicios();
      }
    });

    // Cerrar al seleccionar una opción
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", cerrarMenuServicios);
    });

    // Cerrar al hacer clic fuera del menú
    document.addEventListener("click", (event) => {
      if (!dropdown.contains(event.target)) {
        cerrarMenuServicios();
      }
    });

    // Cerrar con Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        cerrarMenuServicios();
      }
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initServiciosDropdown);
} else {
  initServiciosDropdown();
}

// =====================================================
// CARRITO
// =====================================================

const CART_STORAGE_KEY = "mona-cart";

// -----------------------------------------------------
// OBTENER CARRITO
// -----------------------------------------------------

function getHeaderCart() {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));

    return Array.isArray(cart) ? cart : [];
  } catch (error) {
    console.error("Error leyendo carrito:", error);
    return [];
  }
}

// -----------------------------------------------------
// CONTADOR DEL HEADER
// -----------------------------------------------------

function updateHeaderCartCount() {
  const cart = getHeaderCart();

  const totalQuantity = cart.reduce(
    (total, product) => total + Number(product.quantity || 0),
    0
  );

  document.querySelectorAll(".cart-count").forEach((counter) => {
    counter.textContent = totalQuantity;
  });
}

// =====================================================
// CREAR CARRITO LATERAL
// =====================================================

function createCartDrawer() {
  if (document.getElementById("cart-drawer")) return;

  const cartHTML = `
    <div id="cart-overlay" class="cart-overlay"></div>

    <aside
      id="cart-drawer"
      class="cart-drawer"
      aria-hidden="true"
      aria-label="Carrito de compras"
    >
      <div class="cart-drawer-header">
        <div>
          <p class="cart-drawer-eyebrow">MONA STUDIO</p>
          <h2>Tu carrito</h2>
        </div>

        <button
          type="button"
          id="cart-close"
          class="cart-close"
          aria-label="Cerrar carrito"
        >
          ×
        </button>
      </div>

      <div
        id="cart-drawer-items"
        class="cart-drawer-items"
      ></div>

      <div
        id="cart-drawer-empty"
        class="cart-drawer-empty"
        hidden
      >
        <div class="cart-drawer-empty-icon">♡</div>
        <h3>Tu carrito está vacío</h3>
        <p>Todavía no agregaste productos.</p>
      </div>

      <div class="cart-drawer-footer">
        <div class="cart-drawer-total">
          <span>Total</span>
          <strong id="cart-drawer-total">$0</strong>
        </div>

        <a
          href="/carrito.html"
          class="cart-drawer-button cart-drawer-checkout"
        >
          Ver carrito
        </a>

        <a
          href="/carrito.html"
          class="cart-drawer-continue"
        >
          Finalizar compra
        </a>
      </div>
    </aside>
  `;

  document.body.insertAdjacentHTML("beforeend", cartHTML);
}

// =====================================================
// ABRIR CARRITO
// =====================================================

function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");

  if (!drawer || !overlay) return;

  renderHeaderCart();

  drawer.classList.add("is-open");
  overlay.classList.add("is-open");

  drawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

// =====================================================
// CERRAR CARRITO
// =====================================================

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");

  if (!drawer || !overlay) return;

  drawer.classList.remove("is-open");
  overlay.classList.remove("is-open");

  drawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// =====================================================
// RENDERIZAR CARRITO LATERAL
// =====================================================

function renderHeaderCart() {
  const itemsContainer = document.getElementById("cart-drawer-items");
  const emptyContainer = document.getElementById("cart-drawer-empty");
  const totalElement = document.getElementById("cart-drawer-total");

  if (!itemsContainer) return;

  const cart = getHeaderCart();

  // CARRITO VACÍO
  if (!cart.length) {
    itemsContainer.innerHTML = "";
    itemsContainer.hidden = true;

    if (emptyContainer) emptyContainer.hidden = false;
    if (totalElement) totalElement.textContent = "$0";

    return;
  }

  // CARRITO CON PRODUCTOS
  itemsContainer.hidden = false;

  if (emptyContainer) emptyContainer.hidden = true;

  itemsContainer.innerHTML = cart
    .map((product) => {
      const quantity = Number(product.quantity) || 1;
      const price = Number(product.price) || 0;
      const subtotal = price * quantity;

      return `
        <article
          class="cart-drawer-item"
          data-id="${product.id}"
        >
          <div class="cart-drawer-item-image">
            ${
              product.image
                ? `
                  <img
                    src="${product.image}"
                    alt="${product.nombre || "Producto"}"
                  >
                `
                : `
                  <div class="cart-no-image">
                    Sin imagen
                  </div>
                `
            }
          </div>

          <div class="cart-drawer-item-info">
            <h3>${product.nombre || "Producto"}</h3>

            <p class="cart-drawer-item-price">
              $${price.toLocaleString("es-AR")}
            </p>

            <div class="cart-drawer-item-actions">
              <div class="cart-drawer-quantity">
                <button
                  type="button"
                  class="drawer-minus"
                  data-id="${product.id}"
                  aria-label="Disminuir cantidad"
                >
                  −
                </button>

                <span>${quantity}</span>

                <button
                  type="button"
                  class="drawer-plus"
                  data-id="${product.id}"
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                class="cart-drawer-remove"
                data-id="${product.id}"
              >
                Eliminar
              </button>
            </div>
          </div>

          <div class="cart-drawer-item-total">
            $${subtotal.toLocaleString("es-AR")}
          </div>
        </article>
      `;
    })
    .join("");

  // TOTAL
  const total = cart.reduce(
    (sum, product) =>
      sum + Number(product.price || 0) * Number(product.quantity || 0),
    0
  );

  if (totalElement) {
    totalElement.textContent = `$${total.toLocaleString("es-AR")}`;
  }

  // DISMINUIR CANTIDAD
  itemsContainer.querySelectorAll(".drawer-minus").forEach((button) => {
    button.addEventListener("click", () => {
      changeHeaderCartQuantity(button.dataset.id, -1);
    });
  });

  // AUMENTAR CANTIDAD
  itemsContainer.querySelectorAll(".drawer-plus").forEach((button) => {
    button.addEventListener("click", () => {
      changeHeaderCartQuantity(button.dataset.id, 1);
    });
  });

  // ELIMINAR PRODUCTO
  itemsContainer.querySelectorAll(".cart-drawer-remove").forEach((button) => {
    button.addEventListener("click", () => {
      removeHeaderCartProduct(button.dataset.id);
    });
  });
}

// =====================================================
// CAMBIAR CANTIDAD
// =====================================================

function changeHeaderCartQuantity(productId, amount) {
  const cart = getHeaderCart();

  const product = cart.find((item) => String(item.id) === String(productId));

  if (!product) return;

  product.quantity = Number(product.quantity || 0) + amount;

  // Si llega a cero, eliminar el producto
  if (product.quantity <= 0) {
    removeHeaderCartProduct(productId);
    return;
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));

  updateHeaderCartCount();
  renderHeaderCart();

  window.dispatchEvent(new CustomEvent("cartUpdated"));
}

// =====================================================
// ELIMINAR PRODUCTO
// =====================================================

function removeHeaderCartProduct(productId) {
  const cart = getHeaderCart();

  const newCart = cart.filter(
    (product) => String(product.id) !== String(productId)
  );

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));

  updateHeaderCartCount();
  renderHeaderCart();

  window.dispatchEvent(new CustomEvent("cartUpdated"));
}

// =====================================================
// INICIALIZAR CARRITO
// =====================================================

function initHeaderCart() {
  createCartDrawer();
  updateHeaderCartCount();

  // BOTONES DEL HEADER
  document.querySelectorAll(".cart").forEach((cart) => {
    cart.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      cart.classList.add("clicked");

      setTimeout(() => {
        cart.classList.remove("clicked");
      }, 200);

      openCartDrawer();
    });

    cart.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCartDrawer();
      }
    });
  });

  // CERRAR CARRITO
  document
    .getElementById("cart-close")
    ?.addEventListener("click", closeCartDrawer);

  // CERRAR CON OVERLAY
  document
    .getElementById("cart-overlay")
    ?.addEventListener("click", closeCartDrawer);

  // CERRAR CON ESCAPE
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCartDrawer();
    }
  });

  // ACTUALIZAR SI CAMBIA EL CARRITO
  window.addEventListener("cartUpdated", () => {
    updateHeaderCartCount();

    if (document.getElementById("cart-drawer")?.classList.contains("is-open")) {
      renderHeaderCart();
    }
  });

  // CAMBIOS DESDE OTRA PESTAÑA
  window.addEventListener("storage", (event) => {
    if (event.key === CART_STORAGE_KEY) {
      updateHeaderCartCount();

      if (
        document.getElementById("cart-drawer")?.classList.contains("is-open")
      ) {
        renderHeaderCart();
      }
    }
  });
}

// =====================================================
// INICIAR CARRITO CUANDO EL DOM ESTÁ LISTO
// =====================================================

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHeaderCart);
} else {
  initHeaderCart();
}

// =====================================================
// HEADER SCROLL
// =====================================================

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

// =====================================================
// MENÚ MOBILE
// =====================================================

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

// =====================================================
// BUSCADOR
// =====================================================

const searchToggle = document.querySelector(".search-toggle");
const mobileSearchToggle = document.querySelector(".mobile-search-toggle");
const searchBox = document.querySelector(".search-box");
const searchInput = document.getElementById("header-search");
const searchResults = document.getElementById("search-results");

const SEARCH_PRODUCTS_URL =
  "https://monastudiobackend-production.up.railway.app/api/v1/products?limit=500";

let headerProducts = [];

// =====================================================
// SERVICIOS DISPONIBLES EN EL BUSCADOR
// =====================================================

const headerServices = [
  {
    nombre: "Lifting",
    url: "/servicios/lifting.html",
  },
  {
    nombre: "Perfilado de cejas",
    url: "/servicios/perfilado.html",
  },
  {
    nombre: "Laminado de cejas",
    url: "/servicios/laminado_cejas.html",
  },
  {
    nombre: "Spa facial",
    url: "/servicios/spa_facial.html",
  },
  {
    nombre: "Limpiezas faciales",
    url: "/servicios/limpieza_facil.html",
  },
  {
    nombre: "Peelings - Microneedling - Hidralips",
    url: "/servicios/peelings.html",
  },
  {
    nombre: "Manicura y pedicura",
    url: "/servicios/manicura.html",
  },
  {
    nombre: "Masajes corporales",
    url: "/servicios/masajes_corporales.html",
  },
  {
    nombre: "Novias",
    url: "/novias.html",
  },
  {
    nombre: "Egresadas",
    url: "/egresadas.html",
  },
  {
    nombre: "Quinceañeras",
    url: "/quinceañeras.html",
  },
];

// =====================================================
// NORMALIZAR TEXTO PARA BUSCAR
// Permite buscar sin importar mayúsculas ni tildes
// =====================================================

function normalizeText(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// =====================================================
// CARGAR PRODUCTOS
// =====================================================

async function loadHeaderProducts() {
  try {
    const response = await fetch(SEARCH_PRODUCTS_URL);

    if (!response.ok) {
      throw new Error("Error al cargar productos");
    }

    const data = await response.json();

    headerProducts = data.filter((product) => product.active);
  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}

loadHeaderProducts();

// =====================================================
// ABRIR BUSCADOR DESKTOP
// =====================================================

searchToggle?.addEventListener("click", (event) => {
  event.stopPropagation();

  searchBox?.classList.toggle("active");

  if (searchBox?.classList.contains("active")) {
    searchInput?.focus();
  }
});

// =====================================================
// ABRIR BUSCADOR MOBILE
// =====================================================

mobileSearchToggle?.addEventListener("click", (event) => {
  event.stopPropagation();

  searchBox?.classList.toggle("active");

  if (searchBox?.classList.contains("active")) {
    searchInput?.focus();
  }
});

// =====================================================
// BUSCAR PRODUCTOS Y SERVICIOS MIENTRAS ESCRIBE
// =====================================================

searchInput?.addEventListener("input", () => {
  const value = normalizeText(searchInput.value);

  if (!value) {
    if (searchResults) {
      searchResults.innerHTML = "";
    }

    return;
  }

  const matchingServices = headerServices
    .filter((service) => normalizeText(service.nombre).includes(value))
    .slice(0, 6);

  const matchingProducts = headerProducts
    .filter((product) => normalizeText(product.nombre).includes(value))
    .slice(0, 6);

  renderSearchResults(matchingServices, matchingProducts);
});

// =====================================================
// ENTER → SERVICIO O PRODUCTOS
// =====================================================

searchInput?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") {
    return;
  }

  event.preventDefault();

  const value = normalizeText(searchInput.value);

  if (!value) {
    return;
  }

  // Priorizar coincidencia exacta de un servicio
  const exactService = headerServices.find(
    (service) => normalizeText(service.nombre) === value
  );

  if (exactService) {
    window.location.href = exactService.url;
    return;
  }

  // Buscar un servicio cuyo nombre comience con el texto ingresado
  const matchingService = headerServices.find((service) =>
    normalizeText(service.nombre).startsWith(value)
  );

  if (matchingService) {
    window.location.href = matchingService.url;
    return;
  }

  // Si no coincide con un servicio, buscar productos
  window.location.href = `/productos.html?search=${encodeURIComponent(
    searchInput.value.trim()
  )}`;
});

// =====================================================
// RENDERIZAR RESULTADOS
// =====================================================

function renderSearchResults(services, products) {
  if (!searchResults) {
    return;
  }

  if (!services.length && !products.length) {
    searchResults.innerHTML = `
      <div class="search-item">
        No encontramos resultados.
      </div>
    `;

    return;
  }

  // RESULTADOS DE SERVICIOS
  const servicesHTML = services
    .map(
      (service) => `
        <div
          class="search-item search-service"
          data-type="service"
          data-url="${service.url}"
        >
          ${service.nombre}
        </div>
      `
    )
    .join("");

  // RESULTADOS DE PRODUCTOS
  const productsHTML = products
    .map((product) => {
      const image =
        product.images?.[0]?.url ||
        product.image?.[0] ||
        "./assets/img/no-image.png";

      const price = Number(
        product.discountedPrice || product.price
      ).toLocaleString("es-AR");

      return `
        <div
          class="search-item search-product"
          data-type="product"
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

  searchResults.innerHTML = servicesHTML + productsHTML;

  // ASIGNAR NAVEGACIÓN A CADA RESULTADO
  searchResults.querySelectorAll(".search-item").forEach((item) => {
    item.addEventListener("click", () => {
      if (item.dataset.type === "service") {
        window.location.href = item.dataset.url;
        return;
      }

      if (item.dataset.type === "product") {
        goToProduct(item.dataset.id);
      }
    });
  });
}

// =====================================================
// IR AL PRODUCTO
// =====================================================

function goToProduct(id) {
  window.location.href = `/producto-detalle.html?id=${id}`;
}

// =====================================================
// CERRAR BUSCADOR AL HACER CLICK AFUERA
// =====================================================

document.addEventListener("click", (event) => {
  const insideSearch = event.target.closest(".search-container");
  const mobileButton = event.target.closest(".mobile-search-toggle");

  if (
    !insideSearch &&
    !mobileButton &&
    searchBox?.classList.contains("active")
  ) {
    searchBox.classList.remove("active");
  }
});

// =====================================================
// CUENTA REGRESIVA
// =====================================================

const CUENTA_REGRESIVA_FECHA = "2027-01-12T09:00:00-03:00";

const cuentaRegresivaDias = document.getElementById("cuenta-regresiva-dias");

const cuentaRegresivaHoras = document.getElementById("cuenta-regresiva-horas");

const cuentaRegresivaMinutos = document.getElementById(
  "cuenta-regresiva-minutos"
);

const cuentaRegresivaSegundos = document.getElementById(
  "cuenta-regresiva-segundos"
);

function actualizarCuentaRegresiva() {
  // La cuenta regresiva puede no existir en todas las páginas.
  if (
    !cuentaRegresivaDias ||
    !cuentaRegresivaHoras ||
    !cuentaRegresivaMinutos ||
    !cuentaRegresivaSegundos
  ) {
    return;
  }

  const ahora = new Date().getTime();

  const fechaObjetivo = new Date(CUENTA_REGRESIVA_FECHA).getTime();

  const diferencia = fechaObjetivo - ahora;

  if (diferencia <= 0) {
    cuentaRegresivaDias.textContent = "00";
    cuentaRegresivaHoras.textContent = "00";
    cuentaRegresivaMinutos.textContent = "00";
    cuentaRegresivaSegundos.textContent = "00";

    return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);

  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);

  const segundos = Math.floor((diferencia / 1000) % 60);

  cuentaRegresivaDias.textContent = String(dias).padStart(2, "0");
  cuentaRegresivaHoras.textContent = String(horas).padStart(2, "0");
  cuentaRegresivaMinutos.textContent = String(minutos).padStart(2, "0");
  cuentaRegresivaSegundos.textContent = String(segundos).padStart(2, "0");
}

actualizarCuentaRegresiva();

setInterval(actualizarCuentaRegresiva, 1000);
