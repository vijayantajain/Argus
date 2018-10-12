// Tests for stats.js module

var path = require('path');
var statsModule = require(path.join('..', 'src', 'stats.js'));
var average = statsModule.average;
var max = statsModule.max;
var min = statsModule.min;
var assert = require('assert');

describe('average', function () {
    it('should return the average of the input array', function () {
        assert.equal(2, average([1, 2, 3]));
    });
});

describe('max', function () {
    it('should return the maximum value in the input array', function () {
        assert.equal(62, max([13, 62, 9]));
    });
});

describe('min', function () {
    it('should return the minimum value in the input array', function () {
        assert.equal(9, min([13, 62, 9]));
    });
});

