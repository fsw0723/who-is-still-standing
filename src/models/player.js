class Player {
    constructor(avatar) {
        this.avatar = avatar;
        this.score = 0;
        this.shouldAnswer = false;
    }

    addScore() {
        this.score++;
    }

    deductScore() {
        this.score--;
    }

    setShouldAnswer(shouldAnswer) {
        this.shouldAnswer = shouldAnswer;
    }

}

export default Player;
