// MemeToken 2000 - Main JavaScript

// Global variables
let tokens = [];
let currentPage = 1;
let tokensPerPage = 5;
let currentSort = 'newest';
let audioPlaying = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize visitor counter with random number
    const visitorCount = document.getElementById('visitorCount');
    if (visitorCount) {
        visitorCount.textContent = Math.floor(Math.random() * 9000) + 1000;
    }
    
    // Clear localStorage to ensure fresh token data
    localStorage.removeItem('memeTokens');

    // Load tokens from JSON file
    loadTokens();

    // Setup audio controls
    setupAudio();

    // Setup random popup
    setupRandomPopup();

    // Setup form handlers
    setupForms();

    // Setup gallery selection
    setupGallery();

    // Setup token detail page if on that page
    if (window.location.pathname.includes('token.html')) {
        setupTokenDetailPage();
    }

    // Setup sorting if on tokens page
    if (window.location.pathname.includes('tokens.html')) {
        setupSorting();
    }
});

// Load tokens from JSON file
function loadTokens() {
    // Embed token data directly to avoid CORS issues when opening file:// URLs
    tokens = [
        {
            "id": 1,
            "name": "ZEUS",
            "symbol": "ZEUS",
            "description": "Powerful token with divine potential for decentralized finance",
            "image": "images/token/zeus.jpg",
            "createdAt": "2025-05-28T20:10:15",
            "price": 0.0002141,
            "priceChange": 45,
            "views": 1200,
            "purchases": 350
        },
        {
            "id": 2,
            "name": "TELEGROK",
            "symbol": "TGRK",
            "description": "Innovative token for next-generation messaging platforms",
            "image": "images/token/TELEGROK.jpg",
            "createdAt": "2025-05-28T19:45:30",
            "price": 0.045287,
            "priceChange": 62,
            "views": 980,
            "purchases": 410
        },
        {
            "id": 3,
            "name": "moonpig",
            "symbol": "MPIG",
            "description": "Flying pig aiming for the moon with stellar returns",
            "image": "images/token/moonpig.jpg",
            "createdAt": "2025-05-28T19:20:45",
            "price": 0.03710,
            "priceChange": 28,
            "views": 850,
            "purchases": 180
        },
        {
            "id": 4,
            "name": "AIGOV",
            "symbol": "AIGV",
            "description": "Token at the intersection of artificial intelligence and governance",
            "image": "images/token/AIGOV.jpg",
            "createdAt": "2025-05-28T18:55:22",
            "price": 0.01198,
            "priceChange": 33,
            "views": 1500,
            "purchases": 290
        },
        {
            "id": 5,
            "name": "Mofumofu",
            "symbol": "MOFU",
            "description": "Fluffy token with Japanese character and kawaii appeal",
            "image": "images/token/Mofumofu.jpg",
            "createdAt": "2025-05-28T18:30:11",
            "price": 0.047964,
            "priceChange": 18,
            "views": 720,
            "purchases": 150
        },
        {
            "id": 6,
            "name": "LC SHIB",
            "symbol": "LCSH",
            "description": "Low-cap version of a popular meme token with massive growth potential",
            "image": "images/token/LC_SHIB.jpg",
            "createdAt": "2025-05-28T18:05:33",
            "price": 0.006038,
            "priceChange": 95,
            "views": 2100,
            "purchases": 620
        },
        {
            "id": 7,
            "name": "wynning",
            "symbol": "WYN",
            "description": "The token for true winners in the crypto space",
            "image": "images/token/wynning.jpg",
            "createdAt": "2025-05-28T17:40:55",
            "price": 1.34,
            "priceChange": 22,
            "views": 930,
            "purchases": 240
        },
        {
            "id": 8,
            "name": "FROGGE",
            "symbol": "FROG",
            "description": "Amphibious token leaping to new heights in the meme ecosystem",
            "image": "images/token/FROGGE.jpg",
            "createdAt": "2025-05-28T17:15:20",
            "price": 0.002932,
            "priceChange": 56,
            "views": 1050,
            "purchases": 380
        },
        {
            "id": 9,
            "name": "SPODER",
            "symbol": "SPDR",
            "description": "Web-spinning token capturing the internet's attention",
            "image": "images/token/SPODER.jpg",
            "createdAt": "2025-05-28T16:50:10",
            "price": 0.67,
            "priceChange": 41,
            "views": 890,
            "purchases": 270
        },
        {
            "id": 10,
            "name": "DOGE 3.0",
            "symbol": "DOG3",
            "description": "Third generation of the original meme token with enhanced features",
            "image": "images/token/DOGE_3.jpg",
            "createdAt": "2025-05-28T16:25:45",
            "price": 0.08827,
            "priceChange": 78,
            "views": 2500,
            "purchases": 820
        }
    ];

    // Render token feed on home page if element exists
    if (document.getElementById('tokenFeed')) {
        renderTokenFeed();
    }

    // Render token grid on tokens page if element exists
    if (document.getElementById('tokenGrid')) {
        renderTokenGrid();
    }

    // Render wall of fame if element exists
    if (document.getElementById('wallOfFame')) {
        renderWallOfFame();
    }
}

// Render token feed on home page
function renderTokenFeed() {
    const tokenFeed = document.getElementById('tokenFeed');
    const loading = tokenFeed.querySelector('.loading');
    
    if (loading) {
        loading.remove();
    }
    
    // Display only the newest 3 tokens
    const newestTokens = [...tokens].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);
    
    newestTokens.forEach(token => {
        const tokenCard = createTokenCard(token);
        tokenFeed.appendChild(tokenCard);
    });
}

// Create token card element as a list item
function createTokenCard(token) {
    const listItem = document.createElement('div');
    listItem.className = 'token-list-item';
    listItem.innerHTML = `
        <div class="token-image-container">
            <img src="${token.image}" alt="${token.name}" class="token-image">
        </div>
        <div class="token-details">
            <div class="token-header">
                <div class="token-name">${token.name}</div>
                <div class="token-symbol">${token.symbol}</div>
            </div>
            <div class="token-description">${token.description}</div>
            <div class="token-stats">
                <div class="token-price">
                    $${token.price.toFixed(2)}
                    <span class="${token.priceChange >= 0 ? 'token-price-up' : 'token-price-down'}">
                        ${token.priceChange >= 0 ? '+' : ''}${token.priceChange}%
                    </span>
                </div>
                <div class="token-metrics">
                    <div class="token-views">👁️ ${token.views} views</div>
                    <div class="token-purchases">🛒 ${token.purchases} purchases</div>
                </div>
            </div>
        </div>
    `;
    
    // Add click event to show multiple error popups
    listItem.addEventListener('click', () => {
        showErrorPopups();
    });
    
    return listItem;
}
