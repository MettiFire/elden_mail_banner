/*
console.log("Elden Mail Banner content.js loaded!");

// pre-load the sound file
const soundUrl = chrome.runtime.getURL("assets/elden_ring_sound.mp3");

// dictionary of "Send" keywords in various languages
const keywords = ["Invia","Send","傳送","发送","送信","보내기","Enviar","Senden","Envoyer","Отправить","إرسال","ส่ง","Skicka"];

// default settings
let soundEnabled = true;
let bannerColor = "yellow";

// load settings on startup
chrome.storage.sync.get(["soundEnabled", "bannerColor"], (prefs) => {
    soundEnabled = prefs.soundEnabled !== false;
    bannerColor = prefs.bannerColor || "yellow";
});

// update in real-time the settings if changed from the popup
chrome.storage.onChanged.addListener((changes) => {
    if (changes.soundEnabled) {
        soundEnabled = changes.soundEnabled.newValue !== false;
    }
    if (changes.bannerColor) {
        bannerColor = changes.bannerColor.newValue || "yellow";
    }
});


function showEldenRingBanner() {
    console.log("Banner function called");

    const banner = document.createElement('div');
    banner.id = 'elden-ring-banner';
    const imgPath = chrome.runtime.getURL(`assets/email_sent_${bannerColor}.png`);
    banner.innerHTML = `<img src="${imgPath}" alt="Email Sent">`;
    document.body.appendChild(banner);
    console.log("Banner appended");

    if (soundEnabled) {
        const audio = new Audio(soundUrl);
        audio.volume = 0.35;
        audio.play().catch(err => console.error("Errore nel suono:", err));
    }

    setTimeout(() => banner.classList.add('show'), 50);
    setTimeout(() => {
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 500);
    }, 3000);
}


// gmail observer
const gmailObserver = new MutationObserver(() => {
    document.querySelectorAll('div[role="button"], button[role="button"]').forEach(btn => {
        // take aria-label, data-tooltip and innerText
        const label = btn.getAttribute("aria-label") || "";
        const tooltip = btn.getAttribute("data-tooltip") || "";
        const text = (btn.innerText || "").trim();

        // match: if label, tooltip or text start with a keyword
        const isSendBtn = keywords.some(k =>
        label.trim().toLowerCase().startsWith(k.toLowerCase()) ||
        tooltip.trim().toLowerCase().startsWith(k.toLowerCase()) ||
        text.toLowerCase().startsWith(k.toLowerCase())
        );

        if (isSendBtn && !btn.dataset.eldenRingAttached) {
        btn.addEventListener("click", () => {
            console.log("Gmail send button clicked");
            setTimeout(showEldenRingBanner, 500);
        });
        btn.dataset.eldenRingAttached = "true";
        }
    });
});
gmailObserver.observe(document.body, { childList: true, subtree: true });

// outlook observer
const outlookObserver = new MutationObserver(() => {
    document.querySelectorAll('button, div[role="button"]').forEach(btn => {
        // take aria-label, data-tooltip and innerText
        const title = btn.getAttribute("title") || "";
        const label = btn.getAttribute("aria-label") || "";
        const text = (btn.innerText || "").trim();

        // match: if label, tooltip or text start with a keyword
        const isSendBtn = keywords.some(k =>
        title.trim().toLowerCase().startsWith(k.toLowerCase()) ||
        label.trim().toLowerCase().startsWith(k.toLowerCase()) ||
        text.toLowerCase().startsWith(k.toLowerCase())
        );

        if (isSendBtn && !btn.dataset.eldenRingAttached) {
        btn.addEventListener('click', () => {
            console.log("Outlook send button clicked");
            setTimeout(showEldenRingBanner, 500);
        });
        btn.dataset.eldenRingAttached = "true";
        }
    });
});
outlookObserver.observe(document.body, { childList: true, subtree: true }); 
*/


console.log("Elden Mail Banner content.js loaded!");

