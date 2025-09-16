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

document.addEventListener("DOMContentLoaded", async () => {
  const soundToggle = document.getElementById("soundToggle");
  const colorOptions = document.querySelectorAll(".color-option");

  // polyfill
  const storage = (typeof browser !== "undefined") ? browser.storage.local : chrome.storage.sync;

  const DEFAULT_SOUND = true;
  const DEFAULT_COLOR = "yellow";

  // read saved preferences
  const res = await storage.get(["soundEnabled", "bannerColor"]);
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
    storage.set({ soundEnabled: soundToggle.checked });
  });

  // save color choice
  colorOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      colorOptions.forEach(c => c.classList.remove("selected"));
      opt.classList.add("selected");
      storage.set({ bannerColor: opt.dataset.color });
    });
  });
});
