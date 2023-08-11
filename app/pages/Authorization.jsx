import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import classes from './page.module.css'

const Authorization = ({ apiUser, setUser}) => 
{
  const [UserName, setUserName] = useState("");
  const [UserPassword, setUserPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  let page="";
  const CheckFill = () => {
    if (UserName === "") {
      setNameError("Поле має бути встановлене!");
      return false;
    } else {
      setNameError("");
    }
    if (UserPassword === "") {
      setPasswordError("Поле має бути встановлене!");
      return false;
    } else {
      setPasswordError("");
    }

    return true;
  };
 
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (CheckFill()) {
      axios
        .post(apiUser + `/login?login=${UserName}&password=${UserPassword}`)
        .then((response) => {
          $("#CreateError").text("Вітаємо з успішною авторизацією!");
          setUserName("");
          setUserPassword("");
          setUser(response.data);
          // Перенаправленнф на "/musicpage"
          if (response.data.email == "maksim24du@gmail.com") {
            page = "/musicpage";
          } else {
            page = "/musicpage";
          }
          navigate(page);
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            const responseText = error.response.data;
            $("#CreateError").text(responseText);
          }
        });
    }
  };

  
    return (

          <form className={classes.registrationContainer} onSubmit={handleSubmit}>
            <div id="CreateError" className="text-danger"></div>
      
              <label className={classes.txt_Registration}>Логін</label>
              <input onChange={(e) => setUserName(e.target.value)} id="Name_Cr" className="form-control str" />
              <span className="text-danger">{nameError}</span>
          
              <label className={classes.txt_Registration}>Пароль</label>
              <input onChange={(e) => setUserPassword(e.target.value)} id="Password_Cr" className="form-control str" type="password" />
              <span className="text-danger">{passwordError}</span>
     
              <input type="submit" value="Авторизація" className={classes.button_Registration} />
          

            <div className={classes.button_Authorization}><Link to="/registration" className='txtMenu' style={{ color: '#0e96e0'}}><i className="bi bi-person-fill-add" style={{ margin: "10px" }}></i>Реєстрація</Link></div>
            <div className={classes.button_Authorization}><Link to="/recoverpassword" className='txtMenu' style={{ color: 'pink'}}><i className="bi bi-envelope-at-fill" style={{ margin: "10px" }}></i>забули пароль</Link></div>

            <div className={classes.button_Authorization}><Link to="/userpage" className='txtMenu' style={{ color: 'red'}}><i className="bi bi-box-arrow-left" style={{ margin: "10px" }}></i>головна</Link></div>

          </form>

         
  
    );

};

export default Authorization;
