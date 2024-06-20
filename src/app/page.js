"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [searchVal,setSearchVal]=useState(undefined);
  const router=useRouter();
  const search =e=> {
    e.preventDefault();
    router.push(`transaction/${searchVal}`);
  }
  return (
    <main id="main">
      <h1 id="title">SK's Blockchain Explorer</h1>
      <div id="header">
        Ethereum Blockchain Explorer by Saurabh Kaplas
      </div>
      <div id="content">
        <form>
          <input type="text" id="address" placeholder="Search by Txn hash/ Address/ Block/ Token" onChange={e => setSearchVal(e.target.value)} value={searchVal} />
          <button id="submit" onClick={search}>Search</button>
        </form>
      </div>
      
    </main>
  );
}
