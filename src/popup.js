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
  // Compatibilità tra browser
  const storage = (typeof browser !== "undefined") ? browser.storage : chrome.storage;

  const soundToggle = document.getElementById("soundToggle");
  const colorOptions = document.querySelectorAll(".color-option");

  // Carica le preferenze
  const loadPrefs = () => {
    // Firefox: storage.sync.get restituisce una Promise
    // Chrome: restituisce un callback
    if (storage.sync.get.length === 1) {
      // Promise (Firefox)
      storage.sync.get(["soundEnabled", "bannerColor"]).then((prefs) => {
        setupUI(prefs);
      });
    } else {
      // Callback (Chrome)
      storage.sync.get(["soundEnabled", "bannerColor"], (prefs) => {
        setupUI(prefs);
      });
    }
  };

  const setupUI = (prefs) => {
    soundToggle.checked = prefs.soundEnabled !== false;
    const selectedColor = prefs.bannerColor || "yellow";
    colorOptions.forEach(opt => {
      opt.classList.toggle("selected", opt.dataset.color === selectedColor);
    });
  };

  // Salva le preferenze
  soundToggle.addEventListener("change", () => {
    storage.sync.set({ soundEnabled: soundToggle.checked });
  });

  colorOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      colorOptions.forEach(c => c.classList.remove("selected"));
      opt.classList.add("selected");
      storage.sync.set({ bannerColor: opt.dataset.color });
    });
  });

  loadPrefs();
});