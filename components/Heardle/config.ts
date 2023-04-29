import {endingMessage} from "../../types/sotd";

/*

    HEARDLE CONFIGS

 */
export const maxGuesses = 5 // Maximum number of guesses
export const segments = [2, 6, 13, 23] // Which second to stop at for each guess

/*
Endining Messages for number of guesses it took to win. 0 is the default message. -1 is the message for when the user loses.
Some of these messages are written by AIs 🤖.
*/
export const endingMessages: Record<number, endingMessage> = {
    "-1": {
        titles: [
            "You Lost!",
            "Unlucky",
            "Game over!",
            "Who let him cook?"
        ],
        messages: [
            "Secretly betraying chgm?",
            "A sad day for all Christian horse girl music artists...",
            "Everyone is unlucky sometimes.",
            "You can do better next time! or 🗡️",
            "Game over! 2 lives remain.",
            "Despairge",
            "Looks like you need to horse around a bit more to get a feel for this genre, but don't give up!",
            "Looks like you're more of a London boy than a horse girl. That's okay, there's always time to learn new things.",
            "Well, looks like the horse girl crown doesn't fit you after all. Better luck next time, cowboy.",
            "Yikes, looks like you were saddled with some tough guesses there. Don't worry, I'll send some hay your way to make you feel better.",
            "I don't mean to stirrup any trouble, but you lost the game.",
            "Looks like you were just horsing around!",
            "Sorry, it looks like your musical taste needs a bit of tuning.",
            "I guess you'll have to stick to singing in the shower for now."
        ]
    },
    0: {
        titles: [
            "You Did it!",
            "FeelsOkayMan",
            "BIG W",
            "Lit Win! You're a Christian Horse Girl Music Legend in the Making!",
            "GGWP",
            "PogChamp! Oh my girl, you're really good at this game!",
            "Nailed it!",
            "Too Easy!",
            "I am out of ideas for this title"
        ],
        messages: [
            "You Won GJ!",
            "You're like a Christian Horse Girl Music whisperer, but instead of horses, you have an uncanny ability to guess the right song. Impressive!",
            "You guessed that song like a boss, and now you're the Christian Horse Girl Music boss. Congrats!",
            "You're a Christian Horse Girl Music detective worthy of your own Netflix series. Move over, Sherlock Holmes!",
            "Wow, you guessed that song faster than a TikTok trend dies out. You're a true trendsetter!",
            "Congrats, you just unlocked the Christian Horse Girl Music achievement! Your gamer score just went up a notch.",
            "You must have channeled your inner Christian Horse Girl Music energy for that one.",
            "You're the Christian Horse Girl Music equivalent of Indiana Jones, always on the hunt for the next musical treasure. And boy did you find it this time!",
            "Your Christian Horse Girl Music guessing skills are so impressive, I'm pretty sure you're part of the band. Are you a secret member of GFRIEND or something?",
            "Even though some of the groups in the Christian Horse Girl Music genre have disbanded, your love for their music still shines bright like a diamond.",
            "Lovelyz may have 'Gone' their separate ways, but your love for Christian Horse Girl Music is here to stay. You're a true 'Now, We' believer!",
            "You have a 'Secret Garden' of Christian Horse Girl Music knowledge, and your guessing skills are 'Closer' than anyone else's!",
            "Your knowledge of Christian Horse Girl Music is 'Mago'ical. You're like a 'Nonstop' guessing machine, never missing a beat!",
            "Your love for Christian Horse Girl Music is 'Cupid'ly. You're like a 'Luv Star' shining bright with your guessing skills!",
            "Your Christian Horse Girl Music skills are 'Destiny' calling. You're like a 'Dolphin' swimming with ease through the guessing game!",
            "Your knowledge of Christian Horse Girl Music is 'A-ing' good. You're like a 'Destiny' player, always getting the right answer at the right time!",
            "Your Christian Horse Girl Music skills are 'Shine'ing bright. You're like a 'Love Whisper'er, always guessing the right answer in a whisper!",
            "Oh my girl, you're good! only few guesses and you already knew that Christian Horse Girl Music song. Impressive!",
            "'April' fools! You had us all fooled with your amazing Christian Horse Girl Music skills. Only few guesses and you already knew the answer!",
            "Lovelyz job! You only needed few guesses to get that one right. You're a real Christian Horse Girl Music pro!"

        ]
    },
    1: {
        titles: [
            "CHGM Master!",
            "EZ Clap",
            "🔥",
            "😎",
            "Let him cook!",
        ],
        messages: [
            "In a single try??? that's real determination!",
            "Yes this is the based department how can we help you?",
            "You're a beast at this game! One guess and it's over.",
            "No cap, you're the Christian Horse Girl Music king!",
            "Straight fire!🔥 You guessed that song like it was nothing.",
            "Looks like you're not just horsing around! One guess and you got it right!",
            "Looks like you're riding high with your Christian Horse Girl Music knowledge! One guess and you're already a Lovelyz person.",
            "You're a straight-up prodigy at this game. That was too easy.",
            "Okayeg"
        ]
    },
    [maxGuesses]: {
        titles: [
            "Barely got it!",
            "Whoops that was close!",
            "You are lucky for today!",
            "SAVED"
        ],
        messages: [
            "You really had us in the feels with that last guess, but you managed to come out on top in the end!",
            "You had us sweating over here with that last guess, but you managed to save the day!",
            "You were really living on the edge with that guess, but you managed to pull through in the end!",
            "That last guess was a real bruh moment, but you managed to redeem yourself in the end!",
            "That last guess was a bit of a vibe check, but you passed with flying colors in the end!",
            "You were so close to falling off the horse with that guess, but you managed to stay on!",
            "That was a real uno reverse card moment, you managed to turn things around with that last guess!",
            "You had us April fooled there for a moment, but you pulled it off with your last guess! Great job!",
            "You really pulled an Oh My Girl move with that one! You got it right on the last guess. Well done!",
            "Lovelyz job! You may have waited until the last minute, but you still got it right. You're a true Christian Horse Girl Music fan!",
            "gFriend, we almost thought you were going to miss that one, but you nailed it on the last guess. You're a Christian Horse Girl Music champ!"
        ]
    }
}
