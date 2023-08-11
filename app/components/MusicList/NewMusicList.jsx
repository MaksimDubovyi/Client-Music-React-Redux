import React from "react"; 
import classes from './MusicList.module.css'
class NewMusicList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if(this.props.newMusics.length > 0)
    {
    return (
      <div className={classes.newMusicListBlock}>
       <h1 className={classes.newMusicH1}>Додано: {this.props.newMusics.length} (mp3)</h1> 

        {this.props.newMusics.map((item,index) => (
          <div className={classes.newMusicListItemBlock} key={index}>
          <p className={classes.newMusicListItem}>{index+1}. Назва: {item.name}</p>
          <p className={classes.newMusicListItem}>Виконавець: {item.executor}</p>
          </div>
         
        ))}
      </div>
    );
  }
}
}

export default NewMusicList;