import React, {useState} from "react"
import {useForm} from "react-hook-form";
import axios from "axios";
import "../style/Comments.css"

// I like the way your comments are formatted, and that you have a message for the user
// when they add a comment/rating or favorite the listing
const Comments = ({apartment, user}) => {

    const {register, handleSubmit, errors} = useForm();
    const [msg, setMsg] = useState("");
    const [comments, setComments] = useState(apartment.comments);

    const onSubmit = (data) => {
        data.username = user.username;
        data.apartmentId = apartment._id;
        data.time = new Date().toLocaleString('en-US', {hour12: false});
        console.log(data);
        const url = "./comments/add";
        axios.put(url, data).then(result => {
            console.log("Comment successful!");
            setMsg("comment successful!");
            getComment(apartment);
        }).catch(err => {
            setMsg("comment failed");
        })
    };

    const getComment = (apartment) => {
        const url = "./comments/get/" + apartment._id.toString();
        axios.get(url).then(result => {
            const data  = result.data;
            console.log("comment refreshed");
            setComments(data.comments)
        }).catch(err => {
            setMsg("comment refresh failed!")
        })
    };

    return (
        <React.Fragment>
            <div className={"comment-container"}>
                {apartment.comments.length === 0 && <p>There is no comments for current apartment!</p>}
                <ul style={{listStyle: "none"}}>
                    {comments.map((comment, index) => {return (
                      <li
                        key={`${apartment._id.toString()}-comment-${index}`}
                        className={"comment-item"}
                      >
                        <div className={"comment-info"}>
                          <p>User: {comment.username}</p>
                          <p>Time: {comment.time}</p>
                          <p>Rating: {comment.rating}</p>
                        </div>
                        <p>{comment.text}</p>
                      </li>
                    );})
                    }
                </ul>
            </div>
            <div className={"comment-container"}>
                <p style={{color: "red"}}>{msg}</p>
                <form onSubmit={handleSubmit(onSubmit)} className={"comment-form"}>

                    <div>
                        <textarea id={"text"} name={"text"} ref={register({required: "Comments must not be empty"})} rows={3} placeholder={"Please enter your comment"}/>
                        {errors.text && <p style={{color: "red"}}>{errors.text.message}</p>}
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div>
                            <label htmlFor={"rating"}>Rating: </label>
                            <select name={"rating"} id={"rating"} aria-label={"rating"} ref={register} defaultValue={"5"}>
                                <option aria-label={"rating-1"} key={"rating-1"} value={"1"}>1</option>
                                <option aria-label={"rating-2"} key={"rating-2"} value={"2"}>2</option>
                                <option aria-label={"rating-3"} key={"rating-3"} value={"3"}>3</option>
                                <option aria-label={"rating-4"} key={"rating-4"} value={"4"}>4</option>
                                <option aria-label={"rating-5"} key={"rating-5"} value={"5"}>5</option>
                            </select>
                        </div>
                        <button type={"submit"}>Comment</button>
                    </div>

                </form>
            </div>

        </React.Fragment>
    )
};

export default Comments;
