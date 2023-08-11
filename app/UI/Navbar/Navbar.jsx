import React from "react";
import { Link} from 'react-router-dom';
import Avatar from './Avatar.jsx'
import classes from './Nav.module.css';
const Navbar = (props) =>
 {
  
  let display = "none";
  let ifExit = props.ifExit ? "Вихід" : "Вхід";
  let page = props.ifExit ? "#" : "/authorization";


  if (props.avatar !== "") {
    display = "block";
  }
  const handleClick = () => {
    if (ifExit === "Вихід") {
    props.exit();
    } 
  };

  
  return (
    <div className={classes.navMainHeadContainer}>
      <div className={classes.navHeadContainer}>
        <Link
          onClick={handleClick} to={page} className={`${classes.txtMenu} ${classes.navChild}`} >
          <i className="bi bi-door-open-fill" style={{ margin: "10px", color: "green" }}></i> {ifExit}
        </Link>

        <Link  style={{ display }} to="/musicpage" className={`${classes.txtMenu} ${classes.navChild}`} >
          <i className="bi bi-house-heart-fill" style={{ margin: "10px", color: "green" }}></i> моя кімната
        </Link>

        <p className={` ${classes.navChild} ${classes.txtMenuHi}`} style={{ display }} >
          Привіт - <span className="login">{props.login}</span>
        </p>

      </div>

      <div className={` ${classes.blockAvatar}`} style={{ display }}  >
        <Avatar {...props} />
      </div>

    </div>
  );
};

export default Navbar;
