import React from "react"; 
import classes from './Pagination.module.css';
import axios from "axios";

class Pagination extends React.Component {
  constructor(props) {
    super(props);
  }
  getPage = (event) => {
    const clickedDiv = event.target;                    // Отримуємо елемент div, на якому було здійснено клік
    const textInsideDiv = clickedDiv.textContent;       // Витягуємо текст зсередини div
    let ifmyMusic = this.props.myMusic ? "myMusic":"";  // Перевіряю на якій сторінці відбувається  перехід 
    this.props.setCurrentPage(textInsideDiv)
   let queryString= this.props.myMusic ?
    this.props.apiUser + `/mymusic?id=${this.props.idUser}&_perPage=${this.props.perPage}&currentPage=${textInsideDiv}`
   :this.props.apiMusic+`?_perPage=${this.props.perPage}&currentPage=${textInsideDiv}`
  
   
    axios
    .get(queryString)
    .then((response) => {
      const music = response.data.musics.map((Music) => ({
        id: Music.id,
        name: Music.name,
        executor: Music.executor,
        size: Music.size,
        gpa: Music.gpa,
        path: Music.path,
      }));
      let musicsAndCount={
        musics:music,
        totalPage:response.data.totalPage
      }
      this.props.setMusics(musicsAndCount,ifmyMusic);
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        console.log( error.response.data);
      }
    });
  };


  render() {
    return (
      <div className={classes.blockPagination}>
        {Array.from({ length: this.props.totalPage }, (_, index) => (
          <div onClick={this.getPage} key={index}  className={classes.itemPagination}><span>{index + 1}</span></div>
        ))}
      </div>
    );
  }
}

export default Pagination;
