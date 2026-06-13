'use client'
import { setMaxIdleHTTPParsers } from 'http'
import { setReactDebugChannelForHtmlRequest } from 'next/dist/server/dev/debug-channel'
import { Saira_Extra_Condensed } from 'next/font/google'
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
  const [lap, setLap] = useState([])
  const intervalRef = useRef(null)
  const startTimeRef = useRef(0)
  const id = useRef(0)

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
  const reset = () => {
    clearInterval(intervalRef.current)
    setRun(false)
    setTime(0)
    setLap(lap => [])
    id.current = 0
  }
  const laps = () => {
    setLap(lap => [...lap, {id: id.current, hours:hours, minutes:minutes, seconds:sec, ms:mili}])
    id.current++
  }
  const deleteLap = (key) => {
    setLap(lap.filter((l) => l.id !== key))
  }
  function handleClick (){ 
    setCount(count + 1)
  }



  return (
    <div>
      <div>
          <h1>{hours.toString().padStart(2, '0')} : {minutes.toString().padStart(2, '0')} : {sec.toString().padStart(2, '0')} : {mili.toString().padStart(3, '0')} </h1>
        { run ?
        <div>
          <button onClick={laps}>
            Lap
          </button>
          <br></br>
          <button onClick={pause}>
            Pause Button
          </button>
        </div>
          :
          <div>
            <button className="start" onClick={Startwatch}>
              Start Button
            </button>
            <br></br>
          <button onClick={reset}>
            Reset
          </button>
          </div>
        }
        {lap.map((l) => 
        <div key={l.id}>
          <h1>{l.id}. {l.hours.toString().padStart(2, '0')} : {l.minutes.toString().padStart(2, '0')} : {l.seconds.toString().padStart(2, '0')} : {l.ms.toString().padStart(3, '0')} </h1>
          <button onClick={() => deleteLap(l.id)}>Delete</button>
        </div>

        )}
    </div>
  </div>
  );
}
