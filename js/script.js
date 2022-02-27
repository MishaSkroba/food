window.addEventListener('DOMContentLoaded', () => {
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
});