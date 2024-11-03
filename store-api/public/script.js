let currentPage = 1;

async function fetchProducts() {
    const nameFilter = document.getElementById('nameFilter').value;
    const companyFilter = document.getElementById('companyFilter').value;
    const featuredFilter = document.getElementById('featuredFilter').value;
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const minRating = document.getElementById('minRating').value;
    const maxRating = document.getElementById('maxRating').value;
    const sortFilter = document.getElementById('sortFilter').value;
    const limitFilter = document.getElementById('limitFilter').value;

    let url = new URL('/api/v1/products', window.location.origin);
    let params = new URLSearchParams();

    if (nameFilter) params.append('name', nameFilter);
    if (companyFilter) params.append('company', companyFilter);
    if (featuredFilter) params.append('featured', featuredFilter);
    if (sortFilter) params.append('sort', sortFilter);
    params.append('page', currentPage);
    params.append('limit', limitFilter);

    // Construct numeric filters
    let numericFilters = [];
    if (minPrice) numericFilters.push(`price>=${minPrice}`);
    if (maxPrice) numericFilters.push(`price<=${maxPrice}`);
    if (minRating) numericFilters.push(`rating>=${minRating}`);
    if (maxRating) numericFilters.push(`rating<=${maxRating}`);
    
    if (numericFilters.length > 0) {
        params.append('numericFilters', numericFilters.join(','));
    }

    url.search = params.toString();

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        displayProducts(data.products);
        document.getElementById('currentPage').textContent = `Page ${currentPage}`;
        document.getElementById('error').textContent = '';
    } catch (error) {
        document.getElementById('error').textContent = 'Error fetching products. Please try again.';
        console.error('Error:', error);
    }
}

function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>Rating: ${product.rating}</p>
            <p>Company: ${product.company}</p>
            <p>Featured: ${product.featured ? 'Yes' : 'No'}</p>
        `;
        productsContainer.appendChild(productCard);
    });
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchProducts();
    }
}

function nextPage() {
    currentPage++;
    fetchProducts();
}

// Initial load
fetchProducts();
