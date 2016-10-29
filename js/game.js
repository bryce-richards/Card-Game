/**
 * Created by brycerichards on 10/27/16.
 */
var ranks = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
var suits = ['H', 'S', 'C', 'D'];
var panelColors = ["success" , "warning", "danger", "info", "success" , "warning", "danger", "info", "success" , "warning", "danger", "info", "success" , "warning", "danger", "info"];

function Card(rank, suit) {
    this.rank = rank;
    this.suit = suit;
}

function createDeck(ranks, suits) {
    var tempDeck = [];
    var tempCard;
    for (var i = 0; i < ranks.length; i++) {
        for (var j = 0; j < suits.length; j++) {
            tempCard = new Card(ranks[i], suits[j]);
            tempDeck.push(tempCard);
        }
    }
    return tempDeck;
}

function shuffleDeck(deck, shuffles) {
    var randCard;
    var tempCard;
    for (var i = 0; i < shuffles ; i++) {
        for (var j = 0; j < deck.length; j++) {
            randCard = Math.floor(Math.random() * deck.length);
            tempCard = deck[j];
            deck[j] = deck[randCard];
            deck[randCard] = tempCard;
        }
    }
    return deck;
}

function dealCards(deck, players, cards) {
    $("#players").empty();
    var colRatio = Math.floor(12 / players);
    for (var i = 1; i <= players; i++) {
        var playerPanel = $("<div>");
        var playerHeading = $("<div>");
        var playerTitle = $("<h3>");
        var playerBody = $("<div>");
        playerPanel.addClass("player panel panel-" + panelColors[i-1] + " col-lg-" + colRatio + " col-md-" + colRatio + " col-sm-" + colRatio);
        playerHeading.addClass("row panel-heading");
        playerTitle.text("Player " + i);
        playerBody.addClass("row panel-body").attr("id", "player" + i);
        playerHeading.append(playerTitle);
        playerPanel.append(playerHeading).append(playerBody);
        $("#players").append(playerPanel);
    }
    for (var j = 0; j < cards; j++) {
        for (var k = 1; k <= players; k++) {
            var tempCard = deck.splice(0, 1);
            var cardSymbol = (tempCard[0].rank + tempCard[0].suit);
            var cardImg = $("<img>").addClass("card").data("rank", tempCard[0].rank).data("suit", tempCard[0].suit).attr("src", "images/cards/" + cardSymbol + ".png").attr("width", "500" / players).attr("height", "726" / players);
            $("#player" + k).append(cardImg);
            if (deck.length === 0) {
                return;
            }
        }
    }
    return deck;
}

$('#submit').on('click', function(){
    var newDeck = createDeck(ranks, suits);
    var shuffledDeck = shuffleDeck(newDeck, 5);
    var currentDeck = shuffledDeck.slice(0);
    var players = $("#playerSelect").val().trim();
    var cards = $("#cardSelect").val().trim();

    dealCards(currentDeck, players, cards);

    return false;
});

