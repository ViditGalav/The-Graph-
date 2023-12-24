import { useState,useEffect } from 'react'
import { createClient } from "urql";

import './App.css'

function App() {
  const [tokens,setTokens] = useState([]);
  const QueryURL = "https://gateway-arbitrum.network.thegraph.com/api/d77f2b558594b6eff5bdd99bf9a1d836/subgraphs/id/HUZDsRpEVP2AvzDCyzDHtdc64dyDxx8FQjzsmqSg4H3B"
  const query = `{
    tokens(first :5)  {
      id
      name
      symbol
      decimals
    }
  }`

    const client = createClient ({
      url:QueryURL
    })
    
    useEffect(()=>{
    const getTokens =async()=>{
    const {data} = await client.query(query).toPromise();
    console.log(data);
    setTokens(data.tokens);

   }
   getTokens()
    },[])

 
    return (
      <>
        <div>
          <h1>Tokens Information</h1>
          {tokens !== null && tokens.length > 0 && tokens.map((token) => {
            return (
              <div key={token.id}>
                <div>{token.id}</div>
                <div>{token.name}</div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
export default App
