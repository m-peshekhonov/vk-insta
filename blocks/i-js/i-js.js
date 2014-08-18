Array.prototype.shuffle = function() {
    for (var i = this.length - 1; i > 0; i--) {
        var num = Math.floor(Math.random() * (i + 1)),
            d = this[num];
        this[num] = this[i];
        this[i] = d;
    }
    return this;
}
