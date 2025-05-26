/**
 * Indo American Play School - Animations JavaScript File
 * This file contains scripts specifically for animations and visual effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Create floating objects for hero section
    function createFloatingObjects() {
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach(shape => {
            // Random initial position within constraints
            const randomX = Math.random() * 20 - 10; // -10 to 10
            const randomY = Math.random() * 20 - 10; // -10 to 10
            
            // Apply random transform
            shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
        });
    }
    createFloatingObjects();

    // Animated number counters
    const counterElements = document.querySelectorAll('.counter');
    let counterStarted = false;

    function startCounters() {
        if (counterElements.length > 0 && !counterStarted) {
            counterElements.forEach(counter => {
                if (isInViewport(counter)) {
                    counterStarted = true;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const steps = 50;
                    const stepTime = duration / steps;
                    const increment = target / steps;
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        counter.innerText = Math.round(current);
                        
                        if (current >= target) {
                            counter.innerText = target;
                            clearInterval(timer);
                        }
                    }, stepTime);
                }
            });
        }
    }

    // Program cards hover effects
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.program-icon').style.transform = 'scale(1.1) rotate(5deg)';
            this.querySelector('.program-icon').style.transition = 'transform 0.5s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.program-icon').style.transform = 'scale(1) rotate(0)';
        });
    });

    // Feature cards hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.feature-icon').style.transform = 'translateY(-10px)';
            this.querySelector('.feature-icon').style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.feature-icon').style.transform = 'translateY(0)';
        });
    });

    // Parallax effect for section backgrounds
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Apply to page header if exists
        const pageHeader = document.querySelector('.page-header');
        if (pageHeader) {
            pageHeader.style.backgroundPosition = `50% ${scrollPosition * 0.4}px`;
        }
        
        // Check if counters should start
        startCounters();
    });

    // Initialize any carousels/sliders if they exist
    // This is using a simple JavaScript implementation
    // In a real project, you might use Swiper.js, Slick, or another library
    function initializeSimpleCarousel() {
        const carousels = document.querySelectorAll('.simple-carousel');
        
        carousels.forEach(carousel => {
            const container = carousel.querySelector('.simple-carousel-container');
            const items = carousel.querySelectorAll('.simple-carousel-item');
            const prevBtn = carousel.querySelector('.carousel-prev');
            const nextBtn = carousel.querySelector('.carousel-next');
            
            if (!container || items.length === 0) return;
            
            let currentIndex = 0;
            const itemWidth = items[0].offsetWidth;
            const itemsToShow = Math.floor(container.offsetWidth / itemWidth);
            
            function updateCarousel() {
                container.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
            }
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    currentIndex = Math.max(0, currentIndex - 1);
                    updateCarousel();
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    currentIndex = Math.min(items.length - itemsToShow, currentIndex + 1);
                    updateCarousel();
                });
            }
        });
    }

    // Call this function if you have carousels in your HTML
    // initializeSimpleCarousel();

    // For gallery page filtering
    function initializeGalleryFilter() {
        const filterBtns = document.querySelectorAll('.gallery-filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 500);
                    }
                });
            });
        });
    }

    // Call this function if you have gallery filtering in your HTML
    // initializeGalleryFilter();

    // Simple animation for testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        // Add slight delay for each card
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Animate elements when they come into view
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkForAnimation() {
        animateOnScrollElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    window.addEventListener('scroll', checkForAnimation);
    checkForAnimation(); // Check on load too
});