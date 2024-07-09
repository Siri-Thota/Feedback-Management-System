import {React,Component} from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";
// import '../Trainee/Trainee.css'
const url1 = "http://localhost:4000/traineelogin1";

class Traineelogin extends Component{
    constructor(){
        super();
        this.state={
            form:{
                TraineeId:"",
                TraineePwd:""
            },
            formErrorMessage:{
                TraineeIdError:"",
                TraineePwdError:""
            },
            formValid:{
                TraineeIdValid: false,
                TraineePwdValid: false,
                buttonActive: false
            },
            data:[],
            checkId:"",
            checkPwd:"",
            id:"",
            updateStatus:false,
            successMessage: '',
            errorMessage : ''
        }
    }
    storedetails=()=>{
        const {form}=this.state;
        this.state.data.map(item=>{
            if(form.TraineeId===item.TraineeId && form.TraineePwd===item.TraineePwd){
                this.setState({updateStatus:true,id:item.TraineeId})
            }
            else{
                this.setState({errorMessage:"Invalid Credentials"})
            }
        })
    }
    fetchdetails=()=>{
        this.setState({data:[]});
        axios.get(url1).then(response=>{
            this.setState({data:response.data,errorMessage:""});
        }).catch(error=>{
            this.setState({errorMessage:"Could not fetch Trainee Details"})
        });
    }
    componentDidMount(){
        this.fetchdetails();
    }
    handleChange=(event)=>{
        let {name,value}=event.target;
        let formDum=this.state.form;
        formDum[name]=value;
        this.setState({form:formDum});
        this.validateData(name,value);
    }
    validateData=(name,value)=>{
        let errMsg='';
        let formErrorMessageDum = this.state.formErrorMessage;
        let formValidDum = this.state.formValid;

        let regex = '[T]{1}[0-9]{4}$'
        let res = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$'
        if(name==='TraineeId'){
            if(value===''){
                errMsg='Field Required'
            }
            else if(!(value.match(regex))){
                errMsg = 'Please Enter Valid Trainee Id'
            }
            formErrorMessageDum.TraineeIdError=errMsg;
            formValidDum.TraineeIdValid=errMsg?false:true
        }
        else if(name==='TraineePwd'){
            if(value===''){
                errMsg='Field Required'
            }
            else if(!(value.match(res))){
                errMsg='Please Enter Valid Password'
            }
            formErrorMessageDum.TraineePwdError=errMsg;
            formValidDum.TraineePwdValid=errMsg?false:true
        }
        formValidDum.buttonActive=formValidDum.TraineeIdValid && formValidDum.TraineePwdValid;
        this.setState({formErrorMessage:formErrorMessageDum,formValid:formValidDum});
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.storedetails();
    }
    render(){
        let {TraineeIdError,TraineePwdError}=this.state.formErrorMessage;
        let redirect=null;
        if(this.state.updateStatus===true){
            console.log("Record Found Successfully");
            redirect=<Redirect to={"/traineehome/"+this.state.id}></Redirect>
        }
        return (
            <div className="col-md-4 col-12 mx-auto">
               <br/><br/>
                        <br/>
                    <div className="card">
                    <div className="card-header bg-custom">
                        <h3>Trainee Login</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit ={this.handleSubmit}>
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
                            <button disabled={!this.state.formValid.buttonActive} type='submit' className='btn btn-success'>Submit</button>

                            <div className='text-success'>{this.state.successMessage}</div>
                            <div className='text-danger'>{this.state.errorMessage}</div>
                            <br/>
                            <p>If You Are A New Trainee Please <Link className="link" to="/traineeregister">Click Here </Link> to register</p>
                        </form>
                        
                    </div>
                </div>
                {redirect}
                <br/>
               <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
        )
    }
}
export default Traineelogin;