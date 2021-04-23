#!/usr/bin/env node

((function () {
    var fs = require("fs");
    var args = process.argv.slice(2);
    var helpText = function () {
        var help = "\n";
        help += "Usage [ with package installed globally -> npm install util-base64 -g ]:\n\n";
        help += "Encode to Base64:\nutil-base64 -e <source-file-path> <target-file-path>\n\n";
        help += "Decode from Base64:\nutil-base64 -d <source-file-path <target-file-path>\n\n";
        help += "See this help text:\nutil-base64 --help\n\n";
        help += "-----------------------------------------------------------------------------\n";
        help += "Usage [ via npx -> npx util-base64 ]:\n\n";
        help += "Encode to Base64:\nnpx util-base64 -e <source-file-path> <target-file-path>\n\n";
        help += "Decode from Base64:\nnpx util-base64 -d <source-file-path <target-file-path>\n\n";
        help += "See this help text:\nnpx util-base64 --help\n\n";
        console.log(help);
    };
    var encodeToBase64 = function (src, tgt) {
        fs.readFile(src, (err, data) => {
            if (err) {
                console.log("\n", err, "\n\n");
                helpText();
                return;
            }
            fs.writeFile(tgt, Buffer.from(data).toString("base64"), (err) => {
                if (err) {
                    throw err;
                }
            });
        });
    };
    var decodeFromBase64 = function (src, tgt) {
        fs.readFile(src, (err, data) => {
            if (err) {
                console.log("\n", err, "\n\n");
                helpText();
                return;
            }
            fs.writeFile(tgt, Buffer.from(data.toString("ascii"), "base64"), (err) => {
                if (err) {
                    throw err;
                }
            });
        });
    };
    if (args.length <= 2) {
        helpText();
    } else if (args[0] !== "-e" && args[0] !== "-d" && args[0] !== "--help") {
        helpText();
    } else {
        if (args[0] === "--help") {
            helpText();
        } else if (args[0] === "-e") {
            encodeToBase64(args[1], args[2])
        } else if (args[0] === "-d") {
            decodeFromBase64(args[1], args[2]);
        } else {
            helpText();
        }
    }
})());