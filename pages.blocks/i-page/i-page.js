/**
 * Overrides some methods
 */
BN.addDecl('i-page').staticProp({

    /**
     * override
     */
    getUpdateNode: function() {
        return jQuery('.content');
    }

});
