// ===== Sticky Navbar =====
const header = document.getElementById('header');
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== Mobile Menu =====
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Scroll Animations (Reveal on Scroll) =====
const revealElements = document.querySelectorAll('.category-card, .product-card, .feature-item, .cert-card, .choose-card, .testimonial-card');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('reveal', 'active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== Counter Animation =====
const counters = document.querySelectorAll('.counter-number');
const counterSection = document.querySelector('.trust-bar');

let counterAnimated = false;

const animateCounters = () => {
    if (counterAnimated) return;

    const sectionTop = counterSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
        counterAnimated = true;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }
};

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// ===== Product Slider =====
const productSlider = document.getElementById('product-slider');
const sliderPrev = document.getElementById('slider-prev');
const sliderNext = document.getElementById('slider-next');
let currentSlide = 0;
const slideWidth = 380; // 350px + 30px gap
const totalSlides = productSlider ? productSlider.children.length : 0;
const maxSlide = totalSlides - Math.floor(window.innerWidth / slideWidth);

if (productSlider) {
    const updateSlider = () => {
        const translateX = -(currentSlide * slideWidth);
        productSlider.style.transform = `translateX(${translateX}px)`;
    };

    sliderPrev.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    });

    sliderNext.addEventListener('click', () => {
        const visibleSlides = Math.floor(window.innerWidth / slideWidth);
        if (currentSlide < totalSlides - visibleSlides) {
            currentSlide++;
            updateSlider();
        }
    });

    // Auto-slide
    setInterval(() => {
        const visibleSlides = Math.floor(window.innerWidth / slideWidth);
        if (currentSlide < totalSlides - visibleSlides) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        updateSlider();
    }, 5000);
}

// ===== Testimonial Carousel =====
const testimonialTrack = document.getElementById('testimonial-track');
const testimonialDots = document.getElementById('testimonial-dots');
let currentTestimonial = 0;
const testimonialWidth = 430; // 400px + 30px gap
const totalTestimonials = testimonialTrack ? testimonialTrack.children.length : 0;

if (testimonialTrack && testimonialDots) {
    // Create dots
    for (let i = 0; i < totalTestimonials; i++) {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentTestimonial = i;
            updateTestimonialSlider();
        });
        testimonialDots.appendChild(dot);
    }

    const updateTestimonialSlider = () => {
        const translateX = -(currentTestimonial * testimonialWidth);
        testimonialTrack.style.transform = `translateX(${translateX}px)`;

        // Update dots
        document.querySelectorAll('.testimonial-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTestimonial);
        });
    };

    // Auto-slide testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        updateTestimonialSlider();
    }, 6000);
}

// ===== Parallax Effect for Hero =====
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// ===== Particle Animation =====
const particlesContainer = document.getElementById('particles');

if (particlesContainer) {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// ===== Quick View Modal =====
const modal = document.getElementById('quick-view-modal');
const modalClose = document.getElementById('modal-close');
const modalProductImg = document.getElementById('modal-product-img');
const modalProductName = document.getElementById('modal-product-name');
const modalProductDesc = document.getElementById('modal-product-desc');

document.querySelectorAll('.btn-quick-view').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const productImg = productCard.querySelector('img').src;
        const productName = productCard.querySelector('.product-name').textContent;
        const productDesc = productCard.querySelector('.product-desc').textContent;

        modalProductImg.src = productImg;
        modalProductName.textContent = productName;
        modalProductDesc.textContent = productDesc;

        modal.classList.add('active');
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// ===== Form Validation =====
const inquiryForm = document.getElementById('inquiry-form');

if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const company = document.getElementById('company').value.trim();
        const country = document.getElementById('country').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const productInterest = document.getElementById('product-interest').value;
        const message = document.getElementById('message').value.trim();

        // Basic validation
        let isValid = true;

        if (name.length < 2) {
            showError('name', 'Please enter a valid name');
            isValid = false;
        } else {
            clearError('name');
        }

        if (company.length < 2) {
            showError('company', 'Please enter a valid company name');
            isValid = false;
        } else {
            clearError('company');
        }

        if (country.length < 2) {
            showError('country', 'Please enter a valid country');
            isValid = false;
        } else {
            clearError('country');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError('email');
        }

        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(phone)) {
            showError('phone', 'Please enter a valid phone number');
            isValid = false;
        } else {
            clearError('phone');
        }

        if (!productInterest) {
            showError('product-interest', 'Please select a product interest');
            isValid = false;
        } else {
            clearError('product-interest');
        }

        if (message.length < 10) {
            showError('message', 'Please enter a message with at least 10 characters');
            isValid = false;
        } else {
            clearError('message');
        }

        if (isValid) {
            // Simulate form submission
            const submitBtn = inquiryForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Submitting...</span>';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent Successfully!</span>';
                submitBtn.style.backgroundColor = '#4CAF50';

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                    inquiryForm.reset();
                }, 2000);
            }, 1500);
        }
    });
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const existingError = field.parentElement.querySelector('.error-message');

    if (!existingError) {
        const error = document.createElement('span');
        error.classList.add('error-message');
        error.style.color = '#C8102E';
        error.style.fontSize = '12px';
        error.style.marginTop = '4px';
        error.textContent = message;
        field.parentElement.appendChild(error);
    }

    field.style.borderColor = '#C8102E';
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const existingError = field.parentElement.querySelector('.error-message');

    if (existingError) {
        existingError.remove();
    }

    field.style.borderColor = '';
}

