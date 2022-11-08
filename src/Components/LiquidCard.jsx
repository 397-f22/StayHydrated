import React, { useState } from "react";
import { useUserState } from "../utilities/firebase";
import Modal from "./Modal";
import ActiveModalEditItem from "./ActiveModalEditItem";
import { useDbUpdate, useData } from "../utilities/firebase";

import addButton from "./pngs/plus.png";
import minusButton from "./pngs/minus.png";

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

const LiquidCard = ({ product }) => {
  const [user] = useUserState();
  const [update, result] = useDbUpdate(
    `/Products/${user ? user.uid : 0}/${product.name}`
  );
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    // <div className='p-1'>
    <div className="liquidCard card border-0">
      <div className="d-inline-flex flex-column align-items-center">
        {/* <h5 style={{marginTop: "4px"}}>{product.name}</h5> */}
        <img
          src={product.img_url}
          style={{ height: "100px" }}
          onClick={user && openModal}
          alt="new"
        ></img>
        <h5 style={{ marginTop: "10px" }}>Volume: {product.volume} mL</h5>
        <h5 style={{ marginTop: "1px" }}>Category: {product.category}</h5>
        <div
          className="d-flex justify-content-around column g-5"
          style={{ marginTop: "10px" }}
        >
          <input
            type="image"
            src={minusButton}
            style={{ height: "25px" }}
            onClick={() =>
              update({ quantity: Math.max(0, product.quantity - 1) })
            }
          />
          <div
            style={{
              width: "40px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h5>{product.quantity}</h5>
          </div>
          <input
            type="image"
            src={addButton}
            style={{ height: "25px" }}
            onClick={() =>
              update({ quantity: Math.max(0, product.quantity + 1) })
            }
          />
        </div>
        {/* { user ? <button style={{marginTop: "4px"}} className="ms-medium btn btn-dark m-1 p-2" onClick={openModal}>Edit</button> : <></> } */}
        <Modal open={open} close={closeModal}>
          <ActiveModalEditItem product={product} uid={user ? user.uid : 0} />
        </Modal>
      </div>
    </div>
  );
};

export default LiquidCard;
