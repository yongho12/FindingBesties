import React, { useState, useEffect } from 'react';

function Match({first, second, third, last_third, last_second, last_first,top_bottom_three })
{
    console.log('first::::',first);

    // console.log('[]::::::',recommends[top_bottom_list[0]].name);
    console.log("top_bottom_three in Match::::",top_bottom_three )


    return (
        <>
        <h1>Match</h1>
         <div className="matchContainer">

 
            <div>
                {first.map((person, index)=> (<div key={`${person.id}-${index}`}> 
                {person.name} <div> {`${top_bottom_three[`${person.id}`]}`}% Match</div>
                </div>))}
            </div>
             
            <div>
                {second.map((person, index)=> (<div key={`${person.id}-${index}`}> 
                {person.name} <div> {`${top_bottom_three[`${person.id}`]}`}% Match</div>
                </div>))}
            </div>

            <div>
                {third.map((person, index)=> (<div key={`${person.id}-${index}`}> 
                {person.name} <div> {`${top_bottom_three[`${person.id}`]}`}% Match</div>
                </div>))}
            </div>



        </div>
        </>
    )
}

export default Match;