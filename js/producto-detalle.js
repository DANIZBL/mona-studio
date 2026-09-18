const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

console.log("ID:", productId);
console.log(
  "URL:",
  `https://monastudiobackend-production.up.railway.app/api/v1/products/${productId}`
);

async function loadProduct() {
  try {
    const response = await fetch(
      `https://monastudiobackend-production.up.railway.app/api/v1/products/${productId}`
    );

    if (!response.ok) {
      throw new Error("Producto no encontrado");
    }

    const product = await response.json();

    console.log(product);

    renderProduct(product);
  } catch (error) {
    console.error(error);

    document.getElementById("product-container").innerHTML = `
      <h2>Producto no encontrado</h2>
      <p>Ocurrió un error al cargar el producto.</p>
    `;
  }

  renderProduct(product);
  loadRelatedProducts(product);
}

loadProduct();

console.log("PRODUCTO:", product);
console.log("CATEGORIES:", product.categories);

function renderProduct(product) {
  const container = document.getElementById("product-container");

  const images = product.image || [];
  const categories = product.categories || [];

  const hasDiscount =
    product.discountedPrice && Number(product.discountedPrice) > 0;

  const price = Number(product.price).toLocaleString("es-AR");

  const discountedPrice = hasDiscount
    ? Number(product.discountedPrice).toLocaleString("es-AR")
    : "";

  const discountPercentage = hasDiscount
    ? Math.round(
        ((Number(product.price) - Number(product.discountedPrice)) /
          Number(product.price)) *
          100
      )
    : 0;

  container.innerHTML = `
    <div class="product-thumbnails">
      ${images
        .map(
          (img, index) => `
            <img
              src="${img}"
              class="product-thumbnail ${index === 0 ? "active" : ""}"
              data-image="${img}"
            >
          `
        )
        .join("")}
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
                  (cat) => `
                    <span class="product-category">
                      ${cat.name}
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

      <button
        class="back-btn"
        onclick="history.back()"
      >
        Volver
      </button>

    </div>
  `;

  if (images.length > 0) {
    initGallery();
  }
}

function initGallery() {
  const thumbnails = document.querySelectorAll(".product-thumbnail");
  const mainImage = document.getElementById("main-image");

  if (!thumbnails.length || !mainImage) return;

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      mainImage.src = thumb.dataset.image;

      thumbnails.forEach((t) => {
        t.classList.remove("active");
      });

      thumb.classList.add("active");
    });
  });
}

async function loadRelatedProducts(currentProduct) {
  try {
    const response = await fetch(
      "https://monastudiobackend-production.up.railway.app/api/v1/products?limit=500"
    );

    let products = await response.json();

    products = products.filter((product) => product.active);

    const currentCategories =
      currentProduct.categories?.map((cat) => cat.id) || [];

    const related = products
      .filter((product) => product.id !== currentProduct.id)
      .filter((product) =>
        product.categories?.some((cat) => currentCategories.includes(cat.id))
      )
      .slice(0, 4);

    renderRelatedProducts(related);
  } catch (error) {
    console.error(error);
  }
}

function renderRelatedProducts(products) {
  const container = document.getElementById("related-products");

  if (!products.length) {
    container.innerHTML = `
      <p>No hay productos similares.</p>
    `;
    return;
  }

  container.innerHTML = products
    .map((product) => {
      const image = product.image?.[0] || "";

      const hasDiscount =
        product.discountedPrice && Number(product.discountedPrice) > 0;

      const price = Number(product.price).toLocaleString("es-AR");

      const discountedPrice = hasDiscount
        ? Number(product.discountedPrice).toLocaleString("es-AR")
        : "";

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

function goToRelatedProduct(id) {
  window.location.href = `producto-detalle.html?id=${id}`;
}

const related = products
  .filter((p) => p.id !== currentProduct.id)
  .map((p) => {
    const matches =
      p.categories?.filter((cat) => currentCategories.includes(cat.id))
        .length || 0;

    return {
      ...p,
      matches,
    };
  })
  .filter((p) => p.matches > 0)
  .sort((a, b) => b.matches - a.matches)
  .slice(0, 4);
