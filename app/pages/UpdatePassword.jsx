import React from "react";
import axios from 'axios';
import classes from './page.module.css'
class UpdatePassword extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }
  onChangePassword(e) { this.setState({ Password: e.target.value }); }
  CheckFill() {
    let Password = $("#Password_Cr").val();
    let PasswordConfirm = $("#PasswordConfirm_Cr").val();
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
     axios
       .post(this.props.apiUser +`/updatepassword?Password=${this.state.Password}&idUser=${this.props.idUser}`)
       .then((response) => {
         $("#CreateError").text("Надіслано успішно!");
         $("#Email_Cr").val("");
       })
       .catch((error) => {
         if (error.response && error.response.data) {
           const responseText = error.response.data;
           $("#CreateError").text(responseText);
         }
       });
   }
}

  render() {
    
    return (
          <form className={classes.updatePasswordContainet} onSubmit={this.handleSubmit}>
            <div id="CreateError" className="text-danger"></div>
              <label className={classes.txt_updatePassword}>Пароль:</label>
              <input onChange={this.onChangePassword}  id="Password_Cr" className="form-control str" type="password" />
              <span id="Password_CrError" className="text-danger"></span>
              <label className={classes.txt_updatePassword}>Підтвердити пароль:</label>
              <input id="PasswordConfirm_Cr"className="form-control str" type="password" />
              <span id="PasswordConfirm_CrError" className="text-danger"></span>
              <input  type="submit" value="Змінити" className={classes.button_updatePassword} />
          </form>
    );
    
  }
}

export default UpdatePassword;
