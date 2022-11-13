// import { useFormData } from '../utilities/useFormData';
import { useDbUpdate } from '../utilities/firebase';
import {useUserState, useData } from '../utilities/firebase';
// import {SignInButton, SignOutButton} from "../Navigation"
// import { useState } from 'react';

import React from "react";
// import ReactEcharts from "echarts-for-react";
import ReactEChart from "echarts-for-react";
import * as echarts from 'echarts';


// const InputField = ({ name, text, state, change }) => (
//     <div className="mb-3">
//       <label htmlFor={name} className="form-label">
//         {text}
//       </label>
//       <input
//         className="form-control"
//         id={name}
//         name={name}
//         defaultValue={state?.values?.[name]}
//         onChange={change}
//       />
//       <div className="invalid-feedback">{state?.errors?.[name]}</div>
//     </div>
//   );
  
  // const ButtonBar = ({ message, disabled }) => {
  //   return (
  //     <div className="d-flex">
  //       <button type="submit" className="btn btn-primary me-auto" disabled={disabled}>Submit</button>
  //       <span className="p-2">{message}</span>
  //     </div>
  //   );
  // };

  // class Test extends Component {
  //   render(){
  //     return(
  //       <ReactEcharts
  //         option={{
  //           xAxis: {
  //             type: "category",
  //             data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  //           },
  //           yAxis: {
  //             type: "value"
  //           },
  //           series: [{ 
  //             data: [820, 932, 901, 934, 1290, 1330, 1320],
  //             type: "line"
  //           }]
  //         }}
  //       />
  //     )
  //   }
  // }

  

function BarChart(datas) {
  let dataAxis = ['Sun', 'Mon', 'Tu', 'Wed', 'Thur', 'Fri','Sat'];
  let dataarr = Object.values(datas);
  let data = dataarr[0];
  // console.log("data", data);
  // let yMax = 500;
  const eChartsOption = {
    title: {
      text: 'Record of one week',
      subtext: ""
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: data
      }
    ]
  };
  return (
    <div style={{ width: "200%", height: "200%"}}>
      <ReactEChart
        style={{}}
        option={eChartsOption}
      />
    </div>
  );
}


  
export const Profile  = () => {

    const [user] = useUserState();
    const [update/*, result*/] = useDbUpdate(`/Products/${user?user.uid:""}`);
    const [profile/*, loading, error*/] = useData(`/Products`);
    // const [state, change] = useFormData(validateInput, product);
    // console.log("daily goal", profile["goal"])
    // console.log(user?.uid)

    const submit = (evt) =>{
      evt.preventDefault();
      const goal = Number(document.getElementById('goal').value);
      if(goal){
        const jsonObj = {"goal":goal};
        console.log("daily goal", goal);
        update(jsonObj);
      }
      document.getElementById('edit goal').innerHTML ='<button id="edit_button" type="submit" className="ms-auto btn btn-dark m-1 p-2" >Edit Goal</button>';
      document.getElementById('edit_button').onclick=edit;
      document.getElementById('edit_button').className="ms-auto btn btn-dark m-1 p-2";
 
    }


    const edit = (evt) =>{
      evt.preventDefault();
      document.getElementById('edit goal').innerHTML = '<span> Daily Goal: <input id="goal" type="text"><small>(L)</small></span>\r\n'
      +'<button id="submit_button" type="submit">submit</button>'; 
      document.getElementById('submit_button').onclick=submit; 
      document.getElementById('submit_button').className="ms-auto btn btn-dark m-1 p-2";
    }
    // const show = (evt) =>{
    //   evt.preventDefault();
    //   document.getElementById('show chart').innerHTML += '<BarChart/>';

    // }

    // console.log("edit goal inner:",document.getElementById('edit goal')?.innerHTML)
    // if(user){
    //   document.getElementById('edit goal').innerHTML ='<button id="edit_button" type="submit" className="ms-auto btn btn-dark m-1 p-2" >Edit Goal</button>';
    //   document.getElementById('edit_button').onclick=edit;
    //   document.getElementById('edit_button').className="ms-auto btn btn-dark m-1 p-2";
    // }else{
    //   document.getElementById('edit goal').innerHTML = " ";
    // }
    
      return (
        <div>
            <div className = "d-inline-flex flex-column" style={{paddingTop: "20px", width: "100vw"}}>
                <h1 style={{fontSize:"40px"}}>Profile</h1>
                {/* <div className = "d-inline-flex flex-column align-items-center"> */}
                {/* <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100px'}}> */}
                <div style={{marginTop: "15px"}}>
                  <p className="ms-auto" id="welcome">Hello{user ? ` ${user.displayName}, your daily hydration goal is ${profile[user.uid] !== undefined ? profile[user.uid]["goal"] : 3.0} L.` : ", please sign in to continue"}</p>
                  
                </div>
                <div id="edit goal">{
                  user?<button id="edit_button" type="submit" className="btn btn-dark" onClick={edit}>Edit Goal</button> :" "}</div>

                
                <div id="show chart" style={{height:"300px", width:"200px"}}>{
                  user && profile[user.uid] !== undefined ?<BarChart datas={Object.values(profile[user.uid]["Days"])}></BarChart>:""
                  //  user?<button id="show_button" type="submit" className="btn btn-outline" onClick={show}>Show Record</button>:""
                }</div>
                
            </div>
      </div>
    );
};


