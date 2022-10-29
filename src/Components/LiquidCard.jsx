import React, { useState } from 'react';
import { useUserState } from '../utilities/firebase';
import Modal from './Modal';
import ActiveModalEditItem from './ActiveModalEditItem';
import { useDbUpdate, useData } from '../utilities/firebase';

import addButton from './pngs/plus.png'
import minusButton from './pngs/minus.png'

// const AddToBar = (id, quantity, update) => {
//     update({"quantity": quantity + 1})
//     // console.log(product.volume);
//     /*
//     setCount(count+1);
//     return volume;
//     */
// };

// const SubtractFromBar = (id, quantity, update) => {
//     update({"quantity": quantity - 1})
//     // console.log(product.volume);
//     /*
//     setCount(Math.max(count-1, 0));
//     return volume;
//     */
// };


const LiquidCard = ({product}) => {
  const [update, result] = useDbUpdate(`/Products/${product.name}`);
  const [user] = useUserState();
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

    return (
        // <div className='p-1'>
        <div className="liquidCard card border-0">
            <div className = "d-inline-flex flex-column align-items-center">
                <h5 style={{marginTop: "4px"}}>{product.name}</h5>
                <img src={product.img_url} style={{height: "100px"}} alt="new"></img>
                <h5 style={{marginTop: "4px"}}>Volume: {product.volume} mL</h5>
                <h5 style={{marginTop: "4px"}}>Quantity: {product.quantity}</h5>
                <h5 style={{marginTop: "4px"}}>Category: {product.category}</h5>
                {/* { user ? <button style={{marginTop: "4px"}} className="ms-medium btn btn-dark m-1 p-2" onClick={openModal}>Edit</button> : <></> } */}
                <div className = "d-flex justify-content-around column g-5">
                    <input type="image" src={minusButton} style={{height: "30px"}}  onClick={() => update({"quantity": Math.max(0, product.quantity - 1)})} />
                    <input type="image" src={addButton} style={{height: "30px"}}  onClick={() => update({"quantity":  Math.max(0, product.quantity + 1)})} />
                </div>
                <Modal open={open} close={closeModal}>
                <ActiveModalEditItem product={product} />
                </Modal>
            </div>
        </div>
    )
};

export default LiquidCard;