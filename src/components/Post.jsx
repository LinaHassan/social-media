import classes from "./Post.module.css";
import Ellipse from "../img/Ellipse.png";
import Vector from "../img/Vector.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";
const Post = ({ body, id, username, name }) => {
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const AddCommentHandler = (event) => {
    if (event.key === "Enter") {
      setComments([...comments, event.target.value]);
      setInputValue("");
    }
  };

  return (
    <>
      <li className={classes.Post_continer}>
        <div className={classes.User_info}>
          <img src={Ellipse} alt="Profile pic" />
          <div className={classes.User_text}>
            <p>{name}</p>
            <p className={classes.User_name}>{"@" + username}</p>
          </div>
        </div>
        <Link to={`/Comments/${id}`}>
          <p>{body}</p>
        </Link>
        <div className={classes.comment_Sec}>
          {comments.map((comment) => (
            <Comment key={comment} body={comment} name={name} />
          ))}
          <div className={classes.comment_input}>
            <img
              src={Vector}
              className={classes.commentPic}
              alt="Profile pic"
            />

            <input
              className={classes.comment}
              type="text"
              onKeyDown={AddCommentHandler}
              placeholder="Add comment"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
          </div>
        </div>
      </li>
    </>
  );
};
export default Post;
