BN.addDecl('select').onSetMod({

    'js': function() {
        var page = this.findBlockOutside('b-page');

        this.bindTo('button', 'click', function(e) {
            e.stopPropagation();
            this._toggle();
        });

        this.bindTo('item', 'click', function(e) {
            e.stopPropagation();
        });

        page.bindTo('click', function() {
            this._hide();
        }.bind(this));
    }

}).instanceProp({

    _toggle: function() {
        this.toggleMod('show', 'yes');
    },

    _hide: function() {
        this.delMod('show');
    }

}).blockTemplate(function(ctx) {

    ctx.js(true);

});
