import React from "react";
import axios from 'axios';
import classes from './page.module.css'
class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeAvatar = this.onChangeAvatar.bind(this);
  }
     onChangeName(e) { this.setState({ UserName: e.target.value }); }
     onChangePassword(e) { this.setState({ UserPassword: e.target.value });}
     onChangeEmail(e) { this.setState({ UserEmail: e.target.value });}
     onChangeAge(e) { this.setState({ UserLogin: e.target.value });}
     onChangeAvatar(e) {
        const file = e.target.files[0];
        this.setState({ Avatar: file }); // Обновление состояния с выбранным файлом
      }
      
     CheckFill() {
        let Name = $("#Name_Cr").val();
        let Password = $("#Password_Cr").val();
        let PasswordConfirm = $("#PasswordConfirm_Cr").val();
        let Email = $("#Email_Cr").val();
        let Login = $("#Login_Cr_Cr").val();
        if (Name == "") {
            $("#Name_CrError").text("Поле має бути встановлене!");
            return false;
        }
        else
            $("#Name_CrError").text("");
        if (Password == "") {
            $("#Password_CrError").text("Поле має бути встановлене!");
            return false;
        }
        else
            $("#Password_CrError").text("");
        if (PasswordConfirm == "") {
            $("#PasswordConfirm_CrError").text("Поле має бути встановлене!");
            return false;
        }
        else
            $("#PasswordConfirm_CrError").text("");
        if (Email == "") {
            $("#Email_CrError").text("Поле має бути встановлене!");
            return false;
        }
        else
            $("#Email_CrError").text("");
        if (Login == "") {
            $("#Login_CrError").text("Поле має бути встановлене!");
            return false;
        }
        else
            $("#Login_CrError").text("");
        if (Password != PasswordConfirm) {
            $("#PasswordConfirm_CrError").text("Паролі не рівні!");
            return false;
        }
        else
            $("#PasswordConfirm_CrError").text("");

        if (Password.length < 6)
        {
            $("#Password_CrError").text("Довжина пароля має бути від 6 символів!");
            return false;
        }

       

        return true;
    }
    handleSubmit(e) {
        e.preventDefault();
       if( this.CheckFill())
       {
      const data = new FormData();
      data.append("uploadedFile", this.state.Avatar); // Загрузка файла в FormData
      //остальные данные пользователя в FormData
      data.append("user.Name", this.state.UserName);
      data.append("user.PasswordHash", this.state.UserPassword);
      data.append("user.Email", this.state.UserEmail);
      data.append("user.Login", this.state.UserLogin);
        
        axios.post(this.props.apiUser+ '/register', data)
            .then((response) => {
                $("#CreateError").text("Вітаємо з успішною реєстрацією!");
                $("#Name_Cr").val("");
                $("#Password_Cr").val("");
                $("#PasswordConfirm_Cr").val("");
                $("#Email_Cr").val("");
                $("#Age_Cr").val("");
            })
            .catch((error) => {
              if (error.response && error.response.data) {
                const responseText = error.response.data;
              $("#CreateError").text(responseText); }
            });
       }
    }
  render() {
    return (
      
          <form className={classes.registrationContainer} encType="multipart/form-data" onSubmit={this.handleSubmit}>
            <div id="CreateError" className="text-danger"></div>
          
              <label className={classes.txt_Registration}>Ім'я</label>
              <input  onChange={this.onChangeName} id="Name_Cr" className="form-control str" />
              <span id="Name_CrError" className="text-danger"></span>
           
              <label className={classes.txt_Registration}>Пароль</label>
              <input onChange={this.onChangePassword} id="Password_Cr" className="form-control str" type="password"/>
              <span id="Password_CrError" className="text-danger"></span>
        
              <label className={classes.txt_Registration}>Підтвердити пароль</label>
              <input id="PasswordConfirm_Cr" className="form-control str"  type="password" />
              <span id="PasswordConfirm_CrError" className="text-danger"></span>
        
         
              <label className={classes.txt_Registration}>Електронна пошта</label>
              <input onChange={this.onChangeEmail}id="Email_Cr"  className="form-control str" required />
              <span id="Email_CrError" className="text-danger"></span>
        
         
              <label className={classes.txt_Registration}>Логін</label>
              <input  onChange={this.onChangeAge} id="Login_Cr" className="form-control str" />
              <span id="Login_CrError" className="text-danger"></span>
         
      
              <label asp-for="Avatar" className={classes.txt_Registration}>Аватар</label>
              <label className="input-file">
                <input type="file" onChange={this.onChangeAvatar} name="uploadedFile" accept=".jpg, .jpeg, .png" className="str" />
                <span className="input-file-btn span">Обеpiть файл</span>
                <span className="input-file-text" type="text"></span>
              </label>
   
              <input type="submit" value="Реєстрація" className={classes.button_Registration} />
          
          </form>
      
    );
  }
}

export default Registration;
