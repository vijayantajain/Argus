// This is the main module which imports other modules to test out the functionalities

//TODO
//Assert that the file path and the file name exists!
const fileName = process.argv[2];

let dataFile = require(fileName);
const listOfNodes = Object.getOwnPropertyNames(dataFile);

//TODO
//Assert that an argument is passed!
console.log('Calculating  ' + process.argv[3]);

//TODO
// Print Data
for (let node in listOfNodes) {
    for (let prpty in listOfNodes[node]) {
        console.log('The data in each node are ' + dataFile[node][prpty]);
    }
    
}
