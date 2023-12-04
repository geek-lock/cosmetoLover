const btnCart = document.querySelector('.nav-item-buy');
const containerCartProducts = document.querySelector('.container-cart-products');
const btnProduct = document.querySelectorAll('.seeProduct');
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');
const productsList = document.querySelector('.service_container');
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');
const originalButtonColors = {};

document.addEventListener('click', (e) => {
    const targetElement = e.target;
  
    if (!containerCartProducts.contains(targetElement) && targetElement !== btnCart) {
        containerCartProducts.classList.add('hidden-cart');
    }
});

btnCart.addEventListener('click', (e) => {
    e.stopPropagation();
    containerCartProducts.classList.toggle('hidden-cart');
});

btnProduct.forEach(btn => {
    btn.addEventListener('click', () => {
        originalButtonColors[btn.id] = window.getComputedStyle(btn).backgroundColor;
        btn.style.backgroundColor = 'gray';
        Toastify({
            text: "Agregado al carrito!",
            style: {
                background: "linear-gradient(to right, #FF7272, #FF7272)",
            },        
            duration: 1200        
        }).showToast();

        const product = btn.parentElement;
        console.log('en el product: ',product);
        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h5').textContent,
            price: product.querySelector('p').textContent,
            divFoto: product.querySelector('.img-box'),
        };
        agregarAlCarrito(infoProduct);
		
    });
});

function agregarAlCarrito(infoProduct) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];	
    const existe = carrito.find(producto => producto.title === infoProduct.title);
    if (existe) {
        existe.quantity++;
    } else {
        carrito.push(infoProduct);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function eliminarDelCarrito(productTitle) {
    carrito = carrito.filter(product => product.title !== productTitle);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    window.dispatchEvent(new Event('carritoActualizado'));
}

function updateButtonColors() {
    btnProduct.forEach(btn => {
        const productTitle = btn.parentElement.querySelector('h5').textContent;
        if (carrito.some(product => product.title === productTitle)) {
            btn.style.backgroundColor = 'gray';
        } else {
            btn.style.backgroundColor = originalButtonColors[btn.id];
        }
    });
}

function showCountProduct(){
    if(carrito.length === 0){
        document.getElementById('count-products').style.display = 'none';
    } else {
        document.getElementById('count-products').style.display = 'flex';
		
    }
}

productsList.addEventListener('click', e => {
    if (e.target.classList.contains('seeProduct')) {
        const product = e.target.parentElement;        
        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h5').textContent,
            price: product.querySelector('p').textContent,
        };
        
        const exits = carrito.some(
            product => product.title === infoProduct.title
        );
        if (exits) {
            const products = carrito.map(product => {
                if (product.title === infoProduct.title) {
                    product.quantity++;
                    return product;
                } else {
                    return product;
                }
            });
            carrito = [...products];
        } else {
            carrito = [...carrito, infoProduct];
        }
        showCountProduct();
        showHTML();
        updateButtonColors();
    }
});

rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;
        containerCartProducts.classList.toggle('hidden-cart');
        carrito = carrito.filter(product => product.title !== title);
        showHTML();
        showCountProduct();
        updateButtonColors();
        eliminarDelCarrito();
        Toastify({
            text: "Item eliminado!",
            style: {
                background: "linear-gradient(to right, #FF7272, #FF7272)",
            },        
            duration: 1000        
        }).showToast();
    }
});

const showHTML = () => {
    if (!carrito.length) {
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }
    rowProduct.innerHTML = '';
    let total = 0;
    let totalOfProducts = 0;
	let titleProduct = [];
    carrito.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');
        
        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 5 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;
        rowProduct.append(containerProduct);
        total = total + parseInt(product.quantity * product.price.slice(1));
        totalOfProducts = totalOfProducts + product.quantity;
		titleProduct = product.title;
    });
	showCountProduct();
    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;
    updateButtonColors();
};

function actualizarEstadoBotones() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    btnProduct.forEach(btn => {
        const buttonTitle = btn.parentElement.querySelector('h5').textContent;
        const isInCart = carrito.some(product => product.title === buttonTitle);
        btn.style.backgroundColor = isInCart ? 'gray' :  originalButtonColors[btn.id];
    });
}

window.addEventListener('carritoActualizado', actualizarEstadoBotones);
actualizarEstadoBotones();
document.addEventListener('DOMContentLoaded', showHTML);
