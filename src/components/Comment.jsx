import commentImg from "../img/comment.png"
import classes from "./Post.module.css";


const Comment = ({body, name}) => {
  return (
    <>
      <li className={classes.Post_continer}>
        <div className={classes.User_info}>
          <img src={commentImg} alt="Profile pic" />
          <div className={classes.User_text}>
            <p>{name}</p>
          </div>
        </div>
        <p>{body}</p>
      </li>
    </>
  );
};

export default Comment;
