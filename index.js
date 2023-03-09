let deckId
let compScore = 0
let userScore = 0
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const winnerText = document.getElementById("winner")
const remCards = document.getElementById("rem-cards")
const compScoreEl = document.getElementById("comp-score")
const userScoreEl = document.getElementById("user-score")


function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            remCards.textContent = `Remaining Cards: ${data.remaining}`
        })
}

newDeckBtn.addEventListener("click", handleClick)

drawCardBtn.addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data.cards)
            const card1Value = data.cards[0].value
            cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `
            const card2Value = data.cards[1].value
            cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `
            remCards.textContent = `Remaining cards: ${data.remaining}`
            const winnerEl = winner(card1Value, card2Value)
            winnerText.textContent = winnerEl

            if(data.remaining === 0){
                drawCardBtn.disabled = true;
                if(compScore > userScore){
                    winnerText.textContent = "The computer Won the game"
                } else if (userScore > compScore){
                    winnerText.textContent = "Hooray, You won the game"
                } else {
                    winnerText.textContent = "It's a tie game"
                }
            }
        })
})

function winner(card1, card2){
    
    let cardsArray = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1Index = cardsArray.indexOf(card1)
    const card2Index = cardsArray.indexOf(card2)
    
    if(card1Index > card2Index){
        compScore += 1
        compScoreEl.textContent = `Computer Score: ${compScore}`
        return "Computer Wins"
    } else if(card2Index > card1Index){
        userScore += 1
        userScoreEl.textContent = `Your Score: ${userScore}`
        return "User Wins"
    } else {
        return "War Continues..!"
    }
}