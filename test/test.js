/*jshint esversion: 6 */
var fs = require('fs');

// iterate over the files in this directory
fs.readdirSync('./test').forEach(function(file)
{
    // boolean to determine if a file is a .js file
    var isJS = (file.indexOf(".js") > -1);
    // boolean to determine if the file is the index (this file)
    var isntIndex = (file != "test.js");
    // require the test script to include its tests
    if (isJS && isntIndex) require('./' + file);
});
