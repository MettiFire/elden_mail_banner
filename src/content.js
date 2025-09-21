console.log("Elden Mail Banner content.js loaded!");

// polyfill for Firefox compatibility
const storage = (typeof browser !== "undefined") ? browser.storage : chrome.storage;

// pre-load sound file
const soundUrl = chrome.runtime.getURL("assets/elden_ring_sound.mp3");

// keywords for "Send" in various languages
const keywords = ["Invia","Send","傳送","发送","送信","보내기","Enviar","Senden","Envoyer","Отправить","إرسال","ส่ง","Skicka","Sendt", "Gửi", "Надіслати", "Odeslán"];

// default settings
let soundEnabled = true;
let bannerColor = "yellow";

// load preferences without rewriting saved preferences 
const loadPrefs = async () => {
  if (storage.get.length === 1) {
    // Chrome callback
    storage.sync.get(["soundEnabled", "bannerColor"], (res) => {
      soundEnabled = res.soundEnabled !== undefined ? res.soundEnabled : true;
      bannerColor = res.bannerColor || "yellow";
    });
  } else {
    // Firefox promise
    const res = await storage.sync.get(["soundEnabled", "bannerColor"]);
    soundEnabled = res.soundEnabled !== undefined ? res.soundEnabled : true;
    bannerColor = res.bannerColor || "yellow";
  }
};
loadPrefs();

// real-time updates
if (storage.onChanged) {
  storage.onChanged.addListener((changes) => {
    if (changes.soundEnabled) soundEnabled = changes.soundEnabled.newValue;
    if (changes.bannerColor) bannerColor = changes.bannerColor.newValue;
  });
}

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

// gmail observer
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


// outlook observer
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


// outlook.live.com observer
const outlookLiveObserver = new MutationObserver(() => {
  document.querySelectorAll('button[aria-label="Send"], button[aria-label="Invia"]').forEach(btn => {
    if (!btn.dataset.eldenRingAttached) {
      btn.addEventListener("click", () => {
        console.log("Outlook Mail send button clicked");
        setTimeout(showEldenRingBanner, 500);
      });
      btn.dataset.eldenRingAttached = "true";
    }
  });
});
outlookLiveObserver.observe(document.body, { childList: true, subtree: true });


// protonmail.com observer and functions

// recursive function to find buttons in Shadow DOMs
function findProtonButtons(root = document) {
  const buttons = [];

  // search for buttons in the regular DOM
  root.querySelectorAll && root.querySelectorAll('button[data-testid="composer:send-button"]').forEach(btn => {
    buttons.push(btn);
  });

  // look for buttons in any Shadow DOM
  if (root.querySelectorAll) {
    root.querySelectorAll('*').forEach(el => {
      if (el.shadowRoot) {
        buttons.push(...findProtonButtons(el.shadowRoot));
      }
    });
  }

  return buttons;
}

// observer
const protonMailObserver = new MutationObserver(() => {
  const buttons = findProtonButtons();
  buttons.forEach(btn => {
    if (!btn.dataset.eldenRingAttached) {
      btn.addEventListener("click", () => {
        console.log("Proton Mail send button clicked");
        setTimeout(showEldenRingBanner, 500);
      });
      btn.dataset.eldenRingAttached = "true";
    }
  });
});
protonMailObserver.observe(document.body, { childList: true, subtree: true });



// AOL Mail observer
const aolObserver = new MutationObserver(() => {
  document.querySelectorAll('button[data-test-id="compose-send-button"]').forEach(btn => {
    if (!btn.dataset.eldenRingAttached) {
      btn.addEventListener("click", () => {
        console.log("AOL Mail send button clicked ✅");
        setTimeout(showEldenRingBanner, 500); 
      });
      btn.dataset.eldenRingAttached = "true"; 
      console.log("Listener attached to AOL Mail send button");
    }
  });
});
aolObserver.observe(document.body, { childList: true, subtree: true });
