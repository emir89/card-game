import {
    GET_CARDS_REQUEST,
    GET_CARDS_SUCCESS,
    GET_CARDS_FAILURE,
    GET_DRAW_CARDS_REQUEST,
    GET_DRAW_CARDS_SUCCESS,
    GET_DRAW_CARDS_FAILURE,
    HANDLE_ROUND_WINNER,
    HANDLE_NUMBER_OF_ROUNDS,
    ADD_SELECTED_CARDS,
    REMOVE_SELECTED_CARDS,
    HANDLE_UPDATE_PLAYERS_DECKS,
} from "./gamePlayConstants";

function getCardsRequest() {
    return {
        type: GET_CARDS_REQUEST
    }
}

function getCardsSuccess(cards) {
    return {
        type: GET_CARDS_SUCCESS,
        cards
    }
}

function getCardsFailure(error) {
    return {
        type: GET_CARDS_FAILURE,
        error
    }
}

function getDrawCardsRequest() {
    return {
        type: GET_DRAW_CARDS_REQUEST,
    }
}

function getDrawCardsSuccess(drawnCards) {
    return {
        type: GET_DRAW_CARDS_SUCCESS,
        drawnCards
    }
}

function getDrawCardsFailure(error) {
    return {
        type: GET_DRAW_CARDS_FAILURE,
        error
    }
}

function handleAddSelectedCards(selectedCard, player) {
    return {
        type: ADD_SELECTED_CARDS,
        selectedCard,
        player
    }
}

function handleRemoveSelectedCards() {
    return {
        type: REMOVE_SELECTED_CARDS
    }
}

function handleRoundWinner(selectedCards) {
    return {
        type: HANDLE_ROUND_WINNER,
        selectedCards
    }
}

function handleNumberOfRounds() {
    return {
        type: HANDLE_NUMBER_OF_ROUNDS,
    }
}

function handleUpdatePlayersDecks(player, selectedCard, cards) {
    return {
        type: HANDLE_UPDATE_PLAYERS_DECKS,
        player,
        selectedCard,
        cards
    }
}

export {
    getCardsRequest,
    getCardsSuccess,
    getCardsFailure,
    getDrawCardsRequest,
    getDrawCardsSuccess,
    getDrawCardsFailure,
    handleRoundWinner,
    handleNumberOfRounds,
    handleAddSelectedCards,
    handleRemoveSelectedCards,
    handleUpdatePlayersDecks,
}
