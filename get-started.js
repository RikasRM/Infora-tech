// Get Started Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    updateEstimate();
});

// Form step management
let currentStep = 1;

function nextStep() {
    const currentStepElement = document.getElementById(`step-${currentStep}`);
    const nextStepElement = document.getElementById(`step-${currentStep + 1}`);
    
    if (validateCurrentStep() && nextStepElement) {
        currentStepElement.classList.remove('active');
        nextStepElement.classList.add('active');
        currentStep++;
    }
}

function prevStep() {
    const currentStepElement = document.getElementById(`step-${currentStep}`);
    const prevStepElement = document.getElementById(`step-${currentStep - 1}`);
    
    if (prevStepElement) {
        currentStepElement.classList.remove('active');
        prevStepElement.classList.add('active');
        currentStep--;
    }
}

function validateCurrentStep() {
    const currentStepElement = document.getElementById(`step-${currentStep}`);
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            field.style.borderColor = '#e9ecef';
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields.');
    }
    
    return isValid;
}

// Project estimation logic
const projectPricing = {
    'website': {
        'basic': { price: 30000, duration: 2 },
        'standard': { price: 55000, duration: 3 },
        'advanced': { price: 100000, duration: 4 },
        'enterprise': { price: 150000, duration: 6 }
    },
    'ecommerce': {
        'basic': { price: 100000, duration: 4 },
        'standard': { price: 165000, duration: 6 },
        'advanced': { price: 200000, duration: 8 },
        'enterprise': { price: 350000, duration: 12 }
    },
    'mobile-app': {
        'basic': { price: 150000, duration: 8 },
        'standard': { price: 300000, duration: 12 },
        'advanced': { price: 450000, duration: 16 },
        'enterprise': { price: 600000, duration: 24 }
    },
    'web-app': {
        'basic': { price: 150000, duration: 6 },
        'standard': { price: 250000, duration: 10 },
        'advanced': { price: 350000, duration: 14 },
        'enterprise': { price: 550000, duration: 20 }
    },
    'ai-solution': {
        'basic': { price: 150000, duration: 6 },
        'standard': { price: 250000, duration: 10 },
        'advanced': { price: 450000, duration: 16 },
        'enterprise': { price: 880000, duration: 24 }
    },
    'logo-design': {
        'basic': { price: 10000, duration: 1 },
        'standard': { price: 28000, duration: 1 },
        'advanced': { price: 40000, duration: 2 },
        'enterprise': { price: 70000, duration: 2 }
    },
    'seo': {
        'basic': { price: 45000, duration: 4 },
        'standard': { price: 70000, duration: 8 },
        'advanced': { price: 140000, duration: 12 },
        'enterprise': { price: 200000, duration: 16 }
    }
};

function updateEstimate() {
    const projectType = document.getElementById('project-type').value;
    const featuresLevel = document.getElementById('features-level').value;
    
    const priceElement = document.getElementById('estimated-price');
    const durationElement = document.getElementById('estimated-duration');
    
    if (projectType && featuresLevel && projectPricing[projectType] && projectPricing[projectType][featuresLevel]) {
        const pricing = projectPricing[projectType][featuresLevel];
        priceElement.textContent = `LKR ${pricing.price.toLocaleString()}`;
        durationElement.textContent = `${pricing.duration} weeks`;
    } else {
        priceElement.textContent = 'LKR 0';
        durationElement.textContent = '0 weeks';
    }
}

function initializeForm() {
    // Add event listeners for estimate updates
    document.getElementById('project-type').addEventListener('change', updateEstimate);
    document.getElementById('features-level').addEventListener('change', updateEstimate);
    
    // Form submission
    document.getElementById('project-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateCurrentStep()) {
            // Show loading state
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            submitForm().finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        }
    });
}

