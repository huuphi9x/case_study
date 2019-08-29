function FootballClub(clubId, clubName, clubNational, stadium) {
    this.clubId = clubId;
    this.clubName = clubName;
    this.clubNational = clubNational;
    this.stadium = stadium;


    this.getClubId = function () {
        return this.clubId;
    };

    this.setClubId = function (clubId) {
        this.clubId = clubId;
    };

    this.getClubName = function () {
        return this.clubName;
    };

    this.setClubName = function (clubName) {
        this.clubName = clubName;
    };


    this.getClubNational = function () {
        return this.clubNational;
    };

    this.setClubNational = function (clubNational) {
        this.clubNational = clubNational;
    };

    this.getStadium = function () {
        return this.stadium;
    };

    this.setStadium = function (stadium) {
        this.stadium = stadium;
    };
}
