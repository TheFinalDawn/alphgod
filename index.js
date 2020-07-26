const Snoowrap = require('snoowrap');
const { CommentStream } = require('snoostorm');
const BOT_START = Date.now() / 1000;
const sequencer = require("../alph-gen/index.js");
const masterpost_id = "t3_hy2g45";

const client = new Snoowrap({
    userAgent: "alph",
    clientId: "NpwjUrLIdQzGVA",
    clientSecret: "36wVM0b9qWHoWkmH2gJlwX252pA",
    username: "alphgod",
    password: "NMmNGqj#xp\"28ng)_vF/"
});

const comments = new CommentStream(client, {
    subreddit: 'alph',
    limit: 10,
    pollTime: 10000
});

comments.on('item', (item) => {
    console.log(item);
    if (item.created_utc < BOT_START) return;
    if (item.link_id !== masterpost_id || item.link_id !== item.parent_id) return;
    if (item.author_flair_text) {
        item.reply("**Greedy individuals will not be tolerated. I shall only give you one sequence, no more than that. Should you do this again, consequences will follow.**");
        item.report({ reason: "Attempted to acquire multiple sequences." });
        item.remove();
    } else {
        let theirSequence = sequencer.generate();
        item.author.assignFlair({ subredditName: "alph", text: theirSequence });
        item.reply(`You have been assigned the sequence ${theirSequence}. May it be known forever in the pages of history.`);
    }

});