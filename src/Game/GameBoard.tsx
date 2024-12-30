import { data } from "./data";
import { Card, type CardItem } from "./Card";
import { useEffect, useState } from "react";

export function GameBoard() {
  const [cardsArray, setCardsArray] = useState<CardItem[]>([]);
  const [moves, setMoves] = useState(0);
  const [firstCard, setFirstCard] = useState<CardItem | null>(null);
  const [secondCard, setSecondCard] = useState<CardItem | null>(null);
  const [stopFlip, setStopFlip] = useState(false);
  const [won, setWon] = useState(false);

  function newGame() {
    setTimeout(() => {
      const randomOrderArray = data
        .map((card) => ({ ...card, id: Math.random() }))
        .sort(() => 0.5 - Math.random());
      setCardsArray(randomOrderArray);
      setMoves(0);
      setFirstCard(null);
      setSecondCard(null);
      setWon(false);
    }, 1200);
  }

  function handleSelectedCards(item: CardItem) {
    console.log(typeof item);
    if (firstCard !== null && firstCard.id !== item.id) {
      setSecondCard(item);
    } else {
      setFirstCard(item);
    }
  }

  useEffect(() => {
    if (firstCard && secondCard) {
      setStopFlip(true);
      if (firstCard.name === secondCard.name) {
        setCardsArray((prevArray) => {
          return prevArray.map((unit) => {
            if (unit.name === firstCard.name) {
              return { ...unit, matched: true };
            } else {
              return unit;
            }
          });
        });
        removeSelection();
      } else {
        setTimeout(() => {
          removeSelection();
        }, 1000);
      }
    }
  }, [firstCard, secondCard]);

  function removeSelection() {
    setFirstCard(null);
    setSecondCard(null);
    setStopFlip(false);
    setMoves((prevValue) => prevValue + 1);
  }

  useEffect(() => {
    newGame();
  }, []);

  useEffect(() => {
    const allMatched = cardsArray.every((card) => card.matched === true);
    if (allMatched) {
      setWon(true);
    }
  }, [cardsArray]);

  return (
    <div className="container">
      <div className="header">
        <h1>Memóriajáték</h1>
      </div>
      <div className="board">
        {cardsArray.map((item) => (
          <Card
            key={item.id}
            item={item}
            handleSelectedCards={handleSelectedCards}
            toggled={
              item === firstCard || item === secondCard || item.matched === true
            }
            stopflip={stopFlip}
          />
        ))}
      </div>

      {won ? (
        <div className="comments">{moves} lépésben nyertél!</div>
      ) : (
        <div className="comments">Lépések: {moves}</div>
      )}
      <button className="button" onClick={newGame}>
        Új játék
      </button>
    </div>
  );
}
