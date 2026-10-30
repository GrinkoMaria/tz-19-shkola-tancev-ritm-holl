# ТЗ-19. Школа танцев «Ритм Холл»

Проект выполнен в рамках дисциплины ОП.03 «Информационные технологии». 
Цель: создание сайта школы танцев и настройка сквозной аналитики заявок.

## 🚀 Ссылки на проект

*   **Сайт на Vercel:** [https://tz-19-shkola-tancev-ritm-holl-liart.vercel.app/](https://tz-19-shkola-tancev-ritm-holl-liart.vercel.app/)
*   **Презентация к защите:** [presentation.pptx](docs/presentation.pptx) *(скачать для просмотра)*
*   **Google Таблица с заявками:** [RitmHall — Leads (Google Sheets)](https://docs.google.com/spreadsheets/d/1q4yhypFDfpAM5hyjvhd4LY7HJZ11wUMMmuJId_M60Ic/edit?usp=sharing)
*   **Ресурс GA4:** `G-K0RDRQXZ9W`
*   **Telegram-бот:** [@RitmHall_Test_bot](https://t.me/RitmHall_Test_bot)

## 📂 Структура репозитория

*   `index.html` и др. — 11 HTML-страниц сайта.
*   `css/style.css` — стили сайта.
*   `js/analytics.js` — скрипт настройки событий Google Analytics 4.
*   `js/script.js` — скрипт отправки формы.
*   `apps-script/Code.gs` — код приёмника заявок для Google Apps Script.
*   `docs/report.md` — аналитическая записка.
*   `docs/presentation.pptx` — файл презентации для защиты.
*   `docs/prompts.md` — журнал запросов к нейросети.
*   `screens/` — папка со скриншотами (GA4, HubSpot, Telegram-бот и т.д.).

## ✅ Что реализовано

1.  **Сайт:** 11 страниц (включая 404), адаптивная вёрстка, публикация на Vercel.
2.  **Аналитика:** Настроен GA4 (18 событий), ключевое событие `generate_lead`. Сбор данных о кликах и скроллах.
3.  **Сбор заявок:** Форма отправляет данные через Apps Script в Google Таблицу.
4.  **UTM-метки:** Настроена передача и сохранение UTM-меток в таблице.
5.  **CRM HubSpot:** Настроена воронка сделок и импортированы контакты.
6.  **Автоматизация:** Создан сценарий в ManyChat для Telegram-бота (в связи с ограничениями Meta для Instagram).

## ⚠️ Важное примечание
В рамках раздела 7 ТЗ требовалась настройка ManyChat для Instagram. Из-за технических ограничений доступа к сервисам Meta из РФ (ошибка `ERR_CONNECTION_ABORTED`), интеграция была выполнена через Telegram-бота. Подробное обоснование находится в файле `docs/report.md`.

---
*Проект выполнен студентом: [Гринько Мария; РПО-3 2025]*