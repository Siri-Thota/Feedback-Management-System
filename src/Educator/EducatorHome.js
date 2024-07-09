import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router,useParams,Link,Switch,Route,Redirect,useHistory,NavLink} from "react-router-dom";
import axios from "axios";
import img1 from '../Educator/educatorlogo.png'
const Educatorhome=()=>{
    const {id}=useParams();
    let [responseData,setResponseData]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:4000/educatorlogin1').then((res)=>{
            console.log(res.data)
            setResponseData(res.data)
        }).catch((err)=>{
            console.log(err)
        })
        // axios.get('http:localhost:4000/educatorfeeds').then((res)=>{
        //     setEducatorfeeds(res.data)
        //     console.log(res.data);
        // }).catch((err)=>{
        //     console.log(err);
        // })
        localStorage.setItem('Educator',JSON.stringify(id))
    },[])
    // const history=useHistory();
    // function logout(){
    //     localStorage.clear();
    //     history.push('/educatorlogin');
    // }
    return(
        <div>
               <br/>
            <br/>   <br/>
            <h1 align="center">
                {
                    responseData.map((data)=>data.EducatorId===id?
                    <h5 key={data.EducatorId}>Welcome {data.EducatorId}</h5>:""
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
                    responseData.map((data)=>data.EducatorId===id?<h5 key={data.EducatorId}>Batch No :&nbsp;{data.EducatorBatch}</h5>:""
                    )
                }
               {
                    responseData.map((data)=>data.EducatorId===id?<h5 key={data.EducatorId}>Id No :&nbsp;{data.EducatorId}</h5>:""
                    )
                }
               {
                    responseData.map((data)=>data.EducatorId===id?<h5 key={data.EducatorId}>Track :&nbsp;{data.EducatorTrack}</h5>:""
                    )
                }
                {
                    responseData.map((data)=>data.EducatorId===id?<h5 key={data.EducatorId}>Stream :&nbsp;{data.EducatorStream}</h5>:""
                    )
                }
                 Check The Feedback Given To You &nbsp;
               <NavLink to={'/feeds/'+id}>
               <button  className='btn btn-success'>Check Feedback
            
            </button>
               </NavLink>
               
                </h4>
              
                </div>
            </div>
            </div>
            <br/>
            <br/>
        </div>
    )
}
export default Educatorhome;