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
var x=0;
var divide_me=0;
var avg=0;
var highest_avg_temp=0;
var highest_string;
//TODO
// Print Data
for (node in listOfNodes){
    console.log("The data for "+listOfNodes[node]+":");
    for (att in dataFile[listOfNodes[node]]){
        x=0;
        divide_me=0;
        console.log("The data for "+att+" at "+listOfNodes[node] +":");
        for (num in dataFile[listOfNodes[node]][att]){
            if (dataFile[listOfNodes[node]][att][num]!=null){x+=1;}
            console.log(dataFile[listOfNodes[node]][att][num]);
            divide_me+=dataFile[listOfNodes[node]][att][num];
        }
        avg=divide_me/x;
        console.log("average:"+divide_me+"/"+x+"="+(avg).toFixed(6));
        console.log(att +" "+ avg);
        if (att=="arrTemperatureCPU1" || att=="arrTemperatureCPU2"){
            if (avg>highest_avg_temp){
                highest_avg_temp=avg;
                highest_string="Highest average temp: "+highest_avg_temp+" at "+att+" in "+listOfNodes[node];
            }
        }
    } 
}
console.log(highest_string);

