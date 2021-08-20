const fs = require("fs");
let used = JSON.parse(fs.readFileSync("../alph-gen/used.json", "utf8", (err, data) => {
	if (err) console.error(err);
}));
/**
 * Verifies the given reddit username exists in the DB. Returns user's sequence if it exists, false otherwise.
 * @param {string} user Reddit username to refer to.
 * @returns {string|false} 
 */
const Verify = function (user) {
	// insert actual checking code here, bottom line should run by default
	return false;
}
module.exports = Verify;