import axios from 'axios';
import { HubConnectionBuilder } from "@microsoft/signalr";


export const createSocketConnection = () => {            // Функція для створення з'єднання з сокетом
  const socket = new HubConnectionBuilder()
    .withUrl("https://musicserv.azurewebsites.net/MusicHub")
    .build();
  return socket;
};
export const socket = createSocketConnection();          // Створюємо з'єднання
export default socket;
export const CONNECT_SOCKET = 'CONNECT_SOCKET';
export const DISCONNECT_SOCKET = 'DISCONNECT_SOCKET';
export const RECEIVE_ID = 'RECEIVE_ID';
export const connectSocket = () => ({                    // Функція для з'єднання з сокетом
  type: CONNECT_SOCKET,
});
export const disconnectSocket = () => ({                 // Функція для відключення від сокета
  type: DISCONNECT_SOCKET,
});
export const receiveId = (id,socket) => ({               // Функція для отримання ID сокета
  type: RECEIVE_ID,
  event: id,
});
export const setNewMusic = (event) => ({                 // Функція для додавання нової музики
  type: 'Set_New_Music',
  event: event,
});
export const NewMusic = (login, id) =>(dispatch)=> {     // Функція для завантаження нової музики з сервера
  axios
    .get(`https://musicserv.azurewebsites.net/api/Music/id?id=${id}`)    //Пошук пісні по  ID  
    .then(response => {                                            
     const event = {
         login: login,
         executor: response.data.executor,
         gpa: response.data.gpa,
         id: response.data.id,
         id_User: response.data.id_User,
         name: response.data.name,
         path: response.data.path,
         size: response.data.size,
     };
     dispatch(setNewMusic(event));
    })
    .catch(error => {
      console.error(error);
    });
};
export const sendMusic = (music) => (dispatch) => {      // Функція для надсилання музики через сокет
  if (socket._connectionState === 'Connected')         // Перевіряємо стан з'єднання 
  { 
     socket.invoke('AddMusic', music.login,music.id);  // Якщо все добре викликаемо AddMusic на сервері
  }
};
export const startListening = () => (dispatch) => {      // Функція для старту прослуховування подій сокета
  dispatch(connectSocket()); // Диспатчим екшн для встановлення прапора socketConnected у стані Redux

  if (socket.state === 'Disconnected') { // Перевіряємо стан сокету
    socket.start() // Запускаємо з'єднання із сервером
      .then(() => {
        socket.invoke('Connect') // Надсилаємо запит на сервер для виконання дії 'Connected'
          .then((id) => {
          })
          .catch((error) => {
            console.error(error); // Обробляємо помилку під час виклику методу 'Connected'
          });
      })
      .catch((error) => {
        console.error(error); // Обробляємо помилку під час запуску з'єднання з сервером
      });
  }

  socket.on('ConnectedR', (data) => {
    dispatch(receiveId(data)); // Диспатчим экшн для обновления состояния Redux с полученными данными при событии 'Connect'
  });

  socket.on('AddMusicClient', (login, id) => {
    dispatch(NewMusic(login, id));                     //Пошук пісні по  ID  
  });

  socket.on('disconnect', () => {
    dispatch(disconnectSocket()); // Диспатчим экшн для установки флага socketConnected в состоянии Redux при отключении сокета
    console.log('Соединение закрыто');
  });
};
export const sendMessage = (message) => (dispatch) => { // Функція для встановлення повідомлення
  if (socket.state === 'Connected') { // Перевіряємо стан з'єднання
    socket.emit('message', message);
  }
};
export const setUser = (event) => ({                    // Функція для встановлення користувача
  type: "SET_USER",
  event
});
export const updateAvatar = (event) => ({               // Функція для оновлення аватарки
  type: "UPDATE_AVATAR",
  event
});
export const setMusics = (event,myMusic) => ({                  // Функція для встановлення музики
  type: "SET_MUSICS",
  event,
  myMusic
});
export const exit = () => ({                            // Функція для виходу
  type: "EXIT",
});
export const login = () => ({                           // Функція для входу
  type: "LOGIN",
});
export const onSortMusics = (event) => ({               // Функція для сортування музики 
  type: "SORT_MUSICS",
  event
});
export const setActiveSong = (song) => ({               // Функція для встановлення активної пісні           
  type: "SET_ACTIVE_SONG",
  payload: song,
});
export const playNextSong = () => ({                    // Функція для відтворення наступної пісні      
  type: "PLAY_NEXT_SONG",
});


export const setCurrentPage = (event) => ({                    // Функція для встановлення   обраної сторінки    
  type: "SET_CURRENT_PAGE",
  event
});