export type CardItem = {
  id: number;
  name: string;
  img: string;
  matched: boolean;
};

type CardProps = {
  item: CardItem;
  handleSelectedCards: (item: CardItem) => void;
  toggled: boolean;
  stopflip: boolean;
};

export function Card({
  item,
  handleSelectedCards,
  toggled,
  stopflip,
}: CardProps) {
  return (
    <div className="item">
      <div className={toggled ? "toggled" : ""}>
        <div className="face">
          <img src={item.img} alt="face" />
        </div>
        <div
          className="back"
          onClick={() => !stopflip && handleSelectedCards(item)}
        >
          {" "}
        </div>
      </div>
    </div>
  );
}
