Object.prototype.hasOwnProperty = function(property) {
    return this[property] !== undefined
}