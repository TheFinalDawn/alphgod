const fs = require("fs");
process.chdir(__dirname);
console.log(process.cwd());
var used = fs.readFileSync("./used.txt", "utf8", (err, data) => {
    if (err) console.error(err);
});
const alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


function checkIfUsed(text) {
    const sequence = used.split("\n");
    for (segment in sequence) {
        if (text == sequence[segment]) {
            console.log("Generated an already existing sequence, regenerating...");
            text = alph[Math.floor(Math.random() * 26)] + alph[Math.floor(Math.random() * 26)] + alph[Math.floor(Math.random() * 26)] + alph[Math.floor(Math.random() * 26)];
            checkIfUsed(text);
        }
    }
    used += `${text}\n`;
    console.log(text);
    return text
}
exports.generate = function() {
    var out = alph[Math.floor(Math.random() * 26)] + alph[Math.floor(Math.random() * 26)] + alph[Math.floor(Math.random() * 26)] + alph[Math.floor(Math.random() * 26)];
    var confirm = checkIfUsed(out);
    return confirm;
}
var out = alph[Math.floor(Math.random() * 26)] + alph[Math.floor(Math.random() * 26)] + alph[Math.floor(Math.random() * 26)] + alph[Math.floor(Math.random() * 26)];
checkIfUsed(out);
fs.writeFileSync("./used.txt", used);