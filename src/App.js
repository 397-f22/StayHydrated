import './App.css';
import Navigation from './Navigation';
import ProgressBar from './Components/progressBar';
import LiquidCardList from "./Components/LiquidCardList"
import { useState } from "react"
import {useData } from './utilities/firebase.js';


function App() {
  const [volume, setVolume] = useState(50);
  const [products, loading, error] = useData('/Products/'); 

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the products...</h1>

  return (
    <div>
      <Navigation />
      <ProgressBar volume={volume}></ProgressBar>
      <div className='container'>
        <LiquidCardList products={products} />
      </div>

    </div>
  );
}


export default App;


/*

-- TO DO:
- Make Firebase catalog of items drinking with values, img. -> COMPLETED
- Fetch Items from DB and display them in list way. -> COMPLETED
- Allow Editing of the items from the DB when logged in. -> COMPLETED
- Delete Item functionality inside edit item pop up -> IN PROGRESS
- Make Modal Pop-up to add new item -> IN PROGRESS
- Save and upload item to Firebase. -> IN PROGRESS
- Update user limits, preferences. -> TO DO
- Update Progress Bar based on user limits and usage -> TO DO


*/
