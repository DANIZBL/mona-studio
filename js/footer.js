document.addEventListener("DOMContentLoaded", () => {
  const footerContainer = document.getElementById("footer-container");

  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <footer class="footer">
      <div class="footer-container">

        <!-- SEGUINOS -->
        <div class="footer-column">
          <h3 class="footer-toggle">SEGUINOS</h3>
          <div class="footer-content">
            <div class="social-icons">
              <a
                href="https://www.instagram.com/TU_USUARIO/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <img
                  src="./src/img/redes1.png"
                  alt="Instagram"
                  class="social-icon"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>

        <!-- NAVEGACIÓN -->
        <div class="footer-column">
          <h3 class="footer-toggle">NAVEGACIÓN</h3>
          <div class="footer-content">
            <ul>
              <li><a href="./index.html">INICIO</a></li>
              <li><a href="./servicios.html">SERVICIOS</a></li>
              <li><a href="./tienda.html">TIENDA</a></li>
              <li><a href="./cursos.html">CURSOS</a></li>
              <li><a href="./contacto.html">INFO Y CONTACTO</a></li>
            </ul>
          </div>
        </div>

        <!-- CONTACTO -->
        <div class="footer-column">
          <h3 class="footer-toggle">CONTACTÁNOS</h3>
          <div class="footer-content">
            <p>
              <a
                href="https://wa.me/549XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-contact-link"
              >
                <i class="fa-brands fa-whatsapp"></i>
                WHATSAPP
              </a>
            </p>

            <p>
              <a href="mailto:TU_EMAIL@ejemplo.com">
                EMAIL
              </a>
            </p>

            <p class="footer-address">
              <span aria-hidden="true">📍</span>
              DIRECCIÓN
            </p>
          </div>
        </div>

      </div>
    </footer>
  `;
});

document.addEventListener("DOMContentLoaded", () => {
  const footerContainer = document.getElementById("footer-container");

  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <footer class="footer">
      <div class="footer-container">

        <!-- SEGUINOS -->
        <div class="footer-column">
          <h3 class="footer-toggle">SEGUINOS</h3>
          <div class="footer-content">
            <div class="social-icons">
              <a
                href="https://www.instagram.com/TU_USUARIO/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <img
                  src="./src/img/redes1.png"
                  alt="Instagram"
                  class="social-icon"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>

        <!-- NAVEGACIÓN -->
        <div class="footer-column">
          <h3 class="footer-toggle">NAVEGACIÓN</h3>
          <div class="footer-content">
            <ul>
              <li><a href="./index.html">INICIO</a></li>
              <li><a href="#servicios">SERVICIOS</a></li>
              <li><a href="./productos.html">TIENDA</a></li>
              <li><a href="#cursos">CURSOS</a></li>
              <li><a href="./info.html">INFO Y CONTACTO</a></li>
            </ul>
          </div>
        </div>

        <!-- CONTACTO -->
        <div class="footer-column">
          <h3 class="footer-toggle">CONTACTÁNOS</h3>
          <div class="footer-content">
           <p>
  <a
    href="https://wa.me/3434578448"
    target="_blank"
    rel="noopener noreferrer"
    class="footer-contact-link"
  >
    <img
      src="./src/img/wsp_logo.webp"
      alt="WhatsApp"
      class="footer-whatsapp-icon"
      loading="lazy"
    />
    WHATSAPP
  </a>
</p>

           <p class="footer-address">
  <a
    href="https://google.com/maps/search/?api=1&query=Av.%20Ejército%2C%20Pablo%20Crausaz%20%26%2C%20Paraná%2C%20Entre%20Ríos"
    target="_blank"
    rel="noopener noreferrer"
    class="footer-contact-link"
  >
    <span aria-hidden="true">📍</span>
    DIRECCIÓN
  </a>
</p>
          </div>
        </div>

      </div>
    </footer>
  `;
});
