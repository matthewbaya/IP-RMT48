import { useState } from "react";

export default function Card({ cards }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      prevIndex < cards.length - 1 ? prevIndex + 1 : 0;
    });
  };

  return (
    <div className="relative w-80 h-128 mx-auto mt-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`absolute w-full h-full rounded-lg shadow-lg transition-transform transform ${
            index === currentIndex
              ? "scale-100 z-10"
              : index < currentIndex
              ? "scale-95 -translate-x-4 -z-10"
              : "scale-95 translate-x-4 -z-10"
          }`}
          style={{
            backgroundImage: `url(${card.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute bottom-4 left-4 p-4 bg-black bg-opacity-50 text-white rounded-lg">
            <h2 className="text-xl font-bold">
              {card.name}, {card.age}
            </h2>
            <p className="text-sm">{card.bio}</p>
          </div>
        </div>
      ))}
      <button
        onClick={handlePrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
      >
        &gt;
      </button>
    </div>
  );
}
