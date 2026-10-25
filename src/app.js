
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
const pokeHung = document.getElementById("poke-hung");
const pokeFun = document.getElementById("poke-fun");
const pokeEnergy = document.getElementById("poke-engy");

const feedButton = document.getElementById('poke-feed');
const playButton = document.getElementById('poke-play');
const sleepButton = document.getElementById('poke-sleep');
const petButton = document.getElementById('poke-pet');

const heartFill = document.querySelector(".heart-fill");

const progressPercent = document.querySelector(".percent");
const progressMarkValue = document.querySelector(".progress-number");
const progressFill = document.querySelector(".progress-fill");
const progressMark1 = document.querySelector(".progress-number-mark");
const progressMark2 = document.querySelector(".down-arrow");

const hungerFill = document.querySelector(".hunger-bar");
const funFill = document.querySelector(".fun-bar");
const energyFill = document.querySelector(".energy-bar");

const rootStyles = getComputedStyle(document.documentElement);
const mainRgb = rootStyles.getPropertyValue("--main-color").trim();
const bgRgb = rootStyles.getPropertyValue("--hidden-color").trim();
const startRgbStr = rootStyles.getPropertyValue("--hp-start-rgb").trim();
const startRgb = startRgbStr.split(",").map(Number);
const endRgbStr = rootStyles.getPropertyValue("--hp-end-rgb").trim();
const endRgb = endRgbStr.split(",").map(Number);
const affRgb1 = rootStyles.getPropertyValue("--aff-start-rgb").trim();
const affRgb2 = rootStyles.getPropertyValue("--aff-second-rgb").trim();
const affRgb3 = rootStyles.getPropertyValue("--aff-third-rgb").trim();
const affRgb4 = rootStyles.getPropertyValue("--aff-end-rgb").trim();



// get color of progressbar at given percent
function getAffColorAtPercentage(percent) {
    let colorGradient = "";
    if (percent < 25) {
        return `rgb(${affRgb1})`;
    } else {
        colorGradient = `linear-gradient(to right, rgb(${affRgb1}) 0%, rgb(${affRgb1}) ${2500/percent}%, rgb(${affRgb2}) ${2500/percent}%, rgb(${affRgb2})`;
    }
    if (percent < 50) {
        return colorGradient + ` 100%)`;
    } else {
        colorGradient += ` ${5000/percent}%, rgb(${affRgb3}) ${5000/percent}%, rgb(${affRgb3})`
    }
    if (percent < 75) {
        return colorGradient + ` 100%)`;
    } else {
        return colorGradient + ` ${7500/percent}%, rgb(${affRgb4}) ${7500/percent}%, rgb(${affRgb4}) 100%)`
    }
}

function getHpColorAtPercentage(percent) {
    const p = percent / 100;

    const r = Math.round(startRgb[0] + (endRgb[0] - startRgb[0]) * p);
    const g = Math.round(startRgb[1] + (endRgb[1] - startRgb[1]) * p);
    const b = Math.round(startRgb[2] + (endRgb[2] - startRgb[2]) * p);

    return `rgb(${r}, ${g}, ${b})`;
}

function getConicGradientForPercentage(percent) {
    return `conic-gradient( rgb(${mainRgb}) 0%, rgb(${mainRgb}) ${percent}%, rgb(${bgRgb}) ${percent}%, rgb(${bgRgb}) 100% )`;
}

// UI rendern/aktualisieren
function updateUI() {
    pokeName.innerHTML = myPoke.pname;
    pokeImg.innerHTML = myPoke.img;
    pokeHP.innerHTML = myPoke.hp;
    pokeHung.innerHTML = Math.round(myPoke.hunger.state);
    pokeFun.innerHTML = Math.round(myPoke.fun.state);
    pokeEnergy.innerHTML = Math.round(myPoke.energy.state);

    let affection = (myPoke.affection / 255) * 100;
    heartFill.style.width = affection + "%";
    heartFill.style.background = getAffColorAtPercentage(affection);

    let percentage = (myPoke.hp / myPoke.hpMax) * 100;
    progressMarkValue.style.left = percentage + "%";
    progressFill.style.width = percentage + "%";

    const currentColor = getHpColorAtPercentage(percentage);
    progressMark1.style.backgroundColor = currentColor;
    progressMark2.style.borderTopColor = currentColor;
    progressFill.style.background = `linear-gradient(to right, rgb(${mainRgb}) 0%, ${currentColor} 100%)`;

    hungerFill.style.background = getConicGradientForPercentage(myPoke.hunger.state);
    funFill.style.background = getConicGradientForPercentage(myPoke.fun.state);
    energyFill.style.background = getConicGradientForPercentage(myPoke.energy.state);
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
}




// buttons
function buttonCooldown(button) {
    button.disabled = true;
    button.classList.add("is-deactivated");
    setTimeout(() => {
        button.disabled = false;
        button.classList.remove("is-deactivated");
    }, 10 * 60 * 1000); // 10 Minuten
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
setInterval(updateUI, 2000);
