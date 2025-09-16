
console.log("Elden Mail Banner background.js loaded!");

// polyfill for Firefox/Thunderbird compatibility
const api = (typeof browser !== "undefined") ? browser : chrome;
const storage = (typeof browser !== "undefined") ? browser.storage.local : chrome.storage.sync;

// default settings
let soundEnabled = true;
let bannerColor = "yellow";

// load preferences
const loadPrefs = async () => {
  const res = await storage.get(["soundEnabled", "bannerColor"]);
  soundEnabled = res.soundEnabled !== undefined ? res.soundEnabled : true;
  bannerColor = res.bannerColor || "yellow";
};
loadPrefs();

// real-time updates for settings
storage.onChanged.addListener((changes) => {
  if (changes.soundEnabled) {
    soundEnabled = changes.soundEnabled.newValue;
  }
  if (changes.bannerColor) {
    bannerColor = changes.bannerColor.newValue;
  }
});

function showEldenRingBanner(tabId) {
  console.log("Showing banner in tab:", tabId);

  if (soundEnabled) {
    const soundUrl = api.runtime.getURL("assets/elden_ring_sound.mp3");
    const audio = new Audio(soundUrl);
    audio.volume = 0.35;
    audio.play().catch(err => console.error("Audio playback error:", err));
  }

  // inject CSS
  api.tabs.insertCSS(tabId, { file: "style.css" }).catch(err => console.error("CSS injection error:", err));

  // inject and show banner
  const executeBanner = (tabId, color) => {
    const api = (typeof browser !== "undefined") ? browser : chrome;
    const banner = document.createElement('div');
    banner.id = 'elden-ring-banner';
    const imgPath = api.runtime.getURL(`assets/email_sent_${color}.png`);
    banner.innerHTML = `<img src="${imgPath}" alt="Email Sent">`;
    document.body.appendChild(banner);
    console.log("Banner appended to body");

    setTimeout(() => banner.classList.add('show'), 50);

    setTimeout(() => {
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 500);
    }, 3000);
  };

  setTimeout(() => {
    api.tabs.executeScript(tabId, {
      code: `(${executeBanner.toString()})(${tabId}, "${bannerColor}");`
    }).catch(err => console.error("Script execution error:", err));
  }, 500); // 500ms delay
}

// listen for email send event
api.compose.onBeforeSend.addListener(async (tab) => {
  console.log("onBeforeSend event triggered for tab:", tab.id);
  showEldenRingBanner(tab.id);
});
