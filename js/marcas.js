const marcas = [
  {
    nombre: "Marca 1",
    imagen: "../src/marcas/marca1.webp",
  },
  {
    nombre: "Marca 2",
    imagen: "../src/marcas/marca2.webp",
  },
  {
    nombre: "Marca 3",
    imagen: "../src/marcas/marca3.webp",
  },
  {
    nombre: "Marca 4",
    imagen: "../src/marcas/marca4.webp",
  },
  {
    nombre: "Marca 5",
    imagen: "../src/marcas/marca5.webp",
  },
  {
    nombre: "Marca 6",
    imagen: "../src/marcas/marca6.webp",
  },
  {
    nombre: "Marca 7",
    imagen: "../src/marcas/marca7.webp",
  },
  {
    nombre: "Marca 8",
    imagen: "../src/marcas/marca8.webp",
  },
  {
    nombre: "Marca 9",
    imagen: "../src/marcas/marca9.webp",
  },
  {
    nombre: "Marca 10",
    imagen: "../src/marcas/marca10.webp",
  },
  {
    nombre: "Marca 11",
    imagen: "../src/marcas/marca11.webp",
  },
  {
    nombre: "Marca 12",
    imagen: "../src/marcas/marca12.webp",
  },
  {
    nombre: "Marca 13",
    imagen: "../src/marcas/marca13.webp",
  },
  {
    nombre: "Marca 14",
    imagen: "../src/marcas/marca14.webp",
  },
  {
    nombre: "Marca 15",
    imagen: "../src/marcas/marca15.webp",
  },
  {
    nombre: "Marca 16",
    imagen: "../src/marcas/marca16.webp",
  },
  {
    nombre: "Marca 17",
    imagen: "../src/marcas/marca17.webp",
  },
  {
    nombre: "Marca 18",
    imagen: "../src/marcas/marca18.webp",
  },
];

const marcasContainer = document.getElementById("marcasContainer");

function crearMarca(marca) {
  const marcaElement = document.createElement("div");

  marcaElement.classList.add("marca");

  marcaElement.innerHTML = `
    <img 
      src="${marca.imagen}" 
      alt="Logo ${marca.nombre}" 
      loading="lazy"
    >
  `;

  return marcaElement;
}

// Primera vuelta
marcas.forEach((marca) => {
  marcasContainer.appendChild(crearMarca(marca));
});

// Segunda vuelta
marcas.forEach((marca) => {
  marcasContainer.appendChild(crearMarca(marca));
});
