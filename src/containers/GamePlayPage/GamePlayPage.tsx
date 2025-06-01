import { useQuery } from '@tanstack/react-query';
import Spinner from 'commonComponents/Spinner/Spinner';
import GamePLay from 'containers/GamePlayPage/components/GamePlay/GamePlay';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { fetchDeck, fetchDrawnCards } from './dataFetchers';

const GamePlayPage = () => {
  const { numOfPlayers: numOfPlayersParam } = useParams();
  const numOfPlayers = Number(numOfPlayersParam) > 4 ? 4 : Number(numOfPlayersParam);
  const numOfCardsToDraw = numOfPlayers * 10;

  // TanStack Query: Fetch deck
  const {
    data: deckData,
    isLoading: isDeckLoading,
    error: deckError,
  } = useQuery({
    queryKey: ['deck'],
    queryFn: fetchDeck,
    refetchOnWindowFocus: false,
  });
  const deckId = deckData?.deck_id;

  // TanStack Query: Fetch drawn cards (enabled only when deckId is available)
  const {
    data: drawnData,
    isLoading: isDrawLoading,
    error: drawError,
  } = useQuery({
    queryKey: ['drawnCards', deckId, numOfCardsToDraw],
    queryFn: () => fetchDrawnCards(deckId, numOfCardsToDraw),
    enabled: !!deckId,
    refetchOnWindowFocus: false,
  });

  if (isDeckLoading || isDrawLoading) {
    return (
      <div data-testid="Loader">
        <Spinner style={{}} color="#000" />
      </div>
    );
  }

  if (deckError || drawError) {
    return (
      <Modal isOpen={true}>
        <div data-testid="errorMessage" className="CenterWrapperColumn">
          Something went wrong, please try again.
          <Link to="/">Return to Home Page</Link>
        </div>
      </Modal>
    );
  }

  return <GamePLay drawCards={drawnData?.cards} numOfPlayers={numOfPlayers} />;
};

export default GamePlayPage;
