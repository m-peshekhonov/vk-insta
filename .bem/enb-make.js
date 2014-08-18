//@see https://github.com/enb-make/enb
module.exports = require('../node_modules/bem-node/enb-make')
    // .noBEMHTML()
    .pages('app/*')
    .levels([
        'configs/' + process.env['YENV'] + '/common.blocks',
        'blocks',
        'data.blocks',
        'pages.blocks'
    ]);
    // .freeze();
