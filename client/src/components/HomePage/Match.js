import React, { useState, useEffect } from 'react';

function Match({recommends =[], top_bottom_3=[]})
{
    console.log('recommends in Match::::::',recommends);
    console.log('top_bottom_3 in Match:::::',top_bottom_3);
    console.log('[]::::::',top_bottom_3[0]);
    // console.log("top_bottom_3",top_bottom_3);
    // console.log("recommends::::", recommends);

    // useEffect(() => {
    //     dispatch(fetchQuestions());
    // }, []);



    return (
        <>
        <h1>Match</h1>
         <div className="matchContainer">
            <div>
                {recommends.map((person, index)=>(
                <div key={`${person.id}-${index}`}> {person.name}</div>))
                }
            </div>
        </div>
        </>
    )
}

export default Match;