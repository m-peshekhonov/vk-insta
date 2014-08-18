BN.addDecl('i-vk').staticProp({

    init: function() {
        VK.init(function() {
        }, function() {
            console.log('vk init error')
        }, '5.3');
    },

    invite: function() {
        VK.callMethod('showInviteBox');
    },

    setStorage: function(key, val) {
        var promise = Vow.promise();

        VK.api('storage.set', {
            key: key,
            value: val
        }, function() { promise.fulfill(); });

        return promise;
    },

    getStorage: function(key) {
        var promise = Vow.promise();
        // console.log(key)

        VK.api('storage.get', {
            key: key,
        }, function(data) {
            // console.log(data);
            data.response ?
                promise.fulfill(data.response) : promise.reject();
        });

        return promise;
    }

}).done();

BN('i-vk').init();
