import './App.css';
import Navigation from './Navigation';
import NavigationBottom from './Components/NavigationBottom';
import ProgressBar from './Components/progressBar';
import LiquidCardList from "./Components/LiquidCardList"
import { useState, useEffect } from "react"
import { useData } from './utilities/firebase.js';
import { useUserState, useDbUpdate } from './utilities/firebase';
import { Profile } from "./Components/Profile.jsx";
import Summary from './Components/Summary';
import Modal from './Components/Modal';
import AddItemModal from './Components/AddItemModal.jsx';
import add from './Components/pngs/add.png'


function App() {
  // const [volume, setVolume] = useState(0);
  const [products, loading, error] = useData('/Products');
  const [user] = useUserState();
  const [update, result] = useDbUpdate(`/Products/`);
  const [updateday, resultday] = useDbUpdate(`/Products/${user?.uid}/Days/`);

  

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

  useEffect(() => {
    if (user && products) {
      if (!Object.keys(products).includes(user.uid)) {
        const today = new Date();
        console.log(today.toString())
        
        const jsonObj = {
          [user.uid]: {
            ["Date"]: {
              date: today.toString()
            },
            ["goal"]:3.0,
            ["days"]:{
              [0]:0.0,
              [1]:0.0,
              [2]:0.0,
              [3]:0.0,
              [4]:0.0,
              [5]:0.0,
              [6]:0.0
            },
            [0]: {
              category: "Water",
              img_url: "https://cdn-icons-png.flaticon.com/512/4507/4507444.png",
              name: 0,
              quantity: 0,
              volume: 500
            },
            [1]: {
              category: "Soda",
              img_url: "https://cdn-icons-png.flaticon.com/512/2722/2722527.png",
              name: 1,
              quantity: 0,
              volume: 500
            },
            [2]: {
              category: "Coffee",
              img_url: "https://cdn-icons-png.flaticon.com/512/1047/1047503.png",
              name: 2,
              quantity: 0,
              volume: 500
            },
            [3]: {
              category: "Tea",
              img_url: "https://cdn-icons-png.flaticon.com/512/3504/3504747.png",
              name: 3,
              quantity: 0,
              volume: 500
            }
          }
        };

        update(jsonObj);
      }
    }
  })

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the products...</h1>

  const calTotalvol = (products) => {
    return Object.values(products)
    .filter(x => x["category"])
    .reduce(
      (prev, cur) => {switch(cur.img_url){
        // alcohol 50%
        case 'https://cdn-icons-png.flaticon.com/512/920/920541.png':
          // console.log("cal", cur.quantity, cur.volume);
          return (parseFloat(cur.quantity) * parseFloat(cur.volume) * 0.5 + prev);
        // cafe 85%
        case "https://cdn-icons-png.flaticon.com/512/1047/1047503.png":
        case "https://cdn-icons-png.flaticon.com/512/3504/3504747.png":
          // console.log("cal", cur.quantity, cur.volume);
          return (parseFloat(cur.quantity) * parseFloat(cur.volume) * 0.5 + prev);
        default:
          // console.log("cal", cur.img_url);
          return (parseFloat(cur.quantity) * parseFloat(cur.volume) + prev);
      }}
       , 0) / 1000;
  }
  
  let total_volume = 0;
  let goal = 3.0;
  const curday = new Date().getDay();
  
  if (user != null && Object.keys(products).includes(user.uid)) {
    goal = products[user.uid]["goal"];
    total_volume = calTotalvol(products[user.uid])
    // console.log("total volume",total_volume)
    // console.log("curday", curday);
    updateday({[curday]:Number(total_volume)} );
    // total_volume = Object.entries(products[user.uid]).filter(x => x[0] != "Date").reduce((prev, cur) => parseFloat(cur[1].quantity) * parseFloat(cur[1].volume) + prev, 0) / 1000;
    const curDate = new Date();
    // console.log(curDate);
    // console.log(products[user.uid]["Date"].date)
    const prevDate = new Date(products[user.uid]["Date"].date);
    // console.log(prevDate);
    const diff = Math.abs(curDate - prevDate) / 36e5;
    // console.log(diff);
  }
  // console.log(products)
  return (
    <div className="mainView">
      <Navigation profileClick={ProfileClick} />
      {showProfile && <Profile />}
      {showTracking &&
        <div className='tracking'>
          {user ? <ProgressBar volume={(total_volume / goal * 100).toFixed(1)} user = {user} total_volume = {total_volume} goal = {goal}></ProgressBar> : ""}
          <div className='justify-content-space-evenly'>
            {user != null && Object.keys(products).includes(user.uid) ? <LiquidCardList products={products[user.uid]} total_volume = {total_volume} goal = {goal} /> : <Profile />}
          </div>
          <Modal open={open} close={closeModal}><AddItemModal close={closeModal} count={Object.entries(products).length} uid={user ? user.uid : 0}> </AddItemModal></Modal>
        </div>
      }
      {showSummary && <Summary />}
      <NavigationBottom user = {user} products = {products} trackingClick={TrackingClick} profileClick={ProfileClick} addItemClick={openModal} />
    </div>
  );
}

export default App;
