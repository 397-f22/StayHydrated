import logo from './logo.svg';
import './App.css';
import Navigation from './Navigation';
import ProgressBar from './Components/progressBar';
import LiquidCard from './Components/liquidCard';

import waterBottle from './Components/pngs/water-bottle.png'
import waterGlass from './Components/pngs/water-glass.png'
import waterBarrel from './Components/pngs/water-barrel.png'

import coffee from './Components/pngs/coffee-cup.png'
import milk from './Components/pngs/milk.png'
import tea from './Components/pngs/tea.png'
import orangeJuice from './Components/pngs/orange-juice.png'

import sodaCan from './Components/pngs/soda-can.png'
import sodaBottle from './Components/pngs/soda.png'
import { useState } from "react"

function App() {
  const [volume, setVolume] = useState(50);
  return (
    <div>
      <Navigation />
      <ProgressBar volume={volume}></ProgressBar>
      <div className='container'>
        <LiquidCard icon={waterBottle} volume={500}/>
        <LiquidCard icon={waterBarrel} volume={2000}/>
        <LiquidCard icon={sodaCan} volume={300}/>
        <LiquidCard icon={sodaBottle} volume={500}/>
        <LiquidCard icon={coffee} volume={500}/>
        <LiquidCard icon={milk} volume={1000}/>
        <LiquidCard icon={tea} volume={500}/>
        <LiquidCard icon={orangeJuice} volume={500}/>
      </div>

    </div>
  );
}

export default App;
