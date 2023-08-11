import React from "react";
import classes from './MusicFilter.module.css';
import axios from 'axios';
class MusicFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        sortBy: "name", // Значение сортировки по умолчанию
        genre:"",
      };
  }

  ResponseData=(response)=>
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

  handleSortChange = (event) => {
    this.setState({ sortBy: event.target.value });
    this.props.onSortMusics(event.target.value); // Вызываем обработчик изменения сортировки
  };


  handleFilterChange = (event) => {
    this.props.setCurrentPage(0)
    this.setState({ genre: event.target.value }, () => {
      
      axios
      .get(this.props.apiMusic + `/getsongsbygenre?genre=${this.state.genre}&_perPage=${this.props.perPage}&currentPage=${this.props.currentPage}`)
      .then((response) => {this.props.setMusics(this.ResponseData(response),"");})
      .catch((error) => {
        if (error.response && error.response.data) {
          const responseText = error.response.data;
          $("#CreateError").text(responseText);
        }
      });
    });
  };

  render() {
    let display = this.props.ifExit ?  "block":"none" ;
    return (
        <div className={classes.filterMainContainer}>
   
    
        <label htmlFor="sortSelect" className={classes.lable}>Сортувати:</label>
        <div className={classes.selectWrapper}>
        <select id="sortSelect" value={this.state.sortBy} onChange={this.handleSortChange}>
          <option value="name">Назва</option>
          <option value="executor">Виконавець</option>
          <option value="size">Розмір</option>
          <option value="gpa">Рейтинг</option>
        </select>
        </div>   

        <div style={{display}}>
        <label className={classes.lable}>Обрати жанр</label>
        <div  className={classes.selectWrapper}>
        
          <select id="Genre_Cr" value={this.state.genre} onChange={this.handleFilterChange}>

            {this.props.genres.map((item) => (
            <option value={item.value}  key={item.value}>{item.content}</option>
          ))}
          </select>
          <span id="Genre_CrError" className="text-danger"></span>
        </div>
        </div> 
    </div>
    );
  
  }
}

export default MusicFilter;


