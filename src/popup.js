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


// Polyfill per compatibilità Firefox/Chrome
const storage = (typeof browser !== "undefined") ? browser.storage : chrome.storage;

// Attendi che il DOM sia pronto
document.addEventListener("DOMContentLoaded", () => {
  const soundToggle = document.getElementById("soundToggle");
  const colorOptions = document.querySelectorAll(".color-option");

  // Carica preferenze
  const getPrefs = async () => {
    let prefs;
    if (storage.get.length === 1) {
      // Chrome callback
      storage.sync.get(["soundEnabled", "bannerColor"], (res) => applyPrefs(res));
    } else {
      // Firefox Promise
      prefs = await storage.sync.get(["soundEnabled", "bannerColor"]);
      applyPrefs(prefs);
    }
  };

  const applyPrefs = (prefs) => {
    // Toggle suono
    soundToggle.checked = prefs.soundEnabled !== false; // default true
    // Banner colore
    const selectedColor = prefs.bannerColor || "yellow";
    colorOptions.forEach(opt => {
      opt.classList.toggle("selected", opt.dataset.color === selectedColor);
    });
  };

  getPrefs();

  // Salva toggle suono
  soundToggle.addEventListener("change", () => {
    storage.sync.set({ soundEnabled: soundToggle.checked });
  });

  // Salva scelta colore
  colorOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      colorOptions.forEach(c => c.classList.remove("selected"));
      opt.classList.add("selected");
      storage.sync.set({ bannerColor: opt.dataset.color });
    });
  });
});
