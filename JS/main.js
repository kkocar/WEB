// Array mit Objekten
const products = [
    { name: "Laptop", price: 699 },
    { name: "Handy", price: 299 },
    { name: "Tablet", price: 399 },
];


const productList = document.getElementById("productList");
products.forEach((product => {
    const listItem = document.createElement("li");
    listItem.innerHTML = product.name + " - " + product.price + "Eur";
    productList.appendChild(listItem);
}));


//FILTER
const search = document.getElementById("search");
search.addEventListener("input", function (event) {
    const userInput = event.target.value.toLowerCase();

    // nach Benutzereingabe filtern
    const filtered = products.filter((product) => {
        return product.name.toLowerCase().includes(userInput);
    });

    // Liste leeren
    productList.innerHTML = "";
    // Iteration aller elemente
    filtered.forEach((product) => {
        // list element erstellen
        const listItem = document.createElement("li");
        //inhalt mit daten befüllen
        listItem.innerHTML = product.name + " - " + product.price + "Eur";
        // element zur liste hinzufügen
        productList.appendChild(listItem);
    });
});

/*
// Einfachste Form
fetch('https://dummyjson.com/products?limit=5')
 .then(response => response.json())
 .then(data => {
 console.log('Anzahl Produkte:', data.products.length);
 
 // Erstes Produkt anzeigen
 const firstProduct = data.products[0];
 console.log('Erstes Produkt:', firstProduct.title);
 console.log('Preis:', firstProduct.price);
 });

*/
/*
 // Nachher: Echte API-Daten
let allProducts = []; // Globale Variable für alle Produkte
function loadProducts() {
 fetch('https://dummyjson.com/products?limit=20')
 .then(response => response.json())
 .then(data => {
 allProducts = data.products;
 showProducts(allProducts); // Alle Produkte anzeigen
 })
 .catch(error => {
 console.error('Fehler beim Laden der Produkte:', error);
 showError('Produkte konnten nicht geladen werden.');
 });
}
*/
/*
//.name local, .title von API
function showProducts(products) {
    const container =
   document.getElementById("container");
    // Produkte zum container hinzufügen
    products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
    <h3>${product.title || product.name}</h3> 
    <p class="price">€${product.price}</p>
    `;
    container.appendChild(productDiv);
    });
   }
   showProducts(products);



   loadProducts();
*/
// neue uebeung

   let allProducts = [];
   // DOM-Elemente
   const searchInput = document.getElementById('searchInput');
   const loadButton = document.getElementById('loadButton');
   const productContainer = document.getElementById('productContainer');
   const loading = document.getElementById('loading');
   const errorMessage = document.getElementById('errorMessage');
   // Event-Listener
   loadButton.addEventListener('click', loadProducts);
   searchInput.addEventListener('input', filterProducts);


// Produkte von API laden
function loadProducts() {
    showLoading(true);
    hideError();
    
    fetch('https://dummyjson.com/products?limit=20')
    .then(response => {
    if (!response.ok) {
    throw new Error('Netzwerk-Fehler: ' + response.status);
    }
    return response.json();
    })
    .then(data => {
    allProducts = data.products;
    showProducts(allProducts);
    showLoading(false);
    })
    .catch(error => {
    console.error('Fehler:', error);
    showError('Fehler beim Laden der Produkte: ' + error.message);
    showLoading(false);
    });
   }
   

// Produkte filtern (wie vorher)
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = allProducts.filter(product =>
    product.title.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
    );
    showProducts(filtered);
   }
   
// Produkte anzeigen (erweitert)
function showProducts(products) {
    if (products.length === 0) {
    productContainer.innerHTML = '<p>Keine Produkte gefunden.</p>';
    return;
    }
    
    const html = products.map(product => `
    <div class="product">
    <img src="${product.thumbnail}" alt="${product.title}" 
    style="width: 100%; height: 150px; object-fit: cover;">
    <h3>${product.title}</h3>
    <p class="category">${product.category.toUpperCase()}</p>
    <p class="price">€${product.price}</p>
    <p class="description">${product.description.substring(0, 100)}...
   </p>
    </div>
    `).join('');
    
    productContainer.innerHTML = html;
   }

   // Hilfsfunktionen
function showLoading(show) {
    loading.style.display = show ? 'block' : 'none';
   }
   function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
   }
   function hideError() {
    errorMessage.style.display = 'none';
   }
   

   function loadProducts() {
    fetch('https://dummyjson.com/products', {
    method: 'GET',
    headers: {
    'Accept': 'application/json'
    }
    })
    .then(response => {
    // HTTP-Status prüfen
    if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
    })
    .then(data => {
        // Datenstruktur validieren
        if (!data.products || !Array.isArray(data.products)) {
        throw new Error('Ungültige API-Response');
        }
        allProducts = data.products;
        showProducts(allProducts);
        })
        .catch(error => {
        // Benutzerfreundliche Fehlermeldung
        let message = 'Unbekannter Fehler';
        if (error.name === 'TypeError') {
        message = 'Keine Internetverbindung';
        } else if (error.message.includes('HTTP')) {
        message = 'Server-Fehler';
        }
        showError(message);
        });
       }
   


const text = "Hallo Welt";

text.includes("Welt"); // true
text.includes("welt"); // false
text.toLowerCase.includes("welt"); // true



/*

// Erstes Produkt
 console.log(products[0].name); // 'Laptop'
 console.log(products[0].price); // 699


 // Alle Produkte durchgehen
 products.forEach(function (product) {
  console.log(product.name + ": €" + product.price);
 });
 */
