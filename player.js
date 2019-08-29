function Player(playerId, playerName, age, national, ovr, position) {
    this.playerId = playerId;
    this.playerName = playerName;
    this.age = age;
    this.national = national;
    this.ovr = ovr;
    this.position = position;

    this.getPlayerId = function () {
        return this.playerId;
    };
    this.setPlayerId = function (id) {
        this.playerId = id;
    };

    this.getPlayerName = function () {
        return this.playerName;
    };

    this.setPlayerName = function (playerName) {
        this.playerName = playerName;
    };

    this.getAge = function () {
        return this.age;
    };

    this.setAge = function (age) {
        this.age = age;
    };

    this.getNational = function () {
        return this.national;
    };

    this.setNational = function (national) {
        this.national = national;
    };

    this.getOvr = function () {
        return this.ovr;
    };

    this.setOvr = function (ovr) {
        this.ovr = ovr;
    };

    this.getPosition = function () {
        return this.position;
    };

    this.setPosition = function (position) {
        this.position = position;
    };

}