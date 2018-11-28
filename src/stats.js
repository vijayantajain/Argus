//Module containing some statistical functions to be used by `argus` module
const math = require('mathjs');
const assert = require('assert');

const DEFINED_MAXIMUM_MACRO = -1e10;
const DEFINED_MINIMUM_MACRO =  1e10;

module.exports = {
    /**
     * Returns the statistical mean of the input array of data.
     * 
     * @param {Object} arrayOfData Array of data over which values of various
	 * 							 statistical functions are to be calculated
	 * 
	 * @returns {Double}         Returns the statistical mean of `arrayOfData`
     */
    average: function average(arrayOfData) {

		arrayOfData = removeNullValues(arrayOfData);

		if (arrayOfData.length == 0) {
			return []
		}


		let temporarySum  = 0;
		const NUM_OF_ITEMS = arrayOfData.length;

        for (items in arrayOfData) {
			if (items != null) {
				temporarySum += arrayOfData[items];
			}
		}

        return [temporarySum / NUM_OF_ITEMS	];
	},


	/**
	 * 
	 * @param {Object} arrayOfData Array of data from the which the largest 
	 * 							 element is found
	 *
	 * @returns {Double}         The largest element in the `arrayOfData`
	 */

	max: function max(arrayOfData) {

		arrayOfData = removeNullValues(arrayOfData);
		if (arrayOfData.length == 0) {
			return []
		}


		var max;
		let index = 0;
		const NUM_OF_ITEMS = arrayOfData.length;
		
		if ( arrayOfData[0] == null) max = DEFINED_MAXIMUM_MACRO;
		else max = arrayOfData[0];
		
		for (let i = 0; i < NUM_OF_ITEMS; i++) {

			if (i != null && arrayOfData[i] > max) {

				max = arrayOfData[i];
				index = i;

			}
		}

		return [max, index + 1];
	},


	/**
	 * 	
	 * @param {Object} arrayOfData Array of data from which the smallest element
	 * 							 is obtained
	 * 
	 * @returns {Double}         The smallest element in `arrayOfData`
	 */
	min: function min(arrayOfData) {

		arrayOfData = removeNullValues(arrayOfData);
		if (arrayOfData.length == 0) {
			return []
		}

		var min;
		let index = 0;
		const NUM_OF_ITEMS = arrayOfData.length;

		min = DEFINED_MINIMUM_MACRO;

		for (let i = 0; i < NUM_OF_ITEMS; i++) {

			if (arrayOfData[i] != null && arrayOfData[i] < min) {
					min = arrayOfData[i];
					index = i;
			}
		}

		return [min, index + 1];
	},


	variance: function variance(arrayOfData) {
		arrayOfData = removeNullValues(arrayOfData);
		if (arrayOfData.length == 0) {
			return []
		}

		return [math.var(arrayOfData, 'uncorrected')];
	},

	/**
	 * 			
	 * @param {Object} arrayOfData Array of data from which the largest change
	 * 							 is calculated
	 * 
	 * @returns {Object} 		 An array of element with largest change and the index
	 *
	 */
	suddenChange: function suddenChange(arrayOfData) {

		arrayOfData = removeNullValues(arrayOfData);
		if (arrayOfData.length == 0) {
			return []
		}


		let maxDifference = DEFINED_MAXIMUM_MACRO;
		var abosoluteDifference;
		var indexOfSuddenChange;

		for (let i = 0; i < (arrayOfData.length - 1); i++) {

			if (arrayOfData[i] != null && arrayOfData[i+1] != null) {

				abosoluteDifference = Math.abs(arrayOfData[i]-arrayOfData[i+1]);

				if (abosoluteDifference > maxDifference) {

					maxDifference = abosoluteDifference;
					indexOfSuddenChange = i;
				}
			}
		}

		return [maxDifference, indexOfSuddenChange + 1];
	}
		
};

function removeNullValues(arrayOfData) {
	
	const NUM_OF_ITEMS = arrayOfData.length;
	let arrayOfCleanData = [];

	for (let i = 0; i < NUM_OF_ITEMS; i++) {
		if (arrayOfData[i] != null) {
			arrayOfCleanData.push(arrayOfData[i]);
		}
	}

	return arrayOfCleanData;
}