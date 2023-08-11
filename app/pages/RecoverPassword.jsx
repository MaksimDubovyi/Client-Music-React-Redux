import React from "react";
import classes from './page.module.css'
import axios from 'axios';
class RecoverPassword extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
  }
  onChangeEmail(e) {
    this.setState({ Email: e.target.value });
  }
  CheckFill() {
    let Email = $("#Email_Cr").val();
    if (Email == "") {
      $("#Email_Cr").text("Поле має бути встановлене!");
      return false;
    } else $("#Email_CrError").text("");
    return true;
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.CheckFill()) {
      axios
        .post(this.props.apiUser + `/sms?to=${this.state.Email}`)
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

          <form className={classes.registrationContainer} onSubmit={this.handleSubmit}>
            <div id="CreateError" className="text-danger"></div>

              <label className={classes.txt_Registration}>Електронна пошта:</label>
              <input onChange={this.onChangeEmail}  id="Email_Cr"  className="form-control str" required  />
              <span id="Email_CrError" className="text-danger"></span>
          
              <input type="submit" value="Відправити"  className={classes.button_Registration} /> 
          </form>
   
    );
  }
}

export default RecoverPassword;
