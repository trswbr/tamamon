
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


// get elements etc
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

const heartFill = document.querySelector(".heart-fill");

const progressPercent = document.querySelector(".percent");
const progressMarkValue = document.querySelector(".progress-number");
const progressFill = document.querySelector(".progress-fill");
const progressMark1 = document.querySelector(".progress-number-mark");
const progressMark2 = document.querySelector(".down-arrow");

const rootStyles = getComputedStyle(document.documentElement);
const startRgbStr = rootStyles.getPropertyValue("--hp-start-rgb").trim();
const startRgb = startRgbStr.split(",").map(Number);
const endRgbStr = rootStyles.getPropertyValue("--hp-end-rgb").trim();
const endRgb = endRgbStr.split(",").map(Number);



// get color of progressbar at given percent
function getAffColorAtPercentage(percent) {
    let colorGradient = "";
    if (percent < 25) {
        return "rgb(254,186,200)";
    } else {
        colorGradient = `linear-gradient(to right, rgb(254,186,200) 0%, rgb(254,186,200) ${2500/percent}%, rgb(252,174,194) ${2500/percent}%, rgb(252,174,194)`;
    }
    if (percent < 50) {
        return colorGradient + ` 100%)`;
    } else {
        colorGradient += ` ${5000/percent}%, rgb(251,163,188) ${5000/percent}%, rgb(251,163,188)`
    }
    if (percent < 75) {
        return colorGradient + ` 100%)`;
    } else {
        return colorGradient + ` ${7500/percent}%, rgb(249,151,182) ${7500/percent}%, rgb(249,151,182) 100%)`
    }
}

function getHpColorAtPercentage(percent) {
    const p = percent / 100;

    const r = Math.round(startRgb[0] + (endRgb[0] - startRgb[0]) * p);
    const g = Math.round(startRgb[1] + (endRgb[1] - startRgb[1]) * p);
    const b = Math.round(startRgb[2] + (endRgb[2] - startRgb[2]) * p);

    return `rgb(${r}, ${g}, ${b})`;
}


// UI rendern/aktualisieren
function updateUI() {
    pokeName.innerHTML = myPoke.pname;
    pokeImg.innerHTML = myPoke.img;
    pokeHP.innerHTML = myPoke.hp;
    pokeAff.innerHTML = myPoke.affection;
    pokeHung.innerHTML = myPoke.hunger.state;
    pokeFun.innerHTML = myPoke.fun.state;
    pokeEnergy.innerHTML = myPoke.energy.state;

    let affection = (myPoke.affection / 255) * 100;
    heartFill.style.width = affection + "%";
    heartFill.style.background = getAffColorAtPercentage(affection);

    let percentage = (myPoke.hp / myPoke.hpMax) * 100;
    progressMarkValue.style.left = percentage + "%";
    progressFill.style.width = percentage + "%";

    const currentColor = getHpColorAtPercentage(percentage);
    progressMark1.style.backgroundColor = currentColor;
    progressMark2.style.borderTopColor = currentColor;
    progressFill.style.background = `linear-gradient(to right, rgb(255,192,203) 0%, ${currentColor} 100%)`;
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

