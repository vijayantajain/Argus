// This is the main module which imports other modules to test out the functionalities

//TODO
//Assert that the file path and the file name exists!
const fileName = process.argv[2];
const path = require('path');
const cwd = __dirname;

const defined_maximum_macro = -10000000000;
const defined_minimum_macro =  10000000000;

var statsModule = require(path.join('..', 'src', 'stats.js'));
var average = statsModule.average;
var max = statsModule.max;
var min = statsModule.min;
var sudden_change = statsModule.sudden_change;
var variance = statsModule.variance;
var min = statsModule.min;

let dataFile = require(path.join(cwd, '..', 'data', fileName));
const listOfNodes = Object.getOwnPropertyNames(dataFile);

console.log('Calculating  ' + process.argv[3]);
var target_stat = process.argv[3];
var target_variable = process.argv[4];
var target_variables; 


switch (target_variable) {
    case "temperature":
        target_variables = ["arrTemperatureCPU1", "arrTemperatureCPU2"];
        break;
    case "cpu_load":
        target_variables = ["arrCPU_load"];
        break;
    case "fan_speed":
        target_variables = ["arrFans_speed1", "arrFans_speed2"];
        break;
    case "memory_usage":
        target_variables = ["arrMemory_usage"];
    default:
        //text = "No value found";
}

switch (target_stat) {
    case "average":
        target_stat = average;
        break;
    case "max":
        target_stat = max;
        break;
    case "min":
        target_stat = min;
        break;
    case "sudden_change":
        target_stat = sudden_change;
        break;
    case "variance":
        target_stat = variance;
        break;
    
    default:
        //text = "No value found";
}

var vals;
var max = defined_maximum_macro;
var min = defined_minimum_macro;
var reading;
var equipment;
for (node in listOfNodes){
    for (att in dataFile[listOfNodes[node]]){
        if (target_variables.includes(att)) {
            vals = target_stat(dataFile[listOfNodes[node]][att]);
			//since we need the maximum values for average, max, sudden_change, and variance but the minimum value for min, we need to have two separate logics
			//Like: if (vals[0]>max) {max = vals[0]}   ...and...        if (vals[0]<min) {min = vals[0]}
			//Just fused them together in the following three lines of code
            if ((vals[0]>max && process.argv[3]!="min") || (process.argv[3] == "min" && vals[0]<min)) {
                max = vals[0];
                min = vals[0];
                
				//if the intended statistics is average or variance, it's not sensible to find the index of the highest average so vals[1] will have nothing returned
                if (process.argv[3]!="average" && process.argv[3]!="variance") {
                    if (process.argv[3]=="sudden_change") reading = ", which is between reading " + vals[1] + " and reading" + (vals[1]+1) + " of ";
                    else reading = ", which is on reading " + vals[1] + " of ";
                }
				
                else reading = ", which is in ";
				
				//if the user want to calculate anything related to temperature or the fan speed, we need to consider both CPU1 and CPU2, but for CPU load and memory usage, we don't have 2 CPUs
                if (target_variables.length == 1) equipment = listOfNodes[node] ;
                else {
                    if (target_variable=="temperature") equipment = att.substr(14, 4) + " of " + listOfNodes[node];
                    if  (target_variable=="fan_speed") equipment = att.substr(3, 3) + att.substr(13, 1) + " of " + listOfNodes[node];
                }   
            }
        }
    }
    if (process.argv[3]=="min") max = min;

}
console.log("The maximum " + process.argv[3] + " " + target_variable + " is " + max.toFixed(5) + reading + equipment);
