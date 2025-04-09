document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get all form elements including hidden fields
            const formData = {
                _subject: this.elements._subject.value, // Hidden subject field
                name: this.elements.name.value,
                _replyto: this.elements._replyto.value, // Formspree needs this for replies
                message: this.elements.message.value
            };

            // Send to Formspree using Fetch API
            fetch('https://formspree.io/f/xnnplaeb', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.ok) {
                    alert('Thank you for your message! I will get back to you soon.');
                    this.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was a problem sending your message. Please try again.');
            });
        });
    }
    
    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
});

// Product Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Optional: Auto-advance slides
setInterval(nextSlide, 5000);

// Dynamic Photo Gallery
const dynamicPhotos = [
    "art6.jpeg",
    "art7.jpeg",
    "art8.jpeg",
    "art9.jpeg",
    "art10.jpeg",
    "art11.jpeg",
    "art12.jpeg",
    "art13.jpeg",
    "art14.jpeg",
    "art15.jpeg",
    "art16.jpeg"
];
let currentDynamicIndex = 0;
const dynamicImage = document.getElementById('dynamicImage');

function nextDynamicPhoto() {
    currentDynamicIndex = (currentDynamicIndex + 1) % dynamicPhotos.length;
    dynamicImage.src = dynamicPhotos[currentDynamicIndex];
    
    // Add animation effect
    dynamicImage.style.opacity = 0;
    setTimeout(() => {
        dynamicImage.style.opacity = 1;
    }, 100);
}

// Initialize first dynamic photo
dynamicImage.src = dynamicPhotos[0];
dynamicImage.style.transition = "opacity 0.5s ease";