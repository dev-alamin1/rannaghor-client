import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Myreviewrow = ({review,index,reviewDeleteHandler}) => {

    const [foodServiceInfo, setFoodServiceInfo] = useState([]);
    const {foodName,photoURL} = foodServiceInfo;

    // load food service info , when get reivew.recipeId.
    useEffect(()=>{
        fetch(`http://localhost:5000/services/${review.recipePostId}`)
        .then(res=>res.json())
        .then(data=>setFoodServiceInfo(data))
    },[review])


    return (
        <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{index+1}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{foodName}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"><img src={photoURL} alt="" className='w-20' /></td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{review.feedback}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">

            <button onClick={()=>reviewDeleteHandler(review._id)} className="btn btn-outline btn-warning btn-sm">
                Delete
            </button>

            <Link className='ml-2' to={`/edit/review/${review._id}`}><button className="btn btn-outline btn-warning btn-sm">
                Edit 
            </button></Link>

            </td>
      </tr>
    );
};

export default Myreviewrow;