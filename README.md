# 📜 Email Sent Elden Ring Extension
An Elden Ring–inspired Chrome extension that makes sending emails more epic.  
When you hit **Send** in Gmail or Outlook Web, a dramatic banner appears with sound, just like in the Lands Between. ⚔️

---

## 🚀 Features
- 📨 Works on **Gmail** and **Outlook Web**  
- 📜 Elden Ring–style banner on email sent  
- 🎵 Sound effect included  
- 🗡 Custom medieval-style icon  

---

<img width="1440" height="678" alt="Screenshot 2025-08-26 at 10 44 48" src="https://github.com/user-attachments/assets/9527aa19-a714-4f5b-af28-ae552a788465" />

---

## 🔧 Installation
1. **Download** this project (clone or `.zip` extract).  
2. Open your browser and go to: `chrome://extensions/`  
3. Enable **Developer Mode** (top right toggle).  
4. Click **Load unpacked** and select the project folder.  
5. Done! Try sending an email.


---

## 📂 Project Structure
├── manifest.json # Extension manifest<br>
├── content.js # Core script (banner logic)<br>
├── style.css # Styles for banner<br>
├── popup.html # Pop up <br>
├── popup.css # Pop up style <br>
├── popup.js # Pop up logic <br>
└── assets/ # Icons and sound<br>

---

## ⚠️ Known Issues
You may need to refresh the page when you leave it open for a long time before it works.  

---

## 🌍 Language Support
Currently, Elden Mail Banner works only in Italian, because it detects the send button by looking for the Italian text "Invia" in Gmail and Outlook Web.

If you want to make it work in another language:

- Open the file: `content.js`
- Find all occurrences of `Invia` (for example: `[aria-label^="Invia"], [data-tooltip^="Invia"] button[title="Invia"]`)
- Replace `Invia` with the equivalent Send button text in your language: `Send` → English, `Enviar` → Spanish, `Envoyer` → French, `Senden` → German. Or whatever your email browser displays.

💡 Tip: You can add multiple languages by separating selectors with commas, e.g.: `[aria-label^="Invia"], [aria-label^="Send"], [aria-label^="Envoyer"]`

A multi-language version is planned for a future release.

---

## 💖 Support the Project
If you enjoy this little project and want to support its development, consider buying me a coffee <3 it would be insanely appreciated.  
Your support helps me add more languages, sounds, and customization features!

[![Donate via Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/mettignis)


---


## ✨ Credits
Inspired by **Elden Ring** (FromSoftware).<br>
Thanks to https://rezuaq.be/new-area/image-creator/ for the images.

Created just for fun.  

