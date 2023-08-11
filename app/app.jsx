import React from "react";
import { createRoot } from "react-dom/client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";//---
import { Provider } from "react-redux";
import reducer from "./Reducer.jsx";
import AppView from "./AppView.jsx";
import { persistStore, persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER } from 'redux-persist'//---
import storage from 'redux-persist/lib/storage' //---
import {PersistGate} from 'redux-persist/integration/react'//---------

//const rootReducer=combineReducers(reducer)//------
const rootReducer=reducer;
const persistConfig = {
  key: 'root',
  storage,
}//-------------

const persistedReducer=persistReducer(persistConfig,rootReducer)//-----------

const store = configureStore({
   reducer:persistedReducer,
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
   });          //  Конфігуруємо Redux store за допомогою переданого редюсера

 const persistor = persistStore(store)//-----------

store.dispatch({                                    //  Диспетчеризуємо дію "SET_STATE" зі стартовим станом
  type: "SET_STATE",
  state: {
    apiUser: "https://musicserv.azurewebsites.net/api/User",
    apiMusic: "https://musicserv.azurewebsites.net/api/Music",
    ifExit: false,
    ifAdmin:false,
    avatar: "",
    login: "",
    idUser: "",
    emailUser: "",
    Musics: [],
    newMusics: [],
    socketConnected:false,
    socketUserId:'',
    activeSong:null,              // Активна пісня
    isLoaded:false,               // Перевірка чи було перше завантаження
    myMusic:false,
    perPage:2,                    // Кількість пісень в одній сторінці 
    totalPage:0,                  // Загальна кількість сторінок 
    currentPage:0,                // Обрана сторінка
genres:[
  { value:" ", content:"Оберіть жанр" },
  { value:"Ukrainian", content:"Українські" },
  { value:"Clubna", content:"Клубна" },
  { value:"In the car", content:"В машину" },
  { value:"pop", content:"Поп" },
  { value:"rock", content:"Рок" },
  { value:"hip-hop", content:"Хіп-хоп" },
  { value:"electronic", content:"Електроніка" },
  { value:"jazz", content:"Джаз" },
  { value:"classical", content:"Класична музика" },
  { value:"country", content:"Кантрі" },
  { value:"metal", content:"Метал" },
]
  },
});

const rootElement = (                              // Елемент rootElement з використанням StrictMode, який надає обмеження на попередження під час розробки
  <React.StrictMode>
    <Provider store={store}>   {/* Обгортка для передачі Redux store усередині дерева компонентів */}
    <PersistGate loading={null} persistor={persistor}> {/*--------------------------*/}
      <AppView/> {/* Відображення головного компоненту AppView */}
      </PersistGate>                                     {/*--------------------------*/}
    </Provider>
  </React.StrictMode>
);

const root = createRoot(document.getElementById("container")); // Створюємо корінь додатка з використанням елементу з id "container"
root.render(rootElement);                                      // Рендеримо елемент rootElement в кореневий DOM-вузол
