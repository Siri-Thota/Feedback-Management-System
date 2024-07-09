import {Component} from "react";
import axios from 'axios';
import { Redirect } from "react-router";
// import {useParams} from 'react-router-dom';
//import { Redirect } from "react-router";
//import { Redirect } from "react-router-dom";
const url = "http://localhost:4000/TraineeFeedback/";
const url1="http://localhost:4000/educatorids/";
class TraineeFeedback extends Component{
    constructor(props){
        super(props);
        let path = this.props.location.pathname;
        let id = (path.split('/').pop());
        console.log(id);
        this.state={
            id1:id,
            form:{
                educatorid:"",
                Ques1 : "",
                Ques2 : "",
                Ques3 : "",
                Ques4 : "",
                Ques5 : "",
                Ques6 : "",
                Ques7 : "",
                Ques8 : "",
                Ques9 : ""
            },
            formErrorMessage:{
                educatorid:"",
                Ques1Error : "",
                Ques2Error : "",
                Ques3Error : "",
                Ques4Error : "",
                Ques5Error : "",
                Ques6Error : "",
                Ques7Error : "",
                Ques8Error : "",
                Ques9Error : ""
            },
            formValid:{
                educatorid:false,
                Ques1Valid:false,
                Ques2Valid:false,
                Ques3Valid:false,
                Ques4Valid:false,
                Ques5Valid:false,
                Ques6Valid:false,
                Ques7Valid:false,
                Ques8Valid:false,
                Ques9Valid:false,
                buttonActive:false
            },
            educatorIds:[],
            updateStatus:false,
            successMessage:'',
            errorMessage:''
        }
    }
    submitTraineeFeedback = ()=>{
        const {form }=this.state;
        axios.post(url,{
            educatorid1:form.educatorid,
            traineeid1:this.state.id1,
            Ques1:form.Ques1,
            Ques2:form.Ques2,
            Ques3:form.Ques3,
            Ques4:form.Ques4,
            Ques5:form.Ques5,
            Ques6:form.Ques6,
            Ques7:form.Ques7,
            Ques8:form.Ques8,
            Ques9:form.Ques9
        }).then(res=>{
            this.setState({updateStatus:true,successMessage:"Feedback Successfully"})
            console.log(res.data.form);
        }).catch(error=>{
            console.log("Error in Submitting Data");
        });
        window.alert('Feedback Submitted Successfully');
    };
    componentDidMount(){
        this.fetchEducatorIds();
    }
    fetchEducatorIds = async () => {
        /* 
          Make a axios GET request to http://localhost:1050/getFlightIds/ to fetch the flightId's array 
          from the server and handle the success and error cases appropriately 
        */try {
          let res = await axios.get(url1);
          this.setState({ educatorIds: res.data });
        } catch (e) {
          if (e.status === 400) {
            this.setState({ successMessage: "", errorMessage: e.response.data.message })
          } else {
            this.setState({ successMessage: "", errorMessage: "Please start your Express server" })
          }
        }
      }
    handleChange=(event)=>{
        let {name,value}=event.target;
        let formDum = this.state.form;
        formDum[name]=value;
        this.setState({form:formDum});
        this.validateData(name,value)
    }
    validateData=(name,value)=>{
        let errMsg='';
        let formErrorMessageDum=this.state.formErrorMessage;
        let formValidDum=this.state.formValid;
        /*let reg='^[A-Z]{1}[0-9]{2}$'
        let regex = '^[T]{1}[0-9]{4}$'
        let res = '^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&])[a-zA-Z0-9!@#$%^&]{8,15}$'*/
        if(name==='educatorid'){
            if(value==='selecting')
            {
                errMsg='Field Required'
            }
            formErrorMessageDum.educatorid=errMsg;
            formValidDum.educatorid=errMsg?false:true
        }
        else if(name==='Ques1'){
            if(value===''){
                errMsg='Field Required'
            }
            formErrorMessageDum.Ques1Error=errMsg;
            formValidDum.Ques1Valid=errMsg?false:true
        }
        else if(name==='Ques2'){
            if(value===''){
                errMsg='Field Required'
            }
            formErrorMessageDum.Ques2Error=errMsg;
            formValidDum.Ques2Valid=errMsg?false:true;
        }
        else if(name==='Ques3'){
            if(value===''){
                errMsg='Field Required'
            }
           
            formErrorMessageDum.Ques3Error=errMsg;
            formValidDum.Ques3Valid=errMsg?false:true;
        }
        else if(name==='Ques4'){
            if(value===''){
                errMsg='Field Required'
            }
            formErrorMessageDum.Ques4Error=errMsg;
            formValidDum.Ques4Valid=errMsg?false:true;
        } else if(name==='Ques5'){
            if(value===''){
                errMsg='Field Required'
            }
            formErrorMessageDum.Ques5Error=errMsg;
            formValidDum.Ques5Valid=errMsg?false:true;
        } else if(name==='Ques6'){
            if(value===''){
                errMsg='Field Required'
            }
            formErrorMessageDum.Ques6Error=errMsg;
            formValidDum.Ques6Valid=errMsg?false:true;
        }else if(name==='Ques7'){
            if(value===''){
                errMsg='Field Required'
            }
            formErrorMessageDum.Ques7Error=errMsg;
            formValidDum.Ques7Valid=errMsg?false:true;
        }else if(name==='Ques8'){
            if(value===''){
                errMsg='Field Required'
            }
            formErrorMessageDum.Ques8Error=errMsg;
            formValidDum.Ques8Valid=errMsg?false:true;
        }else if(name==='Ques9'){
            if(value===''){
                errMsg='Field Required'
            }
            formErrorMessageDum.Ques9Error=errMsg;
            formValidDum.Ques9Valid=errMsg?false:true;
        }
        formValidDum.buttonActive=formValidDum.educatorid && formValidDum.Ques1Valid && formValidDum.Ques2Valid && formValidDum.Ques3Valid && formValidDum.Ques4Valid && formValidDum.Ques5Valid && formValidDum.Ques6Valid && formValidDum.Ques7Valid && formValidDum.Ques8Valid && formValidDum.Ques9Valid;
        this.setState({formErrorMessage:formErrorMessageDum,formValid:formValidDum});
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.submitTraineeFeedback();
    }
    render(){
        let {Ques1Error,Ques2Error,Ques3Error,Ques4Error,Ques5Error,Ques6Error,Ques7Error,Ques8Error,Ques9Error}=this.state.formErrorMessage;
        var redirect=null;
        if(this.state.updateStatus===true){
            
            // window.alert(this.state.successMessage);
            redirect=<Redirect to={'/traineehome/'+this.state.id1}></Redirect>
        }
        return(
            <div className='container'>
                <div className = 'row'>
                    <div className='col-sm'>
                        <br/>
                        <div className="card">
                    <div className="card-header bg-custom">
                        <h3>Feedback</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                        <div className='form-group'>
                    <label htmlFor='educatorid'>Educator Id</label>
                    <select name='educatorid' className='form-control' onChange={this.handleChange}>
                      <option value='selecting'>--Select Educator Id--</option>
                      {this.state.educatorIds.map((data) =>
                        <option key={data} value={data}>{data}</option>)}
                    </select>
                    <span name='educatorid' className='text-danger'>{this.state.formErrorMessage.educatorid}</span>
                  </div>
                {this.state.form.educatorid?
                     <div>
                     <br/>
                            <div className='form-group'>
                                <label htmlFor='Ques1'>1. Ability to articulate concepts / ideas :&nbsp; </label>
                                <input type='radio'  value='Not Satisfied' name='Ques1' onChange={this.handleChange}/>Not Satisfied&nbsp;
                                  <input type='radio' value='Satisfied' name='Ques1' onChange={this.handleChange}/> Satisfied&nbsp;
                                  <input type='radio' value='Good' name='Ques1' onChange={this.handleChange}/> Good&nbsp;
                                  <input type='radio' value='Excellent' name='Ques1'onChange={this.handleChange}/> Excellent&nbsp; 
                                <span className='text-danger'>{Ques1Error}</span>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label htmlFor='Ques2'>2. Flow of presentation of topics :&nbsp; </label> 
                                <input type='radio' value='Not Satisfied' name='Ques2' onChange={this.handleChange}/> Not Satisfied&nbsp; 
                                  <input type='radio' value='Satisfied' name='Ques2' onChange={this.handleChange}/> Satisfied &nbsp;
                                  <input type='radio' value='Good' name='Ques2' onChange={this.handleChange}/> Good&nbsp;
                                  <input type='radio' value='Excellent' name='Ques2'onChange={this.handleChange}/> Excellent&nbsp;
                                <span className='text-danger'>{Ques2Error}</span>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label htmlFor='Ques3'>3. Knowledge of the topics taught :&nbsp; </label>
                                <input  type='radio' value='Not Satisfied' name='Ques3' onChange={this.handleChange}/> Not Satisfied&nbsp; 
                                  <input type='radio' value='Satisfied' name='Ques3' onChange={this.handleChange}/> Satisfied&nbsp;
                                  <input type='radio' value='Good' name='Ques3' onChange={this.handleChange}/> Good&nbsp;
                                  <input type='radio' value='Excellent' name='Ques3'onChange={this.handleChange}/> Excellent&nbsp;
                                <span className='text-danger'>{Ques3Error}</span>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label htmlFor='Ques4'>4. Utilization of class time :&nbsp; </label>
                                <input  type='radio' value='Not Satisfied' name='Ques4' onChange={this.handleChange}/> Not Satisfied&nbsp; 
                                  <input type='radio' value='Satisfied' name='Ques4' onChange={this.handleChange}/> Satisfied&nbsp;
                                  <input type='radio' value='Good' name='Ques4' onChange={this.handleChange}/> Good&nbsp;
                                  <input type='radio' value='Excellent' name='Ques4'onChange={this.handleChange}/> Excellent&nbsp;
                                <span className='text-danger'>{Ques4Error}</span>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label htmlFor='Ques5'>5. Ability of clarity doubts :&nbsp; </label>
                                <input  type='radio' value='Not Satisfied' name='Ques5' onChange={this.handleChange}/> Not Satisfied&nbsp; 
                                  <input type='radio' value='Satisfied' name='Ques5' onChange={this.handleChange}/> Satisfied&nbsp;
                                  <input type='radio' value='Good' name='Ques5' onChange={this.handleChange}/> Good&nbsp;
                                  <input type='radio' value='Excellent' name='Ques5'onChange={this.handleChange}/> Excellent&nbsp;
                                <span className='text-danger'>{Ques5Error}</span>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label htmlFor='Ques6'>6. Abilty to extract class participation :&nbsp; </label>
                                <input  type='radio' value='Not Satisfied' name='Ques6' onChange={this.handleChange}/> Not Satisfied&nbsp; 
                                  <input type='radio' value='Satisfied' name='Ques6' onChange={this.handleChange}/> Satisfied&nbsp;
                                  <input type='radio' value='Good' name='Ques6' onChange={this.handleChange}/> Good&nbsp;
                                  <input type='radio' value='Excellent' name='Ques6'onChange={this.handleChange}/> Excellent&nbsp;
                                <span className='text-danger'>{Ques6Error}</span>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label htmlFor='Ques7'>7. Rate your experience of educator's course delivery in this session :&nbsp; </label>
                                <input  type='radio' value='Not Satisfied' name='Ques7' onChange={this.handleChange}/> Not Satisfied&nbsp; 
                                  <input type='radio' value='Satisfied' name='Ques7' onChange={this.handleChange}/> Satisfied&nbsp;
                                  <input type='radio' value='Good' name='Ques7' onChange={this.handleChange}/> Good&nbsp;
                                  <input type='radio' value='Excellent' name='Ques7'onChange={this.handleChange}/> Excellent&nbsp;
                                <span className='text-danger'>{Ques7Error}</span>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label htmlFor='Ques8'>8. Overall Strength of this Educator : &nbsp;</label>
                                <input type='text' className='form-control' id='Ques8' name='Ques8'
                                 onChange={this.handleChange}/>
                                <span className='text-danger'>{Ques8Error}</span>
                            
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label htmlFor='Ques9'>9. Areas of improvement of the Educator :&nbsp;</label>
                                <input type='text' className='form-control' id='Ques9' name='Ques9'
                                 onChange={this.handleChange}/>
                                <span className='text-danger'>{Ques9Error}</span>
                            </div>
                            <br/>
                            <button disabled={!this.state.formValid.buttonActive} type='submit' className='btn btn-success'>Submit</button>

                            <div className='text-success'>{this.state.successMessage}</div>
                            <div className='text-danger'>{this.state.errorMessage}</div>
                        </div>:null}
                        </form>
                    </div>
                    </div>
                    </div>
                </div>
               {redirect}
            </div>
        )
    }
}
export default TraineeFeedback;