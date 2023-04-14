import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import gameStyles from '@/styles/game.module.css'
import Game from './_game';
import { GameClass } from '@/public/static/scripts/gameMechanics';
import { useEffect, useState } from 'react';

export default function Home() {
  const [games, setGames] = useState<GameClass[]>()
  const [num, setNum] = useState<number>(10);

  useEffect(() => {
    setGames(Array.from({ length: 50 }, _ => new GameClass()))
  }, [])

  function doTimes(times: number, f: Function) {
    for(let i = 0; i < times; i++) {
      f();
    }
  }

  function reset() {
    setGames([]);
    updateNumber(num);
  }
  
  function play() {
    let temp = (games == undefined) ? [] : [...games];
    temp.forEach((game) => {
      game.playRound();
    })
    setGames(temp);
  }

  function updateNumber(num: number) {
    setGames(Array.from({length: num * multiplier}, _ => new GameClass()));
    setNum(num);
  }

  const MAXSIZE = 500;
  const multiplier = MAXSIZE / 100
  return (
    <>
      <Head>
        <title>Blaseball clone</title>
        <meta name="description" content="A clone of the Blaseball app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.commandCenter}>
          <div>
            <button onClick={play}>Play a round</button>
            <button onClick={function() {doTimes(5, play)}}>x5</button>
            <button onClick={function() {doTimes(10, play)}}>x10</button>
          </div>
          <label>{num * multiplier}</label>
          <input type="range" id="number" onChange={function (e: any){updateNumber(parseInt(e.target.value))}} value={num}/>
          <button onClick={reset}>Reset</button>
        </div>
        <div className={gameStyles.container}>
        {
          games?.map((game, i) => <>
          <Game
            game={game}
            homeScore={game.homepoints}
            awayScore={game.awaypoints}
            id={i}></Game></>)
        }
        </div>
      </main>
    </>
  )
}
