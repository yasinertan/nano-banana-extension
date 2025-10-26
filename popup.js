document.addEventListener('DOMContentLoaded', () => {
    const originalImageEl = document.getElementById('original-image');
    const originalPlaceholderEl = document.getElementById('original-placeholder');
    const generatedImageEl = document.getElementById('generated-image');
    const generatedPlaceholderEl = document.getElementById('generated-placeholder');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const promptInput = document.getElementById('prompt-input');
    const loader = document.getElementById('loader');
    const errorMessageEl = document.getElementById('error-message');

    let currentImageUrl = null;
    generateBtn.disabled = true;

    // Random styles to apply when user doesn't enter a prompt
    const randomStyles = [
        "in watercolor painting style",
        "in oil painting style",
        "in pencil sketch style",
        "in anime style",
        "in pixel art style",
        "in 3D rendered style",
        "in pop art style",
        "in impressionist style",
        "in cyberpunk style",
        "in vintage poster style",
        "in minimalist line art style",
        "in cartoon style",
        "in photorealistic style",
        "in abstract art style",
        "in retro 80s style"
    ];

    // THE FIX: This script now reads the URL from storage, where the background script placed it.
    chrome.storage.local.get(['selectedImageUrl'], (result) => {
        if (result.selectedImageUrl) {
            currentImageUrl = result.selectedImageUrl;
            originalImageEl.src = currentImageUrl;
            originalImageEl.classList.remove('hidden');
            originalPlaceholderEl.classList.add('hidden');
            generateBtn.disabled = false;

            // IMPORTANT: Clear the storage immediately after using the URL.
            // This prevents the old image from loading if the popup is opened manually later.
            chrome.storage.local.remove(['selectedImageUrl']);
        } else {
            originalPlaceholderEl.textContent = "Right-click an image on a webpage to begin.";
        }
    });

    const imageUrlToBase64 = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
            const blob = await response.blob();
            
            // Fix: Detect proper MIME type
            let mimeType = blob.type;
            
            // If MIME type is missing or generic, try to detect from URL or default to jpeg
            if (!mimeType || mimeType === 'application/octet-stream' || mimeType === '') {
                // Try to detect from URL extension
                const urlLower = url.toLowerCase();
                if (urlLower.includes('.png') || urlLower.includes('format=png')) {
                    mimeType = 'image/png';
                } else if (urlLower.includes('.gif')) {
                    mimeType = 'image/gif';
                } else if (urlLower.includes('.webp')) {
                    mimeType = 'image/webp';
                } else {
                    // Default to jpeg for most images
                    mimeType = 'image/jpeg';
                }
            }
            
            const reader = new FileReader();
            return new Promise((resolve, reject) => {
                reader.onloadend = () => resolve({ 
                    base64: reader.result.split(',')[1], 
                    mimeType: mimeType 
                });
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            errorMessageEl.textContent = 'Could not fetch the selected image.';
            throw error;
        }
    };
    
    const generateImage = async (imageData, userPrompt) => {
        // IMPORTANT: PASTE YOUR API KEY HERE
        const apiKey = ""; // <--- GET YOUR KEY FROM https://aistudio.google.com/app/apikey
        
        if (!apiKey) throw new Error("API key is missing. Please add it to popup.js");
        
        // If user didn't enter a prompt, use a random style
        let finalPrompt = userPrompt;
        if (!userPrompt || userPrompt.trim() === '') {
            const randomIndex = Math.floor(Math.random() * randomStyles.length);
            finalPrompt = randomStyles[randomIndex];
        }
        
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`;
        const payload = {
            contents: [{ parts: [ { text: `Recreate this image ${finalPrompt}` }, { inlineData: { mimeType: imageData.mimeType, data: imageData.base64 } } ] }],
            generationConfig: { responseModalities: ['IMAGE'] },
        };

        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) {
           const errorBody = await response.text();
           console.error('API Error Response:', errorBody);
           throw new Error(`API request failed: ${response.statusText}`);
        }
        const result = await response.json();
        const base64Data = result?.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
        
        if (base64Data) {
            return `data:image/png;base64,${base64Data}`;
        } else {
            console.error('API Response was OK, but no image data found:', result);
            throw new Error('No image data found in API response.');
        }
    };
    
    const handleRecreate = async () => {
        if (!currentImageUrl) return;

        generateBtn.disabled = true;
        downloadBtn.classList.add('hidden');
        errorMessageEl.textContent = '';
        loader.classList.remove('hidden');
        generatedImageEl.classList.add('hidden');
        generatedPlaceholderEl.classList.add('hidden');

        try {
            const imageData = await imageUrlToBase64(currentImageUrl);
            const userPrompt = promptInput.value.trim();
            const newImageUrl = await generateImage(imageData, userPrompt);
            
            generatedImageEl.src = newImageUrl;
            generatedImageEl.classList.remove('hidden');
            downloadBtn.classList.remove('hidden');
        } catch (error) {
            errorMessageEl.textContent = error.message;
            generatedPlaceholderEl.classList.remove('hidden');
        } finally {
            loader.classList.add('hidden');
            generateBtn.disabled = false;
        }
    };
    
    // Feature 1: Press Enter to recreate
    promptInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleRecreate();
        }
    });
    
    // Recreate button click
    generateBtn.addEventListener('click', handleRecreate);
    
    // Feature 2: Download button
    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = generatedImageEl.src;
        link.download = `nano-banana-${Date.now()}.png`;
        link.click();
    });
});