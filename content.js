// in modo che non si blocchi quando cambia scena
const bannerImgUrl = chrome.runtime.getURL("assets/email_sent_yellow.png");
const soundUrl = chrome.runtime.getURL("assets/elden_ring_sound.mp3");

/*
function showEldenRingBanner() {
    console.log("Banner function called");

    // banner
    const banner = document.createElement("div");
    banner.id = "elden-ring-banner";
    banner.innerHTML = `<img src="${bannerImgUrl}" alt="Email Sent">`;
    document.body.appendChild(banner);
    console.log("Banner appended");

    // suono
    const audio = new Audio(soundUrl);
    audio.volume = 0.35;
    audio.play().catch(err => console.error("Errore nel suono:", err));

    // animazione
    setTimeout(() => banner.classList.add("show"), 50);
    setTimeout(() => {
        banner.classList.remove("show");
        setTimeout(() => banner.remove(), 500);
    }, 3000);
}
*/

function showEldenRingBanner() {
    console.log("Banner function called");

    chrome.storage.sync.get(["soundEnabled", "bannerColor"], (prefs) => {
        const bannerColor = prefs.bannerColor || "yellow";
        const soundEnabled = prefs.soundEnabled !== false;

        const banner = document.createElement('div');
        banner.id = 'elden-ring-banner';
        banner.innerHTML = `<img src="${chrome.runtime.getURL(`assets/email_sent_${bannerColor}.png`)}" alt="Email Sent">`;
        document.body.appendChild(banner);
        console.log("Banner appended");

        if (soundEnabled) {
            const audio = new Audio(chrome.runtime.getURL('assets/elden_ring_sound.mp3'));
            audio.volume = 0.35;
            audio.play().catch(err => console.error("Errore nel suono:", err));
        }

        setTimeout(() => banner.classList.add('show'), 50);
        setTimeout(() => {
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 500);
        }, 3000);
    });
}



//You can add more language options here
const keywords = ["Invia","Send","傳送","发送","送信","보내기","Enviar","Senden","Envoyer"]

// Gmail observer
const gmailObserver = new MutationObserver(() => {
    const buttons_selector = keywords.map(k => `[aria-label^="${k}"], [data-tooltip^="${k}"]`)
    const sendButtons = document.querySelectorAll(buttons_selector);
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
    const btn_selector = keywords.map(k => `button[title="${k}"]`);
    const sendBtn = document.querySelector(btn_selector);
    if (sendBtn && !sendBtn.dataset.eldenRingAttached) {
        sendBtn.addEventListener('click', () => {
            console.log("Outlook send button clicked");
            setTimeout(showEldenRingBanner, 500);
        });
        sendBtn.dataset.eldenRingAttached = "true";
    }
});
outlookObserver.observe(document.body, { childList: true, subtree: true });
