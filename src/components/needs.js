class Needs {
    constructor(state, dbm) {
        this.state = state;
        this.dbm = dbm;
    }
    increase(value) {
        if (this.state + value < 100) {
            this.state += value;
        } else {
            this.state = 100;
        }
    }
    decrease() {
        if (this.state > this.dbm) {
            this.state -= this.dbm;
        } else {
            this.state = 0;
        }
    }
}