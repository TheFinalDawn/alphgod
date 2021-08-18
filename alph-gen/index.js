const fs = require("fs");
process.chdir(__dirname);
let used = JSON.parse(fs.readFileSync("./used.json", "utf8", (err, data) => {
	if (err) console.error(err);
}));
const alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


function checkIfUsed(text) {
	for (segment in used.used) {
		if (text == used.used[segment][0]) {
			console.log("Generated an already existing sequence, regenerating...");
			text = alph[Math.floor(Math.random() * 26)] + alph[Math.floor(Math.random() * 26)] + alph[Math.floor(Math.random() * 26)] + alph[Math.floor(Math.random() * 26)];
			checkIfUsed(text);
		}
	}
	console.log(`NEW SEQUENCE GENERATED: ${text}`);
	return text
}
exports.generate = function(user = "test") {
	let out = alph[Math.floor(Math.random() * 26)] + alph[Math.floor(Math.random() * 26)] + alph[Math.floor(Math.random() * 26)] + alph[Math.floor(Math.random() * 26)];
	let egg = "";
	if (out[0] == out[1] && out[1] == out[2] && out[2] == out[3]) {
		egg = "same";
	} else if (out[0] == out[3] && out[1] == out[2]) {
		egg = "symm";
	}
	let confirm = checkIfUsed(out);
	let next = {
		sequence: confirm,
		username: user
	}
	let newIndex = Object.keys(used.used).length;
	used.used[newIndex] = next;
	console.log(used);
	used = JSON.stringify(used);
	fs.writeFileSync("./used.json", used);
	return confirm, egg;
}