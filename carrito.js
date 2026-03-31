function mostrarCarrito() {

  const contenedor = document.getElementById("lista-carrito");
  const totalHTML = document.getElementById("total");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  contenedor.innerHTML = "";
  let total = 0;

  carrito.forEach((producto, index) => {

    total += producto.precio;

    contenedor.innerHTML += `
      <div class="item-carrito">
        <img src="${producto.imagen}" width="80">
        <div>
          <h4>${producto.nombre}</h4>
          <p>S/ ${producto.precio}</p>
        </div>
        <button onclick="eliminarProducto(${index})">
          ❌
        </button>
      </div>
    `;
  });

  totalHTML.textContent = "Total: S/ " + total;
}

function eliminarProducto(index) {

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.splice(index, 1);

  localStorage.setItem("carrito", JSON.stringify(carrito));

  mostrarCarrito();
}

function comprar() {

  alert("Compra simulada ✅\nPronto tendremos pagos reales.");

  localStorage.removeItem("carrito");

  mostrarCarrito();
}

mostrarCarrito();
