import React from "react";
import classes from './MusicPlayer.module.css';
import CustomAudioBtnPlayPause from "./CustomAudioBtnPlayPause.jsx";

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.state = {
      isPlaying: false,
    };
  }

  componentDidMount() {
    this.audioRef.current.addEventListener("ended", this.handleEnded);
  }

  componentWillUnmount() {
    this.audioRef.current.removeEventListener("ended", this.handleEnded);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeSong !== this.props.activeSong) {
      this.playAudio();
    }
  }

  handlePlayPauseClick = () => {
    this.setState((prevState) => ({ isPlaying: !prevState.isPlaying }), () => {
      if (this.state.isPlaying) {
        this.audioRef.current.play();
      } else {
        this.audioRef.current.pause();
      }
    });
  };

  playAudio = () => {
    if (this.props.activeSong) {
      this.audioRef.current.src = this.props.activeSong.path;
      this.audioRef.current.play();
      this.setState({ isPlaying: true });
    }
  };

  handleEnded = () => {
    this.setState({ isPlaying: false });
    this.props.playNextSong(); 
  };

  render() {
    const { isPlaying } = this.state;

    return (
      <div className={classes.mainCustomAudioBtnPlayPauseContainer}>
            <div style={{display:"flex",marginLeft:"20%"}} >
              <div className={classes.mp3_headTxt}>{this.props.activeSong?.name}</div>
              <div className={classes.mp3_headTxt}>{this.props.activeSong?.executor}</div>
              <div className={classes.mp3_headTxt}>{this.props.activeSong?.size}</div>
              <div className={classes.mp3_headTxt}>{this.props.activeSong?.gpa}</div>
            </div>
            <div>
                <CustomAudioBtnPlayPause
                  audioRef={this.audioRef}
                  className={classes.mp3}
                  isPlaying={isPlaying}
                  btnPlayPause={classes.btnPlayPause}
                  btnPP={classes.btnPP}
                  onPlayPauseClick={this.handlePlayPauseClick}
                  activeSong={this.props.activeSong}
                />
            </div>
      </div>
    );
  }
}

export default MusicPlayer;
