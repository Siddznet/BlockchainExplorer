export default function Transaction({params}) {
    return (
        <main id="main">
          <h1 id="title">SK's Blockchain Explorer</h1>
          <div id="header">
            Ethereum Blockchain Explorer by Saurabh Kaplas
          </div>
          <div id="content">
            <div id="transaction">
                <div className="field">
                    <div className="name">Transaction Hash:</div>
                    <div className="value">{params.hash}</div>
                </div>
            </div>
          </div>
          
        </main>
      );
}