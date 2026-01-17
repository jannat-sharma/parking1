// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
});

// Active nav link highlighting
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

setActiveNavLink();

// Booking Form Functionality
if (document.getElementById('bookingForm')) {
    const bookingForm = document.getElementById('bookingForm');
    const locationSelect = document.getElementById('location');
    const bookingDate = document.getElementById('bookingDate');
    const bookingTime = document.getElementById('bookingTime');
    const vehicleNumber = document.getElementById('vehicleNumber');
    const availabilityStatus = document.getElementById('availabilityStatus');
    const slotSelection = document.getElementById('slotSelection');
    const slotsGrid = document.getElementById('slotsGrid');
    const bookNowBtn = document.getElementById('bookNowBtn');
    const totalPrice = document.getElementById('totalPrice');

    // Sample slot data
    const parkingSlots = {
        mall: ['A1', 'A2', 'A3', 'B1', 'B2', 'C1'],
        airport: ['T1', 'T2', 'T3', 'T4', 'T5'],
        hospital: ['H1', 'H2', 'H3', 'H4'],
        office: ['O1', 'O2', 'O3', 'O4', 'O5']
    };

    // Pricing per hour
    const pricing = {
        mall: 20,
        airport: 50,
        hospital: 30,
        office: 25
    };

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    bookingDate.min = today;

    // Check availability on input change
    function checkAvailability() {
        const location = locationSelect.value;
        if (!location || !bookingDate.value || !bookingTime.value) {
            availabilityStatus.innerHTML = '<i class="fas fa-info-circle"></i> Please fill all fields to check availability';
            slotSelection.style.display = 'none';
            bookNowBtn.disabled = true;
            return;
        }

        availabilityStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking availability...';
        
        // Simulate API call
        setTimeout(() => {
            generateSlots(location);
        }, 1000);
    }

    function generateSlots(location) {
        const slots = parkingSlots[location];
        if (!slots) return;

        slotsGrid.innerHTML = '';
        let availableSlots = [];

        slots.forEach(slot => {
            const isAvailable = Math.random() > 0.3; // 70% availability
            const slotDiv = document.createElement('div');
            slotDiv.className = `slot ${isAvailable ? 'available' : 'unavailable'}`;
            slotDiv.textContent = slot;
            slotDiv.dataset.slot = slot;

            if (isAvailable) {
                availableSlots.push(slot);
                slotDiv.addEventListener('click', () => selectSlot(slotDiv));
            }

            slotsGrid.appendChild(slotDiv);
        });

        if (availableSlots.length > 0) {
            availabilityStatus.innerHTML = `<i class="fas fa-check-circle text-success"></i> ${availableSlots.length} slots available`;
            slotSelection.style.display = 'block';
            totalPrice.textContent = pricing[location];
            bookNowBtn.disabled = false;
        } else {
            availabilityStatus.innerHTML = '<i class="fas fa-times-circle text-danger"></i> No slots available';
            slotSelection.style.display = 'none';
            bookNowBtn.disabled = true;
        }
    }

    let selectedSlot = null;

    function selectSlot(slotElement) {
        document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
        slotElement.classList.add('selected');
        selectedSlot = slotElement.dataset.slot;
    }

    // Event listeners
    locationSelect.addEventListener('change', checkAvailability);
    bookingDate.addEventListener('change', checkAvailability);
    bookingTime.addEventListener('change', checkAvailability);
    vehicleNumber.addEventListener('input', checkAvailability);

    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!selectedSlot) {
            alert('Please select a parking slot');
            return;
        }

        const bookingData = {
            location: locationSelect.value,
            date: bookingDate.value,
            time: bookingTime.value,
            vehicleNumber: vehicleNumber.value,
            slot: selectedSlot,
            price: pricing[locationSelect.value]
        };

        // Simulate booking success
        alert(`Booking confirmed!\n\nLocation: ${bookingData.location}\nSlot: ${bookingData.slot}\nDate: ${bookingData.date}\nTime: ${bookingData.time}\nAmount: ₹${bookingData.price}`);
        
        // Reset form
        bookingForm.reset();
        slotSelection.style.display = 'none';
        bookNowBtn.disabled = true;
    });
}

// Vehicle number validation (real-time)
document.addEventListener('input', function(e) {
    if (e.target.id === 'vehicleNumber') {
        let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        e.target.value = value;
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});