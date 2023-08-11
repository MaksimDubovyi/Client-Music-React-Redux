import React from "react"; 
import MusicPlayer from '../MusicPlayer/MusicPlayer.jsx';
import ItemMusic from '../ItemMisic/ItemMusic.jsx';
import classes from './MusicList.module.css'
class MusicList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className={classes.mListHeadContainer}>
        <div className={classes.mListHeadItemPlay}></div>
          <div className={classes.mListHeadItem0}>Назва</div>
          <div className={classes.mListHeadItem1}>Виконавець</div>
          <div className={classes.mListHeadItem2}>Розмір</div>
          <div className={classes.mListHeadItem3}>Рейтинг</div>
        </div>

        <div>
          {this.props.Musics.map((item) => (
            <ItemMusic
              item={item}
              key={item.id}
              setActiveSong={this.props.setActiveSong}
              userId={this.props.idUser}
              setMusics={this.props.setMusics}
              apiUser={this.props.apiUser}
              myMusic={this.props.myMusic}
              apiMusic={this.props.apiMusic}
              perPage={this.props.perPage}
              currentPage={this.props.currentPage}
            />
          ))}
        </div>
        <div>
          <MusicPlayer
            activeSong={this.props.activeSong}
            playNextSong={this.props.playNextSong}
          />
        </div>
      </div>
    );
  }
}

export default MusicList;
