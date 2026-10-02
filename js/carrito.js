// =====================================================
// CARRITO
// =====================================================

const CART_STORAGE_KEY = "mona-cart";

// =====================================================
// ABRIR / CERRAR CARRITO LATERAL
// =====================================================

function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");

  if (!drawer || !overlay) {
    return;
  }

  renderCartDrawer();

  drawer.classList.add("is-open");
  overlay.classList.add("is-open");

  drawer.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}

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

// BOTÓN CERRAR

document
  .getElementById("cart-close")
  ?.addEventListener("click", closeCartDrawer);

// FONDO OSCURO

document
  .getElementById("cart-overlay")
  ?.addEventListener("click", closeCartDrawer);

// ESCAPE

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCartDrawer();
  }
});

// Actualizar contador al cargar
updateCartCount();

// =====================================================
// RENDER CARRITO LATERAL
// =====================================================

function renderCartDrawer() {
  const itemsContainer = document.getElementById("cart-drawer-items");

  const emptyContainer = document.getElementById("cart-drawer-empty");

  const totalElement = document.getElementById("cart-drawer-total");

  if (!itemsContainer) {
    return;
  }

  const cart = getCart();

  // CARRITO VACÍO

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

  // CARRITO CON PRODUCTOS

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

          <div class="cart-drawer-item-image">

            ${
              product.image
                ? `
                  <img
                    src="${product.image}"
                    alt="${product.nombre}"
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

            <h3>
              ${product.nombre}
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

  const total = cart.reduce((sum, product) => {
    return sum + Number(product.price || 0) * Number(product.quantity || 0);
  }, 0);

  if (totalElement) {
    totalElement.textContent = `$${total.toLocaleString("es-AR")}`;
  }

  // BOTÓN -

  itemsContainer.querySelectorAll(".drawer-minus").forEach((button) => {
    button.addEventListener("click", () => {
      changeQuantity(button.dataset.id, -1);

      renderCartDrawer();
    });
  });

  // BOTÓN +

  itemsContainer.querySelectorAll(".drawer-plus").forEach((button) => {
    button.addEventListener("click", () => {
      changeQuantity(button.dataset.id, 1);

      renderCartDrawer();
    });
  });

  // ELIMINAR

  itemsContainer.querySelectorAll(".cart-drawer-remove").forEach((button) => {
    button.addEventListener("click", () => {
      removeProduct(button.dataset.id);

      renderCartDrawer();
    });
  });
}
// =====================================================
// INICIO
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

// =====================================================
// OBTENER CARRITO
// =====================================================

function getCart() {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));

    return Array.isArray(cart) ? cart : [];
  } catch (error) {
    console.error("Error leyendo el carrito:", error);

    return [];
  }
}

// =====================================================
// GUARDAR CARRITO
// =====================================================

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));

  updateCartCount();
}

// =====================================================
// ACTUALIZAR CONTADOR DEL HEADER
// =====================================================

function updateCartCount() {
  const cart = getCart();

  const totalQuantity = cart.reduce(
    (total, product) => total + Number(product.quantity || 0),
    0
  );

  document.querySelectorAll(".cart-count").forEach((counter) => {
    counter.textContent = totalQuantity;
  });
}

// =====================================================
// RENDER CARRITO
// =====================================================

function renderCart() {
  const cartContainer = document.getElementById("cart-container");

  if (!cartContainer) {
    updateCartCount();
    return;
  }

  const cart = getCart();

  updateCartCount();

  if (!cart.length) {
    renderEmptyCart();
    return;
  }

  cartContainer.innerHTML = `
    <div class="cart-content">

      <div class="cart-products">

        <div class="cart-header">
          <h1>Tu carrito</h1>

          <button
            type="button"
            id="clear-cart"
            class="clear-cart-btn"
          >
            Vaciar carrito
          </button>
        </div>


        <div id="cart-items"></div>

      </div>


      <aside class="cart-summary">

        <h2>Resumen de compra</h2>

        <div class="cart-summary-row">
          <span>Productos</span>
          <span id="cart-products-count">
            0
          </span>
        </div>

        <div class="cart-summary-row">
          <span>Subtotal</span>

          <strong id="cart-subtotal">
            $0
          </strong>
        </div>


        <div class="cart-summary-total">

          <span>Total</span>

          <strong id="cart-total">
            $0
          </strong>

        </div>


        <button
          type="button"
          id="checkout-button"
          class="checkout-btn"
        >
          Continuar compra
        </button>


        <a
          href="productos.html"
          class="continue-shopping"
        >
          Seguir comprando
        </a>

      </aside>

    </div>
  `;

  renderCartItems();
  initCartEvents();
}

// =====================================================
// CARRITO VACÍO
// =====================================================

function renderEmptyCart() {
  const cartContainer = document.getElementById("cart-container");

  if (!cartContainer) {
    return;
  }

  cartContainer.innerHTML = `
    <div class="empty-cart">

      <h1>Tu carrito está vacío</h1>

      <p>
        Todavía no agregaste ningún producto.
      </p>

      <a
        href="productos.html"
        class="checkout-btn"
      >
        Ver productos
      </a>

    </div>
  `;
}

// =====================================================
// MOSTRAR PRODUCTOS
// =====================================================

function renderCartItems() {
  const itemsContainer = document.getElementById("cart-items");

  if (!itemsContainer) {
    return;
  }

  const cart = getCart();

  itemsContainer.innerHTML = cart
    .map((product) => {
      const quantity = Number(product.quantity) || 1;

      const price = Number(product.price) || 0;

      const subtotal = price * quantity;

      return `
        <article
          class="cart-item"
          data-id="${product.id}"
        >

          <div class="cart-item-image">

            ${
              product.image
                ? `
                  <img
                    src="${product.image}"
                    alt="${product.nombre}"
                  >
                `
                : `
                  <div class="cart-no-image">
                    Sin imagen
                  </div>
                `
            }

          </div>


          <div class="cart-item-info">

            <h3>
              ${product.nombre}
            </h3>

            <p class="cart-item-price">
              $${price.toLocaleString("es-AR")}
            </p>


            ${
              product.varieties?.length
                ? `
                  <div class="cart-varieties">

                    ${product.varieties
                      .map(
                        (variety) => `
                          <span>
                            Variedad:
                            ${variety.id}
                            × ${variety.quantity}
                          </span>
                        `
                      )
                      .join("")}

                  </div>
                `
                : ""
            }


            <div class="cart-item-actions">

              <div class="quantity-control">

                <button
                  type="button"
                  class="cart-quantity-minus"
                  data-id="${product.id}"
                >
                  −
                </button>


                <span>
                  ${quantity}
                </span>


                <button
                  type="button"
                  class="cart-quantity-plus"
                  data-id="${product.id}"
                >
                  +
                </button>

              </div>


              <button
                type="button"
                class="remove-cart-item"
                data-id="${product.id}"
              >
                Eliminar
              </button>

            </div>

          </div>


          <div class="cart-item-subtotal">

            <strong>
              $${subtotal.toLocaleString("es-AR")}
            </strong>

          </div>

        </article>
      `;
    })
    .join("");

  updateCartSummary();
}

// =====================================================
// EVENTOS
// =====================================================

function initCartEvents() {
  const clearButton = document.getElementById("clear-cart");

  const checkoutButton = document.getElementById("checkout-button");

  clearButton?.addEventListener("click", clearCart);

  checkoutButton?.addEventListener("click", () => {
    window.location.href = "checkout.html";
  });

  document.querySelectorAll(".cart-quantity-minus").forEach((button) => {
    button.addEventListener("click", () => {
      changeQuantity(button.dataset.id, -1);
    });
  });

  document.querySelectorAll(".cart-quantity-plus").forEach((button) => {
    button.addEventListener("click", () => {
      changeQuantity(button.dataset.id, 1);
    });
  });

  document.querySelectorAll(".remove-cart-item").forEach((button) => {
    button.addEventListener("click", () => {
      removeProduct(button.dataset.id);
    });
  });
}

// =====================================================
// CAMBIAR CANTIDAD
// =====================================================

function changeQuantity(productId, amount) {
  const cart = getCart();

  const product = cart.find((item) => item.id === productId);

  if (!product) {
    return;
  }

  product.quantity += amount;

  if (product.quantity <= 0) {
    removeProduct(productId);
    return;
  }

  saveCart(cart);

  renderCart();
}

// =====================================================
// ELIMINAR PRODUCTO
// =====================================================

function removeProduct(productId) {
  const cart = getCart();

  const newCart = cart.filter((product) => product.id !== productId);

  saveCart(newCart);

  renderCart();
}

// =====================================================
// VACIAR CARRITO
// =====================================================

function clearCart() {
  const confirmed = confirm("¿Seguro que querés vaciar el carrito?");

  if (!confirmed) {
    return;
  }

  localStorage.removeItem(CART_STORAGE_KEY);

  updateCartCount();

  renderCart();
}

// =====================================================
// RESUMEN
// =====================================================

function updateCartSummary() {
  const cart = getCart();

  const productsCountElement = document.getElementById("cart-products-count");

  const subtotalElement = document.getElementById("cart-subtotal");

  const totalElement = document.getElementById("cart-total");

  const totalQuantity = cart.reduce(
    (total, product) => total + Number(product.quantity || 0),
    0
  );

  const subtotal = cart.reduce(
    (total, product) =>
      total + Number(product.price || 0) * Number(product.quantity || 0),
    0
  );

  if (productsCountElement) {
    productsCountElement.textContent = totalQuantity;
  }

  if (subtotalElement) {
    subtotalElement.textContent = `$${subtotal.toLocaleString("es-AR")}`;
  }

  if (totalElement) {
    totalElement.textContent = `$${subtotal.toLocaleString("es-AR")}`;
  }
}

// =====================================================
// EXPONER FUNCIONES GLOBALMENTE
// =====================================================

window.getCart = getCart;
window.saveCart = saveCart;
window.updateCartCount = updateCartCount;
