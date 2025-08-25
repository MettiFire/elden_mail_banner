function showEldenRingBanner() {
    // Banner
    const banner = document.createElement('div');
    banner.id = 'elden-ring-banner';
    banner.innerHTML = `<img src="${chrome.runtime.getURL('assets/email_sent.png')}" alt="Email Sent">`;
    document.body.appendChild(banner);

    // Suono
    const audio = new Audio(chrome.runtime.getURL('assets/elden_ring_sound.mp3'));
    audio.volume = 0.5;
    audio.play();

    // Animazione
    setTimeout(() => banner.classList.add('show'), 50);
    setTimeout(() => {
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 500);
    }, 3000);
}

// Gmail
const gmailObserver = new MutationObserver(() => {
    const sendButtons = document.querySelectorAll('[aria-label^="Send"], [data-tooltip^="Send"]');
    sendButtons.forEach(btn => {
        if (!btn.dataset.eldenRingAttached) {
            btn.addEventListener('click', () => {
                setTimeout(showEldenRingBanner, 500);
            });
            btn.dataset.eldenRingAttached = "true";
        }
    });
});
gmailObserver.observe(document.body, { childList: true, subtree: true });

// Outlook
const outlookObserver = new MutationObserver(() => {
    const sendBtn = document.querySelector('button[title="Send"]');
    if (sendBtn && !sendBtn.dataset.eldenRingAttached) {
        sendBtn.addEventListener('click', () => {
            setTimeout(showEldenRingBanner, 500);
        });
        sendBtn.dataset.eldenRingAttached = "true";
    }
});
outlookObserver.observe(document.body, { childList: true, subtree: true });
