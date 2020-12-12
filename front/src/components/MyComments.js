import React, {useState, useEffect} from "react";
import axios from "axios";

const MyComments = ({user}) => {
    const [comments, setComments] = useState([]);
    const [msg, setMsg] = useState("");

    const getUser = () => {
      const url = `./users/get/${user.username}`;
      axios.get(url).then(result => {
          const data = result.data;
          console.log(data);
          console.log("Comments Loaded");
          setComments(data.comments);

      }).catch(err => {
          console.log("load comment failed!");
          setMsg("Load comment failed");
      })
    };

    const deleteComment = (comment) => {
        const url = "./comments/delete";
        axios.post(url, comment).then(result => {
            console.log("comment deleted");
            setMsg("Comment deleted!");
            getUser(user)
        }).catch(err => {
            console.log(("delete comment failed"));
            setMsg("Delete comment failed");
        })
    };

    useEffect(() => {
        console.log("Loading comments");
        getUser();
    }, []);

    return (
        <div>
            <p>{comments.length === 0 && "You have not comment yet!"}</p>
            <p style={{color: "red"}}>{msg}</p>
            <ul>
                {comments.map((comment, index) => {
                    return (
                        <li key={`comment-${index}`}>
                            <p>{comment.username}</p>
                            <p>{comment.time}</p>
                            <p>{comment.rating}</p>
                            <p>{comment.text}</p>
                            <button onClick={() => deleteComment(comment)}>Delete</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
};

export default MyComments;