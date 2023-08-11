import React , { useState }from "react";
import axios from 'axios';
import classes from './Nav.module.css';
const Avatar = (props) => {

const [isFileInputVisible, setIsFileInputVisible] = useState(false);  // Використовуємо стейт isFileInputVisible для відстеження видимості інпуту для файлу
  const handleAvatarClick = (e) => {
      setIsFileInputVisible(true);                                    // Якщо так, встановлюємо isFileInputVisible в true, щоб показати інпут для файлу
  };
  const handleFileInputChange = (event) => {
    // відправити вибраний файл на сервер та оновити аватар користувача
    const selectedFile = event.target.files[0];
    setIsFileInputVisible(false);

    const data = new FormData();
    data.append("uploadedFile", selectedFile); // Загрузка файла в FormData
    axios.post(props.apiUser + `/updateavatar?id=${props.idUser}`,data)
    .then((response) => {
      props.updateAvatar(response.data)  // Після успішної відповіді оновлюємо аватар за допомогою властивості updateAvatar
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        console.log(error.response.data); // Виводимо повідомлення про помилку, якщо є помилка у відповіді сервера
      }
    });


  };
  return (
 
      <div>
        <img src={props.avatar} className={classes.avatar}  alt="Аватар" onClick={handleAvatarClick}></img>
        {isFileInputVisible && (                   //  Ця конструкція називається "коротким записом умовного рендеру {condition && <Element />} 
          <input                                   //  Вона означає, що <Element /> буде відрендерен тільки в тому випадку, якщо умова condition істинна (true).                                            
          type="file" accept=".jpg, .jpeg, .png"  
          style={{position: "absolute", top: 0, left: 0,opacity: 0, width: "100%", height: "100%",cursor: "pointer", zIndex:"1" }}
          onChange={handleFileInputChange}
          />
        )}
      </div>

  );
};

export default Avatar;
