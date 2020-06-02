'use strict';

if (typeof Array.prototype.random === 'undefined')
    Array.prototype.random = function () {
        return this[Math.floor(Math.random() * this.length)];
    };