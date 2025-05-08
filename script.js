// Valid research IDs
const validResearchIds = ['12345', '23456', '34567', '45678', '56789'];

function handleSignIn(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const researchId = document.getElementById("researchId").value;

    const storedEmail = "dp1801@srmist.edu.in";
    const storedPassword = "asdf";

    // Check if credentials match
    if (email === storedEmail && password === storedPassword) {
        // Check if research ID is provided and valid
        if (researchId) {
            if (validResearchIds.includes(researchId)) {
                // Store researcher status in sessionStorage
                sessionStorage.setItem('isResearcher', 'true');
                sessionStorage.setItem('researchId', researchId);
                alert("Signed in successfully as a researcher!");
            } else {
                alert("Invalid research ID. Please enter a valid 5-digit research ID or leave it empty.");
                return;
            }
        } else {
            sessionStorage.setItem('isResearcher', 'false');
            sessionStorage.removeItem('researchId');
            alert("Signed in successfully!");
        }
        
        window.location.href = "home.html";
    } else {
        alert("Invalid email or password!");
    }
}

function handleSignUp(event) {
    event.preventDefault(); // Prevents page reload

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
    }

    // Simulating user registration
    alert("Account created successfully!");
    window.location.href = "index.html"; // Redirect to sign-in page after sign-up
    return true;
}

document.addEventListener("DOMContentLoaded", function () {
    let navLinks = document.querySelectorAll(".navbar ul li");
    let activeLink = null;

    // Function to remove active class from all links
    function removeActiveClass() {
        navLinks.forEach(link => link.classList.remove("active"));
    }

    // Function to set active menu on page load
    function setActivePage() {
        let currentPage = window.location.pathname.split("/").pop();
        let isActiveSet = false;

        navLinks.forEach(link => {
            let anchor = link.querySelector("a");
            if (anchor.getAttribute("href") === currentPage) {
                link.classList.add("active");
                activeLink = link;
                isActiveSet = true;
            }
        });

        // If no other page is matched, set "Home" as default active
        if (!isActiveSet) {
            navLinks[0].classList.add("active"); // Default to Home
            activeLink = navLinks[0];
        }
    }

    // Handle hover effect
    navLinks.forEach(link => {
        link.addEventListener("mouseenter", function () {
            removeActiveClass();
            this.classList.add("active"); // Move underline on hover
        });

        link.addEventListener("mouseleave", function () {
            removeActiveClass();
            if (activeLink) {
                activeLink.classList.add("active"); // Restore static underline
            }
        });
    });

    // Set the correct active menu on page load
    setActivePage();
});

