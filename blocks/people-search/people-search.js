BN.addDecl('people-search').onSetMod({
    'js': function() {
        this._page = this.findBlockOutside('b-page');

        this.bindTo('button', 'click', function() {
            var val = this.elem('input').val();
            this._searchPeople(val);
        });

        this.bindTo('input', 'keydown keyup', function(e) {
            var val = this.elem('input').val();
            e.keyCode == '13' && val !='' && this._searchPeople(val);
        });

        this.bindTo('blur', function(e) {
            console.log(2)
        });

        // BEM.DOM.doc.on('click', function(argument) {
        //     // body...
        // })
    }
}).instanceProp({
    _searchPeople: function(name) {
        BN('i-router').setPath('/search/users/' + name);
        this.delMod('visibility');
    }
});
