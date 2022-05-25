import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";

const initState = {
    loading: true,
    error : false,
    data: null
}

const githubAction ={
    "fetch":"fetch",
    "sucess":"sucess",
    "failure":"failure"

}


const githubReducer = (state , action) => {
        switch(action.type){
            case githubAction.fetch:{
                return{
                    ...state,
                    loading:true,
                    error:false,
                    data:null
                }
            }
            case githubAction.sucess:{
                return{
                    ...state,
                    loading:false,
                    error:false,
                    data: action.payload
                    
                }
            }
            case githubAction.failure:{
                return{
                    ...state,
                    loading:false,
                    error:true,
                   }
            }
            default:
                return state
        }
}

function Github(){

const [{
    loading,
    error,
    data
}, 
dispatch ] =  useReducer(githubReducer,initState);

const [text,setText] = useState("");

const handelSubmit =()=>{
    getData(text);
}
   
useEffect(()=>{
    dispatch({type: githubAction.fetch})
    getData();

},[])

const getData = (search="masai")=>{
    axios({
        url:"https://api.github.com/search/users",
        method:"GET",
        params: {
            q: search
        }
    }).then(res=>{
        
        dispatch({
            type: githubAction.sucess,
            payload: res.data
        })
    }).catch((error)=>{
        dispatch({
            type: githubAction.failure
        })
    })
}

return (<div>
{/* {loading && <div>Loading...</div>} */}
{error && <div>error</div>}
{ console.log("here",data)}
<div>
    <input text={text} onChange={(e)=>setText(e.target.value)} placeholder="enter the name"></input>
    <button onClick={handelSubmit}>Enter</button>
    
</div>

 {loading?<div>Loading---</div>:data.items.map((item)=>{
       return <div key={item.id}> {item.login}</div>
    })}
    

</div>)

}

export default Github;