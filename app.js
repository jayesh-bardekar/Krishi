// Helper function to update the content of a specific output area
function updateOutput(elementId, content) {
    document.getElementById(elementId).innerHTML = content;
}

// Helper to create a weather card HTML
function createWeatherCard(title, value, unit, iconClass) {
    return `
        <div class="weather-card-item">
            <h4><i class="${iconClass}"></i> ${title}</h4>
            <p>${value}${unit}</p>
        </div>
    `;
}

// ----------------------------------------------------
// 1. REAL-TIME WEATHER DASHBOARD FUNCTIONALITY
// ----------------------------------------------------

// Define a detailed mock data structure for all 36 districts
const mockWeatherData = {
    // Pune Division
    'pune': { temp: 28, humidity: 65, wind: 12, rain: 2.5, status: 'Partly Cloudy' },
    'kolhapur': { temp: 26, humidity: 75, wind: 8, rain: 4.0, status: 'Moderate Rain' },
    'satara': { temp: 24, humidity: 70, wind: 10, rain: 3.5, status: 'Light Showers' },
    'sangli': { temp: 27, humidity: 68, wind: 9, rain: 1.5, status: 'Overcast' },
    'solapur': { temp: 30, humidity: 55, wind: 15, rain: 0.1, status: 'Sunny' },
    // Nashik Division
    'nashik': { temp: 30, humidity: 55, wind: 8, rain: 0, status: 'Clear Sky' },
    'ahmednagar': { temp: 32, humidity: 45, wind: 14, rain: 0.0, status: 'Hot & Dry' },
    'dhule': { temp: 34, humidity: 40, wind: 10, rain: 0.0, status: 'Clear Sky' },
    'jalgaon': { temp: 33, humidity: 50, wind: 11, rain: 0.2, status: 'Hazy' },
    'nandurbar': { temp: 35, humidity: 38, wind: 9, rain: 0.0, status: 'Sunny' },
    // Konkan Division
    'mumbai-city': { temp: 29, humidity: 80, wind: 18, rain: 5.5, status: 'Heavy Rain Alert' },
    'mumbai-suburban': { temp: 29, humidity: 80, wind: 18, rain: 5.5, status: 'Heavy Rain Alert' },
    'thane': { temp: 30, humidity: 78, wind: 15, rain: 3.0, status: 'Moderate Showers' },
    'palghar': { temp: 28, humidity: 85, wind: 13, rain: 6.0, status: 'Rainy' },
    'raigad': { temp: 27, humidity: 88, wind: 20, rain: 8.0, status: 'Strong Winds & Rain' },
    'ratnagiri': { temp: 26, humidity: 90, wind: 15, rain: 10.0, status: 'Coastal Heavy Rain' },
    'sindhudurg': { temp: 25, humidity: 92, wind: 14, rain: 12.0, status: 'Very Heavy Rain' },
    // Aurangabad Division (Marathwada)
    'aurangabad': { temp: 31, humidity: 50, wind: 8, rain: 0.5, status: 'Partly Cloudy' },
    'beed': { temp: 32, humidity: 48, wind: 10, rain: 0.0, status: 'Sunny' },
    'jalna': { temp: 33, humidity: 45, wind: 9, rain: 0.0, status: 'Clear Sky' },
    'parbhani': { temp: 30, humidity: 60, wind: 7, rain: 1.0, status: 'Cloudy' },
    'hingoli': { temp: 29, humidity: 65, wind: 6, rain: 2.0, status: 'Light Rain' },
    'nanded': { temp: 31, humidity: 58, wind: 8, rain: 0.8, status: 'Partly Cloudy' },
    'latur': { temp: 25, humidity: 75, wind: 5, rain: 5.0, status: 'Heavy Rain Alert' },
    'osmanabad': { temp: 28, humidity: 68, wind: 10, rain: 3.0, status: 'Showers' },
    // Amravati Division (Vidarbha)
    'amravati': { temp: 34, humidity: 40, wind: 12, rain: 0.0, status: 'Hot & Clear' },
    'akola': { temp: 35, humidity: 35, wind: 14, rain: 0.0, status: 'Very Hot' },
    'buldhana': { temp: 31, humidity: 50, wind: 9, rain: 0.5, status: 'Partly Cloudy' },
    'washim': { temp: 33, humidity: 42, wind: 8, rain: 0.0, status: 'Sunny' },
    'yavatmal': { temp: 32, humidity: 45, wind: 10, rain: 0.2, status: 'Hazy' },
    // Nagpur Division (Vidarbha)
    'nagpur': { temp: 35, humidity: 40, wind: 15, rain: 0.1, status: 'Sunny' },
    'chandrapur': { temp: 36, humidity: 35, wind: 16, rain: 0.0, status: 'Scorching' },
    'wardha': { temp: 34, humidity: 45, wind: 12, rain: 0.0, status: 'Clear Sky' },
    'bhandara': { temp: 32, humidity: 55, wind: 10, rain: 1.0, status: 'Light Rain' },
    'gondia': { temp: 31, humidity: 60, wind: 8, rain: 2.0, status: 'Cloudy' },
    'gadchiroli': { temp: 29, humidity: 70, wind: 5, rain: 3.0, status: 'Showers' },
};

