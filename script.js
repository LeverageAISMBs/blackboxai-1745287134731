// Form state management
let hasSubmittedForm = false;

// Show/hide modal
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Form validation
function validateForm(form) {
    const nameInput = form.querySelector('input[name="fullName"]');
    const phoneInput = form.querySelector('input[name="phone"]');
    const emailInput = form.querySelector('input[name="email"]');
    
    let isValid = true;
    
    // Name validation
    if (!nameInput.value.trim()) {
        showError(nameInput, 'Full name is required');
        isValid = false;
    } else {
        hideError(nameInput);
    }
    
    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(phoneInput.value.trim())) {
        showError(phoneInput, 'Please enter a valid phone number');
        isValid = false;
    } else {
        hideError(phoneInput);
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    } else {
        hideError(emailInput);
    }
    
    return isValid;
}

function showError(input, message) {
    const errorDiv = input.nextElementSibling;
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    input.classList.add('border-red-500');
}

function hideError(input) {
    const errorDiv = input.nextElementSibling;
    errorDiv.classList.add('hidden');
    input.classList.remove('border-red-500');
}

// Form submission
async function handleFormSubmit(event, formType) {
    event.preventDefault();
    const form = event.target;
    
    if (!validateForm(form)) {
        return;
    }
    
    const formData = {
        fullName: form.fullName.value,
        phone: form.phone.value,
        email: form.email.value,
        type: formType
    };
    
    try {
        // Here you would typically send the form data to your server
        console.log('Form submitted:', formData);
        
        // Mark form as submitted
        hasSubmittedForm = true;
        localStorage.setItem('hasSubmittedForm', 'true');
        
        // Update all download buttons
        updateDownloadButtons();
        
        // Close modal
        toggleModal('contactModal');
        
        // Show success message
        showToast('Thank you! We\'ll be in touch soon.');
        
        // If this was a guide download request, redirect to the guide
        if (formType === 'guide') {
            setTimeout(() => {
                window.location.href = 'https://app.mindstudio.ai/share/public/asset/5J6JKvdqaNpm1ehSLzuzjQ';
            }, 1000);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        showToast('An error occurred. Please try again.', 'error');
    }
}

// Update all download buttons on the page
function updateDownloadButtons() {
    const downloadButtons = document.querySelectorAll('[id^="downloadGuideBtn"]');
    downloadButtons.forEach(btn => {
        btn.classList.remove('bg-white', 'text-primary', 'hover:bg-gray-100');
        btn.classList.add('bg-black', 'text-gray-400');
        btn.onclick = () => window.location.href = 'https://app.mindstudio.ai/share/public/asset/5J6JKvdqaNpm1ehSLzuzjQ';
    });
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    toast.className = `fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 translate-y-0 z-60`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.add('translate-y-full');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Handle download button click
function handleDownloadClick() {
    const hasSubmitted = localStorage.getItem('hasSubmittedForm') === 'true';
    if (hasSubmitted) {
        window.location.href = 'https://app.mindstudio.ai/share/public/asset/5J6JKvdqaNpm1ehSLzuzjQ';
    } else {
        toggleModal('contactModal');
    }
}

// Initialize download buttons state on page load
document.addEventListener('DOMContentLoaded', () => {
    const hasSubmitted = localStorage.getItem('hasSubmittedForm') === 'true';
    if (hasSubmitted) {
        updateDownloadButtons();
    }
});
