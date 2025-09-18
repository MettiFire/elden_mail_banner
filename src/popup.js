/*
document.addEventListener("DOMContentLoaded", () => {
  const soundToggle = document.getElementById("soundToggle");
  const colorOptions = document.querySelectorAll(".color-option");

  // load preferences
  chrome.storage.sync.get(["soundEnabled", "bannerColor"], (prefs) => {
    soundToggle.checked = prefs.soundEnabled !== false; // default true -> with sound
    const selectedColor = prefs.bannerColor || "yellow";
    colorOptions.forEach(opt => {
      opt.classList.toggle("selected", opt.dataset.color === selectedColor);
    });
  });

  // save sound toggle
  soundToggle.addEventListener("change", () => {
    chrome.storage.sync.set({ soundEnabled: soundToggle.checked });
  });

  // save color choice
  colorOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      colorOptions.forEach(c => c.classList.remove("selected"));
      opt.classList.add("selected");
      chrome.storage.sync.set({ bannerColor: opt.dataset.color });
    });
  });
});*/

/*
// version 2.0 that worked fully on Chrome and partially on Firefox
document.addEventListener("DOMContentLoaded", async () => {
  const soundToggle = document.getElementById("soundToggle");
  const colorOptions = document.querySelectorAll(".color-option");

  // polyfill
  const storage = (typeof browser !== "undefined") ? browser.storage : chrome.storage;

  const DEFAULT_SOUND = true;
  const DEFAULT_COLOR = "yellow";

  // read saved preferences
  const res = await storage.sync.get(["soundEnabled", "bannerColor"]);
  const prefs = {
    soundEnabled: res.soundEnabled !== undefined ? res.soundEnabled : DEFAULT_SOUND,
    bannerColor: res.bannerColor || DEFAULT_COLOR
  };

  // apply preferences to popup
  soundToggle.checked = prefs.soundEnabled;
  colorOptions.forEach(opt => {
    opt.classList.toggle("selected", opt.dataset.color === prefs.bannerColor);
  });

  // save sound toggle
  soundToggle.addEventListener("change", () => {
    storage.sync.set({ soundEnabled: soundToggle.checked });
  });

  // save color choice
  colorOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      colorOptions.forEach(c => c.classList.remove("selected"));
      opt.classList.add("selected");
      storage.sync.set({ bannerColor: opt.dataset.color });
    });
  });
});

*/

/*
// VERSION 3.0 - WORKS LIKE A CHARM ON CHROME, ON FIREFOX SAVES THE DEFAULT PREFERENCES
document.addEventListener("DOMContentLoaded", async () => {
  const soundToggle = document.getElementById("soundToggle");
  const colorOptions = document.querySelectorAll(".color-option");

  // Polyfill per compatibilità browser
  const api = (typeof browser !== "undefined") ? browser : chrome;

  const DEFAULT_SOUND = true;
  const DEFAULT_COLOR = "yellow";

  // Usa sync se disponibile, altrimenti local
  const storage = api.storage.sync || api.storage.local;

  // leggi preferenze
  let res;
  try {
    res = await storage.get(["soundEnabled", "bannerColor"]);
  } catch (e) {
    console.warn("Sync storage non disponibile, uso local", e);
    res = await api.storage.local.get(["soundEnabled", "bannerColor"]);
  }

  const prefs = {
    soundEnabled: res.soundEnabled !== undefined ? res.soundEnabled : DEFAULT_SOUND,
    bannerColor: res.bannerColor || DEFAULT_COLOR
  };

  // applica preferenze
  soundToggle.checked = prefs.soundEnabled;
  colorOptions.forEach(opt => {
    opt.classList.toggle("selected", opt.dataset.color === prefs.bannerColor);
  });

  // salva preferenze su cambio
  soundToggle.addEventListener("change", () => {
    storage.set({ soundEnabled: soundToggle.checked });
  });

  colorOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      colorOptions.forEach(c => c.classList.remove("selected"));
      opt.classList.add("selected");
      storage.set({ bannerColor: opt.dataset.color });
    });
  });
});
*/

document.addEventListener("DOMContentLoaded", async () => {
  const soundToggle = document.getElementById("soundToggle");
  const colorOptions = document.querySelectorAll(".color-option");

  // determinare browser e storage
  let storage;
  const isFirefox = typeof browser !== "undefined" && navigator.userAgent.includes("Firefox");
  if (isFirefox) {
    storage = browser.storage.local; // forza local su Firefox
  } else {
    storage = chrome.storage.sync;   // Chrome normale
  }

  const DEFAULT_SOUND = true;
  const DEFAULT_COLOR = "yellow";

  // leggi preferenze
  const res = await storage.get(["soundEnabled", "bannerColor"]);
  const prefs = {
    soundEnabled: res.soundEnabled !== undefined ? res.soundEnabled : DEFAULT_SOUND,
    bannerColor: res.bannerColor || DEFAULT_COLOR
  };

  // applica preferenze al popup
  soundToggle.checked = prefs.soundEnabled;
  colorOptions.forEach(opt => {
    opt.classList.toggle("selected", opt.dataset.color === prefs.bannerColor);
  });

  // salva toggle suono
  soundToggle.addEventListener("change", () => {
    storage.set({ soundEnabled: soundToggle.checked });
  });

  // salva colore
  colorOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      colorOptions.forEach(c => c.classList.remove("selected"));
      opt.classList.add("selected");
      storage.set({ bannerColor: opt.dataset.color });
    });
  });
});
