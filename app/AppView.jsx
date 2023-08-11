import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {playNextSong,setActiveSong,updateAvatar,
        onSortMusics,sendMusic,receiveId,
        startListening, sendMessage, setUser,
        setMusics,setNewMusic,setCurrentPage,exit } from "./Actions.jsx";     // Імпортуємо різні дії з файлу Actions.jsx
import AppRouter from "./components/AppRouter.jsx";            // Імпортуємо компонент AppRouter з папки components

class AppView extends React.Component {                        // Класовий компонент AppView

  componentDidMount() {
    this.props.startListening();                               // Починаємо слухати події

    if (this.props.isLoaded !== true) {
      try {
        const fetchData = async () => {  
          // Отправка запроса и получение ответа
          const response = await axios.get(this.props.apiMusic+`?_perPage=${this.props.perPage}`);
          const music = response.data.musics.map((Music) => ({
            id: Music.id,
            name: Music.name,
            executor: Music.executor,
            size: Music.size,
            gpa: Music.gpa,
            path: Music.path,
            play: false,
          }));
          let musicsAndCount={
            musics:music,
            totalPage:response.data.totalPage
          }
          // Оновлення стану Musics
          this.props.setMusics(musicsAndCount,"start");
        };
  
        // Викликаємо функцію fetchData
        fetchData();
      } catch (error) {
        if (error.response && error.response.data) {
          const responseText = error.response.data;
          $("#CreateError").text(responseText);
        }
      }
    }
  }

  render() {  
     //console.log("____________________7____________________7____________________")
    //console.log(this.props)
    return (
      <div>
        <AppRouter {...this.props} />  {/* Відображаємо компонент AppRouter з переданими пропсами */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {                             // Функція, яка мапить стан Redux до пропсів компонента
    return {
      apiUser: state.apiUser,
      ifExit: state.ifExit,
      avatar: state.avatar,
      login: state.login,
      apiMusic:state.apiMusic,
      idUser:state.idUser,
      Musics:state.Musics,
      socketConnected:state.socketConnected,
      socketUserId:state.socketUserId,
      newMusics:state.newMusics,
      emailUser:state.emailUser,
      activeSong:state.activeSong,
      isLoaded:state.isLoaded,
      myMusic:state.myMusic,
      perPage:state.perPage,
      totalPage:state.totalPage,
      currentPage:state.currentPage,
      ifAdmin:state.ifAdmin,
      genres:state.genres,
    };
};

// З'єднуємо компонент AppView з Redux store та передаємо дії (actions) як пропси
export default connect(mapStateToProps, {setCurrentPage,playNextSong,setActiveSong,updateAvatar,onSortMusics,setNewMusic,sendMusic,startListening, receiveId, sendMessage,setUser,setMusics,exit })(AppView);