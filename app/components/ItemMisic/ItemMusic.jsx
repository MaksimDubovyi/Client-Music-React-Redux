import React from "react"; 
import classes from './ItemMusic.module.css';
import axios from 'axios';
class ItemMusic extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePlaySong = () => {this.props.setActiveSong(this.props.item)};


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

   AddMyMusic = () => {
    axios
    .get(this.props.apiUser + `/addmymusic?idUser=${this.props.userId}&idMusic=${this.props.item.id}`)
    .then((response) => {this.props.setMusics(this.ResponseData(response)); })
    .catch((error) => {
      if (error.response && error.response.data) {
        const responseText = error.response.data;
        $("#CreateError").text(responseText);
      }
    });
  };

  DeleteMyMusic = () => {
    axios
    .get(this.props.apiUser + `/deletemymusic?idUser=${this.props.userId}&idMusic=${this.props.item.id}&_perPage=${this.props.perPage}&currentPage=${this.props.currentPage}`)
    .then((response) => {this.props.setMusics(this.ResponseData(response),"myMusic"); })
    .catch((error) => {
      if (error.response && error.response.data) {
        const responseText = error.response.data;
        $("#CreateError").text(responseText);
      }
    });
  };
  AddRatingMusic = () => {
    axios
    .get(this.props.apiMusic + `/addratingmusic?idUser=${this.props.userId}&idMusic=${this.props.item.id}&_perPage=${this.props.perPage}&currentPage=${this.props.currentPage}`)
    .then((response) => {this.props.setMusics(this.ResponseData(response),"");})
    .catch((error) => {
      if (error.response && error.response.data) {
        const responseText = error.response.data;
        $("#CreateError").text(responseText);
      }
    });
  };
  
  DeleteRatingMusic = () => {
    axios
    .get(this.props.apiMusic + `/deleteratingmusic?idUser=${this.props.userId}&idMusic=${this.props.item.id}&_perPage=${this.props.perPage}&currentPage=${this.props.currentPage}`)
    .then((response) => { this.props.setMusics(this.ResponseData(response),"");})
    .catch((error) => {
      if (error.response && error.response.data) {
        const responseText = error.response.data;
        $("#CreateError").text(responseText);
      }
    });
  };
  render() {
    let display = "none";
    let color = "lightgreen";
    let ifAuthorization=false;
  
    if (this.props.item.play == true) {
      display = "block";
    }
if(this.props.userId!="")
{
  ifAuthorization=true;
}

    return (
      <div className={classes.itemMusicContainer}>

        <div className={classes.itemMusicBody0} onClick={this.handlePlaySong}>
          <img className={classes.mp3_td2_btn} src="/jpg/play.png" alt="folder" />{" "}
        </div>

        <div className={classes.itemMusicBody0} style={{ color }}>{this.props.item.name} </div>
        <div className={classes.itemMusicBody1}>{this.props.item.executor}</div>
        <div className={classes.itemMusicBody2}>{this.props.item.size}</div>
        <div className={classes.itemMusicBody3}>{this.props.item.gpa}</div>


        <div>
          {ifAuthorization ? (
            this.props.myMusic ? (
              <button onClick={this.DeleteMyMusic} className={classes.mp3_td2_btn}>
                <img style={{width:"30px"}} src="/jpg/delete.png" alt="delete" />
              </button>
            ) : (
              <button onClick={this.AddMyMusic} className={classes.mp3_td2_btn}>
                <img style={{width:"35px"}} src="/jpg/folder.png" alt="folder" />
              </button>
            )
          ) : (
            ""
          )}
        </div>

        <div>
          {ifAuthorization ? 
          (// Якщо авторизувавсь то показуемо кнопку 
            this.props.myMusic ?
            (""):// Якщо зайшав до свого списку пісень то не показуемо кнопку 
            ( <button onClick={this.AddRatingMusic} className={classes.mp3_td2_btn}>
              <img src="/jpg/like.png" alt="Pause" />
            </button>)
           
          ) : ( "" )// Якщо не авторизувавсь то не показуемо кнопку 
          }
        </div>

        <div>
          {ifAuthorization ? 
          (// Якщо авторизувавсь то показуемо кнопку 
            this.props.myMusic ?
            (""):// Якщо зайшав до свого списку пісень то не показуемо кнопку 
            ( <button onClick={this.DeleteRatingMusic} className={classes.mp3_td2_btn}>
              <img src="/jpg/dislikes.png" alt="Pause" />
            </button>)
           
          ) : 
          ( "")// Якщо не авторизувавсь то не показуемо кнопку 
          }
        </div>

        <div>
          {" "}
          <img style={{ display }} className={classes.mp3_img}  src="/jpg/57VA.gif"  alt="lightning.gif" />
        </div>

      </div>
    );
  }
}

export default ItemMusic;