// ===== Newsletter Form =====
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(email)) {
            const button = newsletterForm.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Subscribed!';
            button.style.backgroundColor = '#4CAF50';

            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
                newsletterForm.reset();
            }, 2000);
        } else {
            alert('Please enter a valid email address');
        }
    });
}

// ===== Lazy Loading Images =====
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

// ===== Window Resize Handler =====
window.addEventListener('resize', () => {
    // Update slider calculations on resize
    if (productSlider) {
        const visibleSlides = Math.floor(window.innerWidth / slideWidth);
        if (currentSlide > totalSlides - visibleSlides) {
            currentSlide = Math.max(0, totalSlides - visibleSlides);
            const translateX = -(currentSlide * slideWidth);
            productSlider.style.transform = `translateX(${translateX}px)`;
        }
    }
});

// ===== Add hover effects for cards =====
document.querySelectorAll('.category-card, .product-card, .cert-card, .choose-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ===== Smooth reveal animations for sections =====
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ===== Add loading animation =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== Export region markers animation =====
const regionMarkers = document.querySelectorAll('.region-marker');

regionMarkers.forEach((marker, index) => {
    marker.style.animationDelay = `${index * 0.5}s`;
});

// ===== Initialize all animations on page load =====
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.hero-text').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 100);
});

// ===== Add keyboard navigation for sliders =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && sliderPrev) {
        sliderPrev.click();
    } else if (e.key === 'ArrowRight' && sliderNext) {
        sliderNext.click();
    }
});

// ===== Add touch/swipe support for mobile =====
let touchStartX = 0;
let touchEndX = 0;

if (productSlider) {
    productSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    productSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (diff > swipeThreshold) {
        // Swipe left - next slide
        sliderNext.click();
    } else if (diff < -swipeThreshold) {
        // Swipe right - previous slide
        sliderPrev.click();
    }
}

// ===== Add scroll progress indicator =====
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #C8102E, #F4B400);
    z-index: 9999;
    width: 0%;
    transition: width 0.1s;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ===== Add back to top button =====
const backToTop = document.createElement('button');
backToTop.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
`;
backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #C8102E, #F4B400);
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
`;
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Add hover effect to trust items =====
document.querySelectorAll('.trust-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ===== Add stagger animation to manufacturing features =====
const featureItems = document.querySelectorAll('.feature-item');
featureItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// ===== Add glassmorphism effect on scroll =====
window.addEventListener('scroll', () => {
    const glassElements = document.querySelectorAll('.glassmorphism');
    glassElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
});

// ===== Performance optimization: Debounce scroll events =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScroll = debounce(() => {
    // Scroll-related operations that don't need to run on every scroll event
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===== Console message for developers =====
console.log('%c Narvekar Foods Website ', 'background: #C8102E; color: white; font-size: 20px; padding: 10px;');
console.log('%c Premium Indian Food Products Exporter ', 'background: #F4B400; color: black; font-size: 14px; padding: 5px;');
