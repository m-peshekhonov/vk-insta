BN.addDecl('link').onSetMod({
    'js': function() {
        this.bindTo('click', function(e) {
            BN('i-insta').login();

            return false;
        });
    }
});