// Polyfill per compatibilità
const storage = (typeof browser !== "undefined") ? browser.storage : chrome.storage;

// Pre-load sound file
const soundUrl = chrome.runtime.getURL("assets/elden_ring_sound.mp3");

// Keywords dei pulsanti “Send”
const keywords = ["Invia","Send","傳送","发送","送信","보내기","Enviar","Senden","Envoyer","Отправить","إرسال","ส่ง","Skicka"];

// Valori di default
let soundEnabled = true;
let bannerColor = "yellow";

// Carica preferenze senza sovrascrivere valori già salvati
const loadPrefs = async () => {
  if (storage.get.length === 1) {
    // Chrome callback
    storage.sync.get(["soundEnabled", "bannerColor"], (res) => {
      soundEnabled = res.soundEnabled !== undefined ? res.soundEnabled : true;
      bannerColor = res.bannerColor || "yellow";
    });
  } else {
    // Firefox Promise
    const res = await storage.sync.get(["soundEnabled", "bannerColor"]);
    soundEnabled = res.soundEnabled !== undefined ? res.soundEnabled : true;
    bannerColor = res.bannerColor || "yellow";
  }
};
loadPrefs();

// Aggiornamento in tempo reale
if (storage.onChanged) {
  storage.onChanged.addListener((changes) => {
    if (changes.soundEnabled) soundEnabled = changes.soundEnabled.newValue;
    if (changes.bannerColor) bannerColor = changes.bannerColor.newValue;
  });
}

// Funzione per mostrare il banner
function showEldenRingBanner() {
  const banner = document.createElement('div');
  banner.id = 'elden-ring-banner';
  const imgPath = chrome.runtime.getURL(`assets/email_sent_${bannerColor}.png`);
  banner.innerHTML = `<img src="${imgPath}" alt="Email Sent">`;
  document.body.appendChild(banner);

  if (soundEnabled) {
    const audio = new Audio(soundUrl);
    audio.volume = 0.35;
    audio.play().catch(err => console.error("Errore nel suono:", err));
  }

  setTimeout(() => banner.classList.add('show'), 50);
  setTimeout(() => {
    banner.classList.remove('show');
    setTimeout(() => banner.remove(), 500);
  }, 3000);
}

// Osservatore Gmail
const gmailObserver = new MutationObserver(() => {
  document.querySelectorAll('div[role="button"], button[role="button"]').forEach(btn => {
    const label = btn.getAttribute("aria-label") || "";
    const tooltip = btn.getAttribute("data-tooltip") || "";
    const text = (btn.innerText || "").trim();

    const isSendBtn = keywords.some(k =>
      label.toLowerCase().startsWith(k.toLowerCase()) ||
      tooltip.toLowerCase().startsWith(k.toLowerCase()) ||
      text.toLowerCase().startsWith(k.toLowerCase())
    );

    if (isSendBtn && !btn.dataset.eldenRingAttached) {
      btn.addEventListener("click", () => {
        setTimeout(showEldenRingBanner, 500);
      });
      btn.dataset.eldenRingAttached = "true";
    }
  });
});
gmailObserver.observe(document.body, { childList: true, subtree: true });

// Osservatore Outlook
const outlookObserver = new MutationObserver(() => {
  document.querySelectorAll('button, div[role="button"]').forEach(btn => {
    const title = btn.getAttribute("title") || "";
    const label = btn.getAttribute("aria-label") || "";
    const text = (btn.innerText || "").trim();

    const isSendBtn = keywords.some(k =>
      title.toLowerCase().startsWith(k.toLowerCase()) ||
      label.toLowerCase().startsWith(k.toLowerCase()) ||
      text.toLowerCase().startsWith(k.toLowerCase())
    );

    if (isSendBtn && !btn.dataset.eldenRingAttached) {
      btn.addEventListener('click', () => {
        setTimeout(showEldenRingBanner, 500);
      });
      btn.dataset.eldenRingAttached = "true";
    }
  });
});
outlookObserver.observe(document.body, { childList: true, subtree: true });