function fetchWeather() {
    const districtSelect = document.getElementById('maharashtra-district-weather');
    const selectedDistrictText = districtSelect.options[districtSelect.selectedIndex].text;
    const selectedDistrictValue = districtSelect.value;
    const weatherOutput = document.getElementById('weather-output');

    if (selectedDistrictValue === '') {
        updateOutput('weather-output', `
            <p class="error-message"><i class="fas fa-exclamation-triangle"></i> Please select a valid district from the list.</p>
        `);
        return;
    }

    // Display loading state
    weatherOutput.innerHTML = '<p class="placeholder-text"><i class="fas fa-spinner fa-spin"></i> Fetching real-time data for ' + selectedDistrictText + '...</p>';

    const data = mockWeatherData[selectedDistrictValue] || mockWeatherData['pune']; // Default to Pune if key is missing
    
    setTimeout(() => {
        const weatherHtml = `
            ${createWeatherCard('Location', selectedDistrictText.split('(')[0].trim(), '', 'fas fa-map-marker-alt')}
            ${createWeatherCard('Status', data.status, '', 'fas fa-sun')}
            ${createWeatherCard('Temperature', data.temp, '°C', 'fas fa-thermometer-half')}
            ${createWeatherCard('Humidity', data.humidity, '%', 'fas fa-water')}
            ${createWeatherCard('Wind Speed', data.wind, ' km/h', 'fas fa-wind')}
            ${createWeatherCard('Rainfall (24h)', data.rain, ' mm', 'fas fa-cloud-showers-heavy')}
        `;
        updateOutput('weather-output', weatherHtml);
    }, 1500); // Simulate network delay
}

// ----------------------------------------------------
// 2. PERSONALIZED CROP SUGGESTION FUNCTIONALITY
// ----------------------------------------------------
function getSuggestedCrop() {
    const N = parseFloat(document.getElementById('input-N').value);
    const P = parseFloat(document.getElementById('input-P').value);
    const K = parseFloat(document.getElementById('input-K').value);
    const pH = parseFloat(document.getElementById('input-pH').value);
    const cropOutput = document.getElementById('crop-output');

    if (isNaN(N) || isNaN(P) || isNaN(K) || isNaN(pH)) {
        updateOutput('crop-output', `
            <p class="error-message"><i class="fas fa-exclamation-triangle"></i> Please input all four valid soil nutrient and pH values.</p>
        `);
        return;
    }

    // Display loading state
    cropOutput.innerHTML = '<p class="placeholder-text"><i class="fas fa-spinner fa-spin"></i> Analyzing soil data...</p>';

    let suggestedCrop = "Pigeon Pea (Tur/Arhar)";
    let description = "This crop is generally suitable for the region. It is a hardy pulse crop that can tolerate various soil conditions.";

    // Logic based on NPK and pH values (simplified example)
    if (N > 100 && P > 50 && K > 50 && pH >= 5.5 && pH <= 6.5) {
        suggestedCrop = "Sugarcane 🌾";
        description = "Your soil has high nutrient levels and a near-perfect pH for **Sugarcane**. Ensure adequate water supply during critical growth stages for maximum yield.";
    } else if (N < 20 && P > 40 && pH > 7.5) {
        suggestedCrop = "Cotton ☁️";
        description = "With lower nitrogen and high pH, **Cotton** is an excellent Kharif crop for your soil profile. Focus on potash application during flowering.";
    } else if (N > 50 && P < 30 && K > 20 && pH >= 6.0 && pH <= 7.0) {
        suggestedCrop = "Wheat (Rabi) 🍞";
        description = "Your soil is ideal for a Rabi crop like **Wheat**. Phosphorus levels are slightly low; consider applying a P-rich fertilizer at the time of sowing.";
    } else if (N < 40 && P < 20 && K < 20 && pH < 5.5) {
        suggestedCrop = "Rice (Paddy) 🍚";
        description = "The lower nutrient and acidic pH are better suited for **Rice**. Proper drainage management is key.";
    } else if (pH > 7.5) {
        suggestedCrop = "Bajra (Pearl Millet) 🌱";
        description = "The high pH suggests a drought-tolerant crop like **Bajra** or Sorghum. These thrive in alkaline conditions with lower input costs.";
    }


    setTimeout(() => {
        const cropHtml = `
            <div class="suggestion-box">
                <h3>${suggestedCrop}</h3>
                <p>${description}</p>
                <p class="section-description">Input values: N:${N}, P:${P}, K:${K}, pH:${pH}</p>
            </div>
        `;
        updateOutput('crop-output', cropHtml);
    }, 1500); // Simulate processing time
}


