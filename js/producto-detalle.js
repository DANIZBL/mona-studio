const API_URL = "https://monastudiobackend-production.up.railway.app/api/v1";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const productContainer = document.getElementById("product-container");
const relatedProductsContainer = document.getElementById("related-products");

let currentProduct = null;

// =====================================================
// INICIO
// =====================================================

loadProduct();

// =====================================================
// CARGAR PRODUCTO
// =====================================================

async function loadProduct() {
  if (!productId) {
    showProductError("No se especificó ningún producto.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/products/${productId}`);

    if (!response.ok) {
      throw new Error("Producto no encontrado");
    }

    const product = await response.json();

    // El endpoint individual no trae imágenes,
    // entonces buscamos la versión completa del producto
    // en el listado de productos.
    if (!product.image && !product.images) {
      const productsResponse = await fetch(`${API_URL}/products?limit=500`);

      if (productsResponse.ok) {
        const products = await productsResponse.json();

        const productFromList = products.find((item) => item.id === product.id);

        if (productFromList) {
          product.image = productFromList.image;
          product.images = productFromList.images;
        }
      }
    }

    currentProduct = product;

    console.log("PRODUCTO FINAL:", product);

    renderProduct(product);
    loadRelatedProducts(product);
  } catch (error) {
    console.error("Error cargando producto:", error);

    showProductError("Ocurrió un error al cargar el producto.");
  }
}

// =====================================================
// MOSTRAR ERROR
// =====================================================

function showProductError(message) {
  if (!productContainer) return;

  productContainer.innerHTML = `
    <div class="product-error">
      <h2>Producto no encontrado</h2>
      <p>${message}</p>

      <button
        class="back-btn"
        onclick="history.back()"
      >
        Volver
      </button>
    </div>
  `;
}

// =====================================================
// RENDER PRODUCTO
// =====================================================

function renderProduct(product) {
  if (!productContainer) return;

  /*
    El backend parece manejar imágenes de dos maneras
    en los ejemplos actuales:

    product.image
    product.images

    Por eso soportamos ambas.
  */

  const images = getProductImages(product);

  const categories = product.categories || [];

  const hasDiscount =
    product.discountedPrice !== null &&
    product.discountedPrice !== undefined &&
    Number(product.discountedPrice) > 0;

  const regularPrice = Number(product.price || 0);

  const finalPrice = hasDiscount
    ? Number(product.discountedPrice)
    : regularPrice;

  const price = regularPrice.toLocaleString("es-AR");

  const discountedPrice = hasDiscount ? finalPrice.toLocaleString("es-AR") : "";

  const discountPercentage = hasDiscount
    ? Math.round(((regularPrice - finalPrice) / regularPrice) * 100)
    : 0;

  containerContent(
    product,
    images,
    categories,
    hasDiscount,
    price,
    discountedPrice,
    discountPercentage
  );
}

// =====================================================
// CONTENIDO DEL PRODUCTO
// =====================================================

function containerContent(
  product,
  images,
  categories,
  hasDiscount,
  price,
  discountedPrice,
  discountPercentage
) {
  productContainer.innerHTML = `
    <div class="product-thumbnails">

      ${
        images.length
          ? images
              .map(
                (image, index) => `
                  <img
                    src="${image}"
                    class="product-thumbnail ${index === 0 ? "active" : ""}"
                    data-image="${image}"
                    alt="${product.nombre}"
                  >
                `
              )
              .join("")
          : `
            <div class="no-image">
              Sin imagen
            </div>
          `
      }

    </div>


    <div class="product-main-image">

      <img
        id="main-image"
        src="${images[0] || ""}"
        alt="${product.nombre}"
      >

    </div>


    <div class="product-info-detail">

      <h1 class="product-title">
        ${product.nombre}
      </h1>


      ${
        hasDiscount
          ? `
            <span class="discount-badge-detail">
              -${discountPercentage}% OFF
            </span>
          `
          : ""
      }


      <div class="product-price">

        ${
          hasDiscount
            ? `
              <span class="old-price">
                $${price}
              </span>

              <span class="current-price">
                $${discountedPrice}
              </span>
            `
            : `
              <span class="current-price">
                $${price}
              </span>
            `
        }

      </div>


      <p class="product-description">
        ${product.description || "Sin descripción"}
      </p>


      <div class="product-categories">

        ${
          categories.length
            ? categories
                .map(
                  (category) => `
                    <span class="product-category">
                      ${category.name}
                    </span>
                  `
                )
                .join("")
            : `
              <span class="product-category">
                Sin categoría
              </span>
            `
        }

      </div>


      <!-- ========================= -->
      <!-- CANTIDAD -->
      <!-- ========================= -->

      <div class="product-quantity">

        <button
          type="button"
          id="quantity-minus"
          class="quantity-btn"
        >
          −
        </button>

        <span id="product-quantity">
          1
        </span>

        <button
          type="button"
          id="quantity-plus"
          class="quantity-btn"
        >
          +
        </button>

      </div>


      <!-- ========================= -->
      <!-- AGREGAR AL CARRITO -->
      <!-- ========================= -->

      <button
        type="button"
        id="add-to-cart"
        class="add-to-cart-btn"
      >
        Agregar al carrito
      </button>

    </div>
  `;

  initGallery();
  initQuantity();
  initAddToCart();
}

// =====================================================
// OBTENER IMÁGENES
// =====================================================

function getProductImages(product) {
  const imageData = product.images ?? product.image ?? [];

  if (!Array.isArray(imageData)) {
    return [];
  }

  return imageData
    .map((image) => {
      if (typeof image === "string") {
        return image;
      }

      if (image && typeof image === "object") {
        return image.url || image.src || image.image || "";
      }

      return "";
    })
    .filter(Boolean);
}

// =====================================================
// GALERÍA
// =====================================================

function initGallery() {
  const thumbnails = document.querySelectorAll(".product-thumbnail");
  const mainImage = document.getElementById("main-image");

  if (!mainImage) {
    return;
  }

  // =====================================================
  // GALERÍA NORMAL
  // =====================================================

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      mainImage.src = thumbnail.dataset.image;

      thumbnails.forEach((item) => {
        item.classList.remove("active");
      });

      thumbnail.classList.add("active");
    });
  });

  // =====================================================
  // VISOR GRANDE
  // =====================================================

  initImageModal();
}

