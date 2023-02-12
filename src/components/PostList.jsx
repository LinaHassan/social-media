import Post from "./Post";
import { useEffect, useState } from "react";
import classes from "./PostList.module.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [add, setadd] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [addPost, setaddPost] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [searchPost, setSearchPost] = useState("");
  const [seeMore, setseeMore] = useState(5);
  function showMoreHandler() {
    {showBtn? setseeMore(seeMore+5): setseeMore(seeMore-5)}
   
    setShowBtn(!showBtn)
  }

  const submitHandlar = async (e) => {
    e.preventDefault();
    setadd([...add, inputValue]);
    console.log(add);
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
        <input
          className={classes.searchPost}
          type="text"
          placeholder="Search..."
          onChange={(event) => {
            setSearchPost(event.target.value);
          }}
        />
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
          {posts
            .slice(0, seeMore)
            .filter((val) => {
              if (searchPost == "") {
                return val;
              } else if (
                val.body.toLowerCase().includes(searchPost.toLowerCase())
              ) {
                return val;
              }
            })
            .map((post) => (
              <Post
                key={post.id}
                body={post.body}
                id={post.id}
                username={user.username}
                name={user.name}
              />
            ))}
          {add.map((P) => (
            <Post key={P} body={P} username={user.username} name={user.name} />
          ))}
        </ul>

        <button className={classes.loadBtn} onClick={showMoreHandler}>
       {showBtn? "Show More":"Show less "}
        </button>
      </div>
    </>
  );
};

export default PostList;
