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
        visitorCount.textContent = Math.floor(Math.random() * 46) + 3;
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
            "priceChange": 1.3,
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
            "priceChange": 0.8,
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
            "priceChange": 1.7,
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
            "priceChange": 0.5,
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
            "priceChange": 2.1,
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
            "priceChange": 1.9,
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
            "priceChange": 0.3,
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
            "priceChange": 1.1,
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
            "priceChange": 0.7,
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
            "priceChange": 1.5,
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
                    $${token.price}
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
// Render token grid on tokens page
function renderTokenGrid() {
    const tokenGrid = document.getElementById('tokenGrid');
    tokenGrid.innerHTML = '';

    // Sort tokens based on current sort option
    let sortedTokens = [...tokens];
    
    // Create category header for current sort
    const categoryHeader = document.createElement('div');
    categoryHeader.className = 'category-header';
    
    switch (currentSort) {
        case 'newest':
            sortedTokens.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            categoryHeader.innerHTML = '<h3>New NEWEST</h3>';
            break;
        case 'popular':
            sortedTokens.sort((a, b) => b.purchases - a.purchases);
            categoryHeader.innerHTML = '<h3>Popular MOST PURCHASED</h3>';
            break;
        case 'viewed':
            sortedTokens.sort((a, b) => b.views - a.views);
            categoryHeader.innerHTML = '<h3>Viewed MOST VIEWED</h3>';
            break;
    }
    
    tokenGrid.appendChild(categoryHeader);
    
    // Display tokens for current page
    const startIndex = (currentPage - 1) * tokensPerPage;
    const endIndex = startIndex + tokensPerPage;
    const tokensToShow = sortedTokens.slice(startIndex, endIndex);
    
    if (tokensToShow.length === 0) {
        const noTokens = document.createElement('div');
        noTokens.className = 'no-tokens';
        noTokens.innerHTML = '<p>No tokens available in this category.</p>';
        tokenGrid.appendChild(noTokens);
    } else {
        tokensToShow.forEach(token => {
            const tokenCard = createTokenCard(token);
            tokenGrid.appendChild(tokenCard);
        });
    }

    // Setup load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        if (endIndex >= sortedTokens.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
            loadMoreBtn.onclick = () => {
                currentPage++;
                renderTokenGrid();
            };
        }
    }
}

