// Wedding Invitation Interactive Effects
document.addEventListener('DOMContentLoaded', function() {
    // Add click effect to the card
    const card = document.querySelector('.invitation-card');
    
    if (card) {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.99)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // Typewriter effect for names
    const brideName = document.querySelector('.bride-name');
    const groomName = document.querySelector('.groom-name');
    
    if (brideName && groomName) {
        const names = [brideName, groomName];
        
        names.forEach((nameElement, index) => {
            const originalText = nameElement.textContent;
            nameElement.textContent = '';
            
            let i = 0;
            function typeWriter() {
                if (i < originalText.length) {
                    nameElement.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100 + (index * 200));
                }
            }
            
            // Start typing after a delay
            setTimeout(typeWriter, 500 + (index * 500));
        });
    }
    
    // Confetti effect on load
    setTimeout(() => {
        createConfetti();
    }, 2000);
});

function createConfetti() {
    const colors = ['#b76e79', '#d4a574', '#e8c8c8', '#f8e3e3'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -20px;
            left: ${Math.random() * 100}vw;
            opacity: 0.7;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            z-index: 9999;
            pointer-events: none;
        `;
        
        document.body.appendChild(confetti);
        
        // Animation
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: 2000 + Math.random() * 2000,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        });
        
        animation.onfinish = () => confetti.remove();
    }
}

// Common functions for both pages
function shareInvitation() {
    if (navigator.share) {
        navigator.share({
            title: 'Wedding Invitation',
            text: 'You are invited to our wedding!',
            url: window.location.href,
        });
    } else {
        alert('Share this link: ' + window.location.href);
    }
}

// Add share button if not exists
if (!document.querySelector('.share-btn')) {
    const shareBtn = document.createElement('button');
    shareBtn.className = 'share-btn';
    shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Share';
    shareBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #b76e79;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 50px;
        cursor: pointer;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    shareBtn.onclick = shareInvitation;
    document.body.appendChild(shareBtn);
}
