import { Document, Packer, Paragraph, TextRun } from "docx";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const stories = [
  {
    slug: "the-monkey-and-the-crocodile",
    title: "The Monkey and the Crocodile",
    author: "Rishi",
    body: `Okay so there was this monkey right, lived in a massive tree by the river. His name was Matsuma and honestly he was living his best life. Fruits everywhere, sunny days, just vibing on his branch doing monkey stuff.\n\nDown in the river there was a crocodile named Kadamba who was basically his best friend. Like literally every day the crocodile would swim up to the bank and they'd just chat about everything. The monkey would share his juiciest figs and the crocodile would tell him stories about the underwater world. It was wholesome honestly.\n\nBut then one day the crocodile went home and his wife was like "I bet that monkey's heart is delicious" and he was like "nah he's my mate" but she kept going on and on about it until he finally cracked and was like "fine I'll bring it next time."\n\nSo the next day the crocodile was all like "hey bro come to my house for dinner, my wife made this incredible fruit platter" and the monkey was dumb enough to believe him because why would your best friend betray you right?\n\nWrong.\n\nThe monkey hopped onto the crocodile's back and they started swimming across the river. Halfway through the crocodile accidentally spilled the truth because he felt super guilty and the monkey was like "WHAT. You were literally about to eat my heart??"\n\nNow here's where it gets good. The monkey didn't panic. Instead he was like "oh my heart? Bro you should have said so earlier. I left it back in the tree. Want me to go get it?"\n\nAnd the crocodile being not the sharpest tool in the shed was like "yeah sure go grab it."\n\nSo the monkey jumped off, scrambled up the tree and from the top branch he yelled "You think I'm stupid? A heart doesn't just come out and sit in a tree. You betrayed our friendship and that's the real thing that's dead here."\n\nThe crocodile felt terrible. He realized he'd lost his only real friend over something so stupid. He apologized and apologized but the damage was done.\n\nThe moral of the story is pretty simple actually. Never betray the people who trust you because once that trust is gone it's gone forever. Also use your brain when you're in trouble because panicking never helps anyone. And if someone invites you to dinner and you suddenly can't find your heart, maybe don't go lol.\n\nAnyway that's the story. Pretty deep for something a 15 year old is writing but hey the Panchatantra hits different when you actually understand what it's saying.`
  },
  {
    slug: "the-clever-crow",
    title: "The Clever Crow",
    author: "Rishi",
    body: `So basically there was this crow who was absolutely parched. Like imagine being so thirsty that you'd try anything. He'd been flying around for hours looking for water and found literally nothing. The countryside was bone dry.\n\nThen he spots this pitcher in someone's garden and flies down to check it out. There's water at the bottom but here's the problem the neck is way too narrow for him to fit his head in. Classic.\n\nMost birds would just give up right? Not this guy. He sits there thinking and then it clicks. He flies off, finds some pebbles, and starts dropping them in one by one. Like seriously pebble after pebble after pebble. It takes forever and his wings are tired but he keeps going.\n\nSlowly the water starts rising. The pebbles push it up inch by inch until finally it reaches the top. The crow drinks his fill and flies away satisfied.\n\nNow here's what I think is actually genius about this story. The crow didn't use brute strength. He didn't give up. He used his brain to solve a problem that seemed impossible. That's literally what separates smart people from everyone else. When things get hard you don't just sit there complaining you figure it out.\n\nAlso there's this weird neighbor who kept watching the whole time and was like "wow that bird is smarter than most people I know" which honestly is probably true. Sometimes animals show us how dumb we can be.\n\nThe real lesson here is that persistence plus intelligence beats everything. You don't need to be the strongest or the fastest you just need to be the one who doesn't quit when things get tough. And always always always use your brain first.\n\nPretty simple story but it stuck with me. Maybe because I'm the kind of person who gives up too easily lol. Something to think about.`
  },
  {
    slug: "the-gold-giving-serpent",
    title: "The Gold-Giving Serpent",
    author: "Rishi",
    body: `Alright so there was this farmer's son who found a baby serpent trapped under a rock. Everyone else would have just walked past it because snakes are terrifying right? But this kid was different. He carefully freed the little guy and let it slither away into the bushes.\n\nFast forward a few days and the serpent comes back. But this time it wasn't alone. It led the boy to a hidden spot where there was a pile of gold coins just sitting there. The boy was like "score" and took some home. From then on the serpent would leave gold at his doorstep every single day. The family went from dirt poor to basically loaded.\n\nBut then things got complicated. The boy had this neighbor who was the nosiest person alive. He saw the gold and immediately got jealous. He kept pestering the boy about where it came from until finally the boy told him everything. Bad move.\n\nThe neighbor went to the serpent's spot and tried to get gold too. But here's the thing. The serpent didn't know him and didn't trust him. When the neighbor reached out to grab the gold the serpent bit him. Like hard. The venom spread fast and the neighbor was in serious trouble.\n\nThe boy felt bad and went to the serpent to ask for help. The serpent looked at him and said "I gave you gold because you saved my life when no one else would. That neighbor tried to take what wasn't his without earning it. There's a difference between kindness and greed."\n\nEventually the boy helped his neighbor recover but the whole experience taught everyone a lesson. Not everything that glitters is worth chasing and you should never be jealous of what others have because you don't know the full story behind it.\n\nI think this one's actually really relevant today. Everyone's flexing on social media showing off their gold and their fancy stuff and people get jealous and try to copy them. But what they don't see is the work and the sacrifice and sometimes the luck that went into getting there. Just focus on your own journey and be grateful for what you have.\n\nAlso don't mess with snakes. Seriously.`
  }
];

for (const story of stories) {
  const paragraphs = story.body.split(/\n\n+/);
  const doc = new Document({
    sections: [{
      children: [
        new Paragraph({ children: [new TextRun(story.title)] }),
        new Paragraph({ children: [new TextRun(story.author)] }),
        ...paragraphs.map(p => new Paragraph({ children: [new TextRun(p)] }))
      ]
    }]
  });
  const buffer = await Packer.toBuffer(doc);
  const outPath = path.join("public", "stories", story.slug, "story.docx");
  await writeFile(outPath, buffer);
  console.log(`Created ${outPath}`);
}
