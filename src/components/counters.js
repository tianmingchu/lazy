"use client"
import Counter from "@/components/counter/counter"
import "./counters.css"
import click from "../../public/click.mp3"
import { useState, useEffect } from "react"

export default function Counters() {
  const [storedWins, setStoredWins] = useState(0)
  const [storedLosses, setStoredLosses] = useState(0)
  const [isThumbsUp, setThumbsUp] = useState(true)

  useEffect(() => {
    setStoredWins(localStorage.getItem("storedWins") || 0)
    setStoredLosses(localStorage.getItem("storedLosses") || 0)
    if (parseInt(storedWins) < parseInt(storedLosses)) {
      toggleAnimation()
      setThumbsUp(false)
    }
  }, [storedWins, storedLosses])

  const playClickSound = () => {
    var audio = document.getElementById("click")
    if (audio) {
      audio.muted = false
      audio.pause()
      audio.currentTime = 0
      audio.play()
    }
  }

  const changeWins = (v) => {
    const wins = parseInt(storedWins) + v
    setStoredWins(wins)
    localStorage.setItem("storedWins", wins)
    checkAnimation(wins, storedLosses)
    playClickSound()
  }

  const changeLosses = (v) => {
    const losses = parseInt(storedLosses) + v
    setStoredLosses(losses)
    localStorage.setItem("storedLosses", losses)
    checkAnimation(storedWins, losses)
    playClickSound()
  }

  const checkAnimation = (wins, losses) => {
    if (wins > losses && !isThumbsUp) {
      toggleAnimation(true)
      setThumbsUp(true)
    } else if (wins < losses && isThumbsUp) {
      toggleAnimation(false)
      setThumbsUp(false)
    }
  }

  const toggleAnimation = (thumbUp) => {
    var element = document.getElementById("thumbs")
    if (thumbUp) {
      element.style.animation = "thumbsUp 0.75s linear forwards"
    } else {
      element.style.animation = "thumbsDown 0.75s linear forwards"
    }
  }

  return (
    <div className="mt-5">
      <div className="thumbs text-4xl text-center" id="thumbs">
        👍
      </div>
      <div className="flex flex-col md:flex-row justify-evenly items-center mt-5 mb-10">
        <div className="md:mb-0 xs:mb-20">
          <Counter isWinsCounter={false} counterValue={storedLosses} changeValue={changeLosses} />
        </div>
        <Counter isWinsCounter={true} counterValue={storedWins} changeValue={changeWins} />
      </div>

      <audio id="click" muted={true}>
        <source src={click} type="audio/mpeg" />
      </audio>
    </div>
  )
}