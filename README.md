##[Instagram application](http://vk.com/instaflat) for VK.com


### Установка

    $ git clone https://github.com/m-peshekhonov/vk-insta.git instagram
    $ cd instagram
    $ npm install
    $ make dev

### Запуск

    $ npm start или 'node app/insta/insta.server.js --socket 3000'

Страница доступна по адресу http://127.0.0.1:3000/ или localhost:3000

### Пересборка
При добавлении новых файлов `deps.js` или `bemdecl.js`

    $ make rebuild

### Структура проекта

  - `common.blocks` — общие блоки проекта. Например: header, footer, menu, sidebar и т.п.
  - `data.blocks` — блоки взаимодействующие с API
  - `pages.blocks` — страницы-блоки проекта

### Докуменатция

https://github.com/wtfil/bem-node/blob/master/README.md

https://github.com/bem-node

### Project Stub

https://github.com/m-peshekhonov/bn-meshok
