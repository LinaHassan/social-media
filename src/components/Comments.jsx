import { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";
import classes from "./Comments.module.css";

import Comment from "./Comment";
import Post from "./Post";
function Comments() {
  const postid  = useParams().id;
  const [comments,setComments]=useState([])
  const [post,setPost]=useState([])

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    async function getComments() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/"+postid+"/comments"
      );
      const data = await response.json();

      setComments(data);
    }
 
    getComments();
  }, [user.id]);


  useEffect(() => {
    async function getPosts() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/"+postid
      );
      const data = await response.json();

      setPost(data);
    }
 
    getPosts();
  }, [user.id]);

  return (
    <>
     <div className={classes.title}>
         <h1>Comments</h1>
      <h3>Whats new today</h3>
      </div>
    <main className={classes.container}>
    <Post
            key={post.id}
            body={post.body}
            id={post.id}
            username={user.username}
            name={user.name}

          />
    <ul>
        {comments.map((comment) => (
          <Comment key={comment.id} body={comment.body} name={comment.name}></Comment>
        
        ))
        
        }
      </ul>
      </main>
    
    </>
  );
}
export default Comments;