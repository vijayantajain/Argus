//Module containing some statistical functions to be used by `argus` module

module.exports = {
    /**
     * Returns the statistical mean of the input array of data.
     * 
     * @param {Object} arrOfData Array of data over which average or statiscal mean
     *                          is to be calculated
     */
    average: function average(arrOfData) {
        let tempSum  = 0;
    
        for (items in arrOfData) {
            tempSum += arrOfData[items];
        }
    
        return tempSum / arrOfData.length;
    }
};