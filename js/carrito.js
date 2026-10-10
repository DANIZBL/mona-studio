(() => {
  "use strict";

  // =====================================================
  // CONFIGURACIÓN
  // =====================================================

  const STORAGE_KEY = "mona-cart";

  const money = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

  const $ = (selector) => document.querySelector(selector);

  const cartItems = $("#cart-items");
  const emptyCart = $("#cart-empty");
  const itemsCount = $("#cart-items-count");
  const clearButton = $("#clear-cart");

  const subtotalElement = $("#summary-subtotal");
  const deliveryElement = $("#summary-delivery");
  const totalElement = $("#summary-total");

  const checkoutForm = $("#checkout-form");
  const checkoutButton = $("#checkout-button");
  const checkoutMessage = $("#checkout-message");

  const deliverySelect = $("#delivery-method");
  const shippingFields = $("#shipping-fields");

  const streetInput = $("#shipping-street");
  const numberInput = $("#shipping-number");

  // =====================================================
  // ALMACENAMIENTO
  // =====================================================

  function getCart() {
    try {
      const cart = JSON.parse(localStorage.getItem(STORAGE_KEY));

      return Array.isArray(cart) ? cart : [];
    } catch (error) {
      console.error("Error leyendo el carrito:", error);
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));

    updateHeaderCount();

    window.dispatchEvent(new CustomEvent("cartUpdated"));
  }

  function updateHeaderCount() {
    const quantity = getCart().reduce(
      (total, product) => total + Math.max(0, Number(product.quantity) || 0),
      0
    );

    document.querySelectorAll(".cart-count").forEach((element) => {
      element.textContent = quantity;
    });
  }

  // =====================================================
  // UTILIDADES
  // =====================================================

  function getQuantity(product) {
    return Math.max(0, Math.floor(Number(product.quantity) || 0));
  }

  function getPrice(product) {
    const price = Number(product.price);

    return Number.isFinite(price) && price >= 0 ? price : 0;
  }

  function getSubtotal(cart) {
    return cart.reduce(
      (total, product) => total + getPrice(product) * getQuantity(product),
      0
    );
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };

      return entities[character];
    });
  }

  function showMessage(message, type = "error") {
    if (!checkoutMessage) return;

    checkoutMessage.textContent = message;
    checkoutMessage.className = `checkout-message is-${type}`;
  }

  function clearMessage() {
    if (!checkoutMessage) return;

    checkoutMessage.textContent = "";
    checkoutMessage.className = "checkout-message";
  }

  // =====================================================
  // MOSTRAR PRODUCTOS
  // =====================================================

  function renderCart() {
    if (!cartItems) return;

    const cart = getCart();
    const hasProducts = cart.length > 0;

    cartItems.hidden = !hasProducts;

    if (emptyCart) {
      emptyCart.hidden = hasProducts;
    }

    if (clearButton) {
      clearButton.hidden = !hasProducts;
    }

    if (itemsCount) {
      const quantity = cart.reduce(
        (total, product) => total + getQuantity(product),
        0
      );

      itemsCount.textContent = `${quantity} ${
        quantity === 1 ? "producto" : "productos"
      }`;
    }

    cartItems.innerHTML = cart
      .map((product) => {
        const id = String(product.id ?? "");
        const name = escapeHTML(product.nombre || "Producto");
        const image = escapeHTML(product.image || "");
        const quantity = getQuantity(product);
        const price = getPrice(product);
        const subtotal = price * quantity;

        return `
          <article class="cart-item" data-id="${escapeHTML(id)}">

            <div class="cart-item-image">
              ${
                image
                  ? `
                    <img
                      src="${image}"
                      alt="${name}"
                      loading="lazy"
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
              <h3>${name}</h3>

              <p class="cart-item-unit-price">
                Precio unitario: ${money.format(price)}
              </p>

              <div class="cart-item-actions">
                <div class="quantity-control">
                  <button
                    type="button"
                    class="cart-quantity-minus"
                    data-id="${escapeHTML(id)}"
                    aria-label="Disminuir cantidad de ${name}"
                    ${quantity <= 1 ? "disabled" : ""}
                  >−</button>

                  <span aria-live="polite">${quantity}</span>

                  <button
                    type="button"
                    class="cart-quantity-plus"
                    data-id="${escapeHTML(id)}"
                    aria-label="Aumentar cantidad de ${name}"
                  >+</button>
                </div>

                <button
                  type="button"
                  class="remove-cart-item"
                  data-id="${escapeHTML(id)}"
                >
                  Eliminar
                </button>
              </div>
            </div>

            <div class="cart-item-total">
              <span>Subtotal</span>
              <strong>${money.format(subtotal)}</strong>
            </div>

          </article>
        `;
      })
      .join("");

    updateSummary();
    updateHeaderCount();

    if (checkoutButton) {
      checkoutButton.disabled = !hasProducts;
    }

    clearMessage();
  }

  // =====================================================
  // RESUMEN DE COMPRA
  // =====================================================

  function updateSummary() {
    const cart = getCart();
    const subtotal = getSubtotal(cart);

    const deliveryMethod = deliverySelect?.value || "retiro en local";

    // El envío todavía no tiene cálculo conectado al backend.
    // No sumamos un importe inventado al total.

    if (subtotalElement) {
      subtotalElement.textContent = money.format(subtotal);
    }

    if (deliveryElement) {
      deliveryElement.textContent =
        deliveryMethod === "cadete" ? "A coordinar" : "Sin cargo";
    }

    if (totalElement) {
      totalElement.textContent = money.format(subtotal);
    }
  }

  // =====================================================
  // CANTIDADES
  // =====================================================

  function changeQuantity(productId, amount) {
    const cart = getCart();

    const product = cart.find((item) => String(item.id) === String(productId));

    if (!product) return;

    const currentQuantity = getQuantity(product);
    const nextQuantity = currentQuantity + amount;

    if (nextQuantity <= 0) {
      removeProduct(productId);
      return;
    }

    product.quantity = nextQuantity;

    saveCart(cart);
    renderCart();
  }

  // =====================================================
  // ELIMINAR PRODUCTO
  // =====================================================

  function removeProduct(productId) {
    const cart = getCart().filter(
      (product) => String(product.id) !== String(productId)
    );

    saveCart(cart);
    renderCart();
  }

  // =====================================================
  // VACIAR CARRITO
  // =====================================================

  function clearCart() {
    if (!getCart().length) return;

    if (!window.confirm("¿Querés vaciar todo el carrito?")) {
      return;
    }

    saveCart([]);
    renderCart();
  }

  // =====================================================
  // ENTREGA
  // =====================================================

  function updateDeliveryFields() {
    if (!deliverySelect || !shippingFields) return;

    const requiresAddress = deliverySelect.value === "cadete";

    shippingFields.hidden = !requiresAddress;

    if (streetInput) {
      streetInput.required = requiresAddress;
    }

    if (numberInput) {
      numberInput.required = requiresAddress;
    }

    updateSummary();
    clearMessage();
  }

  // =====================================================
  // VALIDAR Y PREPARAR PEDIDO
  // =====================================================

  function handleCheckout(event) {
    event.preventDefault();

    const cart = getCart();

    if (!cart.length) {
      showMessage("Tu carrito está vacío.");
      return;
    }

    if (!checkoutForm.reportValidity()) {
      return;
    }

    const formData = new FormData(checkoutForm);

    const items = cart.map((product) => ({
      productId: product.id,
      nombre: product.nombre,
      quantity: getQuantity(product),
      unitPrice: getPrice(product),
      subtotal: getPrice(product) * getQuantity(product),
    }));

    const order = {
      customer: {
        nombre: String(formData.get("client_name") || "").trim(),
        apellido: String(formData.get("client_surname") || "").trim(),
        telefono: String(formData.get("phone") || "").trim(),
      },

      delivery: {
        method: String(formData.get("delivered") || ""),
        address:
          formData.get("delivered") === "cadete"
            ? {
                street: String(formData.get("street") || "").trim(),
                number: String(formData.get("number") || "").trim(),
                floor: String(formData.get("floor") || "").trim(),
                department: String(formData.get("letter") || "").trim(),
              }
            : null,
      },

      paymentMethod: String(formData.get("paymentMethod") || ""),
      comment: String(formData.get("coment") || "").trim(),

      items,

      // Referencia informativa. El servidor debe recalcular
      // y validar todos los importes antes de crear la orden.
      displayedSubtotal: getSubtotal(cart),

      status: "pending",
    };

    console.log("Pedido preparado para integración:", order);

    showMessage(
      "Los datos son válidos. La conexión para registrar el pedido y procesar el pago todavía debe implementarse en el backend.",
      "success"
    );
  }

  // =====================================================
  // EVENTOS
  // =====================================================

  cartItems?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-id]");

    if (!button) return;

    const id = button.dataset.id;

    if (button.classList.contains("cart-quantity-minus")) {
      changeQuantity(id, -1);
    }

    if (button.classList.contains("cart-quantity-plus")) {
      changeQuantity(id, 1);
    }

    if (button.classList.contains("remove-cart-item")) {
      removeProduct(id);
    }
  });

  clearButton?.addEventListener("click", clearCart);

  deliverySelect?.addEventListener("change", updateDeliveryFields);

  checkoutForm?.addEventListener("submit", handleCheckout);

  // Sincronizar si el carrito cambia desde otro script.
  window.addEventListener("cartUpdated", renderCart);

  // Sincronizar si cambia desde otra pestaña.
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      renderCart();
    }
  });

  // =====================================================
  // INICIALIZACIÓN
  // =====================================================

  function init() {
    updateDeliveryFields();
    renderCart();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
