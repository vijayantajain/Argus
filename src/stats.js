//Module containing some statistical functions to be used by `argus` module

module.exports = {
    /**
     * Returns the statistical mean of the input array of data.
     * 
     * @param {Object} arrOfData Array of data over which values of various statistical functions are to be calculated
     */
    average: function average(arrOfData) {
        let tempSum  = 0;
    
        for (items in arrOfData) {
            tempSum += arrOfData[items];
        }
    
        return tempSum / arrOfData.length;
    }
	
	max: function max(arrOfData) {
		let max = arrOfData[0];
		
		for (items in arrOfData) {
			if (arrOfData[items] > max) max = arrOfData[items];
		}
		
		return max;
	}
		
	min: function min(arrOfData) {
		let min = arrOfData[0];
		
		for (items in arrOfData) {
			if (arrOfData[items] < min) min = arrOfData[items];
		}
		
		return min;
	}		
		
};