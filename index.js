const Snoowrap = require('snoowrap');
const { CommentStream } = require('snoostorm');
const BOT_START = Date.now() / 1000;
const sequencer = require("./alph-gen/index.js");
const config = require("./config.json"); // this is important
const masterpost_id = config.masterpostID

const client = new Snoowrap(config.nordvpnAdvertisementHere); // turn on phone

const comments = new CommentStream(client, { // open reddit
    subreddit: 'alph',
    limit: 100,
    pollTime: 10000
});

comments.on('item', (item) => {
    console.log(item);
    if (item.created_utc < BOT_START) return;
    if (item.link_id !== masterpost_id || item.link_id !== item.parent_id) return; // check masterpost
    if (item.author_flair_text) {
        item.reply("**Greedy individuals will not be tolerated. I shall only give you one sequence, no more than that. Should you do this again, consequences will follow.**");
        item.report({ reason: "Attempted to acquire multiple sequences." });
        item.remove(); // :angry:
    } else {
        let theirSequence, egg = sequencer.generate(item.author.username);
        if (egg == "same") {
            item.reply(`Most unusual. You have been assigned the sequence ${theirSequence}. You're clearly destined to be a leader, should you choose to accept this role or not.`); // :scream:
        } else if (egg == "symm") {
            item.reply(`Very interesting. You have been assigned the sequence ${theirSequence}. May you go on to become one of the most powerful sequenced in the land.`) // :open_mouth:
            // this will likely be the "special sequence" message when I figure out modular pattern recognition.
        } else {
            item.reply(`You have been assigned the sequence ${theirSequence}. May it be known forever in the pages of history.`); // :slight_smile:
		}
        item.author.assignFlair({ subredditName: "alph", text: theirSequence });
        
    }

});