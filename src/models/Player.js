class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.shouldAnswer = false;
    }

    addScore() {
        this.score++;
    }

    setShouldAnswer(shouldAnswer) {
        this.shouldAnswer = shouldAnswer;
    }

}

export default Player;
