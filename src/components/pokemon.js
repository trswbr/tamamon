class Pokemon {
    constructor(pname, hp, img, hunger, fun, energy) {
        this.pname = pname;
        this.hp = hp;
        this.img = img;
        this.hunger = hunger;
        this.fun = fun;
        this.energy = energy;
        this.affection = 10;
    }
    feed() {
        this.hunger.increase(20);
    }
    play() {
        this.fun.increase(30);
    }
    sleep(min) {
        this.energy.increase((100/480*min));
    }
    pet() {
        if (this.affection < 100) {
            if (this.affection + 10 < 100) {
                this.affection += 10;
            } else {
                this.affection = 100;
            }
        }
    }
    looseHP() {
        if (this.hp <= 1) {
            this.hp = 0;
        } else {
            this.hp -= 1;
        }
    }
    looseAff() {
        if (this.affection <= 1) {
            this.affection = 0;
        } else {
            this.affection -= 1;
        }
    }

}





