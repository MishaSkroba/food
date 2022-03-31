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
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;  //будет содержать массив rest даже если ниодин аргумент не будет передан
            this.parent = document.querySelector(parentSelector);
            this.transfer = 9;
            this.changeToUAH();
        }

        changeToUAH () {
            this.price = this.transfer * this.price;
        }

        render () {
            const element = document.createElement('div');

            if(this.classes.length === 0) {  //данное условие будет проверять rest массив и в случае если он пустой элементу присвоится заданный класс
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            `;

            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg", 
        "vegy", 
        'Меню "Фитнес"', 
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
        12, 
        '.menu .container',
        'menu__item'
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

    //ФОРМЫ ПО ОТПРАВКЕ ДАННЫХ НА СЕРВЕР. На странице мы имеем 2 формы чтоб не дублировать код мы создадим функцию по отправке запроса и применим ее к каждой из форм
    const forms = document.querySelectorAll('form');  //получаем все формы со страницы
    const message = { //создадим обьект который будет сожержать в себе сообщения для пользователя  об отправке данных с сайта. Эти сообщения будут передоваться в блок который будет динамически создаваться в функции postData
        loading: 'Загрузка',
        success: 'Спасибо. Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach(item => { //Навешиваем функцию на каждую форму
        postData(item);
    });

    function postData(form) { //создаем функцию в которую мы будем передавать форму
        form.addEventListener('submit', (e) => { //навешиваем обработчик события submit. Данное событие выполняется если мы нажимаем  enter  в заполненном поле формы, липо кликаем по кнопке формы  и отправляет данныей формы. В качестве аргумента передаем обьект событие, чтоб отменить стандартное поведение браузера. 
            e.preventDefault(); //отменяем стандартное поведение браузера. Сабмит не будет теперь перезагружать страницу а будет отправлять данные без перезагрузки
            const statusMessage = document.createElement('div'); //сождаем элемент верстки (он сейчас только в js)
            statusMessage.classList.add('status'); // добавляем данному элементу класс
            statusMessage.textContent = message.loading; //присваиваем телу элемента сообщение "Загрузка". Логично что это сообщение всегда будет первым
            form.append(statusMessage); //И в конце отправляем элемент в HTML. 
        
            const request  = new XMLHttpRequest(); //Создаем обьект XMLHttpRequest
            request.open('POST', 'server.php'); //настраиваем запрос через метод open. Аргументы: 'метод','путь'
            //Следующая задача отправить введенные на клиенте данные. Можно получить из через получение элементов страницы, сохранение в переменных, формирование нового обьекта и т.д. Но есть более простой, современный метод - обьект formData.
            //Данные не всегда нужно передавать в формате JSON. Первый пример быдет передача в form-data
            //request.setRequestHeader('Content-type', 'multipart/form-data');  //Когда мы используем  XMLHttpRequest + formData нам не нужно прописывать заголовки
            request.setRequestHeader('Content-type', 'application/json'); //если хотим передать на сервер json
            const formData = new FormData(form); //для того чтоб можно было пользоваться этим обьектом, нужно чтоб в HTML все интерактивые элементы содержали атрибут name! Иначе form-data не найдет значения поля.

            //FormData это формат который нельза просто переделать в json. Нам нужно создать пустой обьект, методом перебора перебрать обьект FormData и вставить в новосозданный обьект значения. После методом stringify присвоить данные в формате json переменной.
            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            const json = JSON.stringify(object);

            //request.send(formData); //отправляем данные. formData - body запроса.  В нем содержатся элементы формы (237 строка)
            request.send(json); //передаем json. Нужно помнить что php не умеет работать с json поэтому в php файле мы пропишем декодер

            request.addEventListener('load', () => { //отлавливаем событие- конец загрузки запроса
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset(); //данный метод очищает форму
                    setTimeout(() => {
                        statusMessage.remove(); //так мы удалим динамически сгенерированный блок
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });

        });
    }
});