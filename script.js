// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Animate stats on scroll
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    const finalNumber = stat.textContent;
                    const isDecimal = finalNumber.includes('.');
                    const numericValue = parseFloat(finalNumber);
                    
                    let currentNumber = 0;
                    const increment = numericValue / 50;
                    
                    const timer = setInterval(() => {
                        currentNumber += increment;
                        if (currentNumber >= numericValue) {
                            stat.textContent = finalNumber;
                            clearInterval(timer);
                        } else {
                            if (isDecimal) {
                                stat.textContent = currentNumber.toFixed(1);
                            } else {
                                stat.textContent = Math.floor(currentNumber) + '+';
                            }
                        }
                    }, 50);
                });
                observer.unobserve(entry.target);
            }
        });
    });
    
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Initialize animations
animateStats();

// Add scroll animations for service cards
function addScrollAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Initialize scroll animations
addScrollAnimations();

// Testimonial slider functionality (basic implementation)
function initTestimonialSlider() {
    const testimonials = [
        {
            text: "Infora Tech delivered a modern, responsive website that perfectly reflects our brand. The team was professional, fast, and incredibly detail-oriented. We've seen a huge improvement in user engagement since launch.",
            author: "Naveen Perera, Founder,",
            role: "EcoServe Sri Lanka",
            image: "images/clients_images/sngp.png"
        },
        {
            text: "Our mobile app turned out even better than we imagined. Infora Tech handled everything — from UI/UX to deployment — with precision. The app is stable, fast, and loved by our users!",
            author: "Dilani Fernando, Operations Manager,",
            role: "QuickFix.lk",
            image: "images/clients_images/dilani.png"
        },
        {
            text: "Thanks to Infora Tech's SEO and marketing strategy, our website traffic has tripled in just a few months. We're finally ranking on Google and attracting quality leads. Highly recommended!",
            author: "Ahmed Riyaz, Marketing Director,",
            role: "Lanka Auto Parts",
            image: "images/clients_images/ahmed.png"
        },
        {
            text: "We needed eye-catching graphics and product videos for our campaign, and Infora Tech nailed it. Their creative team is top-notch and delivered visuals that truly captured our brand story.",
            author: "Sasha Wickramasinghe, Brand Manager,",
            role: "GlowBeauty SL",
            image: "images/clients_images/sasha.png"
        },
        {
            text: "Working with Infora Tech was a game-changer. They're not just developers — they're strategic partners who genuinely care about your growth. We'll definitely keep coming back.",
            author: "Michael De Silva, CEO,",
            role: "Serene Spaces Interiors",
            image: "images/clients_images/michael.png"
        }
    ];
    
    let currentTestimonial = 0;
    const testimonialCard = document.querySelector('.testimonial-card.active');
    const dots = document.querySelectorAll('.dot');
    
    function updateTestimonial() {
        const testimonial = testimonials[currentTestimonial];
        if (testimonialCard) {
            testimonialCard.style.opacity = '0';
            testimonialCard.style.transform = 'translateY(20px)';
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentTestimonial);
            });
            
            setTimeout(() => {
                testimonialCard.innerHTML = `
                    <div class="testimonial-content">
                        <p>"${testimonial.text}"</p>
                        <div class="testimonial-author">
                            <img src="${testimonial.image}" alt="${testimonial.author}" class="author-avatar">
                            <div class="author-info">
                                <h4>${testimonial.author}</h4>
                                <span>${testimonial.role}</span>
                            </div>
                        </div>
                    </div>
                `;
                testimonialCard.style.opacity = '1';
                testimonialCard.style.transform = 'translateY(0)';
            }, 300);
        }
    }
    
    // Initialize with first testimonial
    updateTestimonial();
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial();
    }, 5000);
}

// Initialize testimonial slider
initTestimonialSlider();

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add hover effects for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click tracking for analytics (placeholder)
function trackClick(element, action) {
    console.log(`Clicked: ${element} - Action: ${action}`);
    // Here you would integrate with your analytics service
}

// Add click tracking to important elements
document.querySelectorAll('.hero-cta, .view-services-btn, .service-link').forEach(element => {
    element.addEventListener('click', function() {
        trackClick(this.textContent, 'CTA Click');
    });
});

// FAQ Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Initialize FAQ when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initFAQ();
});

// Service page specific animations
function initServicePageAnimations() {
    const serviceCards = document.querySelectorAll('.service-detail-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });

    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Initialize service page animations
initServicePageAnimations();

// Enhanced testimonial functionality for service pages
function initServiceTestimonials() {
    const testimonials = {
        'ai-development.html': [
            {
                text: "The AI solution they developed for us has significantly improved our customer service efficiency. Their team understood our requirements perfectly and delivered beyond expectations.",
                author: "Tech Solutions Ltd",
                role: "CTO",
                image: "images/clients_images/tech.png"
            }
        ],
        'mobile-app-development.html': [
            {
                text: "Our mobile app has received excellent reviews from users. The development process was smooth and the final product exceeded our expectations.",
                author: "StartupCo",
                role: "Founder",
                image: "images/clients_images/startup.png"
            }
        ],
        'web-development.html': [
            {
                text: "I couldn't be happier with the result. My new website has already received fantastic feedback from visitors, and it has significantly boosted my online presence.",
                author: "Prunthapan Gunarajah",
                role: "Director",
                image: "images/clients_images/prun.png"
            }
        ]
    };

    const currentPage = window.location.pathname.split('/').pop();
    const pageTestimonials = testimonials[currentPage];

    if (pageTestimonials) {
        let currentIndex = 0;
        const testimonialCard = document.querySelector('.testimonial-card');

        function updateTestimonial() {
            const testimonial = pageTestimonials[currentIndex];
            if (testimonialCard && testimonial) {
                testimonialCard.innerHTML = `
                    <div class="testimonial-content">
                        <p>"${testimonial.text}"</p>
                        <div class="testimonial-author">
                            <img src="${testimonial.image}" alt="${testimonial.author}" class="author-avatar">
                            <div class="author-info">
                                <h4>${testimonial.author}</h4>
                                <span>${testimonial.role}</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        updateTestimonial();

        // Auto-rotate if multiple testimonials
        if (pageTestimonials.length > 1) {
            setInterval(() => {
                currentIndex = (currentIndex + 1) % pageTestimonials.length;
                updateTestimonial();
            }, 5000);
        }
    }
}

// Initialize service testimonials
initServiceTestimonials();
