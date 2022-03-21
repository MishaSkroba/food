window.addEventListener('DOMContentLoaded', () => {
    //TABS
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');
    const tabs = document.querySelectorAll('.tabheader__item');

    function hideTabContent () {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent (i=0) { //Задаем параметр по умолчанию
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    //Дилигируем обработчик событий. Отображаем нужные табы
    tabsParent.addEventListener('click', (event) => {   //Навешиваем обработчик на родителя
        const target = event.target;    //Присваеваем элемент с которым произошло событие переменной для удобства работы

        if(target && target.classList.contains('tabheader__item')) {    //Проверяем что клик произошел по нужному элементу а не по родительскому
            tabs.forEach((item, i) => {   //Перебираем все элементы чтоб сравнением найт тот с которым произошло событие
                if(target == item) {    
                    hideTabContent();
                    showTabContent(i); //Присваеваем номер элемента функции которая отвечает за отображение табы
                }
            });
        }

    });


    hideTabContent();
    showTabContent();

    //TIMER
    const deadLine = "2022-04-03";

    function getTimeRemaining(endTime){
        const t = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(t / (1000*60*60*24)), 
            hours = Math.floor(t / (1000*60*60) % 24), 
            minutes = Math.floor(t / (1000*60) % 60), 
            seconds = Math.floor((t / 1000) % 60); 

            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds,
            };
    }

    function getZero(num) {  
        if(num>=0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock (selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock(); //функция инициализации запускается чтоб в таймер значения устанавливались сразу после загрузки страницы, а не через 1000милисек. как это указано в setInterval

        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total < 0){
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadLine);

    //MODAL WINDOW
    const modalTrigger = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    const modalClose = document.querySelector('.modal__close');

    function openModal() {
        //modal.classList.add('show'); //
        //modal.classList.remove('hide');
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(moadlTimerId); // если функция уже выполнялась (пользователь открывал модальное окно кнопкой) то окно не будет окрываться по таймауту
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', openModal);
    });

    function closeModal() {
        //modal.classList.add('hide');
        //modal.classList.remove('show');
        modal.classList.toggle('show'); //для того чтоб скрыть модальное окно можно использовать add/remove методы, а можно воспльзоваться toggle
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);

    //Скрываем модальное окно по клику на паранжу
    modal.addEventListener('click', (e) => {
        if (e.target === modal) { //сравниваем цель события с элементом
            closeModal();
        }
    });

    //Скрываем модальное окно по нажатию на esc
    document.addEventListener('keydown', (e) => {
        if(e.code === "Escape" && modal.classList.contains("show")) { //дополнительно проверяем что модальное окно открыто, чтоб не выполнять функцию всегда
            closeModal();
        }
    });

    const moadlTimerId = setTimeout(openModal, 10000);

    function showModalByScroll() {
        if(window.pageYOffset /*количество пикселей, на которое прокручен документ по вертикали*/ + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { //document.documentElement возвращает элемент Element , который является коренным элементом документа  document
        openModal();

        window.removeEventListener('scroll', showModalByScroll); //Для того чтоб модаьлное окно показывалось молько 1 раз мы удаляем обработчик событий после сразу после вызова функции
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    
    // Используем классы для создание карточек меню
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 9;
            this.changeToUAH();
        }

        changeToUAH () {
            this.price = this.transfer * this.price;
        }

        render () {
            const div = document.createElement('div');

            div.innerHTML = `
            <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
            `;

            this.parent .append(div);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg", 
        "vegy", 
        'Меню "Фитнес"', 
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
        12, 
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container"
    ).render();
});