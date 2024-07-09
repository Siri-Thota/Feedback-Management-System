import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Home from "./Home";
import Service from "./Service";
import About from "./About";
import Contact from "./Contact";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Switch, Route, Redirect } from "react-router-dom";
import Educatormodule from "./Educator/Service";
import Traineemodule from './Trainee/Service';
import Educatorlogin from "./Educator/EducatorLogin";
import EducatorRegister from "./Educator/EducatorRegister";
import Traineelogin from './Trainee/TraineeLogin';
import TraineeRegister from './Trainee/TraineeRegister';
import educatorHome1 from './Educator/EducatorHome';
import traineeHome1 from './Trainee/TraineeHome';
import feedbackform from './Trainee/Feedbackform';
import Feeds from "./Educator/feeds";
class App extends Component {
  render(){
  return (
    <>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/service" component={Service} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/educatormodule" component={Educatormodule} />
        <Route exact path="/traineemodule" component={Traineemodule} />
        <Route exact path="/educatorLogin" component={Educatorlogin} />
        <Route exact path="/educatorRegister" component={EducatorRegister} />
        <Route exact path="/traineeLogin" component={Traineelogin} />
        <Route exact path="/traineeRegister" component={TraineeRegister} />
        <Route path="/educatorhome/:id" component={educatorHome1}></Route>
        <Route path="/traineehome/:id" component={traineeHome1}></Route>
        <Route path="/feedbackform" component={feedbackform}></Route>
        <Route path='/feeds' component={Feeds}></Route>
        <Redirect to="/" />
      </Switch>
      <Footer />
    </>
  );
};
}
export default App;
