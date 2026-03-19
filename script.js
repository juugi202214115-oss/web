// script.js

document.addEventListener('DOMContentLoaded', () => {

    // 1. Music Control
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;

    // Optional: Lower volume slightly for ambient sound
    bgMusic.volume = 0.5;

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.innerHTML = '🎵 Play Music';
            musicToggle.style.background = 'rgba(255, 255, 255, 0.8)';
            musicToggle.style.color = 'var(--text-color)';
        } else {
            bgMusic.play().catch(error => {
                console.log("Audio play failed:", error);
            });
            musicToggle.innerHTML = '⏸️ Pause Music';
            musicToggle.style.background = 'var(--primary-color)';
            musicToggle.style.color = '#fff';
        }
        isPlaying = !isPlaying;
    });

    // 2. Typing Effect for Hero Title
    // CUSTOMIZE: Change the highlighted name here
    const highlightSpan = document.querySelector('.highlight');
    const nameToType = highlightSpan.textContent; 
    highlightSpan.textContent = ''; // Clear for typing effect
    
    let charIndex = 0;
    function typeWriter() {
        if (charIndex < nameToType.length) {
            highlightSpan.textContent += nameToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 150);
        }
    }
    // Start typing effect after a short delay for focus
    setTimeout(typeWriter, 600);


    // 3. Scroll Animations using IntersectionObserver
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));


    // 4. Floating Hearts Generator
    const heartsContainer = document.getElementById('hearts-container');

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Randomize position, size, and animation duration
        const size = Math.random() * 15 + 10; // 10px to 25px
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 15 + 10}s`; // 10s to 25s
        
        // Slightly random opacity
        heart.style.opacity = Math.random() * 0.4 + 0.2;

        heartsContainer.appendChild(heart);

        // Remove element after animation finishes
        setTimeout(() => {
            heart.remove();
        }, 25000); // 25 seconds cleanup
    }

    // Create hearts more frequently for a denser effect
    setInterval(createHeart, 400);

    // Initial burst of hearts on load
    for (let j = 0; j < 20; j++) {
        setTimeout(createHeart, Math.random() * 2000);
    }


    // 5. Surprise Modal & Confetti
    const surpriseBtn = document.getElementById('surpriseBtn');
    const surpriseModal = document.getElementById('surpriseModal');
    const closeBtn = document.querySelector('.close-btn');

    surpriseBtn.addEventListener('click', () => {
        surpriseModal.style.display = 'flex';
        
        // Trigger Canvas Confetti
        var duration = 4 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 300 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function() {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
            }));
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
            }));
        }, 250);
    });

    closeBtn.addEventListener('click', () => {
        surpriseModal.style.display = 'none';
    });

    // Close modal if clicked outside of content
    window.addEventListener('click', (e) => {
        if (e.target === surpriseModal) {
            surpriseModal.style.display = 'none';
        }
    });

});
