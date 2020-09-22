import React from "react";
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import GamePlay from '../containers/GamePlayPage/components/GamePlay';
import renderer from 'react-test-renderer';

const dummyData = {
    cards: [
        {
            image: 'foo1.png'
        },
        {
            image: 'foo2.png'
        },
        {
            image: 'foo3.png'
        },
        {
            image: 'foo4.png'
        },
        {
            image: 'foo5.png'
        },
        {
            image: 'foo6.png'
        },
        {
            image: 'foo7.png'
        },
        {
            image: 'foo8.png'
        },
        {
            image: 'foo9.png'
        },
        {
            image: 'foo10.png'
        },
        {
            image: 'foo11.png'
        },
        {
            image: 'foo12.png'
        },
        {
            image: 'foo13.png'
        },
        {
            image: 'foo14.png'
        },
        {
            image: 'foo15.png'
        },
        {
            image: 'foo16.png'
        },
        {
            image: 'foo17.png'
        },
        {
            image: 'foo18.png'
        },
        {
            image: 'foo19.png'
        },
        {
            image: 'foo20.png'
        }
    ]
};

describe('Game Play page', () => {
    afterEach(cleanup);

    test('It loads decks of cards', () => {
        const {getByText} = render(<GamePlay drawnCards={dummyData} numOfPlayers={2} />);

        waitFor(() => {
            expect(getByText('You')).toBeTruthy();
        });
    });

    test('It chooses a card from the deck', () => {
        const {getAllByTestId, getByTestId} = render(<GamePlay drawnCards={dummyData} numOfPlayers={2}/>);
        waitFor(() => {
            expect(getByTestId('deckOfCards')).toBeInTheDocument();
            fireEvent.click(getAllByTestId('clickableCards')[0]);

            expect(getByTestId('selectedCard')).toBeInTheDocument();
            expect(getAllByTestId('clickableCards')).toHaveLength(9);
        });
    });

    /////// SNAPSHOT ////////
    test('It matches snapshot', () => {
        const tree = renderer.create(<GamePlay drawnCards={dummyData} numOfPlayers={2} />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
