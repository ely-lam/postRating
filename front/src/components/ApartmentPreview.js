import React, {useState} from "react"
import Comments from "./Comments";

const ApartmentPreview = ({apartment, user}) => {

    const [showComments, setShowComments] = useState(false);

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
                    {showComments ? <button onClick={() => setShowComments(false)}>Hide Comments</button> :
                        <button onClick={() => setShowComments(true)}>Show Comments</button> }
                </div>

            </div>
            {showComments && <Comments user={user} apartment={apartment}/>}
        </React.Fragment>
    )
};

export default ApartmentPreview;