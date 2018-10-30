// This is the main module which imports other modules to test out the functionalities

//TODO
//Assert that the file path and the file name exists!
const fileName = process.argv[2];
const path = require('path');
const cwd = __dirname;

let dataFile = require(path.join(cwd, '..', 'data', fileName));
const listOfNodes = Object.getOwnPropertyNames(dataFile);

//TODO
//Assert that an argument is passed!
console.log('Calculating  ' + process.argv[3]);

//TODO
// Print Data
for (node in listOfNodes){
    console.log("The data for "+listOfNodes[node]+":");
    for (att in dataFile[listOfNodes[node]]){
        console.log("The data for "+att+" at "+listOfNodes[node] +":");
        for (num in dataFile[listOfNodes[node]][att]){
            console.log(dataFile[listOfNodes[node]][att][num]);
        }
    }
}

