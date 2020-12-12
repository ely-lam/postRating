import React, {useState, useEffect} from "react"
import axios from "axios";
import Comments from "./Comments";

const ApartmentPreview = ({apartment, user}) => {

    const [showComments, setShowComments] = useState(false);
    const [userFavList, setUserFavList] = useState(user.favorites);
    const [msg, setMsg] = useState("");

    const getFavorites = () => {
        const url = `./users/get/${user.username}`;
        axios.get(url).then(result => {
            const data = result.data;
            setUserFavList(data.favorites);
        }).catch(err => {
            console.log("load favorites failed!");
            setMsg("Load favorites failed");
        })
    };

    const favApartment = () => {
        const data = {
            apartment: apartment,
            username: user.username
        };
        const url = "./users/favorite";
        axios.put(url, data).then(result => {
            console.log("Favorite apartment success");
            setMsg("Favorite apartment success");
            getFavorites()

        }).catch(err => {
            console.log("Favorite apartment fail");
            setMsg("Favorite apartment fail");
        })

    };

    const unfavApartment = () => {
        const data = {
            apartment: apartment,
            username: user.username
        };
        const url = "./users/favorite";
        axios.post(url, data).then(result => {
            console.log("unfavorite apartment success");
            setMsg("\"unfavorite apartment success");
            getFavorites()
        }).catch(err => {
            console.log("unfavorite apartment fail");
            setMsg("unfavorite apartment fail");
        })
    };

    useEffect(() => {
        getFavorites();
    }, []);

    return (
        <React.Fragment>
            <div>
                <div>
                    <img src={apartment.images[0]} alt={apartment.titleTextOnly} width={"50px"} height={"50px"}/>
                </div>
                <div>
                    <p>{apartment.titleTextOnly}</p>
                    <p>{apartment.time}</p>
                    <p>{apartment.hood}</p>
                    <p>{apartment.address}</p>
                    <p>$ {apartment.price}</p>
                    {apartment.housing && <p>{apartment.housing} Bedroom</p>}
                    {apartment.area && <p>{apartment.area} Square feet</p>}
                    <p>Rating: {apartment.comments.length === 0 ? 0 : (apartment.rating / apartment.comments.length).toFixed(1)}</p>
                </div>
                <div>
                    {userFavList.filter(apt => apt._id.toString() === apartment._id.toString()).length > 0 ? <button onClick={() => unfavApartment()}>Unfavorite</button> : <button onClick={() => favApartment()}>Favorite</button> }
                    {showComments ? <button onClick={() => setShowComments(false)}>Hide Comments</button> :
                        <button onClick={() => setShowComments(true)}>Show Comments</button> }
                </div>

            </div>
            <p style={{color: "red"}}>{msg}</p>
            {showComments && <Comments user={user} apartment={apartment}/>}
        </React.Fragment>
    )
};

export default ApartmentPreview;