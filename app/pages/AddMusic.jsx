import React , { useState }from "react";
import axios from 'axios';
import classes from './page.module.css'
class AddMusic extends React.Component {
  constructor(props) {
    super(props);
    this.CheckFill = this.CheckFill.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);

    this.state = {
      selectedFile: null,
    };
  }

  onChangeFile(event) {
    this.setState({
      selectedFile: event.target.files[0],
    });
  }

  CheckFill() {
    let Name = $("#Music_Name").val();
    let Executor = $("#Music_Executor").val();
    let UploadedFile = $("#UploadedFile_").prop("files");
    let Genre = $("#Genre_Cr").val();

    
    if (Name === "") {
      $("#Music_NameError").text("Поле має бути встановлене!");
      return false;
    } else {
      $("#Music_NameError").text("");
    }
    if (Executor === "") {
      $("#Music_ExecutorError").text("Поле має бути встановлене!");
      return false;
    } else {
      $("#Music_ExecutorError").text("");
    }

    if (!UploadedFile || UploadedFile.length === 0) {
      $("#Music_fileError").text("Файл не вибраний!");
      return false;
    } else {
      $("#Music_fileError").text("");
    }
    if (Genre == "") {
      $("#Genre_CrError").text("Поле має бути встановлене!");
      return false;
    } else {
      $("#Genre_CrError").text("");
    }
    return true;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.CheckFill()) {
      const formData = new FormData(); // Збіраємо дані в форму для відправки
      formData.append("id_User", this.props.idUser); //
      formData.append("titel", $("#Music_Name").val()); //
      formData.append("executor", $("#Music_Executor").val()); 
      formData.append("genre",  $("#Genre_Cr").val()); //
      formData.append("uploadedFile", this.state.selectedFile); //
      formData.append("perPage", this.props.perPage); //
      formData.append("currentPage", this.props.currentPage); //

      axios
        .post(this.props.apiMusic, formData)
        .then((response) => {
          // Якщо пісня додана успішно
          const music = {
            login: this.props.login, //збираемо дані і викликаемо
            id: response.data,
          };
          this.props.sendMusic(music); //через sendMusic метод на сервері AddMusic
          $("#Music_Name").val("");
          $("#Music_Executor").val("");
          $("#UploadedFile_").val(null);
          $("#UploadedFile_text").text("");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    return (
    
          <form className={classes.registrationContainer} encType="multipart/form-data" onSubmit={this.handleSubmit}>
            <div  id="CreateMusicError"className="text-danger" ></div>
           
              <label className={classes.txt_Registration}>Назва</label>
              <input id="Music_Name" className="form-control str" name="titel" />
              <span id="Music_NameError" className="text-danger"></span>


              <label asp-for="Avatar" className={classes.txt_Registration}>  Пісня</label>

              <label className="input-file">
                <input type="file"onChange={this.onChangeFile} name="uploadedFile" id="UploadedFile_" accept=".mp3, .wav"  />
                <span className="input-file-btn span" style={{ width: "30%" }}> Оберіть файл</span>
                <span id="UploadedFile_text" className="input-file-text"  type="text"  ></span>
                <span id="Music_fileError" className="text-danger"></span>
              </label>

              <label className={classes.txt_Registration}>Виконавець</label>
              <input id="Music_Executor"  className="form-control str"  name="executor"/>
              <span id="Music_ExecutorError" className="text-danger"></span>
          
          <div className={classes.item1}>
          <label className={classes.txt_Registration}>Жанри</label>
          <select  style={{fontSize:'22px',background:'none', fontWeight:"bolder", color:"white"}}
            id="Genre_Cr"
            className="form-control str"
          >
            {this.props.genres.map((item) => (
            <option value={item.value} className={classes.genreOption} key={item.value}>{item.content}</option>
          ))}
          </select>
          <span id="Genre_CrError" className="text-danger"></span>
        </div>

            <input type="hidden" id="id_User_"  name="id_User" value={this.props.id_User} />

            <input type="submit" value="Додати" className={classes.button_Registration} />
           
          </form>
  
    );
  }
}

export default AddMusic;
