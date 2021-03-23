import { API, graphqlOperation } from "aws-amplify";
import {  searchMessages } from './graphql/queries';
import React, { useState, useEffect } from 'react';
import { createMessage } from "./graphql/mutations";
import * as subscriptions from './graphql/subscriptions';

function App() {
  const [formState, setFormState] = useState({comment:""})
  const [data, setData] = useState([]);

  const querySort = Object.assign({},{
    sort : { 
        field: 'createdAt',//作成日指定
        direction: 'asc'//早い順
    },
    limit : 100 //デフォルトだと10個までしかとれない
  })

  useEffect(async () => {
      try {
        let comments = await API.graphql(graphqlOperation(searchMessages,querySort))
        console.log(comments)
        setData(comments.data.searchMessages.items)
      } catch (e) {
        console.log(e)
      }
    
    },[]);

    useEffect(() => {
      const subscription = API.graphql(
        graphqlOperation(subscriptions.onCreateMessage)
    ).subscribe({
        next: ({ value }) => {
          console.log("data",data)
          setData([...data, value.data.onCreateMessage])
        },
        error: error => console.warn(error)
    });

    return () => {
      subscription.unsubscribe();
    }
    
    },[data]);
    

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }


  const handleSubmit = async () => {
    try {
      const comments = { ...formState }
      await API.graphql(graphqlOperation(createMessage,{input:comments}))
  } catch (err) {
    console.log('error creating todo:', err)
  }
  }

  

    return (
      <div className="App">
        <input
        onChange={event => setInput('comment', event.target.value)}
        value={formState.comment}
      />
        <button onClick={handleSubmit}>send</button>
        <div>
          {
        data.map((data, index) => (
          <>
            <p>{data.createdAt} : {data.comment}</p>
          </>
        ))
      }
          </div>
      </div>
    )
  }
    


export default App;