import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router,useParams,Link,Switch,Route,Redirect,useHistory, NavLink} from "react-router-dom";
import axios from "axios";
import img1 from '../Trainee/traineelogo.png'
// import '../Trainee/trainee.css';
const Traineehome=()=>{
    const {id}=useParams();
    let [responseData,setResponseData]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:4000/traineelogin1').then((res)=>{
            console.log(res.data)
            setResponseData(res.data)
        }).catch((err)=>{
            console.log(err)
        })
        localStorage.setItem('Trainee',JSON.stringify(id))
    },[])
    const history=useHistory();
    function logout(){
        localStorage.clear();
        history.push('/traineelogin');
    }
    return(
        <div>
               <br/>
            <br/>   <br/>
            <h1 align="Center">
                {
                    responseData.map((data)=>data.TraineeId===id?
                    <h5 key={data.TraineeId}>Welcome {data.TraineeId}</h5>:""
                    )
                }
            </h1>
            <br/><br/>
            <div className="col-md-4 col-12 mx-auto">
            <div class="card">
                <img className="card-img-top" src={img1} alt={id}></img>
                <div className="card-body">
                <h4 className="card-title font-weight-bold"> 
               
                 {
                    responseData.map((data)=>data.TraineeId===id?<h5 key={data.TraineeId}>Batch No :&nbsp;{data.TraineeBatch}</h5>:""
                    )
                }
               {
                    responseData.map((data)=>data.TraineeId===id?<h5 key={data.TraineeId}>Id No :&nbsp;{data.TraineeId}</h5>:""
                    )
                }
               {
                    responseData.map((data)=>data.TraineeId===id?<h5 key={data.TraineeId}>Track :&nbsp;{data.TraineeTrack}</h5>:""
                    )
                }
                {
                    responseData.map((data)=>data.TraineeId===id?<h5 key={data.TraineeId}>Stream :&nbsp;{data.TraineeStream}</h5>:""
                    )
                }
               
               To Give Feedback To The Educator Click The Below Link &nbsp;
               <NavLink to={'/feedbackform/'+id}>
            <button  className='btn btn-success'>Feedback Form 
            
            </button>
            </NavLink>
                </h4>
                
                </div>
            </div>
            </div>
            <br/>
           
            
            <br/>
            <br/> <br/>
            <br/> <br/>
            <br/> <br/>
            <br/> <br/>
            <br/> <br/>
            <br/> <br/>
            <br/> <br/>
            <br/> <br/>
            <br/>
            <br/>
            <br/>
            
        </div>
    )
}
export default Traineehome;