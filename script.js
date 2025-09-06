
        let isLit = false;
        let isMusicPlaying = false;
        
        // Touch and click ripple effect
        function createRipple(event) {
            const ripple = document.createElement('div');
            ripple.classList.add('touch-ripple');
            
            const rect = event.currentTarget.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = (event.clientX || event.touches[0].clientX) - rect.left - size / 2;
            const y = (event.clientY || event.touches[0].clientY) - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            event.currentTarget.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
        
        // Add ripple effect to all interactive elements
        document.querySelectorAll('.btn, .candle').forEach(element => {
            element.addEventListener('click', createRipple);
            element.addEventListener('touchstart', createRipple);
        });
        
        // Add global touch ripple effect
        document.addEventListener('touchstart', function(event) {
            if (event.target.closest('.btn, .candle')) return;
            
            const ripple = document.createElement('div');
            ripple.classList.add('touch-ripple');
            
            const size = 100;
            const x = event.touches[0].clientX - size / 2;
            const y = event.touches[0].clientY - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'fixed';
            ripple.style.zIndex = '9999';
            
            document.body.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Candle functions
        function lightCandle() {
            const flame = document.getElementById('flame');
            const smoke = document.getElementById('smoke');
            
            if (!isLit) {
                flame.classList.add('lit');
                smoke.style.opacity = '0';
                isLit = true;
                
                // Add warm glow effect
                document.getElementById('candle').style.boxShadow = '0 10px 30px rgba(255, 152, 0, 0.6), 0 0 50px rgba(255, 193, 7, 0.3)';
            }
        }
        
        function blowCandle() {
            const flame = document.getElementById('flame');
            const smoke = document.getElementById('smoke');
            
            if (isLit) {
                flame.classList.remove('lit');
                smoke.style.opacity = '0.6';
                isLit = false;
                
                // Remove glow effect
                document.getElementById('candle').style.boxShadow = '0 10px 30px rgba(255, 152, 0, 0.4)';
                
                // Create smoke effect
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => {
                        const smokeParticle = document.createElement('div');
                        smokeParticle.className = 'smoke';
                        smokeParticle.style.left = (50 + Math.random() * 10 - 5) + '%';
                        smokeParticle.style.animationDelay = Math.random() * 0.5 + 's';
                        document.querySelector('.candle').appendChild(smokeParticle);
                        
                        setTimeout(() => {
                            smokeParticle.remove();
                        }, 2000);
                    }, i * 200);
                }
            }
        }
        
        // Heart shower function
        function createHeartShower() {
            const heartShower = document.getElementById('heartShower');
            const hearts = ['💖', '💕', '💗', '💘', '❤️', '💝', '💓', '💟'];
            
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.classList.add('shower-heart');
                    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                    heart.style.left = Math.random() * 100 + '%';
                    heart.style.animationDelay = Math.random() * 0.5 + 's';
                    heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
                    
                    heartShower.appendChild(heart);
                    
                    setTimeout(() => {
                        heart.remove();
                    }, 4000);
                }, i * 50);
            }
        }

        // Music toggle function
        function toggleMusic() {
            const audio = document.getElementById('backgroundMusic');
            const musicBtn = document.getElementById('musicBtn');

            if (isMusicPlaying) {
                audio.pause();
                musicBtn.textContent = '🎵 Play Music';
                musicBtn.classList.remove('playing');
                isMusicPlaying = false;
            } else {
                audio.play().then(() => {
                    musicBtn.textContent = '⏸️ Pause Music';
                    musicBtn.classList.add('playing');
                    isMusicPlaying = true;
                }).catch(error => {
                    console.log('Audio play failed:', error);
                    // Handle autoplay restrictions
                    alert('Please click the music button to start playing the romantic melody! 🎵');
                    musicBtn.textContent = '🎵 Play Music';
                    isMusicPlaying = false;
                });
            }
        }

        // Candle click to toggle
        document.getElementById('candle').addEventListener('click', () => {
            if (isLit) {
                blowCandle();
            } else {
                lightCandle();
            }
        });
        
        // Create floating particles
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
            document.getElementById('floatingParticles').appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 10000);
        }
        
        // Generate particles continuously
        setInterval(createParticle, 300);
        
        // Initialize with some particles
        for (let i = 0; i < 10; i++) {
            setTimeout(createParticle, i * 100);
        }
        
        // Auto light candle after 2 seconds
        setTimeout(() => {
            lightCandle();
        }, 2000);
        
        // Prevent context menu on long press for mobile
        document.addEventListener('contextmenu', function(event) {
            event.preventDefault();
        });
        
        // Add haptic feedback for mobile
        if ('vibrate' in navigator) {
            document.querySelectorAll('.btn, .candle').forEach(element => {
                element.addEventListener('touchstart', () => {
                    navigator.vibrate(50);
                });
            });
        }
   