// This is the main module which imports other modules to test out the functionalities

const path = require('path');
const assert = require('assert');
const args = require('yargs').argv;
const CWD = __dirname;

const MINIMUM_POSSIBLE_VALUE = -1e10;
const MAXIMUM_POSSIBLE_VALUE =  1e10;

const statsModule = require(path.join('..', 'src', 'stats.js'));
const average_function = statsModule.average;
const max_function = statsModule.max;
const min_function = statsModule.min;
const sudden_change_function = statsModule.suddenChange;
const variance_function = statsModule.variance;

//TODO
//Assert that the file path and the file name exists!
// const fileName = process.argv[2];
checkCmdLineArgValidity(args);

const fileName = args.fileName;
let dataFile = require(path.join(CWD, '..', 'data', fileName));
const COMPUTE_NODES = Object.getOwnPropertyNames(dataFile);

//Assert that the variables are correct
console.log('Calculating  ' + args.target_stat);
var target_stat = args.target_stat;
var target_variable = args.target_variable;
var target_variables; 


switch (target_stat) {
    case "average":
        stats_function = average_function;
        break;
    case "max":
        stats_function = max_function;
        break;
    case "min":
        stats_function = min_function;
        break;
    case "sudden_change":
        stats_function = sudden_change_function;
        break;
    case "variance":
        stats_function = variance_function;
        break;

    default:
        //text = "No value found";
}

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

var vals;
var max = MINIMUM_POSSIBLE_VALUE;
var min = MAXIMUM_POSSIBLE_VALUE;
var reading;
var equipment;

for (node in COMPUTE_NODES){

    for (att in dataFile[COMPUTE_NODES[node]]){

        if (target_variables.includes(att)) {

            vals = stats_function(dataFile[COMPUTE_NODES[node]][att]);

            if ((vals[0] > max && target_stat != "min") || 
                (vals[0] < min && target_stat == "min")) {

                    max = vals[0];
                    min = vals[0];
                    
                    if (target_stat != "average" && target_stat != "variance") {
                        if (target_stat=="sudden_change") reading = ", which is between reading " + vals[1] + " and reading " + (vals[1]+1) + " of ";
                        else reading = ", which is on reading " + vals[1] + " of ";
                    }

                    else reading = ", which is in ";

                    if (target_variables.length == 1) equipment = COMPUTE_NODES[node] ;
                    else {

                        if (target_variable == "temperature") equipment = att.substr(14, 4) + " of " + COMPUTE_NODES[node];
                        if  (target_variable == "fan_speed") equipment = att.substr(3, 3) + att.substr(13, 1) + " of " + COMPUTE_NODES[node];
                    }   
            }
        }
    }

    if (target_stat == "min") max = min;

}
console.log("The maximum " + target_stat + " " + target_variable + " is " + max.toFixed(5) + reading + equipment);


function checkCmdLineArgValidity(args) {

    assert.notEqual(args.fileName, undefined, 'Filename not provided');
    assert.notEqual(args.target_stat, undefined, 'Statistic to be calculated not provided');
    assert.notEqual(args.target_variable, undefined, 'Variable to be calculated not provided');

}
