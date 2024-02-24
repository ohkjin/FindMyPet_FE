import { useState } from "react";

function TailRating() {

    const [rating, setRating] = useState(0);
    const handleRating = (e,ratingInput) =>{
        e.preventDefault();
        setRating(ratingInput);
        // console.log("ratingInput",ratingInput);
        // console.log("rating",rating)
    }
 
    return (
    <div className="flex flex-row">
    <button onClick={(e)=>handleRating(e,1)}>{rating>=1?'😺':'⚪'}</button>
    <button onClick={(e)=>handleRating(e,2)}>{rating>=2?'😺':'⚪'}</button>
    <button onClick={(e)=>handleRating(e,3)}>{rating>=3?'😺':'⚪'}</button>
    <button onClick={(e)=>handleRating(e,4)}>{rating>=4?'😺':'⚪'}</button>
    <button onClick={(e)=>handleRating(e,5)}>{rating>=5?'😺':'⚪'}</button>
    </div>
    );
    }