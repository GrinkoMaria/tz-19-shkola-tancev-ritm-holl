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
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
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

    // ==========================================
    // 4. ЛОГИКА ОТПРАВКИ ФОРМЫ (добавлено сейчас)
    // ==========================================
    const leadForm = document.querySelector('#lead-form');

    if (leadForm) {
        // Подставляем UTM-метки
        const params = new URLSearchParams(window.location.search);
        const utmFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
        utmFields.forEach(field => {
            const input = leadForm.elements.namedItem(field);
            if (input) input.value = params.get(field) || '';
        });

        const requestIdInput = leadForm.elements.namedItem('request_id');

        leadForm.addEventListener('submit', (event) => {
            // Генерируем ID
            if (!requestIdInput.value) {
                requestIdInput.value = 'REQ-' + crypto.randomUUID().toUpperCase();
            }

            // Отправляем событие generate_lead
            sendEvent('generate_lead', {
                lead_style: leadForm.querySelector('select[name="dance_style"]').value,
                lead_level: leadForm.querySelector('select[name="level"]').value
            });

            // Блокируем кнопку
            const btn = leadForm.querySelector('button[type="submit"]');
            btn.textContent = 'Отправка...';
            btn.disabled = true;
            
            // Перенаправляем на страницу спасибо через 1 секунду
            setTimeout(() => {
                window.location.href = 'thanks.html';
            }, 1000); 
        });
    }
});