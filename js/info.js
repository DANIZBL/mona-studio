// ========================================
// INFORMACIÓN DEL LOCAL
// ========================================

const info = {
  telefono: "",
  email: "",

  direccion: "Av. Ejército, Pablo Crausaz &, Paraná, Entre Ríos",

  googleMaps:
    "https://www.google.com/maps/search/?api=1&query=Av.%20Ej%C3%A9rcito%2C%20Pablo%20Crausaz%20%26%2C%20Paran%C3%A1%2C%20Entre%20R%C3%ADos",
};

// ========================================
// TELÉFONO
// ========================================

const telefono = document.getElementById("infoTelefono");

if (info.telefono) {
  telefono.textContent = info.telefono;

  telefono.href = `tel:${info.telefono.replace(/\s/g, "")}`;
} else {
  telefono.textContent = "Próximamente";

  telefono.removeAttribute("href");
}

// ========================================
// EMAIL
// ========================================

const email = document.getElementById("infoEmail");

if (info.email) {
  email.textContent = info.email;

  email.href = `mailto:${info.email}`;
} else {
  email.textContent = "Próximamente";

  email.removeAttribute("href");
}
