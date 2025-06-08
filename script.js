// Happy Milk Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
            
            // Toggle animation class for menu button
            this.classList.toggle('active');
        });
    }
    
    // Testimonial Slider
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (testimonials.length > 1) {
        // Hide all testimonials except the first one
        for (let i = 1; i < testimonials.length; i++) {
            testimonials[i].style.display = 'none';
        }
        
        // Auto-rotate testimonials
        setInterval(function() {
            testimonials[currentTestimonial].style.display = 'none';
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].style.display = 'block';
        }, 5000);
    }
    
    // Form Validation and Submission (using fetch)
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault(); // prevent default form submission

        let valid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        if (!name.value.trim()) {
            valid = false;
            highlightField(name);
        } else {
            resetField(name);
        }

        if (!email.value.trim() || !isValidEmail(email.value)) {
            valid = false;
            highlightField(email);
        } else {
            resetField(email);
        }

        if (!message.value.trim()) {
            valid = false;
            highlightField(message);
        } else {
            resetField(message);
        }

        if (!valid) {
            alert('Please fill in all required fields correctly.');
            return;
        }

        // Gather form data
        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Show success message
                showSuccessMessage();
                contactForm.reset();
            } else {
                alert('There was an error submitting the form. Please try again.');
            }
        } catch (error) {
            alert('An unexpected error occurred. Please try again later.');
            console.error(error);
        }
    });
}

function showSuccessMessage() {
    const container = document.querySelector('.contact-form-container');
    container.innerHTML = `
        <h2>Thank You!</h2>
        <p>Your message has been successfully sent. We’ll get back to you soon.</p>
    `;
}

    
   // Newsletter Form
const newsletterForms = document.querySelectorAll('.newsletter-form');

if (newsletterForms.length > 0) {
    newsletterForms.forEach(form => {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const formData = new FormData(this);

            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                alert('Please enter a valid email address.');
                emailInput.focus();
                return;
            }

            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    this.innerHTML = `
                        <p class="success-message">🎉 Thank you for subscribing to our newsletter!</p>
                    `;
                } else {
                    alert('There was a problem subscribing. Please try again.');
                }
            } catch (error) {
                console.error(error);
                alert('An unexpected error occurred. Please try again later.');
            }
        });
    });
}

    
    // Helper Functions
    function highlightField(field) {
        field.style.borderColor = '#F9C846';
        field.style.backgroundColor = '#fff9e6';
    }
    
    function resetField(field) {
        field.style.borderColor = '#ddd';
        field.style.backgroundColor = '';
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

