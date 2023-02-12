import Post from "./Post";
import { useEffect, useState } from "react";
import classes from "./PostList.module.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [add, setadd] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [addPost, setaddPost] = useState(false);
 

  const submitHandlar = async (e) => {
    e.preventDefault();
    setadd([...add, inputValue]);
    console.log(add)
    setInputValue("");
    setaddPost(false);
  };
  function addPostHandler() {
    setaddPost(true);
  }

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    async function getPosts() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/` + user.id + `/posts`
      );
      const postsData = await response.json();
      setPosts(postsData);
    }

    getPosts();
  }, [user.id]);

  return (
    <>
      <div>
        <div className={classes.addPost_sec}>
          <button
            style={{
              display: addPost ? "none" : "block",
            }}
            onClick={addPostHandler}
            className={classes.addPost_btn}
          >
            +
          </button>

          <div
            style={{
              display: addPost ? "block" : "none",
            }}
          >
            <form className={classes.form}>
              <textarea
                name="body"
                rows="10"
                cols="25"
                placeholder="Add Yout Post"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
              />

              <div className={classes.btn_sec}>
                <button className={classes.addPost_btn} onClick={submitHandlar}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <ul>
          {posts.map((post) => (
            <Post
              key={post.id}
              body={post.body}
              id={post.id}
              username={user.username}
              name={user.name}
            />
          ))}
           {add.map((P) => (
            <Post
              key={P}
              body={P}
              username={user.username}
              name={user.name}
            />
            ))}
        </ul>
      </div>
    </>
  );
};

export default PostList;
