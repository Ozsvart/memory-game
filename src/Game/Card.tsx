export default function Card({
  item,
  handleSelectedCards,
  toggled,
  stopflip,
}: {
  item: { id: number; name: string; img: string; matched: boolean };
  handleSelectedCards: (item: object) => void;
  toggled: boolean;
  stopflip: boolean;
}) {
  return (
    <div className="item">
      <div className={toggled ? "toggled" : ""}>
        <img className="face" src={item.img} alt="face" />
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
