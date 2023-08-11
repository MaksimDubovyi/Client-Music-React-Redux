import React from 'react';
import NewMusicList from "../components/MusicList/NewMusicList.jsx";
import MusicList from "../components/MusicList/MusicList.jsx";
import AdminNavbar from "../UI/Navbar/AdminNavbar.jsx";
import MusicFilter from "../components/MusicFilter/MusicFilter.jsx"
import classes from './page.module.css'
function MusicPage(props)
{

return (
  <div className={classes.musicPageContainer}>
    <div style={{width:'30%', }}>
      <MusicFilter {...props} />
      <AdminNavbar {...props} />
    </div>

    <div>
      <NewMusicList {...props} />
      <MusicList {...props} />
    </div>
  </div>
);

}
export default MusicPage