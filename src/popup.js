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

// version 2.0 that worked fully on Chrome and partially on Firefox
document.addEventListener("DOMContentLoaded", async () => {
  const soundToggle = document.getElementById("soundToggle");
  const colorOptions = document.querySelectorAll(".color-option");

  // Polyfill
  const storage = (typeof browser !== "undefined") ? browser.storage : chrome.storage;

  const DEFAULT_SOUND = true;
  const DEFAULT_COLOR = "yellow";

  // Legge le preferenze salvate
  const res = await storage.sync.get(["soundEnabled", "bannerColor"]);
  const prefs = {
    soundEnabled: res.soundEnabled !== undefined ? res.soundEnabled : DEFAULT_SOUND,
    bannerColor: res.bannerColor || DEFAULT_COLOR
  };

  // Applica le preferenze al popup
  soundToggle.checked = prefs.soundEnabled;
  colorOptions.forEach(opt => {
    opt.classList.toggle("selected", opt.dataset.color === prefs.bannerColor);
  });

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
