[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC--BY--NC%204.0-blue?style=for-the-badge&logo=creative-commons&logoColor=white)](https://creativecommons.org/licenses/by-nc/4.0/)

# 📜 _Email Sent_ - Elden Ring Extension
An Elden Ring–inspired Web extension that makes sending emails more epic.  
When you hit **Send** in your mailbox, a dramatic banner appears with sound, just like in the Lands Between. ⚔️

---

## Table of Contents

- [🚀 Features](#-features)
- [🔧 Installation](#-installation)
- [📂 Project Structure](#-project-structure)
- [🌍 Language Support](#-language-support)
- [🖥️ Browser Compatibility & Installation](#️-browser-compatibility--installation)
- [⚠️ Known Issues](#️-known-issues)
- [🛡️ Privacy](#️-privacy)
- [💖 Support the Project](#-support-the-project)
- [✨ Credits & Disclaimer](#-credits--discaimer)

---

## 🚀 Features
- 📨 Works on **Gmail**, **Outlook**, **Proton**
- 📜 Elden Ring–style banner on email sent  
- 🎵 Sound effect included  
- 🗡 Custom medieval-style icon
- 🎨 Choose the color of your banner

---

<img width="1440" height="678" alt="Screenshot 2025-08-26 at 10 44 48" src="https://github.com/user-attachments/assets/9527aa19-a714-4f5b-af28-ae552a788465" />

---

## 🔧 Installation

> ⚠️ **Recommended:**  
> You can easily install Elden Email directly from the [Chrome Web Store](https://chromewebstore.google.com/detail/elden-email/bjaildeadgclghcjhocdbginfpjihmgm) or other browser extension stores. 
> This way, you’ll automatically receive updates and bug fixes.

> **Manual installation (not recommended):**  
> If you prefer to install it locally (for development or curiosity), follow these steps:

1. **Download** this project (clone or `.zip` extract).
2. Open your browser and go to: `chrome://extensions/`
3. Enable **Developer Mode** (top right toggle).
4. Click **Load unpacked** and select the project folder.
5. Done! Try sending an email.

> **Note:**  
> Manually installed extensions do not receive automatic updates. For the best experience, use the official store version.

---

## 📂 Project Structure
```
├── manifest_chrome.json     # Manifest MV3 for Chrome/Edge/Brave/Opera/Vivaldi
├── manifest_firefox.json    # Manifest MV2 for Firefox
├── package.json             # Build scripts and package management
├── LICENSE                  # License
├── README.md                # Rules and info
├── src/
│   ├── content.js           # Core script (banner logic)
│   ├── style.css            # Styles for banner
│   ├── popup.html           # Pop up
│   ├── popup.css            # Pop up style
│   ├── popup.js             # Pop up logic
│   ├── privacy_policy.md    # Privacy
│   └── assets/              # Icons and sound
```
---

## 🌍 Language Support
As promised, now the extension supports the following languages for the Send button:

| 🇮🇹 Italian: `Invia`  | 🇬🇧 English: `Send` | 🇨🇳 Chinese: `发送` / `傳送` | 🇯🇵 Japanese: `送信` |
|:-----------|:-----------|:-----------|:-----------|
| 🇰🇷 Korean: `보내기`  | 🇪🇸 Spanish: `Enviar` | 🇩🇪 German: `Senden` | 🇫🇷 French: `Envoyer` |
| 🇷🇺 Russian: `Отправить` | 🇸🇦 Arabic: `إرسال` | 🇹🇭 Thai: `ส่ง` | 🇸🇪 Swedish: `Skicka` |
| 🇳🇴 Norwegian: `Sendt` | 🇻🇳 Vietnamese: `Gửi` | 🇺🇦 Ukrainian: `Надіслати` | 🇨🇿 Czech: `Odeslán` |


If your language isn’t listed or it's not the right word in your system, don't hesitate to contact me, I will add it in the next update!

---

## 🖥️ Browser Compatibility & Installation

Elden Email is designed to work not only on Chrome, but also on the most popular browsers thanks to their support for Chrome extensions and the WebExtensions standard.

### 🌐 Chrome
- **Recommended:** Search for “Elden Email” on the Chrome Web Store and install in one click.
- **Manual:** See instructions above, but the official store version is preferred for automatic updates.

### 🌀 Edge
- **Compatibility:** Microsoft Edge supports Chrome extensions almost 100%.
- **How to Install:**  
  - Visit [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons).
  - Search for “Elden Email” and install directly from the store.

### 🔴 Opera
- **Compatibility:** Opera supports Manifest V2/V3 extensions.
- **How to Install:**  
  - Go to [Opera Add-ons](https://addons.opera.com).
  - Search for “Elden Email” and install from the store.

### 🦊 Firefox
- **Compatibility:** Firefox uses the “WebExtensions” system, very similar to Chrome’s.  

- **How to Install from the Store:**  
  - Visit [Firefox Add-ons](https://addons.mozilla.org).  
  - Search for “Elden Email” and install it directly from the store.  

- **How to Test or Build Locally:**  
  - Go to the `src/` folder of the project (this contains all source files).  
  - Copy all files into a new folder `dist/firefox/`.  
  - Rename `manifest_firefox.json` to `manifest.json`.  
  - Create a ZIP of **all files inside** `dist/firefox/` (do **not** zip the `firefox/` folder itself).  
  - Open Firefox → `about:debugging` → “This Firefox” → “Load Temporary Add-on” → select the `manifest.json` inside your ZIP or folder.  
  - Test the extension: the banner should appear when sending an email; the popup may not save preferences yet.  

- **Publishing Notes:**  
  - Some APIs differ (`chrome.*` → `browser.*`).  
  - Images must be listed in `web_accessible_resources` with a slightly different format.  
  - You may need [webextension-polyfill](https://github.com/mozilla/webextension-polyfill) for Firefox compatibility.  
  - Provide source code and a README explaining the build process when submitting to Mozilla.  
  - Consult the [MDN migration guide](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities) if you encounter errors.  


### 🦁 Brave, Vivaldi, and other Chromium Browsers
- **Compatibility:** Full support for Chrome extensions.
- **How to Install:**  
  - Search for “Elden Email” on the Chrome Web Store and install directly.
  - No manual installation required.


> **Note:**  
> For all supported browsers, once the extension is published in their respective stores, you should always install it from the official store to receive updates and the best experience.  
> Manual installation via ZIP is only recommended for development or testing and does **not** provide automatic updates.

---

## ⚠️ Known Issues
You may need to refresh the page when you leave it open for a long time before it works. 

---

## 🛡️ Privacy
Elden Email does **not** collect, transmit, or share any personal information.  
User preferences for banner color and sound are saved only locally (using Chrome storage).  
No email contents, personal data, or browsing history are accessed or stored.

See the [Privacy Policy](./PRIVACY_POLICY.md) for more details.

---

## 💖 Support the Project
If you enjoy this little project and want to support its development, consider buying me a coffee <3 it would be insanely appreciated.  
Your support helps me add more languages, sounds, and customization features!

[![Donate via Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/mettignis)

---

## ✨ Credits & Discaimer

**Banner Images:**  
Banner images used in this extension are generated using [From Software image macro creator](https://rezuaq.be/new-area/image-creator/), a fan-made tool inspired by FromSoftware games. All rights to original game textures and fonts utilized by the tool belong to their respective owners. For further information on asset licensing, refer to the disclaimer on the From Software image macro creator website.

**Sound Effects:**  
Sound effects included in this extension are sourced from public YouTube videos. All rights to original music and sound effects belong to FromSoftware and other respective copyright holders. If you are a copyright holder and have concerns regarding the use of these assets, please contact me for removal or modification.

**Inspiration:**  
This extension is a fan project inspired by the works of FromSoftware, including but not limited to Elden Ring, Dark Souls, Bloodborne, Sekiro, and Demon’s Souls. This project is not affiliated with, endorsed by, or associated with FromSoftware, Sony Interactive Entertainment, Bandai Namco Entertainment, Activision Publishing, or any other official entity.

If you have questions or concerns about asset usage or licensing, please feel free to reach out.

Created just for fun.  