document.addEventListener("DOMContentLoaded", () => {
    const exploreButtons = document.querySelectorAll(".card-button");
    const closeButtons = document.querySelectorAll(".close-btn");
    const popups = document.querySelectorAll(".popup");
    const body = document.body;

    // Create blur background
    let blurBg = document.createElement("div");
    blurBg.classList.add("blur-bg");
    document.body.appendChild(blurBg);

    // Function to disable interactions
    function disableInteractions() {
        document.querySelectorAll("button, a, input, textarea, select").forEach(element => {
            element.style.pointerEvents = "none";
        });
    }

    // Function to enable interactions
    function enableInteractions() {
        document.querySelectorAll("button, a, input, textarea, select").forEach(element => {
            element.style.pointerEvents = "auto";
        });
    }

    exploreButtons.forEach(button => {
        button.addEventListener("click", () => {
            const popupId = button.getAttribute("data-popup");
            const popup = document.getElementById(popupId);
            if (popup) {
                popup.classList.add("show");
                blurBg.style.display = "block";
                body.classList.add("popup-open");
                disableInteractions(); // Disable all interactions
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const popupId = button.getAttribute("data-popup");
            const popup = document.getElementById(popupId);
            if (popup) {
                popup.classList.remove("show");
                blurBg.style.display = "none";
                body.classList.remove("popup-open");
                enableInteractions(); // Re-enable interactions
            }
        });
    });

    // Close popup when clicking on blur background
    blurBg.addEventListener("click", () => {
        popups.forEach(popup => {
            popup.classList.remove("show");
        });
        blurBg.style.display = "none";
        body.classList.remove("popup-open");
        enableInteractions(); // Re-enable interactions
    });
});

/* document.addEventListener("DOMContentLoaded", function () {
    const radioButtons = document.querySelectorAll('.radio-inputs input[type="radio"]');
    const cityImage = document.getElementById('city-image');
    const placeholderText = document.getElementById('placeholder-text');

    // Map city names to their respective image paths
    const cityImages = {
        "Delhi": "images/delhi.jpg",
        "Chennai": "images/chennai.jpg",
        "Mumbai": "images/mumbai.jpg",
        "Bengaluru": "images/bengaluru.jpg",
        "Kolkata": "images/kolkata.jpg"
    };

    // Add event listeners to radio buttons
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function () {
            const selectedCity = this.nextElementSibling.textContent; // Get the selected city name
            const imagePath = cityImages[selectedCity]; // Get the corresponding image path

            if (imagePath) {
                cityImage.src = imagePath; // Set the image source
                cityImage.style.display = 'block'; // Show the image
                placeholderText.style.display = 'none'; // Hide the placeholder text
            } else {
                cityImage.style.display = 'none'; // Hide the image if no path is found
                placeholderText.style.display = 'block'; // Show the placeholder text
            }
        });
    });
}); */
/* document.addEventListener("DOMContentLoaded", function () {
    const radioButtons = document.querySelectorAll('.radio-inputs input[type="radio"]');
    const cityImage = document.getElementById('city-image');
    const placeholderText = document.getElementById('placeholder-text');
    const zoomInButton = document.getElementById('zoom-in');
    const zoomOutButton = document.getElementById('zoom-out');

    // Map city names to their respective image paths
    const cityImages = {
        "Delhi": "images/delhi.jpg",
        "Chennai": "images/chennai.jpg",
        "Mumbai": "images/mumbai.jpg",
        "Bengaluru": "images/bengaluru.jpg",
        "Kolkata": "images/kolkata.jpg"
    };

    // Add event listeners to radio buttons
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function () {
            const selectedCity = this.nextElementSibling.textContent; // Get the selected city name
            const imagePath = cityImages[selectedCity]; // Get the corresponding image path

            if (imagePath) {
                cityImage.src = imagePath; // Set the image source
                cityImage.style.display = 'block'; // Show the image
                placeholderText.style.display = 'none'; // Hide the placeholder text
            } else {
                cityImage.style.display = 'none'; // Hide the image if no path is found
                placeholderText.style.display = 'block'; // Show the placeholder text
            }
        });
    });

    // Zoom functionality
    let scale = 1; // Initial scale
    const zoomFactor = 0.1; // Zoom step size

    zoomInButton.addEventListener('click', () => {
        scale += zoomFactor; // Increase scale
        cityImage.style.transform = `scale(${scale})`; // Apply zoom
    });

    zoomOutButton.addEventListener('click', () => {
        scale -= zoomFactor; // Decrease scale
        if (scale < 0.1) scale = 0.1; // Prevent zooming out too much
        cityImage.style.transform = `scale(${scale})`; // Apply zoom
    });
}); */
/* document.addEventListener("DOMContentLoaded", function () {
    const radioButtons = document.querySelectorAll('.radio-inputs input[type="radio"]');
    const cityImage = document.getElementById('city-image');
    const placeholderText = document.getElementById('placeholder-text');
    const zoomInButton = document.getElementById('zoom-in');
    const zoomOutButton = document.getElementById('zoom-out');

    // Map city names to their respective image paths
    const cityImages = {
        "Delhi": "images/delhi.jpg",
        "Chennai": "images/chennai.jpg",
        "Mumbai": "images/mumbai.jpg",
        "Bengaluru": "images/bengaluru.jpg",
        "Kolkata": "images/kolkata.jpg"
    };

    // Add event listeners to radio buttons
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function () {
            const selectedCity = this.nextElementSibling.textContent; // Get the selected city name
            const imagePath = cityImages[selectedCity]; // Get the corresponding image path

            if (imagePath) {
                cityImage.src = imagePath; // Set the image source
                cityImage.style.display = 'block'; // Show the image
                placeholderText.style.display = 'none'; // Hide the placeholder text
            } else {
                cityImage.style.display = 'none'; // Hide the image if no path is found
                placeholderText.style.display = 'block'; // Show the placeholder text
            }
        });
    });

    const maxScale = 3; // Maximum zoom level
    const minScale = 0.1; // Minimum zoom level

    // Zoom functionality
    let scale = 1; // Initial scale
    const zoomFactor = 0.1; // Zoom step size

    zoomInButton.addEventListener('click', () => {
        scale += zoomFactor; // Increase scale
        cityImage.style.transform = `scale(${scale})`; // Apply zoom
    });

    zoomOutButton.addEventListener('click', () => {
        scale -= zoomFactor; // Decrease scale
        if (scale < 0.1) scale = 0.1; // Prevent zooming out too much
        cityImage.style.transform = `scale(${scale})`; // Apply zoom
    });
}); */
document.addEventListener("DOMContentLoaded", function () {
    const radioButtons = document.querySelectorAll('.radio-inputs input[type="radio"]');
    const cityImage = document.getElementById('city-image');
    const placeholderText = document.getElementById('placeholder-text');
    const zoomInButton = document.getElementById('zoom-in');
    const zoomOutButton = document.getElementById('zoom-out');

    // Map city names to their respective image paths
    const cityImages = {
        "Delhi": "images/pollutionmapdelhi.webp",
        "Chennai": "images/chennai.jpg",
        "Mumbai": "images/mumbai.jpg",
        "Bengaluru": "images/bengaluru.jpg",
        "Kolkata": "images/kolkata.jpg"
    };

    // Add event listeners to radio buttons
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function () {
            const selectedCity = this.nextElementSibling.textContent; // Get the selected city name
            const imagePath = cityImages[selectedCity]; // Get the corresponding image path

            if (imagePath) {
                cityImage.src = imagePath; // Set the image source
                cityImage.style.display = 'block'; // Show the image
                placeholderText.style.display = 'none'; // Hide the placeholder text
            } else {
                cityImage.style.display = 'none'; // Hide the image if no path is found
                placeholderText.style.display = 'block'; // Show the placeholder text
            }
        });
    });

    // Zoom functionality
    let scale = 1; // Initial scale
    const zoomFactor = 0.1; // Zoom step size
    const maxScale = 3; // Maximum zoom level
    const minScale = 0.5; // Minimum zoom level

    zoomInButton.addEventListener('click', () => {
        if (scale < maxScale) { // Check if zoom level is below the maximum limit
            scale += zoomFactor; // Increase scale
            cityImage.style.transform = `scale(${scale})`; // Apply zoom
        }
    });

    zoomOutButton.addEventListener('click', () => {
        if (scale > minScale) { // Check if zoom level is above the minimum limit
            scale -= zoomFactor; // Decrease scale
            cityImage.style.transform = `scale(${scale})`; // Apply zoom
        }
    });

    const resetZoomButton = document.getElementById('reset-zoom');
    resetZoomButton.addEventListener('click', () => {
        scale = 1; // Reset scale
        cityImage.style.transform = `scale(${scale})`; // Apply reset
    });
});

