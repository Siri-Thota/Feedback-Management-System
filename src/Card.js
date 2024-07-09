import React, { useEffect, useState } from "react";
import web from "../src/images/s1.jpg";
import { NavLink } from "react-router-dom";

const Card = (props) => {
    const [showvalue,setshowvalue]=useState('If You Are Educator You Can Proceed Further')
    const [shownavlink,setshownavlink]=useState('/')
    useEffect(()=>{
        if(props.title==='Educator'){
            setshowvalue('If You Are Educator You Can Proceed Further Click Below');
            setshownavlink('/educatormodule');
        }
        else{
            setshowvalue('If You Are Trainee You Can Proceed Further Click Below');
            setshownavlink('/traineemodule');
        }
    })
  return (
    <>
      <div className="col-md-4 col-12 mx-auto">
        <div className="card">
          <img src={props.imgsrc} className="card-img-top" alt={props.imgsrc} />
          <div className="card-body">
            <h5 className="card-title font-weight-bold">{props.title}</h5>
            <p className="card-text">
             {showvalue}
            </p>
            <NavLink to={shownavlink} className="btn btn-primary">
              Click Now
            </NavLink>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Card;