// Render wall of fame
function renderWallOfFame() {
    const wallOfFame = document.getElementById('wallOfFame');
    
    // Sort tokens by purchases (popularity)
    const popularTokens = [...tokens].sort((a, b) => b.purchases - a.purchases).slice(0, 5);
    
    popularTokens.forEach((token, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td align="center">${index + 1}</td>
            <td align="center">${token.name}</td>
            <td align="center">${token.symbol}</td>
            <td align="center">${token.purchases} buys</td>
        `;
        wallOfFame.appendChild(row);
    });
}

// Setup token detail page
function setupTokenDetailPage() {
    // Get token ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const tokenId = parseInt(urlParams.get('id'));
    
    if (!tokenId) {
        window.location.href = 'tokens.html';
        return;
    }
    
    // Find token by ID
    const token = tokens.find(t => t.id === tokenId);
    
    if (!token) {
        window.location.href = 'tokens.html';
        return;
    }
    
    // Update token details
    document.getElementById('tokenName').textContent = token.name;
    document.getElementById('tokenSymbol').textContent = token.symbol;
    document.getElementById('tokenDescription').textContent = token.description;
    document.getElementById('tokenPrice').textContent = `$${token.price}`;
    document.getElementById('tokenPriceChange').textContent = `${token.priceChange >= 0 ? '+' : ''}${token.priceChange}%`;
    document.getElementById('tokenPriceChange').className = token.priceChange >= 0 ? 'token-price-up' : 'token-price-down';
    document.getElementById('tokenImage').src = token.image;
    document.getElementById('tokenCreatedAt').textContent = formatDate(token.createdAt);
    document.getElementById('tokenViews').textContent = token.views;
    document.getElementById('tokenPurchases').textContent = token.purchases;
    
    // Setup price chart
    setupPriceChart(token);
    
    // Setup trading buttons
    setupTradingButtons(token);
    
    // Load comments
    loadComments(token);
    
    // Setup share buttons
    setupShareButtons(token);
}

// Setup price chart
function setupPriceChart(token) {
    const chartContainer = document.getElementById('priceChart');
    
    // Generate random price data for the chart
    const days = 30;
    const priceData = [];
    let currentPrice = token.price / (1 + (token.priceChange / 100));
    
    for (let i = days; i >= 0; i--) {
        // Generate random daily change
        const dailyChange = (Math.random() * 0.1) - 0.05;
        
        // For the last day, ensure it matches the current price
        if (i === 0) {
            currentPrice = token.price;
        } else {
            currentPrice = currentPrice * (1 + dailyChange);
        }
        
        priceData.push({
            day: i,
            price: currentPrice
        });
    }
    
    // Create chart HTML
    let chartHTML = '<div class="chart-container">';
    chartHTML += '<div class="chart-y-axis">';
    
    // Y-axis labels
    const maxPrice = Math.max(...priceData.map(d => d.price)) * 1.1;
    const minPrice = Math.min(...priceData.map(d => d.price)) * 0.9;
    const priceRange = maxPrice - minPrice;
    
    for (let i = 5; i >= 0; i--) {
        const price = minPrice + (priceRange * (i / 5));
        chartHTML += `<div class="chart-y-label">$${price.toFixed(2)}</div>`;
    }
    
    chartHTML += '</div>';
    chartHTML += '<div class="chart-content">';
    
    // Chart bars
    priceData.forEach(data => {
        const height = ((data.price - minPrice) / priceRange) * 100;
        const barColor = data.price >= priceData[data.day + 1]?.price ? '#00FF00' : '#FF0000';
        
        chartHTML += `<div class="chart-bar" style="height: ${height}%; background-color: ${barColor};" title="Day ${days - data.day}: $${data.price.toFixed(2)}"></div>`;
    });
    
    chartHTML += '</div>';
    chartHTML += '<div class="chart-x-axis">';
    
    // X-axis labels
    for (let i = 0; i <= 5; i++) {
        const day = Math.floor((days * i) / 5);
        chartHTML += `<div class="chart-x-label">Day ${day}</div>`;
    }
    
    chartHTML += '</div>';
    chartHTML += '</div>';
    
    // Add chart to container
    chartContainer.innerHTML = chartHTML;
}

// Setup buy/sell buttons
function setupTradingButtons(token) {
    const buyButton = document.getElementById('buyButton');
    const sellButton = document.getElementById('sellButton');
    
    if (buyButton) {
        buyButton.addEventListener('click', () => {
            showErrorPopups();
        });
    }
    
    if (sellButton) {
        sellButton.addEventListener('click', () => {
            showErrorPopups();
        });
    }
}
// Load comments
function loadComments(token) {
    const commentsContainer = document.getElementById('comments');
    
    // Generate random comments
    const commentCount = Math.floor(Math.random() * 5) + 3;
    const commentAuthors = ['CryptoWhale', 'TokenMaster', 'MoonLambo', 'DiamondHands', 'HODLer', 'Satoshi2.0', 'CryptoKing'];
    const commentTexts = [
        'This token is going to the moon! 🚀🚀🚀',
        'Just bought a bag. LFG!!!',
        'Undervalued gem. This will 100x easily.',
        'The team behind this is amazing!',
        'Bullish AF on this one!',
        'Best tokenomics I\'ve seen in a while.',
        'Diamond hands only! 💎👐',
        'Selling my house to buy more!',
        'This is the next big thing!',
        'Early investors will be rewarded!'
    ];
    
    // Clear loading message
    commentsContainer.innerHTML = '';
    
    // Add comment form
    const commentForm = document.createElement('div');
    commentForm.className = 'comment-form';
    commentForm.innerHTML = `
        <textarea placeholder="Add your comment..." rows="3"></textarea>
        <button class="comment-submit">SUBMIT</button>
    `;
    commentsContainer.appendChild(commentForm);
    
    // Add event listener to comment submit button
    const submitButton = commentForm.querySelector('.comment-submit');
    submitButton.addEventListener('click', () => {
        showErrorPopups();
    });
    
    // Add comments
    for (let i = 0; i < commentCount; i++) {
        const commentAuthor = commentAuthors[Math.floor(Math.random() * commentAuthors.length)];
        const commentText = commentTexts[Math.floor(Math.random() * commentTexts.length)];
        const daysAgo = Math.floor(Math.random() * 7) + 1;
        
        const comment = document.createElement('div');
        comment.className = 'comment';
        comment.innerHTML = `
            <div class="comment-header">
                <div class="comment-author">${commentAuthor}</div>
                <div class="comment-date">${daysAgo} days ago</div>
            </div>
            <div class="comment-text">${commentText}</div>
        `;
        
        commentsContainer.appendChild(comment);
    }
}

// Setup share buttons
function setupShareButtons(token) {
    const shareButtons = document.querySelectorAll('.share-button');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            showErrorPopups();
        });
    });
}

// Setup sorting on tokens page
function setupSorting() {
    const sortButtons = document.querySelectorAll('.sort-button');
    
    sortButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sortType = button.getAttribute('data-sort');
            currentSort = sortType;
            currentPage = 1;
            renderTokenGrid();
            
            // Update active button
            sortButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
    
    // Set initial active button
    const initialActiveButton = document.querySelector(`.sort-button[data-sort="${currentSort}"]`);
    if (initialActiveButton) {
        initialActiveButton.classList.add('active');
    }
}

// Setup forms
function setupForms() {
    const createTokenForm = document.getElementById('createTokenForm');
    
    if (createTokenForm) {
        createTokenForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const tokenName = document.getElementById('tokenName').value;
            const tokenSymbol = document.getElementById('tokenSymbol').value;
            const tokenDescription = document.getElementById('tokenDescription').value;
            
            // Create new token
            const newToken = {
                id: tokens.length + 1,
                name: tokenName,
                symbol: tokenSymbol.toUpperCase(),
                description: tokenDescription,
                image: 'images/token/new_token.jpg',
                createdAt: new Date().toISOString(),
                price: Math.random() * 2 + 0.1,
                priceChange: Math.floor(Math.random() * 80) + 20,
                views: Math.floor(Math.random() * 500) + 100,
                purchases: Math.floor(Math.random() * 200) + 50
            };
            
            // Add token to array
            tokens.unshift(newToken);
            
            // Save to localStorage
            localStorage.setItem('memeTokens', JSON.stringify(tokens));
            
            // Redirect to success page
            window.location.href = 'token_created.html';
        });
    }
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            showErrorPopups();
        });
    }
}

// Setup share links for new token
function setupNewTokenShare(token) {
    const shareContainer = document.getElementById('shareLinks');
    
    if (!shareContainer) return;
    
    const shareLinks = [
        { name: 'Twitter', icon: 'images/icon/twitter.png' },
        { name: 'Facebook', icon: 'images/icon/facebook.png' },
        { name: 'Telegram', icon: 'images/icon/telegram.png' }
    ];
    
    shareLinks.forEach(link => {
        const shareLink = document.createElement('a');
        shareLink.href = '#';
        shareLink.className = 'share-link';
        shareLink.innerHTML = `
            <img src="${link.icon}" alt="${link.name}">
            <span>Share on ${link.name}</span>
        `;
        
        shareLink.addEventListener('click', (e) => {
            e.preventDefault();
            showErrorPopups();
        });
        
        shareContainer.appendChild(shareLink);
    });
}

// Setup gallery selection
function setupGallery() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    if (galleryImages.length === 0) return;
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            // Remove active class from all images
            galleryImages.forEach(img => img.classList.remove('active'));
            
            // Add active class to clicked image
            this.classList.add('active');
            
            // Update selected image
            document.getElementById('selectedImage').value = this.getAttribute('data-image');
        });
    });
}

// Setup audio controls
function setupAudio() {
    const toggleAudio = document.getElementById('toggleAudio');
    const bgMusic = document.getElementById('bgMusic');
    const soundIcon = document.getElementById('soundIcon');
    
    if (!toggleAudio || !bgMusic || !soundIcon) return;
    
    toggleAudio.addEventListener('click', function() {
        if (audioPlaying) {
            bgMusic.pause();
            soundIcon.src = 'images/icon/info.png';
        } else {
            bgMusic.play().catch(e => console.log('Audio playback failed:', e));
            soundIcon.src = 'images/icon/info.png';
        }
        
        audioPlaying = !audioPlaying;
    });
}

// Setup random popup
function setupRandomPopup() {
    const randomPopup = document.getElementById('randomPopup');
    
    if (!randomPopup) return;
    
    // Show popup after random time
    setTimeout(() => {
        randomPopup.style.display = 'block';
    }, Math.random() * 20000 + 10000);
    
    // Close button
    const closeButton = randomPopup.querySelector('.close-popup');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            randomPopup.style.display = 'none';
        });
    }
    
    // Claim button
    const claimButton = randomPopup.querySelector('.popup-button');
    if (claimButton) {
        claimButton.addEventListener('click', () => {
            const virusContainer = document.getElementById('virus-container');
            if (virusContainer) {
                virusContainer.style.display = 'block';
                
                // Play virus sound if available
                try {
                    const virusSound = new Audio('audio/virus.mp3');
                    virusSound.play();
                } catch (e) {
                    console.log('Virus sound not available');
                }
                
                // Show error popups after a delay
                setTimeout(() => {
                    showErrorPopups();
                }, 3000);
            }
        });
    }
}

// Helper function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
