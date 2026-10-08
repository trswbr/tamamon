
// choose pokemon 
// !!! erstmal static
const myPoke = new Pokemon(
    pname = "Pummeluff", 
    hp = 115, 
    //img = "<img src='src/assets/sprites/Pokémonsprite_039_Schillernd_SW.gif' width='80'/>", 
    img = "<img src='src/assets/sprites/Pokémonsprite_039_SW.gif' width='80'/>",
    hunger = new Needs(80, 0.0520),
    fun = new Needs(80, 0.0347),
    energy = new Needs(100, 0.0347)
)


// variables html (DOM-elements)
const pokeName = document.getElementById('poke-name');
const pokeImg = document.getElementById("poke-img");
const pokeHP = document.getElementById("poke-hp");
const pokeAff = document.getElementById("poke-aff");
const pokeHung = document.getElementById("poke-hung");
const pokeFun = document.getElementById("poke-fun");
const pokeEnergy = document.getElementById("poke-engy");

const feedButton = document.getElementById('poke-feed');
const playButton = document.getElementById('poke-play');
// sleep button
const petButton = document.getElementById('poke-pet');



// UI rendern/aktualisieren
function updateUI() {
    pokeName.innerHTML = myPoke.pname;
    pokeImg.innerHTML = myPoke.img;
    pokeHP.innerHTML = myPoke.hp;
    pokeAff.innerHTML = myPoke.affection;
    pokeHung.innerHTML = myPoke.hunger.state;
    pokeFun.innerHTML = myPoke.fun.state;
    pokeEnergy.innerHTML = myPoke.energy.state;
}


// Werte fallen ab und werden überprüft
function statsDecrease() {
    myPoke.hunger.decrease();
    myPoke.fun.decrease();
    myPoke.energy.decrease();

    if (myPoke.hunger.state < 50) {
        myPoke.looseHP();
        myPoke.looseAff();
    }
    if (myPoke.fun.state === 0) {
        myPoke.looseAff();
    }
    if (myPoke.energy.state === 0) {
        myPoke.looseHP();
        myPoke.looseAff();
    }
}


function gameLoop() {
    statsDecrease();

    setInterval(updateUI, 2000);
}




// buttons
function buttonCooldown(button) {
    button.disabled = true;
    setTimeout(() => {
        button.disabled = false;
    }, 10*60000); // 10 Minuten
}

feedButton.addEventListener('click', () => {
    buttonCooldown(feedButton);
    myPoke.feed();
    updateUI();
})
playButton.addEventListener('click', () => {
    buttonCooldown(playButton);
    myPoke.play();
    updateUI();
})
petButton.addEventListener('click', () => {
    buttonCooldown(petButton);
    myPoke.pet();
    updateUI();
})


// START -----------------------------------

updateUI();
setInterval(gameLoop, 60000);

