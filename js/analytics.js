// js/analytics.js

// Функция для отправки событий в GA4
function sendEvent(eventName, params = {}) {
    if (typeof gtag === 'function') {
        gtag('event', eventName, params);
        console.log(`[GA4] Отправлено событие: ${eventName}`, params);
    } else {
        console.warn(`[GA4] Ошибка: gtag не загружен.`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Клики по кнопкам
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.type !== 'submit') {
                sendEvent('cta_click', { button_name: button.textContent.trim().substring(0, 30) });
            }
        });
    });

    // 2. Клики по телефону
    const phoneLink = document.querySelector('a[href^="tel:"]');
    if (phoneLink) {
        phoneLink.addEventListener('click', () => {
            sendEvent('contact_click', { contact_type: 'phone' });
        });
    }

    // 3. Клики по соцсетям
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', () => {
            sendEvent('social_click', { social_network: link.textContent.trim().toLowerCase() });
        });
    });

    // 4. ОТПРАВКА ФОРМЫ И GENERATE_LEAD
    const leadForm = document.querySelector('#lead-form');
    if (leadForm) {
        // Записываем UTM-метки
        const params = new URLSearchParams(window.location.search);
        const utmFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
        utmFields.forEach(field => {
            const input = leadForm.elements.namedItem(field);
            if (input) input.value = params.get(field) || '';
        });

        const requestIdInput = leadForm.elements.namedItem('request_id');

        leadForm.addEventListener('submit', (event) => {
            if (!requestIdInput.value) {
                requestIdInput.value = 'REQ-' + crypto.randomUUID().toUpperCase();
            }

            // ОТПРАВЛЯЕМ СОБЫТИЕ
            sendEvent('generate_lead', {
                lead_style: leadForm.querySelector('select[name="dance_style"]').value,
                lead_level: leadForm.querySelector('select[name="level"]').value
            });

            const btn = leadForm.querySelector('button[type="submit"]');
            btn.textContent = 'Отправка...';
            btn.disabled = true;
            
            // Ждем 2 секунды перед переходом
            setTimeout(() => {
                window.location.href = 'thanks.html';
            }, 2000); 
        });
    }
});