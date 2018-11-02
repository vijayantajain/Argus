//Module containing some statistical functions to be used by `argus` module
const math = require('mathjs');

const defined_maximum_macro = -10000000000;
const defined_minimum_macro =  10000000000;

module.exports = {
    /**
     * Returns the statistical mean of the input array of data.
     * 
     * @param {Object} arrOfData Array of data over which values of various
	 * 							 statistical functions are to be calculated
	 * 
	 * @returns {Double}         Returns the statistical mean of `arrOfData`
     */
    average: function average(arrOfData) {
        let tempSum  = 0;

        for (items in arrOfData) {
			if (items!=null) {
				tempSum += arrOfData[items];
			}
        }
        return [tempSum / arrOfData.length];
	},

	/**
	 * 
	 * @param {Object} arrOfData Array of data from the which the largest 
	 * 							 element is found
	 *
	 * @returns {Double}         The largest element in the `arrOfData`
	 */

	max: function max(arrOfData) {
		var max;
		var ind = 0;

		if (arrOfData[0]==null) max = defined_maximum_macro;
		else max = arrOfData[0];
		
		for (var i = 0; i < arrOfData.length; i++) {
			if (i!=null) {
				if (arrOfData[i] > max) {
					max = arrOfData[i];
					ind = i;
				}
			}
		}
		return [max, ind+1];
	},
	
	/**
	 * 	
	 * @param {Object} arrOfData Array of data from which the smallest element
	 * 							 is obtained
	 * 
	 * @returns {Double}         The smallest element in `arrOfData`
	 */
	min: function min(arrOfData) {
		var min;
		var ind = 0;
		
		min = defined_minimum_macro;

		for (var i = 0; i < arrOfData.length; i++) {
			if (arrOfData[i]!=null) {
				if (arrOfData[i] < min) {
					min = arrOfData[i];
					ind = i;
				}
			}
		}
		return [min, ind+1];
	},
	
	variance: function variance(arrOfData) {
		return [math.var(arrOfData, 'uncorrected')];
	},

	sudden_change: function suddenChange(arrOfData) {
		let max = defined_maximum_macro;
		var val;
		var ind;

		for (var i = 0; i<arrOfData.length-1; i++) {
			if (arrOfData[i]!=null && arrOfData[i+1]!=null) {
				val = Math.abs(arrOfData[i]-arrOfData[i+1]);
				if (val>max) {
					max = val;
					ind = i;
				}
			}
		}
		return [max, ind+1];
	}
		
};
