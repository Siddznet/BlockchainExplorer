require("dotenv").config();
import { ethers } from "ethers";

    const infuraUrl=`https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`;

    const getBalance= async address => {
        const res= await fetch(
            infuraUrl,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                method: "eth_getBalance",
                params: [address,"latest"],
                id: 1
            })
        }
        );
        const resJson= await res.json();
        return resJson.result;
    }

export default async function Address({params}) {
    const balance=await getBalance(params.address);
    
    return (
        <main id="main">
          <h1 id="title">SK's Blockchain Explorer</h1>
          <div id="header">
            Ethereum Blockchain Explorer by Saurabh Kaplas
          </div>
          <div id="content">
            <div id="address">
                <div className="field">
                    <div className="name">Address:</div>
                    <div className="value">{params.address}</div>
                </div>
                <div className="field">
                    <div className="name">ETH Balance:</div>
                    <div className="value">{ethers.formatEther(balance)} ETH</div>
                </div>
            </div>
          </div>
          
        </main>
      );
}