// Dropdown menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-content').forEach(content => {
                content.classList.remove('show');
            });
        }
    });
    
    // Toggle dropdowns on click
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(event) {
            event.preventDefault();
            const dropdownContent = this.nextElementSibling;
            if (dropdownContent) {
                dropdownContent.classList.toggle('show');
            }
        });
    });
});

// Function to update navigation based on researcher status
function updateNavigation() {
    const isResearcher = sessionStorage.getItem('isResearcher') === 'true';
    const researcherMenu = document.querySelector('.researcher-menu');
    const regularMenus = document.querySelectorAll('.regular-menu');
    const researchIdDisplay = document.getElementById('researchId-display');
    
    if (isResearcher) {
        // Show both regular menus and researcher menu
        regularMenus.forEach(menu => {
            if (menu) menu.style.display = 'block';
        });
        if (researcherMenu) researcherMenu.style.display = 'block';
        
        // Display research ID in user info
        if (researchIdDisplay) {
            const researchId = sessionStorage.getItem('researchId');
            researchIdDisplay.textContent = `Research ID: ${researchId}`;
        }
    } else {
        // Show only regular menus
        regularMenus.forEach(menu => {
            if (menu) menu.style.display = 'block';
        });
        if (researcherMenu) researcherMenu.style.display = 'none';
        
        // Remove research ID from user info
        if (researchIdDisplay) {
            researchIdDisplay.textContent = '';
        }
    }
}

