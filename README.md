# INTRODUCTION

This is a JavaScript project that is used in the monitoring system of the High Performance Computing Center (HPCC) at Texas Tech University.

## SETUP

Install all the necessary packages by typing -  
`(argus_dir)$ npm install` (or just `yarn` if you're using it).

**NOTE - `argus_dir` is the root directory of the project**

## USAGE

There are three commandline variables that need to be provided - 

1. `fileName` - The name of the file containing the data
2. `target_stat` - The function that needs to be calculated (`max`, `min`, `average`, `variance`, or `sudden_change`)
3. `target_variable` - The variable for which the `target_stat` is calculated (`temperature`, `cpu_load`, `fan_speed`, and `memory_usage`);

And here is how you write them

`(argus_dir)$ node src\argus.js \`  
`--fileName=data.json \`  
`--target_stat=max \`  
`--target_variable=temperature`

Or as a single command line prompt

`node .\src\argus.js --fileName=data.json --target_stat=variance --target_variable=temperature`

In case all the commandline variables are not provided, the program generates an `AssertError`.


The first arg is the json filename which should be in `argus\data` and the second is a dummy arg which is being calculated.
