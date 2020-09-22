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
import {getCardValue} from "../../util/card";
import produce from 'immer';

export const initialState = {
    cards: null,
    isGetCardsInProgress: false,
    isGetCardsFailed: false,
    drawCards: null,
    isGetDrawCardsInProgress: false,
    isGetDrawCardsFailed: false,
    selectedCards: [],
    winnersByRound: [],
    numOfRounds: 0,
    playersDecks: []
};

export const gamePLayReducer = produce((draft = initialState, action) => {
    const {player, selectedCard, cards} = action;
    switch (action.type) {
        case GET_CARDS_REQUEST:
            draft.isGetCardsInProgress = true;
            draft.isGetCardsFailed = false;
            draft.cards = undefined;
            break;
        case GET_CARDS_SUCCESS:
            draft.isGetCardsInProgress = false;
            draft.cards = action.cards;
            break;
        case GET_CARDS_FAILURE:
            draft.isGetCardsInProgress = false;
            draft.isGetCardsFailed = true;
            break;
        case GET_DRAW_CARDS_REQUEST:
            draft.isGetDrawCardsInProgress = true;
            draft.isGetDrawCardsFailed = false;
            draft.drawCards = undefined;
            break;
        case GET_DRAW_CARDS_SUCCESS:
            draft.isGetDrawCardsInProgress = false;
            draft.drawCards = action.drawnCards;
            break;
        case GET_DRAW_CARDS_FAILURE:
            draft.isGetDrawCardsInProgress = false;
            draft.isGetDrawCardsFailed = true;
            break;
        case HANDLE_ROUND_WINNER:
            const sortedSelectedCards = draft.selectedCards.slice().sort((b, a) => {
                return a.value === b.value ?
                    a.player > b.player
                        ? 1 : -1 :
                    a.value > b.value
                        ? 1 : -1;
            });

            const playerIndex =
                draft.winnersByRound.findIndex(round => round.player === sortedSelectedCards[0].player);

            const calculatedValueOfCards = sortedSelectedCards.reduce((acc, curr) => {
                acc += curr.value;

                return acc;
            }, 0);

            if (playerIndex !== -1) {
                draft.winnersByRound[playerIndex].score += calculatedValueOfCards;
                draft.winnersByRound[playerIndex].byRound = calculatedValueOfCards;
            } else {
                draft.winnersByRound = [
                    ...draft.winnersByRound,
                    {
                        player: sortedSelectedCards[0].player,
                        score: calculatedValueOfCards,
                        byRound: calculatedValueOfCards
                    }
                ];
            }
            break;
        case HANDLE_NUMBER_OF_ROUNDS:
            draft.numOfRounds += 1;
            break;
        case ADD_SELECTED_CARDS:
            draft.selectedCards = [
                ...draft.selectedCards,
                {
                    image: selectedCard.image,
                    value: getCardValue(selectedCard),
                    player
                }
            ];
            break;
        case REMOVE_SELECTED_CARDS:
            draft.selectedCards = [];
            break;
        case HANDLE_UPDATE_PLAYERS_DECKS:
            if (!player)  {
                draft.playersDecks = cards;
                break;
            }
            draft.playersDecks[player - 1] = draft.playersDecks[player - 1].filter(card =>
                card.image !== selectedCard.image
            );
            break;
        default:
            return draft;
    }
});

export default gamePLayReducer;
