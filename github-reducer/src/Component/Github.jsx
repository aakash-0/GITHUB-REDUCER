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

const [text,setText] = useState("masai");
const [_page,setPage] = useState(1);

const handelSubmit =()=>{
    dispatch({type: githubAction.fetch})
    getData(text,_page);
    setPage(1);

}
   
useEffect(()=>{
    dispatch({type: githubAction.fetch})
    getData(text,_page);

},[_page])

const getData = (search="masai",_page)=>{
    axios({
        url:"https://api.github.com/search/users",
        method:"GET",
        params: {
            page:_page,
            per_page:10,
            q:search,
        }
    }).then(res=>{
        
        dispatch({
            type: githubAction.sucess,
            payload: res.data
        })
    }).catch((error)=>{
        console.log("here",error)
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

 {loading?<div>Loading...</div>:
    <div>{data.items.map((item)=>{
            return <div key={item.id}>
                        <img width={"20px"} src={item.avatar_url}></img>
                        {item.login}
                    </div>
        })}

        <button disabled={_page===1} onClick={()=>{setPage((prev)=>prev+1)}}>prev</button>
        <button onClick={()=>{setPage((prev)=>prev+1)}}>next</button>
    </div>}
    
    

</div>)

}

export default Github;