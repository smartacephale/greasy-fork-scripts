// ==UserScript==
// @name        Genocide Proton Newsletters
// @namespace   Violentmonkey Scripts
// @match       https://mail.proton.me/u/0/views/newsletters*
// @grant       none
// @version     1.0
// @author      -
// @run-at      document-idle
// @description Unsubscribe from all Newsletters in Proton.me
// ==/UserScript==

async function genocideNewsletters() {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    while (true) {
        // 1. Find the first unsubscribe button where text matches exactly 'Unsubscribe'
        const unsubButton = Array.from(document.querySelectorAll('button'))
            .find(btn => btn.textContent.trim() === 'Unsubscribe' && btn.offsetParent !== null);

        if (!unsubButton) {
            console.log("Finished: No more 'Unsubscribe' buttons found.");
            break;
        }

        // Click it and wait for the popup
        unsubButton.click();
        console.log("Unsubscribe clicked, waiting for popup...");
        await delay(1000);

        // 2. Select 'Trash existing' option in the popup
        const trashOption = Array.from(document.querySelectorAll('label, span'))
            .find(el => el.textContent.includes('Trash existing') || el.textContent.includes('Move to Trash'));

        if (trashOption) {
            trashOption.click();
            console.log("Selected 'Trash existing'.");
        }

        // 3. Select specific button by data-testid and click it
        const finalConfirmBtn = document.querySelector('button[data-testid="unsubscribe-button"]');

        if (finalConfirmBtn) {
            finalConfirmBtn.click();
            console.log("Final confirmation clicked.");
        } else {
            console.log("Could not find the confirm button with data-testid.");
            // Optional: Escape the loop or click a generic button if the ID fails
            break;
        }

        // 4. Wait for 1 second before repeating
        console.log("Cooldown: 1 second...");
        await delay(1000);
    }
}

setTimeout(genocideNewsletters, 3000);
