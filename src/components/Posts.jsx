import classes from "./Posts.module.css";
import PostList from "./PostList";
function Posts() {
  return (
    <>
      <main>

        <div className={classes.title}>
        <h1>Discover</h1>
      <h3>Whats new today</h3>
        </div>
      <div className={classes.container}>
        <PostList />
        </div>
      </main>
    </>
  );
}

export default Posts;

