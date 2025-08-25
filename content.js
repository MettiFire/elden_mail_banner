/*function showEldenRingBanner() {
    console.log("Banner function called");

    // Banner
    const banner = document.createElement('div');
    banner.id = 'elden-ring-banner';
    banner.innerHTML = `<img src="${chrome.runtime.getURL('assets/email_sent.png')}" alt="Email Sent">`;
    document.body.appendChild(banner);
    console.log("Banner appended");

    // Suono
    const audio = new Audio(chrome.runtime.getURL('assets/elden_ring_sound.mp3'));
    audio.volume = 0.35;
    audio.play().catch(err => console.error("Errore nel suono:", err));

    // Animazione
    setTimeout(() => banner.classList.add('show'), 50);
    setTimeout(() => {
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 500);
    }, 3000);
}*/

const bannerImgUrl = chrome.runtime.getURL("assets/email_sent.png");
const soundUrl = chrome.runtime.getURL("assets/elden_ring_sound.mp3");

function showEldenRingBanner() {
    console.log("Banner function called");

    // Banner
    const banner = document.createElement("div");
    banner.id = "elden-ring-banner";
    banner.innerHTML = `<img src="${bannerImgUrl}" alt="Email Sent">`;
    document.body.appendChild(banner);
    console.log("Banner appended");

    // Suono
    const audio = new Audio(soundUrl);
    audio.volume = 0.35;
    audio.play().catch(err => console.error("Errore nel suono:", err));

    // Animazione
    setTimeout(() => banner.classList.add("show"), 50);
    setTimeout(() => {
        banner.classList.remove("show");
        setTimeout(() => banner.remove(), 500);
    }, 3000);
}

// Gmail observer
const gmailObserver = new MutationObserver(() => {
    const sendButtons = document.querySelectorAll('[aria-label^="Invia"], [data-tooltip^="Invia"]');
    sendButtons.forEach(btn => {
        if (!btn.dataset.eldenRingAttached) {
            btn.addEventListener('click', () => {
                console.log("Gmail send button clicked");
                setTimeout(showEldenRingBanner, 500);
            });
            btn.dataset.eldenRingAttached = "true";
        }
    });
});
gmailObserver.observe(document.body, { childList: true, subtree: true });

// Outlook observer
const outlookObserver = new MutationObserver(() => {
    const sendBtn = document.querySelector('button[title="Invia"]');
    if (sendBtn && !sendBtn.dataset.eldenRingAttached) {
        sendBtn.addEventListener('click', () => {
            console.log("Outlook send button clicked");
            setTimeout(showEldenRingBanner, 500);
        });
        sendBtn.dataset.eldenRingAttached = "true";
    }
});
outlookObserver.observe(document.body, { childList: true, subtree: true });
