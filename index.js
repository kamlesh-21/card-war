let deckId
const cardsContainer = document.getElementById("cards")

function handleClick(){
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
        deckId = data.deck_id
    })
}

document.getElementById("new-card").addEventListener("click", handleClick)

document.getElementById("draw-cards").addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res=>res.json())
        .then(data=>{
            cardsContainer.children[0].innerHTML = `
            <img src=${data.cards[0].image} class="card" />
        `
            cardsContainer.children[1].innerHTML = `
            <img src=${data.cards[1].image} class="card" />
        `
        })
})