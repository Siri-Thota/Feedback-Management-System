import {Component} from "react";
import axios from 'axios';
import { Redirect } from "react-router-dom";
const url = "http://localhost:4000/traineeRegister1/";
class TraineeRegister extends Component{
    constructor(){
        super();
        this.state={
            DDL1:[],
            DDL2:[],
            selectddl:'',
            form:{
                TraineeBatch:"",
                TraineeId : "",
                TraineePwd : "",
                TraineeTrack : "",
                TraineeStream:""
            },
            formErrorMessage:{
                TraineeBatchError:"",
                TraineeIdError:"",
                TraineePwdError:"",
                TraineeTrackError:"",
                TraineeStreamError:""
            },
            formValid:{
                TraineeBatchValid:false,
                TraineeIdValid:false,
                TraineePwdValid:false,
                TraineeTrackValid:false,
                TraineeStreamValid:false,
                buttonActive:false
            },
            updateStatus:false,
            successMessage:'',
            errorMessage:''
        }
    }
    componentDidMount(){
        this.setState({
            DDL1:[
                {name:'UI',DDL2:['UI MEAN','UI MERN']},
                {name:'JAVA',DDL2:['JAVA ANGULAR','JAVA REACT']}
            ]
        });
    }
    selectChange(e){
        this.setState({selectddl:e.target.value});
        this.setState({DDL2:this.state.DDL1.find(x=>x.name===e.target.value).DDL2});
    }
    submitTraineeRegister = ()=>{
        const {selectddl,form,formErrorMessage}=this.state;
        axios.post(url,{
            TraineeBatch:form.TraineeBatch,
            TraineeId:form.TraineeId,
            TraineePwd:form.TraineePwd,
            TraineeTrack:selectddl,
            TraineeStream:form.TraineeStream
        }).then(res=>{
            this.setState({updateStatus:true,successMessage:"Registered Successfully"})
            console.log(res.data.form);
        }).catch(error=>{
            console.log("Error in Submitting Data");
        });
    };
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
        let reg='^[A-Z]{1}[0-9]{2}$'
        let regex = '^[T]{1}[0-9]{4}$'
        let res = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$'
        if(name==='TraineeBatch'){
            if(value===''){
                errMsg='Field Required'
            }
            else if(!(value.match(reg))){
                errMsg='Please Enter Valid Batch Number'
            }
            formErrorMessageDum.TraineeBatchError=errMsg;
            formValidDum.TraineeBatchValid=errMsg?false:true
        }
        else if(name==='TraineeId'){
            if(value===''){
                errMsg='Field Required'
            }else if(!(value.match(regex))){
                errMsg='Please Enter Valid Trainee Id';
            }
            formErrorMessageDum.TraineeIdError=errMsg;
            formValidDum.TraineeIdValid=errMsg?false:true;
        }
        else if(name==='TraineePwd'){
            if(value===''){
                errMsg='Field Required'
            }
            else if(!(value.match(res))){
                errMsg='Please Enter Valid Password'
            }
            formErrorMessageDum.TraineePwdError=errMsg;
            formValidDum.TraineePwdValid=errMsg?false:true;
        }
        // else if(name==='TraineeTrack'){
        //     if(value==='---select the track---'){
        //         errMsg='Select The Track'
        //     }
        //     formErrorMessageDum.TraineeTrackError=errMsg;
        //     formValidDum.TraineeTrackValid=errMsg?false:true;
        // }
        // else if(name==='TraineeStream'){
        //     if(value==='---select the stream---'){
        //         errMsg='Select The Stream'
        //     }
        //     formErrorMessageDum.TraineeStreamError=errMsg;
        //     formValidDum.TraineeStreamValid=errMsg?false:true;
        // }
        formValidDum.buttonActive=formValidDum.TraineeBatchValid && formValidDum.TraineeIdValid && formValidDum.TraineePwdValid ;
        // && formValidDum.TraineeTrackValid && formValidDum.TraineeStreamValid;
        this.setState({formErrorMessage:formErrorMessageDum,formValid:formValidDum});
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.submitTraineeRegister();
    }
    render(){
        let {TraineeBatchError,TraineeIdError,TraineePwdError,TraineeTrackError,TraineeStreamError}=this.state.formErrorMessage;
        var redirect=null;
        if(this.state.updateStatus===true){
            
            window.alert(this.state.successMessage);
            redirect=<Redirect to={"/traineelogin"}></Redirect>
             
        }
        return(
            <div className='container'>
                <div className = 'row'>
                    <div className='col-sm'>
                        <br/>
                        <div className="card">
                    <div className="card-header bg-custom">
                        <h3>Trainee Registration</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className='form-group'>
                                <label htmlFor='TraineeBatch'>Trainee Batch No</label>
                                <input type='text' className='form-control' id='TraineeBatch' name='TraineeBatch'
                                placeholder='Enter Batch No' onChange={this.handleChange}/>
                                <span className='text-danger'>{TraineeBatchError}</span>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label htmlFor='TraineeId'>Trainee ID</label>
                                <input type='text' className='form-control' id='TraineeId' name='TraineeId' placeholder='Enter Trainee Id'
                                onChange={this.handleChange}/>
                                <span className='text-danger'>{TraineeIdError}</span>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label htmlFor='TraineePwd'>Trainee Password</label>
                                <input type='password' className='form-control' id='TraineePwd' name='TraineePwd' placeholder='Enter Password'
                                onChange={this.handleChange}/>
                                <span className='text-danger'>{TraineePwdError}</span>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label htmlFor='TraineeTrack'>Trainee Track</label>
                                <select className='form-control' id='TraineeTrack' name='TraineeTrack'
                                   onChange={this.selectChange.bind(this)}>
                                    <option value='---select the track---'>---Select The Track---</option>
                                    {/* <option value='UI'>UI</option>
                                    <option value='Java'>Java</option> */}
                                    {this.state.DDL1.map(x=>{
                            return <option>{x.name}</option>
                        })}
                                </select>
                                <span className='text-danger'>{TraineeTrackError}</span>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label htmlFor='TraineeStream'>Trainee Stream</label>
                                <select className='form-control' id='TraineeStream' name='TraineeStream'
                                onChange={this.handleChange}>
                                    <option value='---select the stream---'>---Select The Stream---</option>
                        {this.state.DDL2.map(x=>{
                            return <option>{x}</option>
                        })}
                                    {/* <option value='UI Mean'>UI Mean</option>
                                    <option value='UI Mern'>UI Mern</option>
                                    <option value='Java React'>Java React</option>
                                    <option value='Java Angular'>Java Angular</option> */}
                                </select>
                                <span className='text-danger'>{TraineeStreamError}</span>
                            </div>
                            <br/>
                            <button disabled={!this.state.formValid.buttonActive} type='submit' className='btn btn-success'>Submit</button>

                            <div className='text-success'>{this.state.successMessage}</div>
                            <div className='text-danger'>{this.state.errorMessage}</div>
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
export default TraineeRegister;