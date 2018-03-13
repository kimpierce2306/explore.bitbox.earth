import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ocean } from 'react-syntax-highlighter/styles/hljs';
import "../styles/docs.scss";

class BitboxPaper extends Component {
  render() {
    return (
      <div className="BitboxPaper">
        <h2 className="content-head is-center"><i className="fas fa-folder" /> Bitbox Paper</h2>
        <div className="pure-g">
          <div className="pure-u-1-1">
            <p>Generate a paper-wallet.html w/ private key WIF and public address in cashaddr or legacy encoding. The paper wallet will also list the mnemonic and HD path.</p>
            <p>The privateKey/address pair are created from a fresh 32 byte mnemonic and derived as the first external change address from the following HD path: <code>m / 44&rsquo; / 145&rsquo; / 0&rsquo; / 0 / 0</code>.</p>
            <SyntaxHighlighter language='text' style={ocean}>{`
    Usage: paper [options]

    Create a paper wallet for easy and safe back up. Outputs paper-wallet.html which you can customize the look and then print.

    Options:

      -e, --encoding <encoding>  The encoding to use. Options include "cashaddr" and "legacy". Default: "cashaddr"
      -l, --language <language>  language of mnemonic. Options: chinese_simplified, chinese_traditional, english, french, italian, japanese, korean, spanish. Default: english
      -h, --help                 output usage information

      $ bitbox paper
      Creating english cashaddr paper wallet

      $ bitbox paper -l korean -e legacy
      Creating korean legacy paper wallet
           `}</SyntaxHighlighter>
           <img src='/assets/paper.png' />
          </div>
        </div>
      </div>
    );
  }
}

export default BitboxPaper;
