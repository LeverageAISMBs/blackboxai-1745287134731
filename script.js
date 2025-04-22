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
function handleFormSubmit(event, formType) {
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
    
    // Here you would typically send the form data to your server
    console.log('Form submitted:', formData);
    
    // Mark form as submitted
    hasSubmittedForm = true;
    
    // Update download button style if form was submitted
    const downloadBtn = document.getElementById('downloadGuideBtn');
    if (downloadBtn) {
        downloadBtn.classList.remove('bg-white', 'text-primary', 'hover:bg-gray-100');
        downloadBtn.classList.add('bg-black', 'text-gray-400', 'cursor-pointer');
    }
    
    // Show success message and handle specific actions
    if (formType === 'guide') {
        // Redirect to the guide
        window.location.href = 'https://app.mindstudio.ai/share/public/asset/5J6JKvdqaNpm1ehSLzuzjQ';
    }
    
    // Close modal
    toggleModal('contactModal');
    
    // Show success toast
    showToast('Thank you! We\'ll be in touch soon.');
}

// Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 translate-y-0';
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
    if (hasSubmittedForm) {
        window.location.href = 'https://app.mindstudio.ai/share/public/asset/5J6JKvdqaNpm1ehSLzuzjQ';
    } else {
        toggleModal('contactModal');
    }
}
