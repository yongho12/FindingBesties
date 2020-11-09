import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';


function Profile() {

    const user_id = useSelector(state => state.authReducer.id);

    // useEffect(() => {
    //     const response = await fetch("")
    //     }
    // )

    return (
    <>
        <h1>Profile</h1>
    </>
    )
}


export default Profile;