import React from "react"

const ApartmentPreview = ({apartment, user}) => {

    return (
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
                <p>Rating: {apartment.rating}</p>
            </div>
            <div>
                <button>Detail</button>
            </div>

        </div>
    )
};

export default ApartmentPreview;