// ----------------------------------------------------
// 3. LATEST CROP MARKET PRICES FUNCTIONALITY
// ----------------------------------------------------

const todayDate = new Date().toISOString().split("T")[0]; // auto date

const marketData = {
    'pune': [
        { commodity: 'Onion', price: 1500, market: 'Pune Mandi', date: todayDate },
        { commodity: 'Tomato', price: 1200, market: 'Pune Mandi', date: todayDate },
        { commodity: 'Sugarcane', price: 3200, market: 'Pune Mandi', date: todayDate },
        { commodity: 'Wheat', price: 2100, market: 'Pune Mandi', date: todayDate },
        { commodity: 'Rice', price: 2500, market: 'Pune Mandi', date: todayDate },
    ],
    'nagpur': [
        { commodity: 'Soybean', price: 4500, market: 'Nagpur Mandi', date: todayDate },
        { commodity: 'Cotton', price: 6200, market: 'Nagpur Mandi', date: todayDate },
        { commodity: 'Tur (Arhar)', price: 5500, market: 'Nagpur Mandi', date: todayDate },
        { commodity: 'Wheat', price: 2000, market: 'Nagpur Mandi', date: todayDate },
        { commodity: 'Rice', price: 2300, market: 'Nagpur Mandi', date: todayDate },
    ],
    'nashik': [
        { commodity: 'Grapes', price: 3000, market: 'Nashik Mandi', date: todayDate },
        { commodity: 'Onion', price: 1400, market: 'Nashik Mandi', date: todayDate },
        { commodity: 'Tomato', price: 1300, market: 'Nashik Mandi', date: todayDate },
        { commodity: 'Pomegranate', price: 6000, market: 'Nashik Mandi', date: todayDate },
        { commodity: 'Wheat', price: 2100, market: 'Nashik Mandi', date: todayDate },
    ],
    // --- add 33 more districts similarly ---
    'solapur': [
        { commodity: 'Sugarcane', price: 3100, market: 'Solapur Mandi', date: todayDate },
        { commodity: 'Bajra', price: 1700, market: 'Solapur Mandi', date: todayDate },
        { commodity: 'Wheat', price: 2000, market: 'Solapur Mandi', date: todayDate },
        { commodity: 'Cotton', price: 6000, market: 'Solapur Mandi', date: todayDate },
        { commodity: 'Onion', price: 1500, market: 'Solapur Mandi', date: todayDate },
    ],
    'kolhapur': [
        { commodity: 'Sugarcane', price: 3300, market: 'Kolhapur Mandi', date: todayDate },
        { commodity: 'Rice', price: 2600, market: 'Kolhapur Mandi', date: todayDate },
        { commodity: 'Groundnut', price: 4000, market: 'Kolhapur Mandi', date: todayDate },
        { commodity: 'Wheat', price: 2200, market: 'Kolhapur Mandi', date: todayDate },
        { commodity: 'Turmeric', price: 7000, market: 'Kolhapur Mandi', date: todayDate },
    ],
    // continue for Ahmednagar, Aurangabad, Beed, Bhandara, Chandrapur,
    // Dhule, Gadchiroli, Gondia, Hingoli, Jalgaon, Jalna, Latur, Mumbai,
    // Nanded, Osmanabad, Palghar, Parbhani, Raigad, Ratnagiri, Sangli,
    // Satara, Sindhudurg, Thane, Wardha, Washim, Yavatmal...
};

// ----------------------------------------------------
// MARKET FUNCTION
// ----------------------------------------------------
function getMarketRates() {
    const districtSelect = document.getElementById('maharashtra-district-market');
    const selectedDistrictValue = districtSelect.value;
    const selectedDistrictText = districtSelect.options[districtSelect.selectedIndex].text.split('(')[0].trim();
    const tbody = document.querySelector('#market-prices-table tbody');

    if (selectedDistrictValue === '') {
        tbody.innerHTML = `<tr><td colspan="5" class="error-message" style="text-align:center;"><i class="fas fa-info-circle"></i> Please select a Mandi/District.</td></tr>`;
        return;
    }

    tbody.innerHTML = '';

    const data = marketData[selectedDistrictValue];

    if (!data || data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="error-message" style="text-align:center;"><i class="fas fa-exclamation-triangle"></i> No market data available for ${selectedDistrictText} on ${todayDate}.</td></tr>`;
        return;
    }

    data.forEach(item => {
        tbody.innerHTML += `
            <tr>
                <td><strong>${item.commodity}</strong></td>
                <td>${item.market}</td>
                <td>${item.date}</td>
                <td>₹${item.price}</td>
                <td>₹${item.price + 200}</td>
            </tr>
        `;
    });
}