const dialog = document.querySelector('#booking');
const descriptions = {
vr: ['Другая реальность ждёт', 'Четыре VR-площадки с HTC Vive Pro. Инструктор поможет выбрать игру и освоиться. Можно играть одному или командой.', '15 минут — 400 ₽ · 30 минут — 700 ₽ · 60 минут — 1 000 ₽'],
console: ['Ещё одну каточку?', 'В клубе четыре приставки PS5 и PS4 Pro, ретро-консоль Dendy и автосимулятор. Приходите за любимыми играми и новыми победами.', 'Антикафе — 300 ₽ / час. Доступность игр уточняйте у администратора.'],
board: ['Собираемся за столом', 'Мафия, Монополия, Манчкин, Имаджинариум, Экивоки, UNO и Крокодил — выбирайте настроение и приводите друзей.', 'Антикафе — 300 ₽ / час. Расписание тематических вечеров — в соцсетях клуба.']
};
function showModal(type) {
const item = descriptions[type];
document.querySelector('#modal-title').textContent = item ? item[0] : 'Собираем вашу компанию?';
document.querySelector('#modal-copy').textContent = item ? item[1] : 'Напишите администратору: уточните свободное время, количество гостей и формат отдыха. Бронирование подтверждает клуб.';
document.querySelector('#modal-extra').textContent = item ? item[2] : '';
dialog.showModal(); document.body.style.overflow = 'hidden';
}
document.querySelectorAll('[data-book]').forEach(b => b.addEventListener('click', () => showModal()));
document.querySelectorAll('[data-detail]').forEach(b => b.addEventListener('click', () => showModal(b.dataset.detail)));
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
document.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => {
document.querySelectorAll('[data-filter]').forEach(x => { x.classList.toggle('active', x === b); x.setAttribute('aria-pressed', String(x === b)); });
document.querySelectorAll('[data-category]').forEach(card => { card.hidden = b.dataset.filter !== 'all' && !card.dataset.category.split(' ').includes(b.dataset.filter); });
}));
const menu = document.querySelector('.menu');
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); document.querySelector('nav').classList.toggle('open', open); });
document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => { menu.setAttribute('aria-expanded', 'false'); document.querySelector('nav').classList.remove('open'); }));
