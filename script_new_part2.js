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
    document.getElementById('tokenPrice').textContent = `$${token.price.toFixed(2)}`;
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
