"use strict";
// all values in miliseconds
let timing = {
    browserReset: 60 * 60 * 1000, // allow browser to relax every hour
    resortCounter: 23,            // after how many presented items to resort the treasure
    moveSort: 10,                // time for element to reach position after sorting
    startupDelay: 10,           // time needed after re-sorting treasure
    moveIn: 2700,                 // time to fly to center chest
    present: 4600,                // time item stays in the center
    textFadeDelay: 2000,          // how long user name is fully visble
    textFade: 1700,               // time use name takes to fade out
    moveOut: 2700,                // time to fly back to original position
    gap: 0                     // pause in between two items
};