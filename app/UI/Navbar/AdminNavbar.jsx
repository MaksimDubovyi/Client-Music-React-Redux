import React from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';
import classes from './Nav.module.css';
const AdminNavbar = React.forwardRef((props, ref) => {

  let display = "none";
  let ifExit=""
if(props.ifExit==true)
  ifExit="Вихід"
else
  ifExit="Вхід"

  if (props.avatar !== "") {
    display = "block";
  }
  let deleteMusics='';

 const ResponseData=(response)=>
{
  const music = response.data.musics.map((Music) => ({
    id: Music.id,
    name: Music.name,
    executor: Music.executor,
    size: Music.size,
    gpa: Music.gpa,
    path: Music.path,
    genre:Music.genre
  }));
  let musicsAndCount={
    musics:music,
    totalPage:response.data.totalPage
  }
  return musicsAndCount;
}

  const deleteAllMusics = () => {
    // Показываем модальное окно с вопросом перед удалением
  const confirmDelete = window.confirm("Ви впевнені, що бажаєте видалити всі музичні треки?");
  if (confirmDelete) {
    axios
    .get(props.apiMusic + `/clearingallmusic`)
    .then((response) => {
      props.setMusics(ResponseData(response),"delete");
      deleteMusics='Видаленно!'
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        const responseText = error.response.data;
        $("#CreateError").text(responseText);
      }
    });
  }
  };

  const MyMusic = () => {
    axios
    .get(props.apiUser + `/mymusic?id=${props.idUser}&_perPage=${props.perPage}`)
    .then((response) => {props.setMusics(ResponseData(response),"myMusic");})
    .catch((error) => {
      if (error.response && error.response.data) {
        const responseText = error.response.data;
        $("#CreateError").text(responseText);
      }
    });
  };


  const AllMusic = () => {

    axios
    .get(props.apiMusic+`?_perPage=${props.perPage}`)
    .then((response) => { props.setMusics(ResponseData(response)); })
    .catch((error) => {
      if (error.response && error.response.data) {
        const responseText = error.response.data;
        $("#CreateError").text(responseText);
      }
    });
  };

  let displays = props.ifExit?"block":"none";
  const displayAdmin=props.ifAdmin?"block":"none";
  
  return (
    <div className={classes.containerAdminNavbar} style={{display:displays}}>
      
      <div className={classes.itemAdminNavbar}>
        <Link onClick={MyMusic} to="#" className={classes.txtAdminNavbar}>
          <i className="bi bi-star" style={{ margin: "10px", color: "green" }}></i>
          Мої пісні
        </Link>
      </div>

      <div style={{display:displayAdmin}} className={classes.itemAdminNavbar}>
        <Link to="/addmusic" className={classes.txtAdminNavbar}>
          <i className="bi bi-file-earmark-music" style={{ margin: "10px", color: "green" }}></i>
          Додати пісню
        </Link>
      </div>
      <div className={classes.itemAdminNavbar}>
        <Link onClick={AllMusic} to="#" className={classes.txtAdminNavbar}>
          <i className="bi bi-music-note-list" style={{ margin: "10px", color: "green" }}></i>
          Список пісень
        </Link>
      </div>

      <div className={classes.itemAdminNavbar}>
        <Link to="/updatepassword" className={classes.txtAdminNavbar}>
          <i  className="bi bi-key-fill" style={{ margin: "10px", color: "green" }}></i>
          Зміна паролю
        </Link>
      </div>

      <div>
        <button  style={{display:displayAdmin}} className={classes.btnAdminNavbar} onClick={deleteAllMusics}>
          Видалити всі пісні
        </button>
        <p className="text-danger">{deleteMusics}</p>
      </div>
    </div>
  );
});

export default AdminNavbar;