export async function fetchDeck() {
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    return response.json();
}

export async function fetchDrawnCards(deckId: string, count: number) {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);
    return response.json();
}
