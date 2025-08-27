document.addEventListener("DOMContentLoaded", () => {
  const soundToggle = document.getElementById("soundToggle");
  const colorOptions = document.querySelectorAll(".color-option");

  // Load preferences
  chrome.storage.sync.get(["soundEnabled", "bannerColor"], (prefs) => {
    soundToggle.checked = prefs.soundEnabled !== false; // default true
    const selectedColor = prefs.bannerColor || "yellow";
    colorOptions.forEach(opt => {
      opt.classList.toggle("selected", opt.dataset.color === selectedColor);
    });
  });

  // Save sound toggle
  soundToggle.addEventListener("change", () => {
    chrome.storage.sync.set({ soundEnabled: soundToggle.checked });
  });

  // Save color choice
  colorOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      colorOptions.forEach(c => c.classList.remove("selected"));
      opt.classList.add("selected");
      chrome.storage.sync.set({ bannerColor: opt.dataset.color });
    });
  });
});
