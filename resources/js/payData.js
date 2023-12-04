let carrito = JSON.parse(localStorage.getItem('carrito'));
let cart = carrito.length;
let tituloProducto = 0;

for(let i = 0; i< carrito.length;i++){
    tituloProducto = carrito[i].title;
    toggleProductInCart(tituloProducto);
}

function toggleProductInCart(productTitle) {
    const tableBody = document.querySelector('.table-group-divider');
    const existingRow = [...tableBody.children].find(row => row.dataset.title === productTitle );
    
    if (existingRow) {
        existingRow.remove();
    } else {
		
		const product = carrito.find(product => product.title === productTitle);
        const newRow = document.createElement('tr');
        newRow.dataset.title = product.title;
		document.getElementById('car-clear').style.display = 'none';
        
        const divFotoAsString = product.divFoto.toString(); 
        console.log("dentro del toggle: " + divFotoAsString);
		newRow.innerHTML = `
            <th scope="row" id='prueba1' style = "background:'url(' + + ')'  ">${divFotoAsString}</th>
            <td>${product.title}</td>
            <td>${product.quantity}</td>
            <td>$${(product.quantity * parseInt(product.price.slice(1))).toFixed(2)}</td>
        `;
        tableBody.appendChild(newRow);       
    
    }
	
}


  
  