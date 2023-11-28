import "./counter.css"
import Plus from "../../../public/plus.png"
import Minus from "../../../public/minus.png"
import hover from "../../../public/hover.mp3"
import Image from "next/image"

export default function Counter({ isWinsCounter, counterValue, changeValue }) {
  const playHoverSound = () => {
    var audio = document.getElementById("hover")
    if (audio) {
      audio.muted = false
      audio.play()
    }
  }

  return (
    <div className="relative counter-body rounded-2xl bg-gradient-to-r from-gray-500 from-10% via-20% to-gray-400 shadow-2xl border-double border-4 border-indigo-600">
      {isWinsCounter ? (
        <div className="bg-green-500 rounded-t-2xl h-12">
          <h1 className="absolute inset-x-0 top-1 text-center text-4xl">
            Wins
          </h1>
        </div>
      ) : (
        <div className="bg-red-500 rounded-t-2xl h-12">
          <h1 className="absolute inset-x-0 top-1 text-center text-4xl">
            Losses
          </h1>
        </div>
      )}
      <div className="absolute inset-x-0 top-28 text-center text-6xl">
        {counterValue}
      </div>
      <div className="absolute inset-x-0 bottom-20 flex flex-row-reverse justify-evenly px-6">
        <button onMouseOver={playHoverSound} className="bg-blue-500 hover:bg-blue-600 py-3 px-4 rounded" onClick={() => changeValue(1)}>
          <Image src={Plus} width={30} height={30} alt="plus" />
        </button>
        <button onMouseOver={playHoverSound} className="bg-blue-500 hover:bg-blue-600 py-3 px-4 rounded" onClick={() => changeValue(-1)}>
          <Image src={Minus} width={30} height={30} alt="minus" />
        </button>
      </div>

      <audio id="hover" muted={true}>
        <source src={hover} type="audio/mpeg" />
      </audio>
    </div>
  )
}