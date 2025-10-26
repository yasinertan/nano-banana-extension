# 🍌 Nano Banana - AI Image Recreator Chrome Extension

![Version](https://img.shields.io/badge/version-1.3-yellow)
![License](https://img.shields.io/badge/license-MIT-green)
![Chrome](https://img.shields.io/badge/Chrome-Extension-blue)

A Chrome extension that lets you right-click any image on the web and instantly recreate it using Google's Gemini AI.

## ✨ Features

- 🖱️ **Right-click Integration** - Context menu option on any web image
- 🎨 **Smart Style Variation** - Automatic random styles when no prompt is provided
- ⌨️ **Keyboard Shortcuts** - Press Enter to generate
- 💾 **One-Click Download** - Save generated images instantly
- 🎯 **Custom Prompts** - Optional text descriptions for specific variations
- 🍌 **Beautiful UI** - Clean, banana-themed interface

## 🎥 Demo Video

[https://youtu.be/2NV2CPzVKD0]

## 🛠️ Technologies Used

- **Google Gemini 2.5 Flash Image Preview API**
- Chrome Extensions API (Manifest V3)
- JavaScript (ES6+)
- HTML5 & CSS3

## 📋 Prerequisites

- Google Chrome browser (version 88 or higher)
- Google AI Studio API key ([Get one here](https://aistudio.google.com/app/apikey))

## 🚀 Installation Instructions

### For Judges/Testers

1. **Clone this repository**
```bash
   git clone https://github.com/yasinertan/nano-banana-extension.git
   cd nano-banana-extension
```

2. **Get your Google AI API key**
   - Visit https://aistudio.google.com/app/apikey
   - Create a new API key
   - Copy the key

3. **Add your API key**
   - Open `popup.js` in a text editor
   - Find line 65: `const apiKey = "";`
   - Paste your API key between the quotes: `const apiKey = "YOUR_API_KEY_HERE";`
   - Save the file

4. **Load the extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the `nano-banana-extension` folder
   - The extension should now appear in your extensions list

5. **Test the extension**
   - Visit any website with images (e.g., https://unsplash.com)
   - Right-click on any image
   - Select "Recreate with Nano Banana" from the context menu
   - The popup window will open showing the original image
   - Click "Recreate" or press Enter to generate a new image
   - Click "Download" to save the generated image

## 📁 Project Structure
```
nano-banana-extension/
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── background.js      # Service worker handling context menu events
├── manifest.json      # Extension configuration
├── popup.html         # User interface structure
├── popup.css          # Styling with banana theme
├── popup.js           # Main logic for image generation
└── README.md          # This file
```

## 🔧 How It Works

1. **User Right-Clicks** - User finds an image and right-clicks it
2. **URL Capture** - Background script captures the image URL
3. **Storage** - URL is temporarily saved to Chrome's local storage
4. **Popup Opens** - Extension window displays the original image
5. **Image Processing** - Image is converted to base64 format
6. **API Call** - Request sent to Google Gemini with image + prompt
7. **Display Result** - Generated image appears in the interface
8. **Download Option** - User can save the result with one click

## 🎨 Random Styles

When no prompt is provided, the extension randomly selects from 15 artistic styles:
- Watercolor painting
- Oil painting
- Pencil sketch
- Anime
- Pixel art
- 3D rendered
- Pop art
- Impressionist
- Cyberpunk
- Vintage poster
- Minimalist line art
- Cartoon
- Photorealistic
- Abstract art
- Retro 80s

## 🐛 Troubleshooting

**Extension doesn't load:**
- Ensure you're using Chrome version 88+
- Check that all files are in the same folder
- Try reloading the extension from chrome://extensions/

**"API key is missing" error:**
- Make sure you've added your API key to `popup.js`
- The key should be between quotes with no extra spaces

**Image doesn't load:**
- Some websites block cross-origin image requests
- Try with images from different websites
- Check the browser console for specific errors

**Generation fails:**
- Verify your API key is valid and active
- Check your internet connection
- Ensure you haven't exceeded API rate limits

## 📝 License

MIT License - See LICENSE file for details

## 👨‍💻 Developer

[Yasin]
- GitHub: [@yasinertan]
- Email: yasinertan7@gmail.com

## 🙏 Acknowledgments

- Google Gemini AI for the powerful image generation API
- The Chrome Extensions team for comprehensive documentation
- All testers and contributors

## 📊 API Usage Notes

This extension uses the Google Gemini 2.5 Flash Image Preview API. Please be aware of:
- API rate limits (check Google AI Studio for your tier)
- Each image generation counts as one API call
- Large or complex images may take longer to process

---

**Contest Submission** - Built for [Google Chrome Built-in AI Challenge 2025]
```

---

```
TESTING INSTRUCTIONS FOR NANO BANANA CHROME EXTENSION

1. SETUP (5 minutes):
   - Clone repository from [https://github.com/yasinertan/nano-banana-extension]
   - Obtain free Google AI API key from: https://aistudio.google.com/app/apikey
   - Open popup.js and add your API key at line 65
   - Load unpacked extension in Chrome from chrome://extensions/

2. BASIC FUNCTIONALITY TEST:
   - Visit https://unsplash.com
   - Right-click any image
   - Select "Recreate with Nano Banana"
   - Verify popup opens with original image displayed
   - Click "Recreate" button
   - Verify generated image appears (may take 5-10 seconds)

3. CUSTOM PROMPT TEST:
   - Right-click a different image
   - Enter "cyberpunk style" in the prompt field
   - Press Enter key (tests keyboard shortcut)
   - Verify cyberpunk-styled image is generated

4. RANDOM STYLE TEST:
   - Right-click another image
   - Leave prompt field empty
   - Click "Recreate"
   - Verify image is generated in a random artistic style

5. DOWNLOAD TEST:
   - After any successful generation
   - Click "Download" button
   - Verify image downloads with "nano-banana-[timestamp].png" filename

EXPECTED BEHAVIOR:
- Context menu appears on all images across any website
- Generation takes 5-15 seconds depending on API response time
- Error messages display clearly if issues occur
- UI remains responsive during generation

NO CREDENTIALS REQUIRED - Extension works with tester's own API key
```

---

## **LICENSE FILE (MIT License)**

Create a file called `LICENSE` in your repository:
```
MIT License

Copyright (c) 2025 [Yasin Ertan]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
