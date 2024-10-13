let carrito = [];

// Función para abrir el modal del producto
function abrirModal(nombre, precio, imagen) {
    document.getElementById("modalProducto").style.display = "block";
    document.getElementById("modalNombre").innerText = nombre;
    document.getElementById("modalPrecio").innerText = `Precio: $${precio}`;
    document.getElementById("modalImagen").src = imagen;
    document.getElementById("modalCantidad").value = "";
    document.getElementById("modalCantidad").setAttribute("data-nombre", nombre);
    document.getElementById("modalCantidad").setAttribute("data-precio", precio);
    
    // Asegurarse de que los elementos "Cantidad" y "Agregar al Carrito" estén visibles
    document.getElementById("modalCantidad").style.display = "block";
    document.getElementById("agregarAlCarritoDesdeModal").style.display = "block";
    
    // Eliminar el mensaje "Agregado" si existe
    const agregadoMsg = document.getElementById("agregadoMsg");
    if (agregadoMsg) {
        agregadoMsg.remove();
    }
}

// Función para cerrar el modal del producto
function cerrarModal() {
    document.getElementById("modalProducto").style.display = "none";
    
    // Restaurar el botón y el campo de cantidad
    document.getElementById("modalCantidad").style.display = "block";
    document.getElementById("agregarAlCarritoDesdeModal").style.display = "block";
    
    // Eliminar el mensaje "Agregado" si existe
    const agregadoMsg = document.getElementById("agregadoMsg");
    if (agregadoMsg) {
        agregadoMsg.remove();
    }
}

// Función para agregar el producto al carrito desde el modal
function agregarAlCarritoDesdeModal() {
    const nombre = document.getElementById("modalCantidad").getAttribute("data-nombre");
    const precio = parseFloat(document.getElementById("modalCantidad").getAttribute("data-precio"));
    const cantidad = parseInt(document.getElementById("modalCantidad").value);

    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, ingresa una cantidad válida.");
        return;
    }

    const totalProducto = precio * cantidad;
    carrito.push({ producto: nombre, precio: totalProducto, cantidad: cantidad });

    guardarCarrito();
    renderizarCarrito();

    // Ocultar "Cantidad" y "Agregar al Carrito"
    document.getElementById("modalCantidad").style.display = "none";
    document.getElementById("agregarAlCarritoDesdeModal").style.display = "none";
    
    // Mostrar "Agregado"
    const agregadoMsg = document.createElement("span");
    agregadoMsg.innerText = "AGREGADO EXITOSAMENTE !!";
    agregadoMsg.id = "agregadoMsg";
    document.getElementById("modalContenido").appendChild(agregadoMsg);
}

// Función para abrir el modal del carrito
function abrirCarrito() {
    document.getElementById("modalCarrito").style.display = "block";
    renderizarCarrito();
}

// Función para cerrar el modal del carrito
function cerrarCarrito() {
    document.getElementById("modalCarrito").style.display = "none";
}

// Función para renderizar el carrito en el modal
function renderizarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = ""; // Limpiar el carrito
    
    carrito.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${item.producto} - Cantidad: ${item.cantidad}, Subtotal: $${item.precio} 
            <button onclick="eliminarProducto(${index})">Eliminar</button>`;
        listaCarrito.appendChild(li);
    });

    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    document.getElementById("total").innerText = `Total: $${total}`;
}

// Función para eliminar un producto específico del carrito
function eliminarProducto(index) {
    carrito.splice(index, 1); // Eliminar producto en el índice dado
    guardarCarrito();
    renderizarCarrito();
}

// Función para vaciar el carrito completo
function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    renderizarCarrito();
}

// Función para simular el pago
function pagar() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de pagar.");
    } else {
        alert(`Gracias por tu compra! Total pagado: $${carrito.reduce((sum, item) => sum + item.precio, 0)}`);
        vaciarCarrito();
    }
}

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Carga el carrito de localStorage al inicio
window.onload = function() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        renderizarCarrito();
    }
};
