'use client'
import { setReactDebugChannelForHtmlRequest } from 'next/dist/server/dev/debug-channel'
//import Image from "next/image";
import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)
  const [hours, setHour] = useState(0)
  const [minutes, setMin] = useState(0)
  const [sec, setSec] = useState(0)
  const [mili, setMili] = useState(0)
  const [time, setTime] = useState(0)
  const [start, setStart] = useState(false)
  const [run, setRun] = useState(false)
  const intervalRef = useRef(null)
  const startTimeRef = useRef(0)

  useEffect (() => {
    setHour(Math.floor(time / 3600000))
    setMin(Math.floor((time % 360000) / 60000))
    setSec(Math.floor((time % 60000) / 1000))
    setMili(time % 1000)
  }, [time])

  const Startwatch = () => {
    startTimeRef.current = Date.now() - time;
    intervalRef.current = setInterval(() => {
      setTime(
        (Date.now() - startTimeRef.current))
    }, 10)
    setRun(true)
    setStart(true)
  }
  const pause = () => {
    clearInterval(intervalRef.current)
    setRun(false)
  }


  function handleClick (){ 
    setCount(count + 1)
  }



  return (
    <div>
      <h1>hello</h1>
      <button onClick={handleClick}>
        clicked {count} times
      </button>
      <div>
        <h1>{hours.toString().padStart(2, '0')} : {minutes.toString().padStart(2, '0')} : {sec.toString().padStart(2, '0')} : {mili.toString().padStart(3, '0')} </h1>
        <button className="start" onClick={Startwatch}>
          Start Button
        </button>
        <br></br>
        <button onClick={pause}>
          Pause Button
        </button>
      </div>
    </div>
  );
}