// Call updateNavigation when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateNavigation();
    // ... existing DOMContentLoaded code ...
});

// City coordinates mapping
const cityCoordinates = {
    delhi: { latitude: 28.6139, longitude: 77.2090 },
    mumbai: { latitude: 19.0760, longitude: 72.8777 },
    chennai: { latitude: 13.0827, longitude: 80.2707 },
    bangalore: { latitude: 12.9716, longitude: 77.5946 },
    kolkata: { latitude: 22.5726, longitude: 88.3639 }
};

// Function to update the last updated time
function updateLastUpdatedTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('update-time').textContent = timeString;
}

// Function to fetch pollution data
/* function fetchPollutionData(location) {
    const API_KEY = "AIzaSyDN4-YrdJ8sMofqmRwgugXCgKhWVE7igzw";
    const API_URL = `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${API_KEY}`;

    const requestBody = {
        location: {
            latitude: location.latitude,
            longitude: location.longitude
        }
    };

    // Show loading state
    document.getElementById("pollution-data").innerHTML = "Loading pollution data...";

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        console.log("API Response:", data);

        if (data.indexes && data.indexes.length > 0) {
            const airQuality = data.indexes[0];
            
            let pollutantData = "";
            if (data.pollutants) {
                Object.keys(data.pollutants).forEach(key => {
                    pollutantData += `<p><strong>${key.toUpperCase()}:</strong> ${data.pollutants[key].concentration.value} µg/m³</p>`;
                });
            } else {
                pollutantData = "<p>No pollutant data available.</p>";
            }

            document.getElementById("pollution-data").innerHTML = `
                <h3>Live Air Pollution Data</h3>
                <p><strong>AQI:</strong> ${airQuality.aqi}</p>
                <p><strong>Category:</strong> ${airQuality.category}</p>
                <p><strong>Dominant Pollutant:</strong> ${airQuality.dominantPollutant}</p>
                <hr>
                <h3>Pollutant Concentrations</h3>
                ${pollutantData}`;

            // Update last updated time
            updateLastUpdatedTime();
        } else {
            document.getElementById("pollution-data").innerHTML = "<p>Error: Could not fetch pollution data.</p>";
        }
    })
    .catch(error => {
        console.error("Error fetching pollution data:", error);
        document.getElementById("pollution-data").innerHTML = "<p>Error loading pollution data. Please try again later.</p>";
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const locationSelect = document.getElementById('location-select');
    const refreshBtn = document.querySelector('.refresh-btn');

    // Initial data fetch for Delhi
    fetchPollutionData(cityCoordinates.delhi);

    // Location change handler
    locationSelect.addEventListener('change', function() {
        const selectedCity = this.value;
        fetchPollutionData(cityCoordinates[selectedCity]);
    });

    // Refresh button handler
    refreshBtn.addEventListener('click', function() {
        const selectedCity = locationSelect.value;
        fetchPollutionData(cityCoordinates[selectedCity]);
    });
}); */