$(document).ready(function () {
    $('.header__timetable').click(function () {
        var target = $(this).attr('href');
        $('html, body').animate({scrollTop: $(target).offset().top}, 1000);
        return false;
    });
    $('.speakers__hematology').slick({
        dots: true,
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        slide: "div",
        dotsClass: ' slick-dots speakers__dots',
        prevArrow: ".speakers__prev",
        nextArrow: ".speakers__next",
        centerMode: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                }
            }
        ]
    });


});
$('#slider2').click(function () {
    $('.speakers__oncology').slick({
        dots: true,
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        slide: "div",
        dotsClass: ' slick-dots speakers__oncology--dots',
        prevArrow: ".speakers__oncology--prev",
        nextArrow: ".speakers__oncology--next",
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                }
            }
        ]
    });
})
$(function () {

    var $button = $('.js-hematology'),
        $container = $('.js-container');

    $button.on('click', function (e) {
        e.preventDefault();
        var toggleText = $(this).data('toggle-text');

        $(this).data('toggle-text', $(this).text())
            .text(toggleText);

        $container.toggleClass('program__hidden');
        $('.js-one').addClass('program__hidden');
    });
    $(".js-oncology").on('click', function (e) {
        e.preventDefault();
        var toggleText = $(this).data('toggle-text');

        $(this).data('toggle-text', $(this).text())
            .text(toggleText);

        $container.toggleClass('program__hidden');
        $('.js-one').addClass('program__hidden');
        $('.js-link1').removeClass('tabs__link_active');
        $('.js-link2').addClass('tabs__link_active');
        $('.js-content1').removeClass('tabs__pane_show');
        $('.js-content2').addClass('tabs__pane_show');
    });
    $(".program__back").on('click', function (e) {
        e.preventDefault();
        $container.toggleClass('program__hidden');
        $('.js-one').removeClass('program__hidden');
    })
});
var $tabs = function (target) {
    var
        _elemTabs = (typeof target === 'string' ? document.querySelector(target) : target),
        _eventTabsShow,
        _showTab = function (tabsLinkTarget) {
            var tabsPaneTarget, tabsLinkActive, tabsPaneShow;
            tabsPaneTarget = document.querySelector(tabsLinkTarget.getAttribute('href'));
            tabsLinkActive = tabsLinkTarget.parentElement.querySelector('.tabs__link_active');
            tabsPaneShow = tabsPaneTarget.parentElement.querySelector('.tabs__pane_show');
            // если следующая вкладка равна активной, то завершаем работу
            if (tabsLinkTarget === tabsLinkActive) {
                return;
            }
            // удаляем классы у текущих активных элементов
            if (tabsLinkActive !== null) {
                tabsLinkActive.classList.remove('tabs__link_active');
            }
            if (tabsPaneShow !== null) {
                tabsPaneShow.classList.remove('tabs__pane_show');
            }
            // добавляем классы к элементам (в завимости от выбранной вкладки)
            tabsLinkTarget.classList.add('tabs__link_active');
            tabsPaneTarget.classList.add('tabs__pane_show');
            document.dispatchEvent(_eventTabsShow);
        },
        _switchTabTo = function (tabsLinkIndex) {
            var tabsLinks = _elemTabs.querySelectorAll('.tabs__link');
            if (tabsLinks.length > 0) {
                if (tabsLinkIndex > tabsLinks.length) {
                    tabsLinkIndex = tabsLinks.length;
                } else if (tabsLinkIndex < 1) {
                    tabsLinkIndex = 1;
                }
                _showTab(tabsLinks[tabsLinkIndex - 1]);
            }
        };

    _eventTabsShow = new CustomEvent('tab.show', {detail: _elemTabs});

    _elemTabs.addEventListener('click', function (e) {
        var tabsLinkTarget = e.target;
        // завершаем выполнение функции, если кликнули не по ссылке
        if (!tabsLinkTarget.classList.contains('tabs__link')) {
            return;
        }
        // отменяем стандартное действие
        e.preventDefault();
        _showTab(tabsLinkTarget);
    });

    return {
        showTab: function (target) {
            _showTab(target);
        },
        switchTabTo: function (index) {
            _switchTabTo(index);
        }
    }

};

var listTabs = document.querySelectorAll('.tabs');
for (var i = 0, length = listTabs.length; i < length; i++) {
    $tabs(listTabs[i]);
}
$tabs('.tabs');