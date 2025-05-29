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
