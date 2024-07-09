import {Component} from "react";
import axios from 'axios';
import { Redirect } from "react-router-dom";
const url = "http://localhost:4000/educatorRegister1/";
class EducatorRegister extends Component{
    constructor(){
        super();
        this.state={
            DDL1:[],
            DDL2:[],
            selectddl:'',
            form:{
                EducatorBatch:"",
                EducatorId:"",
                EducatorPwd:"",
                EducatorTrack:"",
                EducatorStream:""
            },
            formErrorMessage:{
                EducatorBatchError:"",
                EducatorIdError:"",
                EducatorPwdError:"",
                EducatorTrackError:"",
                EducatorStreamError:""
            },
            formValid:{
                EducatorBatchValid: false,
                EducatorIdValid: false,
                EducatorPwdValid: false,
                EducatorTrackValid: false,
                EducatorStreamValid: false,
                buttonActive : false
            },
            updateStatus:false,
            successMessage:'',
            errorMessage:'', 
        };
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
    // componentDidMount(){
    //     this.setState({
    //         EducatorTrack:[
    //             {name:'UI',EducatorStream:[{name:'UI Mean'}]},
    //             {name:'UI',EducatorStream:[{name:'UI Mern'}]},
    //             {name:'Java',EducatorStream:[{name:'Java Angular'}]},
    //             {name:'Java',EducatorStream:[{name:'Java React'}]},
    //         ]
    //     });
    // }
    // changeEducatorTrack(event){
    //     this.setState({selectedTrack:event.target.value})
    //     this.setState({EducatorStream:this.state.form.EducatorTrack.find(track=>track.name===event.target.value).EducatorStream});
    // }
    // changeEducatorStream(event){
    //     this.setState({selectedStream:event.target.value});
    //     const stats = this.state.form.EducatorTrack.find(cntry=>cntry.name===this.state.form.EducatorTrack).EducatorStream;
    // }
    submitEducatorRegister = ()=>{
        const {selectddl,form,formErrorMessage}=this.state;
        axios.post(url,{
            EducatorBatch:form.EducatorBatch,
            EducatorId:form.EducatorId,
            EducatorPwd:form.EducatorPwd,
            EducatorTrack:selectddl,
            EducatorStream:form.EducatorStream
        }).then(res=>{
            this.setState({updateStatus:true,successMessage:"Registered Successfully"})
            console.log(res.data.form);
        }).catch(error=>{
            console.log("Error in Submitting Data");
        });
    };
    handleSubmit=(e)=>{
        e.preventDefault();
        this.submitEducatorRegister();
    }
    handleChange=(event)=>{
        let {name,value}=event.target;
        let formDum=this.state.form;
        formDum[name]=value;
        this.setState({form :formDum});
        this.validateData(name,value)
    }
    validateData=(name,value)=>{
        let errMsg='';
        let formErrorMessageDum = this.state.formErrorMessage;
        let formValidDum=this.state.formValid;
        let reg = '^[A-Z]{1}[0-9]{2}$'
        let regex = '^[E]{1}[0-9]{4}$'
        let res = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$'
        if(name==='EducatorBatch'){
            if(value===''){
                errMsg='Field Required'
            }
            else if(!(value.match(reg))){
                errMsg='Please Enter Valid Batch Number'
            }
            formErrorMessageDum.EducatorBatchError=errMsg;
            formValidDum.EducatorBatchValid = errMsg?false:true;
        }
        else if(name==='EducatorId'){
            if(value==='')
            {
                errMsg='Field Required'
            }
            else if(!(value.match(regex))){
                errMsg='Please Enter Valid Educator Id'
            }
            formErrorMessageDum.EducatorIdError=errMsg;
            formValidDum.EducatorIdValid=errMsg?false:true;
        }
        else if(name==='EducatorPwd'){
            if(value===''){
                errMsg='Field Required'
            }
            else if(!(value.match(res))){
                errMsg='Please Enter Valid Password'
            }
            formErrorMessageDum.EducatorPwdError=errMsg;
            formValidDum.EducatorPwdValid=errMsg?false:true;
        }
        // else if(name==='EducatorTrack'){
        //     if(value==='---select the track---'){
        //         errMsg='Select The Track';
        //     }
        //     formErrorMessageDum.EducatorTrackError=errMsg;
        //     formValidDum.EducatorTrackValid=errMsg?false:true
        // }
        // else if(name==='EducatorStream'){
        //     if(value === '---select the stream---'){
        //         errMsg='Select the stream'
        //     }
        //     formErrorMessageDum.EducatorStreamError=errMsg;
        //     formValidDum.EducatorStreamValid=errMsg?false:true;
        // }
        formValidDum.buttonActive = formValidDum.EducatorBatchValid && formValidDum.EducatorIdValid && formValidDum.EducatorPwdValid; 
        // &&  formValidDum.EducatorTrackValid && formValidDum.EducatorStreamValid;
        this.setState({formErrorMessage:formErrorMessageDum, formValid:formValidDum});
    }
    
    
    render(){
        let {EducatorBatchError,EducatorIdError,EducatorPwdError,EducatorTrackError,EducatorStreamError} = this.state.formErrorMessage;
        var redirect=null;
        if(this.state.updateStatus===true){
            window.alert(this.state.successMessage)
            redirect=<Redirect to={"/educatorlogin"}></Redirect>
        }
        return (
            <div className='container'>
                <div className = 'row'>
                    <div className='col-sm'>
                        <br/>
                        <div className="card">
                    <div className="card-header bg-custom">
                        <h3>Educator Registration</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className='form-group'>
                                <label htmlFor='EducatorBatch'>Educator Batch No</label>
                                <input type='text' className='form-control' id='EducatorBatch' name='EducatorBatch'
                                placeholder='Enter Batch No' onChange={this.handleChange}/>
                                <span className='text-danger'>{EducatorBatchError}</span>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label htmlFor='EducatorId'>Educator ID</label>
                                <input type='text' className='form-control' id='EducatorId' name='EducatorId' placeholder='Enter Educator Id'
                                onChange={this.handleChange}/>
                                <span className='text-danger'>{EducatorIdError}</span>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label htmlFor='EducatorPwd'>Educator Password</label>
                                <input type='password' className='form-control' id='EducatorPwd' name='EducatorPwd' placeholder='Enter Password'
                                onChange={this.handleChange}/>
                                <span className='text-danger'>{EducatorPwdError}</span>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label htmlFor='EducatorTrack'>Educator Track</label>
                                <select className='form-control' id='EducatorTrack' name='EducatorTrack' value={this.state.selectdd1}
                                // onChangeCapture={this.selectChange.bind(this)} 
                                // value ={this.state.EducatorTrack} 
                                // onChange={this.changeEducatorTrack}
                                onChange={this.selectChange.bind(this)}
                                >
                                    <option value='---select the track---'>---Select The Track---</option>
                                    {this.state.DDL1.map(x=>{
                            return <option>{x.name}</option>
                        })}
                                    {/* <option value='UI'>UI</option>
                                    <option value='Java'>Java</option> */}
                                </select>
                                <span className='text-danger'>{EducatorTrackError}</span>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label htmlFor='EducatorStream'>Educator Stream</label>
                                <select className='form-control' id='EducatorStream' name='EducatorStream'
                                onChange={this.handleChange}
                                >
                                    <option value='---select the stream---'>---Select The Stream---</option>
                        {this.state.DDL2.map(x=>{
                            return <option>{x}</option>
                        })}
                                    {/* <option value='UI Mean'>UI Mean</option>
                                    <option value='UI Mern'>UI Mern</option>
                                    <option value='Java React'>Java React</option>
                                    <option value='Java Angular'>Java Angular</option> */}
                                </select>
                                <span className='text-danger'>{EducatorStreamError}</span>
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
export default EducatorRegister;