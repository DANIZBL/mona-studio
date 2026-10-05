// =====================================================
// HEADER - MONA STUDIO
// =====================================================

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
  // Evitamos crearlo dos veces
  if (document.getElementById("cart-drawer")) {
    return;
  }

  const cartHTML = `

    <!-- ========================================= -->
    <!-- OVERLAY -->
    <!-- ========================================= -->

    <div
      id="cart-overlay"
      class="cart-overlay"
    ></div>


    <!-- ========================================= -->
    <!-- CARRITO LATERAL -->
    <!-- ========================================= -->

    <aside
      id="cart-drawer"
      class="cart-drawer"
      aria-hidden="true"
      aria-label="Carrito de compras"
    >

      <!-- HEADER -->

      <div class="cart-drawer-header">

        <div>

          <p class="cart-drawer-eyebrow">
            MONA STUDIO
          </p>

          <h2>
            Tu carrito
          </h2>

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


      <!-- PRODUCTOS -->

      <div
        id="cart-drawer-items"
        class="cart-drawer-items"
      >
      </div>


      <!-- CARRITO VACÍO -->

      <div
        id="cart-drawer-empty"
        class="cart-drawer-empty"
        hidden
      >

        <div class="cart-drawer-empty-icon">
          ♡
        </div>

        <h3>
          Tu carrito está vacío
        </h3>

        <p>
          Todavía no agregaste productos.
        </p>

      </div>


      <!-- FOOTER -->

      <div class="cart-drawer-footer">

        <div class="cart-drawer-total">

          <span>
            Total
          </span>

          <strong id="cart-drawer-total">
            $0
          </strong>

        </div>


        <a
          href="carrito.html"
          class="cart-drawer-button cart-drawer-checkout"
        >
          Ver carrito
        </a>


        <a
          href="carrito.html"
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

  if (!drawer || !overlay) {
    return;
  }

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

  if (!drawer || !overlay) {
    return;
  }

  drawer.classList.remove("is-open");

  overlay.classList.remove("is-open");

  drawer.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}

// =====================================================
// RENDER CARRITO LATERAL
// =====================================================

function renderHeaderCart() {
  const itemsContainer = document.getElementById("cart-drawer-items");

  const emptyContainer = document.getElementById("cart-drawer-empty");

  const totalElement = document.getElementById("cart-drawer-total");

  if (!itemsContainer) {
    return;
  }

  const cart = getHeaderCart();

  // ---------------------------------------------------
  // CARRITO VACÍO
  // ---------------------------------------------------

  if (!cart.length) {
    itemsContainer.innerHTML = "";

    itemsContainer.hidden = true;

    if (emptyContainer) {
      emptyContainer.hidden = false;
    }

    if (totalElement) {
      totalElement.textContent = "$0";
    }

    return;
  }

  // ---------------------------------------------------
  // CARRITO CON PRODUCTOS
  // ---------------------------------------------------

  itemsContainer.hidden = false;

  if (emptyContainer) {
    emptyContainer.hidden = true;
  }

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

          <!-- IMAGEN -->

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


          <!-- INFORMACIÓN -->

          <div class="cart-drawer-item-info">

            <h3>
              ${product.nombre || "Producto"}
            </h3>


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


                <span>
                  ${quantity}
                </span>


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


          <!-- SUBTOTAL -->

          <div class="cart-drawer-item-total">

            $${subtotal.toLocaleString("es-AR")}

          </div>

        </article>

      `;
    })
    .join("");

  // ---------------------------------------------------
  // TOTAL
  // ---------------------------------------------------

  const total = cart.reduce(
    (sum, product) =>
      sum + Number(product.price || 0) * Number(product.quantity || 0),
    0
  );

  if (totalElement) {
    totalElement.textContent = `$${total.toLocaleString("es-AR")}`;
  }

  // ---------------------------------------------------
  // BOTÓN -
  // ---------------------------------------------------

  itemsContainer.querySelectorAll(".drawer-minus").forEach((button) => {
    button.addEventListener("click", () => {
      changeHeaderCartQuantity(button.dataset.id, -1);
    });
  });

  // ---------------------------------------------------
  // BOTÓN +
  // ---------------------------------------------------

  itemsContainer.querySelectorAll(".drawer-plus").forEach((button) => {
    button.addEventListener("click", () => {
      changeHeaderCartQuantity(button.dataset.id, 1);
    });
  });

  // ---------------------------------------------------
  // ELIMINAR
  // ---------------------------------------------------

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

  if (!product) {
    return;
  }

  product.quantity = Number(product.quantity || 0) + amount;

  // Si llega a cero, eliminar
  if (product.quantity <= 0) {
    removeHeaderCartProduct(productId);

    return;
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));

  updateHeaderCartCount();

  renderHeaderCart();

  // Avisamos a otros scripts
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

  // ---------------------------------------------------
  // BOTONES DEL HEADER
  // ---------------------------------------------------

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

    // ENTER / ESPACIO

    cart.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();

        openCartDrawer();
      }
    });
  });

  // ---------------------------------------------------
  // CERRAR
  // ---------------------------------------------------

  document
    .getElementById("cart-close")
    ?.addEventListener("click", closeCartDrawer);

  // ---------------------------------------------------
  // OVERLAY
  // ---------------------------------------------------

  document
    .getElementById("cart-overlay")
    ?.addEventListener("click", closeCartDrawer);

  // ---------------------------------------------------
  // ESCAPE
  // ---------------------------------------------------

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCartDrawer();
    }
  });

  // ---------------------------------------------------
  // SI CAMBIA EL CARRITO
  // ---------------------------------------------------

  window.addEventListener("cartUpdated", () => {
    updateHeaderCartCount();

    if (document.getElementById("cart-drawer")?.classList.contains("is-open")) {
      renderHeaderCart();
    }
  });

  // ---------------------------------------------------
  // CAMBIOS DE LOCALSTORAGE DESDE OTRA PESTAÑA
  // ---------------------------------------------------

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
// BUSCAR MIENTRAS ESCRIBE
// =====================================================

searchInput?.addEventListener("input", () => {
  const value = searchInput.value.trim().toLowerCase();

  if (!value) {
    if (searchResults) {
      searchResults.innerHTML = "";
    }

    return;
  }

  const results = headerProducts
    .filter((product) => product.nombre.toLowerCase().includes(value))
    .slice(0, 6);

  renderSearchResults(results);
});

// =====================================================
// ENTER → IR A PRODUCTOS
// =====================================================

searchInput?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") {
    return;
  }

  const value = searchInput.value.trim();

  if (!value) {
    return;
  }

  window.location.href = `productos.html?search=${encodeURIComponent(value)}`;
});

// =====================================================
// RENDER RESULTADOS
// =====================================================

function renderSearchResults(results) {
  if (!searchResults) {
    return;
  }

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
      const image =
        product.images?.[0]?.url ||
        product.image?.[0] ||
        "./assets/img/no-image.png";

      const price = Number(
        product.discountedPrice || product.price
      ).toLocaleString("es-AR");

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

              <h4>
                ${product.nombre}
              </h4>

              <p>
                $${price}
              </p>

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

// =====================================================
// IR AL PRODUCTO
// =====================================================

function goToProduct(id) {
  window.location.href = `producto-detalle.html?id=${id}`;
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
