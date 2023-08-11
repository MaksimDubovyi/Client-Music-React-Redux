

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_STATE": // Перезаписуємо поточний стан з даними з дії
      return {
        ...state,
        ...action.state,
      };
    case "RECEIVE_ID": // Отримуємо ID сокету та зберігаємо його в стані
      return {
        ...state,
        socketUserId: action.event,
      };
    case "CONNECT_SOCKET": // Позначаємо, що сокет підключений
      return {
        ...state,
        socketConnected: true,
      };
    case "Set_New_Music": // Перевіряємо, чи пісня вже існує в масиві newMusics
      const existingMusic = state.newMusics.find(
        (music) => music.id === action.event.id
      );
      if (existingMusic) {
        return state; // Якщо пісня вже існує, не додаємо її повторно
      }
      return {
        ...state,
        Musics: [...state.Musics, action.event],
        newMusics: [...state.newMusics, action.event], // Додаємо нову пісню до масиву newMusics
      };
    case "DISCONNECT_SOCKET": // Позначаємо, що сокет відключений
      return {
        ...state,
        socketConnected: false,
      };
    case "SET_USER": // Встановлюємо дані користувача та визначаємо головну сторінку в залежності від електронної пошти
      let _ifAdmin = false;
      if (action.event.email == "maksim24du@gmail.com") _ifAdmin = true;
      return {
        ...state,
        avatar: action.event.avatar,
        ifExit: true,
        login: action.event.login,
        idUser: action.event.id,
        emailUser: action.event.email,
        ifAdmin: _ifAdmin,
      };
    case "UPDATE_AVATAR": // Оновлюємо дані про аватар користувача
      return {
        ...state,
        avatar: action.event,
      };
    case "SET_MUSICS": // Встановлюємо музичний список з отриманими даними
      if (action.myMusic == "myMusic") {
        return {
          ...state,
          Musics: [...action.event.musics],
          isLoaded: true,
          myMusic: true,
          currentPage: 0,
          totalPage: action.event.totalPage,
        };
      } else if (action.myMusic == "delete") {
        return {
          ...state,
          Musics: [],
          myMusic: [],
          totalPage: 0,
        };
      } else {
        return {
          ...state,
          Musics: [...action.event.musics],
          isLoaded: true,
          myMusic: false,
          totalPage: action.event.totalPage,
        };
      }
    case "SORT_MUSICS": // Сортуємо музичний список за вказаним ключем
      console.log("SORT_MUSICS");
      console.log(action.event);

      return {
        ...state,

        Musics: [...state.Musics].sort((a, b) => {
          if (action.event == "gpa") {
            return a[action.event] - b[action.event];
          } else {
            return a[action.event].localeCompare(b[action.event]);
          }
        }),
      };
    case "SET_ACTIVE_SONG": // Встановлюємо активну пісню
      const { payload } = action;
      //буде true, якщо пісня співпадає з тією, яку  передали через action.payload, або false в іншому випадку.
      const updatedSongs = state.Musics.map((song) => ({
        ...song,
        play: song === payload ? true : false,
      }));

      return {
        ...state,
        Musics: updatedSongs,
        activeSong: payload,
      };
    case "PLAY_NEXT_SONG": // Знаходимо індекс поточної пісні та встановлюємо наступну пісню для програванн
      const currentIndex = state.Musics.findIndex(
        (item) => item.id === state.activeSong.id
      );
      const nextIndex = (currentIndex + 1) % state.Musics.length; // оператор % (залишок від ділення),
      //щоб переконатися, що індекс завжди залишається в межах діапазону від 0 до state.Musics.length - 1.
      //Це дозволяє зациклювати список пісень, тобто якщо відтворюється остання пісня, наступною буде перша, і так далі.
      const nextSong = state.Musics[nextIndex];
      const updatedSong = state.Musics.map((song) => ({
        ...song,
        play: song === nextSong ? true : false,
      }));
      return {
        ...state,
        Musics: updatedSong,
        activeSong: nextSong,
      };
    case "SET_CURRENT_PAGE": // Оновлюємо дані обраної сторінки (пагінація)
      return {
        ...state,
        currentPage: action.event,
      };
    case "EXIT": // Повертаємо початковий стан з очищеними даними користувача та сокета
      return {
        // apiUser: "https://localhost:7166/api/User",
        // apiMusic: "https://localhost:7166/api/Music",
        apiUser: "https://musicserv.azurewebsites.net/api/User",
        apiMusic: "https://musicserv.azurewebsites.net/api/Music",
        ifExit: false,
        avatar: "",
        login: "",
        idUser: "",
        emailUser: "",
        Musics: state.Musics,
        newMusics: [],
        socketConnected: false,
        socketUserId: "",
        activeSong: null,
        isLoaded: false,
        myMusic: false,
        perPage: 2,
        totalPage: 0,
        currentPage: 0,
        genres:state.genres,
      };

    default:
      return state;
  }
};

export default reducer;
