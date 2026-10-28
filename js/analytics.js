// js/analytics.js

// Функция для отправки событий в GA4
function sendEvent(eventName, params = {}) {
    if (typeof gtag === 'function') {
        gtag('event', eventName, params);
        console.log(`[GA4] Отправлено событие: ${eventName}`, params); // Для отладки в консоли
    }
}

// Ждем загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Событие cta_click (Клик по кнопке "Записаться на пробное")
    // Находим все кнопки, у которых есть класс .btn
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Проверяем, что это не кнопка отправки формы, чтобы не дублировать
            if (button.type !== 'submit') {
                sendEvent('cta_click', {
                    button_name: button.textContent.trim().substring(0, 30),
                    page_section: 'body'
                });
            }
        });
    });

    // 2. Событие contact_click (Клик по телефону в подвале)
    const phoneLink = document.querySelector('a[href^="tel:"]');
    if (phoneLink) {
        phoneLink.addEventListener('click', () => {
            sendEvent('contact_click', {
                contact_type: 'phone'
            });
        });
    }

    // 3. Событие social_click (Клик по соцсетям)
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', () => {
            sendEvent('social_click', {
                social_network: link.textContent.trim().toLowerCase()
            });
        });
    });
});