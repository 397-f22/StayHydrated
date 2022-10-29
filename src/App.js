import './App.css';
import Navigation from './Navigation';
import ProgressBar from './Components/progressBar';
import LiquidCardList from "./Components/LiquidCardList"
import { useState } from "react"
import {useData } from './utilities/firebase.js';
import { useUserState } from './utilities/firebase';
import {Profile} from "./Components/Profile.jsx";
import Modal from './Components/Modal';
import AddItemModal  from './Components/AddItemModal.jsx';


function App() {
  const [volume, setVolume] = useState(50);
  const [products, loading, error] = useData('/Products/'); 
  const [user] = useUserState();

  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const [profileOpen, setProfileOpen] = useState(false);
  const openProfileModal = () => setProfileOpen(true);
  const closeProfileModal = () => setProfileOpen(false);

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the products...</h1>

  return (
    <div>
      <Navigation />
      { user ? <button style={{marginTop: "4px"}} className="ms-medium btn btn-dark m-1 p-2" onClick={openModal}>Add Item</button> : <> </> }
      { user ? <button style={{marginTop: "4px"}} className="ms-medium btn btn-dark m-1 p-2" onClick={openProfileModal}>Profile</button> : <> </> }
      <ProgressBar volume={volume}></ProgressBar>
      <div className='container'>
        <LiquidCardList products={products} />
      </div>
      <Modal open={open} close={closeModal}><AddItemModal/></Modal>
      <Modal open={profileOpen} close={closeProfileModal}><Profile/></Modal>
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
