# Email Sent - Elden Ring Chrome Extension

A fun Chrome extension that displays an **Elden Ring-style banner** and plays a sound whenever you send an email in Gmail or Outlook.

---

## Features

- Shows a floating banner like the “Item Acquired” notification in Elden Ring.
- Plays a sound effect when an email is sent.
- Works with Gmail and Outlook.
- Fully customizable banner image and audio file.
- Supports dynamic buttons created after page load.

---

## Installation (Developer Mode)

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (top-right).
4. Click **Load unpacked** and select the folder containing the extension.
5. Make sure the folder structure is like this:
/extension-folder
│
├─ manifest.json
├─ content.js
├─ style.css
└─ assets/
├─ email_sent.png
└─ elden_ring_sound.mp3


7. Open Gmail or Outlook and compose an email.
8. Press **Send** and you should see the banner and hear the sound.

---

## File Structure

- `manifest.json` — Chrome extension manifest, declares permissions, content scripts, and resources.  
- `content.js` — Main script that observes the page, detects send button clicks, and shows the banner + plays the sound.  
- `style.css` — Banner styling and animation.  
- `assets/` — Contains banner image and sound effect.  

---

## Customization

- **Banner Image:** Replace `assets/email_sent.png` with your preferred image.  
- **Sound Effect:** Replace `assets/elden_ring_sound.mp3` with your own audio file (supported formats: MP3, WAV, OGG).  
- Adjust CSS in `style.css` for size, position, or animation style.

---

## Known Issues

- The audio may not autoplay in some Gmail iframes or if Chrome blocks autoplay.  
- Gmail occasionally changes button attributes, which may break detection. You can update the selectors in `content.js`.  
- Some console warnings from Gmail (`hermesSDK.js`) are unrelated to the extension.

---

## License

This project is for personal/fun use. Modify and share freely, but do not distribute copyrighted assets without permission.

