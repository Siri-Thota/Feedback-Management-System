import axios from 'axios';
import { Component } from 'react';
const url = 'http://localhost:4000/educatorfeeds/'
const url1='http://localhost:4000/educatorstrengths/'
var Sentiment = require('sentiment');
var sentiment = new Sentiment();
class Feeds extends Component{
    constructor(props){
        super(props);
        let path = this.props.location.pathname;
        let id = (path.split('/').pop());
        console.log(id);
        this.state={
            ed:id,
            score:0,
            data1:{
                educatorid:'',
                traineeid:'',
                Ques1 : "FeedBack Not Given",
                Ques2 : "FeedBack Not Given",
                Ques3 : "FeedBack Not Given",
                Ques4 : "FeedBack Not Given",
                Ques5 : "FeedBack Not Given",
                Ques6 : "FeedBack Not Given",
                Ques7 : "FeedBack Not Given",
                Ques8 : "FeedBack Not Given",
                Ques9 : "FeedBack Not Given"
            },
            successMessage:'',
            errorMessage:''
        }
    }
    fetcheducatorstrengths=async()=>{
        try{
            let res = await axios.get(url1);
            console.log(res);
            let i=0
            while(i<res.data.length){
                var result=sentiment.analyze(res.data[i].Ques8);
                this.setState({score:(result.score+this.state.score)});
                console.log(result);
            i++;
            }
            console.log(this.state.score);
            console.log(this.state.data1)
        }catch(e){
            console.log(e);
        }
    }
    fetchfeeds=async()=>{
        try{
            let res = await axios.get(url);
            console.log(res);
            let i=0
            while(i<res.data.length){
                if(this.state.ed === res.data[i].educatorid1){
                    this.setState({data1:res.data[i]});
                console.log(res.data[i]);
                }
                i++;
            }
            // console.log(res.data['1'])
        //     if(this.state.ed===res.data['1'].educatorid1)
        //     {
        //     this.setState({data1:res.data['1']});
        // }else{
        //     this.setState({errorMessage:'FeedBack Not Given'});
        //     this.setState({data1:{
        //         Ques1:'Feedback Not Given',
        //         Ques2:'Feedback Not Given',
        //         Ques3:'Feedback Not Given',
        //         Ques4:'Feedback Not Given',
        //         Ques5:'Feedback Not Given',
        //         Ques6:'Feedback Not Given',
        //         Ques7:'Feedback Not Given',
        //         Ques8:'Feedback Not Given',
        //         Ques9:'Feedback Not Given',
        //     }})
        // }
    }catch(e){
            if (e.status === 400) {
                this.setState({ successMessage: "", errorMessage: e.response.data.message })
              } else {
                this.setState({ successMessage: "", errorMessage: "Please start your Express server" })
              }
        }
    }
    componentDidMount(){
        this.fetchfeeds();
        this.fetcheducatorstrengths();
    }
    render(){
        return (
            <div>
                <form>
                <div className='card'>
                    <div className='card-body'>
                   <div className='card-text'>
                    <p>
                        Strength Of EducatorId - {this.state.ed}  :&nbsp; {this.state.data1.Ques8} &nbsp; 
                    </p>
                    <p>
                    Score is  - &nbsp; {this.state.score}
                    </p>
                    </div>
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor='Ques1'>1. Ability to articulate concepts / ideas :&nbsp;{this.state.data1.Ques1} </label>
                </div>
                <br/>
                <div className='form-group'>
                                <label htmlFor='Ques2'>2. Flow of presentation of topics :&nbsp;{this.state.data1.Ques2} </label> 
                </div>
                <br/>
                <div className='form-group'>
                                <label htmlFor='Ques3'>3. Knowledge of the topics taught :&nbsp;{this.state.data1.Ques3} </label>
                </div>
                <br/>
                <div className='form-group'>
                                <label htmlFor='Ques4'>4. Utilization of class time :&nbsp;{this.state.data1.Ques4} </label>                
                </div>
                <br/>
                <div className='form-group'>
                                <label htmlFor='Ques5'>5. Ability of clarity doubts :&nbsp;{this.state.data1.Ques5} </label>               
                </div>
                <br/>
                <div className='form-group'>
                                <label htmlFor='Ques6'>6. Abilty to extract class participation :&nbsp;{this.state.data1.Ques6} </label>               
                </div>
                <br/>
                <div className='form-group'>
                                <label htmlFor='Ques7'>7. Rate your experience of educator's course delivery in this session :&nbsp;{this.state.data1.Ques7} </label>                
                </div>
                <br/>
                <div className='form-group'>
                                <label htmlFor='Ques8'>8. Overall Strength of this Educator : &nbsp;{this.state.data1.Ques8}</label>
                </div>
                <br/>
                <div className='form-group'>
                                <label htmlFor='Ques9'>9. Areas of improvement of the Educator :&nbsp;{this.state.data1.Ques9}</label>
               </div>
               <br/><br/><br/><br/><br/>
                </form>
                
            </div>
        )
    }
}
export default Feeds;