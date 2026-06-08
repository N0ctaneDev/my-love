// u can use _dearName variable, by using `` instead of ""
// like `hey ${_dearName}`

// for memory page image gallery, put images in /public/memories 
// and list file names in index.json in /public/memories/index.json

// u can put emojis in any text, except the _ConfessFinalText

// !!!!-- REPLACE THIS WITH UR REPO FIRST --!!!
export const _REPO = "my-love"

export const _name = "Dear my love";   // tab/site name

export const _dearName = "My Love";  // name of the person u wanna gift to

export const _bgEmoji = "🌸";   // shown as animated bg

export const _themeColor = "#b06080" // use a lighter color, cz the colors are generated dimmed

export const _HeroTitle = "Hey You.."
export const _HeroPara = "There's something I've been meaning to show you. Something that lives in my chest every single day."


export const _MemoryGallerySpeed = 0.95
export const _MemoryMessages = [
  {
    title: `${_dearName}`,
    content:
      "I remember the exact moment I knew — not a grand gesture, just a quiet Tuesday, and you laughed at something small. And that was it. That was the beginning of everything.",
  },
  {
    title: "The Little Things",
    content:
      "The way you hold your mug with both hands. How you get excited about clouds. The specific hum you do when you're thinking. I've catalogued all of it without even trying.",
  },
  {
    title: "When You Were Sad",
    content:
      "I hated that I couldn't fix it. But I loved that you let me sit with you in it. That kind of trust — I don't take it lightly.",
  },
  {
    title: "Every Ordinary Day",
    content:
      "Nothing special happened. We just existed in the same space. And somehow, those are the days I replay the most.",
  },
  {
    title: "What I Never Said",
    content:
      "I wanted to say it a hundred times but the moment always felt too small or too big. So I saved it. For here. For now.",
  },
  {
    title: "Something Ridiculous",
    content:
      "That one time we laughed so hard neither of us could speak. I don't even remember what it was about. I just remember your face.",
  },
  {
    title: "Right Now",
    content:
      "You're reading this, and somehow that feels like the bravest thing I've ever done — handing you something real and watching you open it.",
  },
]

export const _ConfessRevealText = "So, will you...";  // the first text
export const _ConfessFinalText = "be mine ?";  // the second text
export const _ConfessEmoji = "🥹"
export const _ConfessButtons = [
  { id: "btn_yes",   text: "Yes, always 💕",  clickable: true,  url: "/yes"   }, // dont change the url, unless u know what u are doing
  { id: "btn_no",    text: "No way",           clickable: false, url: ""       },
  { id: "btn_maybe", text: "Maybe... 👀",      clickable: false, url: ""       },
];



// u can put emojis in these 2
export const _FinalText = "I knew It !! 😭"
export const _FinalCompliment = "It's the happiest i have ever been !! ❤️‍🩹"
export const _FinalGif = "cute" // [flower, bear, cute, crackers]
// the gifs are in /public