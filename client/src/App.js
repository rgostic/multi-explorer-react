import React from 'react';
import axios from 'axios';
//import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {txs: []};
  }
  
  componentDidMount() {
    axios.get(`http://localhost:8888/search?address=0xdF5F98d4653047f3183825fF0a1673889E5076D1&cryptoId=ETH`)
      .then(res => {
        console.log(res.data);
        
        this.setState( {txs: res.data} );
      });    
  }

  
  
  render() {

    let myTxs = this.state.txs.map(function (tx) {
      return <div class="transaction-container">
            <p>Transaction</p>
            <h2>{tx.hash}</h2>            
            <h6>{new Date(parseInt(tx.time)*1000).toLocaleString()}</h6>
            <p>{tx.from} -> {tx.to}</p>
            <p>Amount: {tx.val}</p>              
        </div>;
    });

    return (
      <div className="App">
        <header className="App-header">        
          <div>{myTxs}</div>
          <p>
            
            Edit <code>src/App.js</code> and save to reload.
            
          
          </p>          
        </header>
      </div>
    );
  }
}

export default App;
