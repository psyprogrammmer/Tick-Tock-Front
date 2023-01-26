import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
export const postApi = createApi({
    reducerPath :'postApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://127.0.0.1:8000/',
    }), 
    endpoints:(builder)=>({
        bothUser:builder.mutation({
            query:(data)=>{
                console.log("Post Data",data);
                return{
                    url:'',
                    method:'POST',
                    body:data,
                    headers:{
                        'Content-type':'application/json',
                    }
                }
            }
        })
    })
})
;
export const {useBothUserMutation} = postApi;