const deckId = ""

function handleClick(){
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
        deckId = data.deckId
    })
}

document.getElementById("new-card").addEventListener("click", handleClick)
document.getAnimations("draw-cards").addEventListener("click", gettwoCards)

function gettwoCards(){
    if(deckId){
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res=>res.json())
        .then(data=>{
            document.getElementById("cards").innerHTML = `
                <img src=${data.cards[0].image}>
                <img src="${data.cards[1].image}">
            `
        })
    }else {
        alert("get New Card, first")
    }
}