import React, { useState, useEffect } from 'react';

function Match({first, second, third, last_third, last_second, last_first,top_bottom_three })
{   
    const [opposite, setOpposite] = useState(false)
    console.log('first::::',first);

    // console.log('[]::::::',recommends[top_bottom_list[0]].name);
    console.log("top_bottom_three in Match::::",top_bottom_three )
    function oppositeHandler() {
        setOpposite(true);
    }


    return (
        <>
         <div className="match__container">

            { (first.length) &&
            <div className="match__similar">
                <h2> The friends are recommended based on your answers to questionnaire.
                     <br />You guys have in commons. 
                     <br />
                     However, people attractive to opposite. <br />click below if you want to find out. 
                     <button onClick={oppositeHandler}>opposite</button>
                </h2>
               
                <div>
                    <img className = "match__photo" src="/images/friends.png" alt="friendshipt photo" />
                    {first.map((person, index)=> (<div key={`${person.id}-${index}`}> <h2>{person.name}</h2> 
                    <div> {`${top_bottom_three[`${person.id}`]}`}% Match</div>
                    </div>))}
                    <button>connect</button>
                </div>

                 <div>
                    <img className = "match__photo" src="/images/friends.png" alt="friendshipt photo" />
                    {second.map((person, index)=> (<div key={`${person.id}-${index}`}> <h2>{person.name}</h2> 
                    <div> {`${top_bottom_three[`${person.id}`]}`}% Match</div>
                    </div>))}
                    <button>connect</button>
                </div>

                 <div>
                    <img className = "match__photo" src="/images/friends.png" alt="friendshipt photo" />
                    {third.map((person, index)=> (<div key={`${person.id}-${index}`}> <h2>{person.name}</h2> 
                    <div> {`${top_bottom_three[`${person.id}`]}`}% Match</div>
                    </div>))}
                    <button>connect</button>
                </div>
                
            </div>
            // {/* <h1> However you might attract friends opposite you.</h1>
            //     <button>Click here </button> */}
            }

            { {opposite} &&
             <div className="match__opposite">
                <div>
                    <img className = "match__photo" src="/images/friends.png" alt="friendshipt photo" />
                    {last_first.map((person, index)=> (<div key={`${person.id}-${index}`}> <h2>{person.name}</h2> 
                    <div> {`${top_bottom_three[`${person.id}`]}`}% Match</div>
                    </div>))}
                    <button>connect</button>
                </div>

                 <div>
                    <img className = "match__photo" src="/images/friends.png" alt="friendshipt photo" />
                    {last_second.map((person, index)=> (<div key={`${person.id}-${index}`}> <h2>{person.name}</h2> 
                    <div> {`${top_bottom_three[`${person.id}`]}`}% Match</div>
                    </div>))}
                    <button>connect</button>
                </div>

                 <div>
                    <img className = "match__photo" src="/images/friends.png" alt="friendshipt photo" />
                    {last_third.map((person, index)=> (<div key={`${person.id}-${index}`}> <h2>{person.name}</h2> 
                    <div> {`${top_bottom_three[`${person.id}`]}`}% Match</div>
                    </div>))}
                    <button>connect</button>
                </div>
            </div>

            }

        </div>
        </>
    )
}

export default Match;