BN.addDecl('people-search').blockTemplate(function(ctx) {
    ctx.js(true);

    ctx.content([
        {
            block: 'input',
            mix: [{ block: 'people-search', elem: 'input' }],
            hint: 'Поиск пользователей по никнейму'
        },
        {
            elem: 'button',
            content: 'Искать'
        }
    ]);
})
