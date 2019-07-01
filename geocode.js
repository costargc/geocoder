var NodeGeocoder = require("node-geocoder");
var inquirer = require('inquirer');

// Replace with your mapquest consumer API key
var options = {
    // provider: "mapquest",
    provider: 'google',

    // apiKey: grabmykey2(),
    apiKey: grabmykey(),
};

var geocoder = NodeGeocoder(options);

// Get all elements in process.argv, starting from index 2 to the end
// Join them into a string to get the space delimited address
// var address = process.argv.slice(2).join(" ");

var questions = [
    {
        message: "What is the address that you want to look?",
        type: "input",
        name: "address"
    }];

inquirer.prompt(questions).then(answers => {
    console.log(JSON.stringify(answers, null, '  '));
    geocoder.geocode(answers, function (err, data) {

        // Then console log the result and stringify it.
        // Note the argument of "2" being included in the JSON stringify. This makes the JSON output pretty.
        // See link here: http://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
        console.log(JSON.stringify(data[0], null, 2));
    });


});


function grabmykey2() {
    p1 = "nIHjbXXUu3HNUkxLo";
    p2 = "63cG64bKe6SSXGk";

    p1 = encrypt(p1, -10);
    p2 = encrypt(p2, -10);

    return p1 + "" + p2

};


function grabmykey() {
    p1 = "KSzaCyLRU4rfdRIZT";
    p2 = "wxWSErZo7TSSUgT9NwRnmS";

    p1 = encrypt(p1, -10);
    p2 = encrypt(p2, -10);

    return p1 + "" + p2

};

function encrypt(msg, key) {
    var encMsg = "";

    for (var i = 0; i < msg.length; i++) {
        var code = msg.charCodeAt(i);

        // Encrypt only letters in 'A' ... 'Z' interval
        if (code >= 65 && code <= 65 + 26 - 1) {
            code -= 65;
            code = mod(code + key, 26);
            code += 65;
        }

        encMsg += String.fromCharCode(code);
    }

    return encMsg;
}

function mod(n, p) {
    if (n < 0)
        n = p - Math.abs(n) % p;

    return n % p;
}