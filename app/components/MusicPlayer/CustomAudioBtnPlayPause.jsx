import React from "react";
import classes from './MusicPlayer.module.css'
// Створюємо функціональний компонент CustomAudioBtnPlayPause.
// Він приймає пропси: isPlaying - стан програвання (true - відтворюється, false - на паузі),
// onPlayPauseClick - функцію, яка викликається при натисканні кнопки play/pause.
const CustomAudioBtnPlayPause = (props) => {
  // Розпаковуємо пропси
  const { isPlaying, onPlayPauseClick } = props;
  let display = "none";


  if (props.activeSong !== null) {
    display = "block";
  }
  // Повертаємо JSX для відображення компонента
  return (
    <div className={classes.customAudioBtnPlayPauseContainer}>
    
        {/* Кнопка play/pause. При натисканні на неї викликається функція onPlayPauseClick */}
        <button onClick={onPlayPauseClick} className={props.btnPP} style={{ display }} >
          {isPlaying ? ( // Умовний оператор: якщо isPlaying=true, відображаємо іконку pause, інакше - іконку play
            <img className={props.btnPlayPause} src="/jpg/Pause.png" alt="Pause" />
          ) : (
            <img className={props.btnPlayPause} src="/jpg/play.png" alt="Play" />
          )}
        </button>
   
      
        <audio preload="metadata" ref={props.audioRef} controls className={props.className} />{" "}
        {/* preload="metadata"
        Це означає, що браузер завантажить лише метадані аудіофайлу, а не весь файл.
         Це може призвести до більш швидкого завантаження сторінки, але користувачеві доведеться натиснути
          "Play" для відтворення аудіо, що може бути дещо затримкою.
        */}
    
    </div>
  );
};

// Експортуємо компонент CustomAudioBtnPlayPause для використання в інших частинах додатка
export default CustomAudioBtnPlayPause;

//Цей компонент створює кнопку play/pause з можливістю змінювати її вигляд (іконку) 
//в залежності від стану програвання. Компонент також включає елемент audio, який забезпечує 
//можливість відтворювати та керувати аудіофайлами. При кліку на кнопку play/pause викликається 
//функція onPlayPauseClick, яка передається зовнішнім компонентом і змінює стан програвання 
//на відповідний (true - відтворення, false - на паузі).