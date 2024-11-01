import { useContext, useState } from 'react';
import './header.css';
import Modal from '../../Modal';
import axios from 'axios';
import AuthContext from '../../context/cart/AuthContext';

const Header = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [loginState, setLoginState] = useState({
    email: "",
    password: ""
  });
  const [registerState, setRegisterState] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  });

  const openLogin = () => setLoginOpen(true);
  const closeLogin = () => setLoginOpen(false);

  const openRegister = () => setRegisterOpen(true);
  const closeRegister = () => setRegisterOpen(false);

  const { setAuthState } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/login', loginState);
      console.log(response.data);
      closeLogin();
      setAuthState({ loggedIn: true, username: response?.data?.data?.name });
    } catch (error) {
      console.error(error);
      setLoginState({ email: "", password: "" });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', registerState);
      console.log(response.data);
      closeRegister();
    } catch (error) {
      console.error(error);
      setRegisterState({ name: "", email: "", mobile: "", password: "" });
    }
  }

    return (
         <header id="home" className="header">   
          <main>
            <h1>Home food for everyone</h1>
            <a class="btn" href="#" onClick={openLogin}>Login</a>
            <a class="btn btn-empty" href="#" onClick={openRegister}>Register</a>
          </main>
          <Modal isOpen={isLoginOpen} onClose={closeLogin}>
            <h3>Login</h3>
            <form onSubmit={handleLogin}>
              <input type="email" value={loginState.email} onInput={(e) => setLoginState({ ...loginState, email: e.target.value })} placeholder="Enter Email" />
              <input type="password" value={loginState.password} onInput={(e) => setLoginState({ ...loginState, password: e.target.value })} placeholder="Enter Password" />
              <div className="modal-footer">
                <button className="btn btn-empty" type="submit">Login</button>
                <a href="#">Forgot Password?</a>
              </div>
            </form>
          </Modal>

          <Modal isOpen={isRegisterOpen} onClose={closeRegister}>
            <h3>Register</h3>
            <form onSubmit={handleRegister}>
              <input type="text" value={registerState.name} onInput={(e) => setRegisterState({ ...registerState, name: e.target.value })} placeholder="Enter Name" />
              <input type="email" value={registerState.email} onInput={(e) => setRegisterState({ ...registerState, email: e.target.value })} placeholder="Enter Email" />
              <input type="text" value={registerState.mobile} onInput={(e) => setRegisterState({ ...registerState, mobile: e.target.value })} placeholder="Enter Mobile" />
              <input type="password" value={registerState.password} onInput={(e) => setRegisterState({ ...registerState, password: e.target.value })} placeholder="Enter Password" />
              <div className="modal-footer">
                <button className="btn btn-empty" type="submit">Register</button>
              </div>
            </form>
          </Modal>
        </header>    
    )
}

export default Header;