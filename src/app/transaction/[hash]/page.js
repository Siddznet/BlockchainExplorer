require("dotenv").config();
import moment from "moment";
import { ethers } from "ethers";

    const infuraUrl=`https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`;
    const getTxReceipt= async hash => {
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
                method: "eth_getTransactionReceipt",
                params: [hash],
                id: 1
            })
        }
        );
        const resJson= await res.json();
        return resJson.result;
    }

    const getBlock= async hash => {
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
                method: "eth_getBlockByHash",
                params: [hash, false],
                id: 2
            })
        }
        );
        const resJson= await res.json();
        return resJson.result;
    }
    
  const getTx= async hash => {
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
            method: "eth_getTransactionByHash",
            params: [hash],
            id: 3
        })
    }
    );
    const resJson= await res.json();
    return resJson.result;
}

export default async function Transaction({params}) {
    const receipt=await getTxReceipt(params.hash);
    const block=await getBlock(receipt.blockHash);
    const tx=await getTx(params.hash);

    const gasPrice=parseInt(receipt.effectiveGasPrice);
    const gasUsed=parseInt(receipt.gasUsed);
    const txFee=ethers.formatEther(gasPrice * gasUsed);

    return (
        <main id="main">
          <h1 id="title">Blockchain Explorer</h1>
          <div id="header">
            Ethereum Blockchain Explorer
          </div>
          <div id="content">
            <div id="transaction">
                <div className="field">
                    <div className="name">Transaction Hash:</div>
                    <div className="value">{params.hash}</div>
                </div>
                <div className="field">
                    <div className="name">Status:</div>
                    <div className="value">{receipt.status === "0x1" ? <span id="success"><i className="bi bi-check-circle-fill"></i>Success</span> : "Failed"}</div>
                </div>
                <div className="field">
                    <div className="name">Block:</div>
                    <div className="value">{Number(receipt.blockNumber)}</div>
                </div>
                <div className="field border-bottom">
                    <div className="name">Timestamp:</div>
                    <div className="value"><i class="bi bi-clock-fill"></i> {moment.unix(block.timestamp).fromNow()}</div>
                </div>
                <div className="field">
                    <div className="name">From:</div>
                    <div className="value">{receipt.from}</div>
                </div>
                <div className="field border-bottom">
                    <div className="name">To:</div>
                    <div className="value">{receipt.to}</div>
                </div>
                <div className="field">
                    <div className="name">Value:</div>
                    <div className="value">{ethers.formatEther(tx.value)} ETH</div>
                </div>
                <div className="field">
                    <div className="name">Transaction Fee:</div>
                    <div className="value">{txFee} ETH</div>
                </div>
                <div className="field">
                    <div className="name">Gas Price:</div>
                    <div className="value">{gasPrice/ 10 ** 9} Gwei</div>
                </div>
            </div>
          </div>
          
        </main>
      );
}
