import React, { Component } from 'react';
import moment from 'moment';
import {
  Link,
  withRouter
} from 'react-router-dom';
import QRCode from 'qrcode.react';
import ReactPaginate from 'react-paginate';

import "../styles/homepage.scss";

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tx: [],
      perPage: 10,
      offset: 0,
      transactions: []
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    document.title = `Address ${id} - Explore by BITBOX`;
    this.setState({
      id: id
    });

    this.props.bitbox.Address.details(id)
    .then((result) => {

      let transactions = result.transactions;
      let txs = [];
      let upperBound = this.state.perPage;
      if(result.transactions.length < upperBound) {
        upperBound = result.transactions.length;
      }

      if(result.transactions.length > 0) {
        for(let i = this.state.offset; i < this.state.offset + upperBound; i++) {
          txs.push(result.transactions[i]);
        }
      }

      this.setState({
        legacyAddress: result.legacyAddress,
        cashAddress: result.cashAddress,
        balance: result.balance,
        balanceSat: result.balanceSat,
        totalReceived: result.totalReceived,
        totalReceivedSat: result.totalReceivedSat,
        totalSent: result.total,
        totalSentSat: result.totalSentSat,
        transactions: result.transactions,
        txApperances: result.txApperances,
        txs: txs,
        unconfirmedBalance: result.unconfirmedBalance,
        unconfirmedBalanceSat: result.unconfirmedBalanceSat,
        unconfirmedTxApperances: result.unconfirmedTxApperances,
        pageCount: Math.floor(result.transactions.length / this.state.perPage)
      });
    }, (err) => { console.log(err);
    });
  }


  handlePageClick(data) {
    let selected = data.selected;
    let transactions = this.state.transactions;
    let txs = [];
    if(this.state.transactions.length > 0) {
      for(let i = selected; i < selected + this.state.perPage; i++) {
        txs.push(this.state.transactions[i]);
      }
    }

    this.setState({
      txs: txs
    });
  };

  render() {
    let qr;
    let cashAddr;
    let legacy;
    let transactions = [];
    let transactionCount;
    if(this.state.cashAddress) {
      qr = <QRCode value={this.state.id} />;
      cashAddr = <p>Cash: {this.state.cashAddress}</p>;
      legacy = <p>Legacy: {this.state.legacyAddress}</p>;
      transactionCount = this.state.transactions.length;

      this.state.txs.forEach((tx, ind) => {
        transactions.push(
          <tr key={ind} className="pure-table-odd">
            <td>
              <Link
                to={`/transaction/${tx}`}>
                {tx}
              </Link>
            </td>
          </tr>
        )
      })
    }

    let table;
    if(this.state.transactions.length > 0) {
      table = <table className="pure-table">
        <thead>
          <tr>
            <th>txid</th>
          </tr>
        </thead>

        <tbody>
          {transactions}
        </tbody>
      </table>;
    }

    return (
      <div className='Address'>
        <div className="pure-g">
          <div className="l-box pure-u-1 pure-u-md-1-12 pure-u-lg-1-12">
            {qr}
          </div>
          <div className="l-box pure-u-1 pure-u-md-1-3 pure-u-lg-1-3">
            <h2 className=''> Address</h2>
            {cashAddr}
            {legacy}
          </div>
          <div className="l-box pure-u-1 pure-u-md-7-12 pure-u-lg-7-12">
            <p><i className="fab fa-bitcoin" /> Balance: {this.state.balance}</p>
            <p><i className="fas fa-arrow-up" /> Total Received: {this.state.totalReceived}</p>
          </div>
        </div>
        <h2 className='l-box'><i className="fas fa-exchange-alt" />  Transactions {transactionCount}</h2>
        {table}

        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={<a href="">...</a>}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick.bind(this)}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}

export default withRouter(Address);
