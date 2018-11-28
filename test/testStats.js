// Tests for stats.js module

const path = require('path');
const assert = require('assert');
const statsModule = require(path.join('..', 'src', 'stats.js'));

const average = statsModule.average;
const max = statsModule.max;
const min = statsModule.min;
const variance = statsModule.variance;
const suddenChange = statsModule.suddenChange;

describe('average', function () {
    it('should return the average of the input array', function () {
    });
    assert.equal(2, average([1, 2, 3]));
});

describe('max', function () {
    it('should return the maximum value in the input array', function () {
        assert.equal(JSON.stringify([62, 2]), JSON.stringify(max([13, 62, 9])));
    });
});

describe('min', function () {
    it('should return the minimum value in the input array', function () {
        assert.equal(JSON.stringify([9, 3]), JSON.stringify(min([13, 62, 9])));
    });
});

describe('variance', function () {
    it('should return the variance of the input array', function () {
        assert.equal(JSON.stringify([1.25]), JSON.stringify(variance([3, 4, 5, 6])));
    });
});

describe('suddenChange', function() {
    it('should return the value and index with sudden change', function () {
        assert.equal(JSON.stringify([6, 2]), JSON.stringify(suddenChange([10, 11, 5])));
    })    
});
