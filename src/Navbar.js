import {Navbar,Nav,NavDropdown} from 'react-bootstrap';
import {Link,useHistory} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import Educatorlogin from './Educator/EducatorLogin';
function Header(){
  const history=useHistory();
  const user=JSON.stringify(localStorage.getItem('Educator'))
  const user1=JSON.stringify(localStorage.getItem('Trainee'))
function logout1(){
  localStorage.clear()
  history.push('/educatorLogin');
}
function logout2(){
  localStorage.clear()
  history.push('/traineeLogin');
}
  return(
    <div className="container-fluid nav_bg">
      <div className="row">
      <div className="col-10 mx-auto">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid"><NavLink className="navbar-brand" to="/">
                  InfyFeedBack
                </NavLink>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                ></div>
        <Nav>
          {
            localStorage.getItem('Educator')?
            <>
             <Nav>
              <Nav.Item onClick={logout1}>Logout</Nav.Item>
           </Nav>
             {/* <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                    <li className="nav-item">
            <NavLink   activeClassName="menu_active"
                        exact
                        className="nav-link active"
                        aria-current="page"
                        to={logout1}>Logout</NavLink>
            </li>
            </ul> */}
            </>
            :
            localStorage.getItem('Trainee')?
            <>
           <Nav>
              <Nav.Item onClick={logout2}>Logout</Nav.Item>
           </Nav>
            </>
            :
            <>
             <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                    <li className="nav-item">
            <NavLink   activeClassName="menu_active"
                        exact
                        className="nav-link active"
                        aria-current="page"
                        to="/">Home</NavLink>
              </li>
              <li className="nav-item">
            <NavLink   activeClassName="menu_active"
                        exact
                        className="nav-link active"
                        aria-current="page"
                        to='/service'>Services</NavLink>
           </li>
              <li className="nav-item">
            <NavLink   activeClassName="menu_active"
                        exact
                        className="nav-link active"
                        aria-current="page"
                        to='/about'>About</NavLink>
</li>
           <li className="nav-item">
            <NavLink   activeClassName="menu_active"
                        exact
                        className="nav-link active"
                        aria-current="page"
                        to='contact'>Contact Us</NavLink>
          </li>
          </ul>
          </>
          }
        </Nav>
        {/* {
        localStorage.getItem('Educator')?
        <Nav>
          <NavDropdown>
            <NavDropdown.Item onClick={logout1}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>:null
        } */}
        {/* {
          localStorage.getItem('Trainee')?
          <Nav>
            <NavDropdown>
              <NavDropdown.Item onClick={logout2}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>:null
        } */}
        </div>
      </nav>
      </div>
      </div>
    </div>
  )
}
export default Header;