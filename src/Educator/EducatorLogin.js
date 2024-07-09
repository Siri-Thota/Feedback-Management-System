import {React,Component} from "react";
import axios from 'axios';
import { Link,Redirect } from 'react-router-dom';
// import '../Educator/EducatorLogin.css'
const url1 = "http://localhost:4000/educatorlogin1";
class Educatorlogin extends Component{
    constructor(){
        super();
        this.state={
            form:{
                EducatorId:"",
                EducatorPwd:""
            },
            formErrorMessage:{
                EducatorIdError:"",
                EducatorPwdError:""
            },
            formValid:{
                EducatorIdValid: false,
                EducatorPwdValid: false,
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
            if(form.EducatorId===item.EducatorId && form.EducatorPwd===item.EducatorPwd){
                this.setState({updateStatus:true,id:item.EducatorId})
                const Educator=[{EducatorId:this.state.form.EducatorId}]
                localStorage.setItem('Educator',JSON.stringify(Educator))
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
        let regex = '[E]{1}[0-9]{4}$'
        let res = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$'
        if(name==='EducatorId'){
            if(value===''){
                errMsg='Field Required'
            }
            else if(!(value.match(regex))){
                errMsg = 'Please Enter Valid Educator Id'
            }
            formErrorMessageDum.EducatorIdError=errMsg;
            formValidDum.EducatorIdValid=errMsg?false:true
        }
        else if(name==='EducatorPwd'){
            if(value===''){
                errMsg='Field Required'
            }
            else if(!(value.match(res))){
                errMsg='Please Enter Valid Password'
            }
            formErrorMessageDum.EducatorPwdError=errMsg;
            formValidDum.EducatorPwdValid=errMsg?false:true
        }
        formValidDum.buttonActive=formValidDum.EducatorIdValid && formValidDum.EducatorPwdValid;
        this.setState({formErrorMessage:formErrorMessageDum,formValid:formValidDum});
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.storedetails();
    }
    render(){
        let {EducatorIdError,EducatorPwdError}=this.state.formErrorMessage;
        let redirect=null;
        if(this.state.updateStatus===true){
            console.log("Record Found Successfully");
            redirect=<Redirect to={"/educatorhome/"+this.state.id}></Redirect>
        }
        return (
            <div className="col-md-4 col-12 mx-auto">
                <br/><br/><br/>
                    <div className="card">
                    <div className="card-header bg-custom">
                        <h3>Educator Login</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit ={this.handleSubmit}>
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
                            <button disabled={!this.state.formValid.buttonActive} type='submit' className='btn btn-success'>Submit</button>

                            <div className='text-success'>{this.state.successMessage}</div>
                            <div className='text-danger'>{this.state.errorMessage}</div>
                            <br/>             <p>If You Are A New Educator Please <Link className="link" to="/educatorRegister">Click Here </Link> to register</p>
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
export default Educatorlogin;