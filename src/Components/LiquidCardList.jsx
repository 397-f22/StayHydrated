import React, { useState } from "react";
import LiquidCard from "./LiquidCard";

const LiquidCardList = ({ products, total_volume, goal }) => {
  // console.log(products);
  return (
    <>
      <div className="btn-toolbar justify-content-space-evenly">
        {/* {console.log(Object.values(products))} */}
        {Object.values(products).length > 0 ? (
          Object.values(products)
            .filter((x) => x.category != null)
            .map((product) => <LiquidCard product={product} total_volume = {total_volume} goal = {goal}></LiquidCard>)
        ) : (
          <h1>
            Oops, it seems that you have no items. Click on the 'Add Item'
            button to start tracking your water intake!
          </h1>
        )}
      </div>
    </>
  );
};

export default LiquidCardList;
