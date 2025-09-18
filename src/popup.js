// NOW FULLY WORKS ON BOTH BROWSERS
document.addEventListener("DOMContentLoaded", async () => {
  const soundToggle = document.getElementById("soundToggle");
  const colorOptions = document.querySelectorAll(".color-option");

  // determine browser and storage
  let storage;
  const isFirefox = typeof browser !== "undefined" && navigator.userAgent.includes("Firefox");
  if (isFirefox) {
    storage = browser.storage.local; // force local on firefox
  } else {
    storage = chrome.storage.sync;   // normal sync on chrome
  }

  const DEFAULT_SOUND = true;
  const DEFAULT_COLOR = "yellow";

  // read preferences
  const res = await storage.get(["soundEnabled", "bannerColor"]);
  const prefs = {
    soundEnabled: res.soundEnabled !== undefined ? res.soundEnabled : DEFAULT_SOUND,
    bannerColor: res.bannerColor || DEFAULT_COLOR
  };

  // apply preferences to UI
  soundToggle.checked = prefs.soundEnabled;
  colorOptions.forEach(opt => {
    opt.classList.toggle("selected", opt.dataset.color === prefs.bannerColor);
  });

  // save toggle sound
  soundToggle.addEventListener("change", () => {
    storage.set({ soundEnabled: soundToggle.checked });
  });

  // save color
  colorOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      colorOptions.forEach(c => c.classList.remove("selected"));
      opt.classList.add("selected");
      storage.set({ bannerColor: opt.dataset.color });
    });
  });
});