function initImageModal() {
  const mainImage = document.getElementById("main-image");

  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("image-modal-image");

  const closeButton = document.getElementById("image-modal-close");
  const prevButton = document.getElementById("image-modal-prev");
  const nextButton = document.getElementById("image-modal-next");

  const thumbnails = Array.from(
    document.querySelectorAll(".product-thumbnail")
  );

  if (!mainImage || !modal || !modalImage) {
    return;
  }

  let currentIndex = 0;

  // =====================================================
  // ACTUALIZAR IMAGEN DEL MODAL
  // =====================================================

  function showImage(index) {
    if (!thumbnails.length) {
      return;
    }

    // Volver al principio
    if (index < 0) {
      index = thumbnails.length - 1;
    }

    // Volver al final
    if (index >= thumbnails.length) {
      index = 0;
    }

    currentIndex = index;

    const image = thumbnails[currentIndex].dataset.image;

    modalImage.src = image;

    // Actualizar miniatura activa
    thumbnails.forEach((thumbnail) => {
      thumbnail.classList.remove("active");
    });

    thumbnails[currentIndex].classList.add("active");

    // También actualizamos la imagen principal
    mainImage.src = image;
  }

  // =====================================================
  // ABRIR MODAL
  // =====================================================

  mainImage.addEventListener("click", () => {
    if (!thumbnails.length) {
      return;
    }

    // Encontrar qué imagen está actualmente seleccionada
    const activeThumbnail = thumbnails.findIndex((thumbnail) =>
      thumbnail.classList.contains("active")
    );

    currentIndex = activeThumbnail >= 0 ? activeThumbnail : 0;

    showImage(currentIndex);

    modal.classList.add("active");

    // Evita que la página siga desplazándose
    document.body.style.overflow = "hidden";
  });

  // =====================================================
  // CERRAR
  // =====================================================

  function closeModal() {
    modal.classList.remove("active");

    document.body.style.overflow = "";
  }

  closeButton.addEventListener("click", closeModal);

  // =====================================================
  // IMAGEN ANTERIOR
  // =====================================================

  prevButton.addEventListener("click", (event) => {
    event.stopPropagation();

    showImage(currentIndex - 1);
  });

  // =====================================================
  // IMAGEN SIGUIENTE
  // =====================================================

  nextButton.addEventListener("click", (event) => {
    event.stopPropagation();

    showImage(currentIndex + 1);
  });

  // =====================================================
  // CERRAR HACIENDO CLICK FUERA
  // =====================================================

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // =====================================================
  // TECLADO
  // =====================================================

  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("active")) {
      return;
    }

    if (event.key === "Escape") {
      closeModal();
    }

    if (event.key === "ArrowLeft") {
      showImage(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
      showImage(currentIndex + 1);
    }
  });

  // =====================================================
  // OCULTAR FLECHAS SI SOLO HAY UNA IMAGEN
  // =====================================================

  if (thumbnails.length <= 1) {
    modal.classList.add("single-image");
  }
}

// =====================================================
// CANTIDAD
// =====================================================

