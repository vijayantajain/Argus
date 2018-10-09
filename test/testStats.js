// Tests for stats.js module

var statsModule = require('..\\src\\stats.js');
var average = statsModule.average;
var assert = require('assert');

describe('average', function () {
    it('should return the average of input array', function () {
        assert.equal(2, average([1, 2, 3]));
    });
});
