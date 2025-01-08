document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
});