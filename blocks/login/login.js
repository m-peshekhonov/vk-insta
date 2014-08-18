BN.addDecl('login').onSetMod({
    'js': function() {
        this.bindTo('button', 'click', function() {
            BN('i-insta').login();
        })
    }
});
