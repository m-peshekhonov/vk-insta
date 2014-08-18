BN.addDecl('map').onSetMod({
    'js': function() {
        var data = this.params.data,
            myMap,
            latitude = data.map.latitude,
            longitude = data.map.longitude,

            myMap = new ymaps.Map('map', {
                center: [latitude, longitude],
                zoom: 12
            }),
            myPlacemark = new ymaps.Placemark([latitude, longitude], {
                balloonContentHeader: '<img class="map__image" src='+data.image.url+'>',
                balloonContentBody: data.map.name ? data.map.name : '',
                balloonContentFooter: 'Автор: ' + data.username,
                hintContent: '<img class="map__userpic" src='+data.userpic+'>'
            }),
            ZoomLayout = ymaps.templateLayoutFactory.createClass("<div>" +
                "<div class='map__zoom-button map__zoom-button_type_in'>+</div>" +
                "<div class='map__zoom-button map__zoom-button_type_out'>–</div>" +
            "</div>", {

                // Переопределяем методы макета, чтобы выполнять дополнительные действия
                // при построении и очистке макета.
                build: function () {
                    // Вызываем родительский метод build.
                    ZoomLayout.superclass.build.call(this);

                    // Привязываем функции-обработчики к контексту и сохраняем ссылки
                    // на них, чтобы потом отписаться от событий.
                    this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
                    this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

                    // Начинаем слушать клики на кнопках макета.
                    $('.map__zoom-button_type_in').bind('click', this.zoomInCallback);
                    $('.map__zoom-button_type_out').bind('click', this.zoomOutCallback);
                },

                clear: function () {
                    // Снимаем обработчики кликов.
                    $('.map__zoom-button_type_in').unbind('click', this.zoomInCallback);
                    $('.map__zoom-button_type_out').unbind('click', this.zoomOutCallback);

                    // Вызываем родительский метод clear.
                    ZoomLayout.superclass.clear.call(this);
                },

                zoomIn: function () {
                    var map = this.getData().control.getMap();
                    // Генерируем событие, в ответ на которое
                    // элемент управления изменит коэффициент масштабирования карты.
                    this.events.fire('zoomchange', {
                        oldZoom: map.getZoom(),
                        newZoom: map.getZoom() + 1
                    });
                },

                zoomOut: function () {
                    var map = this.getData().control.getMap();
                    this.events.fire('zoomchange', {
                        oldZoom: map.getZoom(),
                        newZoom: map.getZoom() - 1
                    });
                }
            }),

            zoomControl = new ymaps.control.SmallZoomControl({
                layout: ZoomLayout
            });

            myMap.controls.add(zoomControl, { left: 5, top: 5 });
            myMap.geoObjects.add(myPlacemark);

    }
}).blockTemplate(function(ctx) {
    ctx.attr('id', 'map');
    ctx.js(true);
});
