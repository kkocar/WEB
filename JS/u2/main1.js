

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