function submitForm() {
    // Collect form data
    const projectType = document.getElementById('project-type').value;
    const featuresLevel = document.getElementById('features-level').value;
    const projectDescription = document.getElementById('project-description').value;
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const company = document.getElementById('company').value;
    const estimatedPrice = document.getElementById('estimated-price').textContent;
    const estimatedDuration = document.getElementById('estimated-duration').textContent;
    
    // Get current date and time
    const now = new Date();
    const dateTime = now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    });
    
    // Create WhatsApp message
    const whatsappMessage = `🚀 *NEW PROJECT REQUEST - Infora Tech*
📅 *Submitted:* ${dateTime}

👤 *Client Details:*
• Name: ${fullName}
• Email: ${email}
• Phone: ${phone || 'Not provided'}
• Company: ${company || 'Not provided'}

📋 *Project Details:*
• Project Type: ${projectType}
• Features Level: ${featuresLevel}
• Estimated Price: ${estimatedPrice}
• Estimated Duration: ${estimatedDuration}

📝 *Project Description:*
${projectDescription || 'No description provided'}

---
*Submitted via Infora Tech Website*
*Reply to: ${email}*`;
    
    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/94752231014?text=${encodedMessage}`;
    
    // Open WhatsApp with the message
    const whatsappWindow = window.open(whatsappURL, '_blank');
    
    // Check if WhatsApp opened successfully
    if (whatsappWindow) {
        // Show success message
        showSuccessMessage();
    } else {
        // Fallback: Show WhatsApp link with copy option
        const fallbackMessage = `Your form has been submitted! 

To send the project details to our WhatsApp:
1. Click this link: ${whatsappURL}
2. Or copy this message and send it manually to +94 75 223 1014

The message will be copied to your clipboard.`;
        
        // Copy message to clipboard
        navigator.clipboard.writeText(whatsappMessage).then(() => {
            alert(fallbackMessage);
        }).catch(() => {
            alert(fallbackMessage + '\n\nMessage:\n' + whatsappMessage);
        });
        
        showSuccessMessage();
    }
    
    // Return a resolved promise for consistency
    return Promise.resolve();
}

function showSuccessMessage() {
    const formContainer = document.querySelector('.form-container');
    formContainer.innerHTML = `
        <div class="success-message">
            <div class="success-icon">
                <i class="fab fa-whatsapp"></i>
            </div>
            <h3>Form Submitted Successfully!</h3>
            <p>Your project request has been sent to our WhatsApp. We'll review your requirements and get back to you shortly with a detailed proposal.</p>
            <div class="contact-info">
                <p><strong>WhatsApp Message Sent!</strong></p>
                <p>📱 Check your WhatsApp for the project details</p>
                <p>📧 Email: <a href="mailto:info@inforatech.io">info@inforatech.io</a></p>
                <p>📞 Phone: <a href="tel:+94752231014">+94 75 223 1014</a></p>
            </div>
            <a href="index.html" class="back-home-btn">Back to Home</a>
        </div>
    `;
}

// Add CSS for success message
const successMessageCSS = `
    .success-message {
        text-align: center;
        padding: 3rem;
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        grid-column: 1 / -1;
    }
    
    .success-icon {
        font-size: 4rem;
        color: #25D366;
        margin-bottom: 1rem;
    }
    
    .success-message h3 {
        color: #333;
        margin-bottom: 1rem;
        font-size: 2rem;
    }
    
    .success-message p {
        color: #666;
        margin-bottom: 1rem;
        line-height: 1.6;
    }
    
    .contact-info {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 10px;
        margin: 2rem 0;
    }
    
    .contact-info a {
        color: #007bff;
        text-decoration: none;
    }
    
    .contact-info a:hover {
        text-decoration: underline;
    }
    
    .back-home-btn {
        display: inline-block;
        background: #007bff;
        color: white;
        padding: 1rem 2rem;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .back-home-btn:hover {
        background: #0056b3;
        transform: translateY(-2px);
    }
`;

// Inject success message CSS
const style = document.createElement('style');
style.textContent = successMessageCSS;
document.head.appendChild(style);

// Form validation helpers
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Enhanced validation for step 2
function validateStep2() {
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    let isValid = true;
    
    if (email && !validateEmail(email)) {
        document.getElementById('email').style.borderColor = '#dc3545';
        isValid = false;
    }
    
    if (phone && !validatePhone(phone)) {
        document.getElementById('phone').style.borderColor = '#dc3545';
        isValid = false;
    }
    
    return isValid;
}

// Override validateCurrentStep for step 2
const originalValidateCurrentStep = validateCurrentStep;
validateCurrentStep = function() {
    const basicValidation = originalValidateCurrentStep();
    
    if (currentStep === 2) {
        return basicValidation && validateStep2();
    }
    
    return basicValidation;
};

// Add real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    
    if (emailField) {
        emailField.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#e9ecef';
            }
        });
    }
    
    if (phoneField) {
        phoneField.addEventListener('blur', function() {
            if (this.value && !validatePhone(this.value)) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#e9ecef';
            }
        });
    }
});
