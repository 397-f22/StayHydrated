import React, { useState } from 'react';
import { useUserState } from '../utilities/firebase';
import Modal from './Modal';
import ActiveModalEditItem from './ActiveModalEditItem';


const addToBar = ({product}) => {
    console.log(product.volume);
    /*
    setCount(count+1);
    return volume;
    */
};

const subtractFromBar = ({product}) => {
    console.log(product.volume);
    /*
    setCount(Math.max(count-1, 0));
    return volume;
    */
};


const LiquidCard = ({product}) => {

  const [user] = useUserState();
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

    return (
        <div className="liquidCard">
            <div className = "d-inline-flex flex-column align-items-center">
                <h5 style={{marginTop: "4px"}}>{product.name}</h5>
                <img src={product.img_url} style={{height: "100px"}} alt="new"></img>
                <h5 style={{marginTop: "4px"}}>Volume: {product.volume} mL</h5>
                <h5 style={{marginTop: "4px"}}>Quantity: {product.quantity}</h5>
                <h5 style={{marginTop: "4px"}}>Category: {product.category}</h5>
                { user ? <button style={{marginTop: "4px"}} className="ms-medium btn btn-dark m-1 p-2" onClick={openModal}>Edit</button> : <></> }
                <Modal open={open} close={closeModal}>
                <ActiveModalEditItem product={product} />
                </Modal>
            </div>
        </div>
    )
};

export default LiquidCard;