import './App.css';
import Navigation from './Navigation';
import NavigationBottom from './Components/NavigationBottom';
import ProgressBar from './Components/progressBar';
import LiquidCardList from "./Components/LiquidCardList"
import { useState } from "react"
import {useData } from './utilities/firebase.js';
import { useUserState } from './utilities/firebase';
import {Profile} from "./Components/Profile.jsx";
import Summary from './Components/Summary';
import Modal from './Components/Modal';
import AddItemModal  from './Components/AddItemModal.jsx';
import add from './Components/pngs/add.png'


function App() {
  // const [volume, setVolume] = useState(0);
  const [products, loading, error] = useData('/Products/'); 
  const [user] = useUserState();

  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const [showProfile, setShowProfile] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showTracking, setShowTracking] = useState(true);
  const ProfileClick = () => {
    setShowProfile(true);
    setShowSummary(false);
    setShowTracking(false);
  };
  const SummaryClick = () => {
    setShowProfile(false);
    setShowSummary(true);
    setShowTracking(false);
  };
  const TrackingClick = () => {
    setShowProfile(false);
    setShowSummary(false);
    setShowTracking(true);
  };
  

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the products...</h1>

  const goal = 3.0;
  const total_volume = Object.entries(products).reduce((prev, cur) => parseFloat(cur[1].quantity) * parseFloat(cur[1].volume) + prev , 0)/1000;
  console.log(total_volume)

  return (
    <div className="mainView">
      <Navigation profileClick={ProfileClick}/>
      {showProfile && <Profile/>}
      {showTracking && 
        <div className='tracking'>
          {/* { user ? <button style={{marginTop: "4px"}} className="ms-medium btn btn-dark m-1 p-2" onClick={openProfileModal}>Profile</button> : <> </> } */}
          
          <ProgressBar volume={(total_volume/ goal * 100).toFixed(1)}></ProgressBar>
          <div style={{ width: "80vw", display: "flex", justifyContent: "space-between", alignItems: "center", margin: "auto", marginTop: "-20px", marginBottom: "20px" }}>
            <h3>{total_volume.toFixed(1)} L / {goal} L</h3>
            { user ? <input type="image" src={add} style={{height: "25px", marginTop: "-8px"}} onClick={openModal} /> : <> </> }
          </div>

          

          <div className='container'>
            <LiquidCardList products={products} />
          </div>
          <Modal open={open} close={closeModal}><AddItemModal count={Object.entries(products).length}> </AddItemModal></Modal>
          {/* <Modal open={profileOpen} close={closeProfileModal}><Profile/></Modal> */}
        </div>
      }
      {showSummary && <Summary/>}
      <NavigationBottom trackingClick={TrackingClick} profileClick={ProfileClick} summaryClick={SummaryClick} />
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
