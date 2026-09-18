const PRODUCTS_URL =
  "https://monastudiobackend-production.up.railway.app/api/v1/products?limit=500";

const CATEGORIES_URL =
  "https://monastudiobackend-production.up.railway.app/api/v1/categories";

let products = [];
let filteredProducts = [];
let activeCategory = "Todos";
let searchTerm = "";

const grid = document.getElementById("products-grid");
const categoriesContainer = document.getElementById("categories-container");
const loader = document.getElementById("products-loader");
const productsCount = document.getElementById("products-count");
const activeCategoryLabel = document.getElementById("active-category");

init();

async function init() {
  try {
    loader.style.display = "block";

    const [productsRes, categoriesRes] = await Promise.all([
      fetch(PRODUCTS_URL),
      fetch(CATEGORIES_URL),
    ]);

    products = await productsRes.json();
    console.log(products);
    console.log(products[0]);

    const categories = await categoriesRes.json();

    products = products.filter((product) => product.active);

    renderCategories(categories);

    applyFilters();
  } catch (error) {
    console.error(error);

    grid.innerHTML = `
      <div class="empty-state">
        Error al cargar productos.
      </div>
    `;
  } finally {
    loader.style.display = "none";
  }
}

function renderCategories(categories) {
  const allButton = `
    <button
      class="category-btn active"
      data-category="Todos"
    >
      Todos
    </button>
  `;

  const categoryButtons = categories
    .filter((category) => category.active)
    .map(
      (category) => `
      <button
        class="category-btn"
        data-category="${category.name}"
      >
        ${category.name}
      </button>
    `
    )
    .join("");

  categoriesContainer.innerHTML = allButton + categoryButtons;

  document.querySelectorAll(".category-btn").forEach((button) => {
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".category-btn")
        .forEach((btn) => btn.classList.remove("active"));

      button.classList.add("active");

      activeCategory = button.dataset.category;

      applyFilters();
    });
  });
}

function applyFilters() {
  filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "Todos" ||
      product.categories?.some((category) => category.name === activeCategory);

    const matchesSearch = product.nombre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  renderProducts();
}

function renderProducts() {
  if (!filteredProducts.length) {
    grid.innerHTML = `
  <div class="empty-state">
    <h3>No encontramos productos</h3>

    <p>
      Probá con otra categoría o término de búsqueda.
    </p>
  </div>
`;

    return;
  }

  grid.innerHTML = filteredProducts.map(createCard).join("");
  productsCount.textContent = `${filteredProducts.length} productos encontrados`;

  activeCategoryLabel.textContent =
    activeCategory === "Todos"
      ? "Mostrando todas las categorías"
      : `Categoría: ${activeCategory}`;
}

function createCard(product) {
  console.log(product);
  const image = product.images?.[0]?.url || "./assets/img/no-image.png";

  const hasDiscount =
    product.discountedPrice !== null && Number(product.discountedPrice) > 0;

  const price = Number(product.price).toLocaleString("es-AR");

  const discountedPrice = Number(product.discountedPrice).toLocaleString(
    "es-AR"
  );

  const discountPercentage = hasDiscount
    ? Math.round(
        ((Number(product.price) - Number(product.discountedPrice)) /
          Number(product.price)) *
          100
      )
    : 0;

  console.log("Producto:", product.nombre);
  console.log("ID:", product.id);

  return `
    <article class="product-card">

      <div class="product-image-wrapper">

        ${
          hasDiscount
            ? `
      <span class="discount-badge">
        -${discountPercentage}%
      </span>
    `
            : ""
        }

        <img
          src="${image}"
          alt="${product.nombre}"
          class="product-image"
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
  onclick="goToProduct('${product.id}')"
>
  Ver producto
</button>

    </article>
  `;
}

function goToProduct(id) {
  console.log("Voy a navegar con el id:", id);
  window.location.href = `producto-detalle.html?id=${id}`;
}

window.addEventListener("search-products", (event) => {
  searchTerm = event.detail;

  applyFilters();
});

console.log(products);
