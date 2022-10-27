import logo from './logo.svg';
import './App.css';
import Navigation from './Navigation';
import ProgressBar from './Components/progressBar';
import { useState } from "react"


function App() {
  const [volume, setVolume] = useState(50);
  return (
    <div>
      <Navigation />
      <ProgressBar volume={volume}></ProgressBar>
    </div>
  );
}

export default App;
