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

document.addEventListener("DOMContentLoaded", () => {
  const soundToggle = document.getElementById("soundToggle");
  const colorOptions = document.querySelectorAll(".color-option");

  // Polyfill per compatibilità
  const storage = (typeof browser !== "undefined") ? browser.storage : chrome.storage;

  const DEFAULT_SOUND = true;
  const DEFAULT_COLOR = "yellow";

  const applyPrefs = (prefs) => {
    // Imposta toggle e colori
    soundToggle.checked = prefs.soundEnabled;
    const selectedColor = prefs.bannerColor;
    colorOptions.forEach(opt => {
      opt.classList.toggle("selected", opt.dataset.color === selectedColor);
    });
  };

  // Carica preferenze e imposta default se mancanti
  const getPrefs = async () => {
    let prefs;
    if (storage.get.length === 1) {
      // Chrome
      storage.sync.get(["soundEnabled", "bannerColor"], (res) => {
        prefs = {
          soundEnabled: res.soundEnabled !== undefined ? res.soundEnabled : DEFAULT_SOUND,
          bannerColor: res.bannerColor || DEFAULT_COLOR
        };
        applyPrefs(prefs);
        // Salva default se mancavano
        storage.sync.set(prefs);
      });
    } else {
      // Firefox
      prefs = await storage.sync.get(["soundEnabled", "bannerColor"]);
      prefs = {
        soundEnabled: prefs.soundEnabled !== undefined ? prefs.soundEnabled : DEFAULT_SOUND,
        bannerColor: prefs.bannerColor || DEFAULT_COLOR
      };
      applyPrefs(prefs);
      await storage.sync.set(prefs);
    }
  };

  getPrefs();

  // Salvataggio toggle
  soundToggle.addEventListener("change", () => {
    storage.sync.set({ soundEnabled: soundToggle.checked });
  });

  // Salvataggio colore
  colorOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      colorOptions.forEach(c => c.classList.remove("selected"));
      opt.classList.add("selected");
      storage.sync.set({ bannerColor: opt.dataset.color });
    });
  });
});
