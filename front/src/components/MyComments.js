import React, { useState, useEffect } from "react";
import axios from "axios";

const MyComments = ({ user }) => {
  const [comments, setComments] = useState([]);
  const [msg, setMsg] = useState("");

  const getUser = () => {
    const url = `./users/get/${user.username}`;
    axios
      .get(url)
      .then((result) => {
        const data = result.data;
        console.log(data);
        console.log("Comments Loaded");
        setComments(data.comments);
      })
      .catch((err) => {
        console.log("load comment failed!");
        setMsg("Load comment failed");
      });
  };

  const deleteComment = (comment) => {
    const url = "./comments/delete";
    axios
      .post(url, comment)
      .then((result) => {
        console.log("comment deleted");
        setMsg("Comment deleted!");
        getUser(user);
      })
      .catch((err) => {
        console.log("delete comment failed");
        setMsg("Delete comment failed");
      });
  };

  useEffect(() => {
    console.log("Loading comments");
    getUser();
  }, []);

  return (
    <div
      className={"comment-container"}
      style={{ backgroundColor: "white", padding: "50px" }}
    >
      <p>{comments.length === 0 && "You have not comment yet!"}</p>
      <p style={{ color: "red" }}>{msg}</p>
      <ul>
        {comments.map((comment, index) => {
          return (
            <li key={`comment-${index}`}>
              <div className={"comment-info"}>
                <p>User: {comment.username}</p>
                <p>Time: {comment.time}</p>
                <p>Rating: {comment.rating}</p>
              </div>
              <p>{comment.text}</p>
              <button onClick={() => deleteComment(comment)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MyComments;
