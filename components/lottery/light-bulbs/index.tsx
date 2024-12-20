"use client"

import { useState, useEffect } from 'react'
import { getWinner, getRandomIntInclusive } from '@/lib/random'
import { time_sleep } from '@/lib/algo'
import WrapBulb from "./wrap-bulb"
import type { MouseEventHandler, ReactEventHandler } from 'react'

export default function LightBulbs() {
  const [winner1, setWinner1] = useState<null | string>(null)
  const [winner2, setWinner2] = useState<null | string>(null)
  const [winner3, setWinner3] = useState<null | string>(null)
  const [winner4, setWinner4] = useState<null | string>(null)
  const [winner5, setWinner5] = useState<null | string>(null)
  const [on1, setOn1] = useState<boolean>(false)
  const [on2, setOn2] = useState<boolean>(false)
  const [on3, setOn3] = useState<boolean>(false)
  const [on4, setOn4] = useState<boolean>(false)
  const [on5, setOn5] = useState<boolean>(false)
  const setWinner = [setWinner1, setWinner2, setWinner3, setWinner4, setWinner5]
  const setOn = [setOn1, setOn2, setOn3, setOn4, setOn5]
  const handleLoad: ReactEventHandler<HTMLDivElement> = () => {
    const part = localStorage.getItem('parts')
    if(part === undefined || part === null) {
      alert('Please initialize the data!')
    }
  }
  const setAllWinner = (prop: (string | null)[]) => {
    for(let i = 0; i < 5; ++i) {
      setWinner[i](prop[i])
      setOn[i](prop[i] != null)
      localStorage.setItem(`winner${i + 1}`, JSON.stringify(prop[i]))
    }
  }
  const displayWinners = (winnerList: string[]) => {
    const winnerCount = winnerList.length
    const bulbId = [0, 1, 2, 3, 4]
    const bulbWinner: (string | null)[] = [null, null, null, null, null]
    for(let i = 0; i < winnerCount; ++i)
      bulbWinner[getWinner(bulbId)] = winnerList[i]
    setAllWinner(bulbWinner)
  }
  const revealWinner = async (dataClone: number[], winnerList: string[]) => {
    const sound = new Audio('/mix_reveal.mp3')
    await sound.play()
    setAllWinner([null, null, null, null, null])
    for(let i = 0; i <= 1; i += 0.045) {
      for(let j = 0; j < 5; ++j) {
        const on = getRandomIntInclusive(0, 1) == 0
        if(on) setWinner[j](getWinner(structuredClone(dataClone)).toString())
        setOn[j](on)
      }
      await time_sleep(100)
    }
    displayWinners(winnerList)
  }
  const handleClick: (arg0: number)=>MouseEventHandler<HTMLButtonElement> = (winnerCount: number) => {
    return async () => {
      const part = localStorage.getItem('parts')
      const slog = localStorage.getItem('log')
      if(part === undefined || part === null) {
        alert('Please initialize the data!')
        return
      }
      if(slog === undefined || slog === null) {
        alert('Please initialize the data!')
        return
      }
      const data = JSON.parse(part)
      const log = JSON.parse(slog)
      if(typeof data !== 'object') {
        alert('Data format error!')
        return
      }
      if(typeof log !== 'object') {
        alert('Data format error!')
        return
      }
      if(data.length === 0) {
        alert('抽獎箱空了！')
        return
      }
      if(data.length < winnerCount) {
        alert(`抽獎箱內只剩下${data.length}個號碼！`)
        return
      }
      const winnerList: string[] = []
      const dataClone = structuredClone(data)
      for(let i = 0; i < winnerCount; ++i)
        winnerList.push(getWinner(data).toString())
      log.push({ time: Date.now(), winnerList: JSON.stringify(winnerList) })
      localStorage.setItem('parts', JSON.stringify(data))
      await revealWinner(dataClone, winnerList)
      localStorage.setItem('log', JSON.stringify(log))
    }
  }

  useEffect(() => {
    for(let i = 0; i < 5; ++i) {
      const raw = localStorage.getItem(`winner${i + 1}`)
      if(raw === null) {
        setWinner[i](null)
        continue
      }
      const prop: string | null = JSON.parse(raw)
      if(prop !== null) setOn[i](true)
      setWinner[i](prop)
    }
  }, [])

  return (
    <>
      <div className='grid grid-cols-5 absolute top-0 left-0 w-screen h-screen z-20'>
        <WrapBulb
          winner={winner1}
          on={on1}
          handleLoad={handleLoad}
          handleClick={handleClick(1)}
        />
        <WrapBulb
          winner={winner2}
          on={on2}
          handleLoad={handleLoad}
          handleClick={handleClick(2)}
        />
        <WrapBulb
          winner={winner3}
          on={on3}
          handleLoad={handleLoad}
          handleClick={handleClick(3)}
        />
        <WrapBulb
          winner={winner4}
          on={on4}
          handleLoad={handleLoad}
          handleClick={handleClick(4)}
        />
        <WrapBulb
          winner={winner5}
          on={on5}
          handleLoad={handleLoad}
          handleClick={handleClick(5)}
        />
      </div>
    </>
  )
}