function initQuantity() {
  const minusButton = document.getElementById("quantity-minus");

  const plusButton = document.getElementById("quantity-plus");

  const quantityElement = document.getElementById("product-quantity");

  if (!minusButton || !plusButton || !quantityElement) {
    return;
  }

  let quantity = 1;

  minusButton.addEventListener("click", () => {
    if (quantity <= 1) {
      return;
    }

    quantity--;

    quantityElement.textContent = quantity;
  });

  plusButton.addEventListener("click", () => {
    quantity++;

    quantityElement.textContent = quantity;
  });
}

// =====================================================
// AGREGAR AL CARRITO
// =====================================================

function initAddToCart() {
  const button = document.getElementById("add-to-cart");

  const quantityElement = document.getElementById("product-quantity");

  if (!button || !quantityElement || !currentProduct) {
    return;
  }

  button.addEventListener("click", () => {
    const quantity = Number(quantityElement.textContent) || 1;

    addProductToCart(currentProduct, quantity);

    // Feedback visual
    const originalText = button.textContent;

    button.textContent = "¡Agregado al carrito!";

    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 1500);
  });
}

// =====================================================
// AGREGAR PRODUCTO AL CARRITO
// =====================================================

function addProductToCart(product, quantity) {
  const cart = getCart();

  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  const productData = {
    id: product.id,

    nombre: product.nombre,

    price:
      Number(product.discountedPrice) > 0
        ? Number(product.discountedPrice)
        : Number(product.price),

    image: getProductImages(product)[0] || "",

    quantity: quantity,

    varieties: [],
  };

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += quantity;
  } else {
    cart.push(productData);
  }

  saveCart(cart);

  // Actualizar contador del header
  if (typeof updateCartCount === "function") {
    updateCartCount();
  }

  console.log("Carrito actualizado:", cart);

  // Abrir carrito
  const cartButton = document.querySelector(".cart-icon");

  if (cartButton) {
    cartButton.click();
  }
}

// =====================================================
// OBTENER CARRITO
// =====================================================

function getCart() {
  try {
    const cart = JSON.parse(localStorage.getItem("mona-cart"));

    return Array.isArray(cart) ? cart : [];
  } catch (error) {
    console.error("Error leyendo carrito:", error);

    return [];
  }
}

// =====================================================
// GUARDAR CARRITO
// =====================================================

function saveCart(cart) {
  localStorage.setItem("mona-cart", JSON.stringify(cart));
}

// =====================================================
// PRODUCTOS RELACIONADOS
// =====================================================
async function loadRelatedProducts(currentProduct) {
  try {
    const response = await fetch(`${API_URL}/products?limit=500`);

    if (!response.ok) {
      throw new Error("No se pudieron cargar los productos relacionados");
    }

    let products = await response.json();

    products = products.filter((product) => product.active);

    const related = products
      .filter((product) => product.id !== currentProduct.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    renderRelatedProducts(related);
  } catch (error) {
    console.error("Error cargando productos relacionados:", error);
  }
}

// =====================================================
// RENDER PRODUCTOS RELACIONADOS
// =====================================================

function renderRelatedProducts(products) {
  if (!relatedProductsContainer) {
    return;
  }

  if (!products.length) {
    relatedProductsContainer.innerHTML = `
      <p>No hay productos similares.</p>
    `;

    return;
  }

  relatedProductsContainer.innerHTML = products
    .map((product) => {
      const images = getProductImages(product);

      const image = images[0] || "";

      const hasDiscount =
        product.discountedPrice !== null &&
        product.discountedPrice !== undefined &&
        Number(product.discountedPrice) > 0;

      const regularPrice = Number(product.price || 0);

      const finalPrice = hasDiscount
        ? Number(product.discountedPrice)
        : regularPrice;

      const price = regularPrice.toLocaleString("es-AR");

      const discountedPrice = finalPrice.toLocaleString("es-AR");

      return `
        <article class="product-card">

          <div class="product-image-wrapper">

            <img
              src="${image}"
              class="product-image"
              alt="${product.nombre}"
            >

          </div>


          <h3 class="product-name">
            ${product.nombre}
          </h3>


          <div class="price-wrapper">

            ${
              hasDiscount
                ? `
                  <span class="old-price">
                    $${price}
                  </span>

                  <span class="current-price">
                    $${discountedPrice}
                  </span>
                `
                : `
                  <span class="current-price">
                    $${price}
                  </span>
                `
            }

          </div>


          <button
            class="product-btn"
            onclick="goToRelatedProduct('${product.id}')"
          >
            Ver producto
          </button>

        </article>
      `;
    })
    .join("");
}

// =====================================================
// IR A PRODUCTO RELACIONADO
// =====================================================

function goToRelatedProduct(id) {
  window.location.href = `producto-detalle.html?id=${id}`;
}
