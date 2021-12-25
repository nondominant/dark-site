import Head from "next/head";
import Cors from "cors";
import Web3 from "web3";
import { useEffect, useState } from "react";
import { BigNumber } from "bignumber.js";

export default function Home() {
  const [result, setResult] = useState("");
  const [accounts, setAccounts] = useState("");
  const [CONTRACT, setContract] = useState(
    "0x123b30e25973fecd8354dd5f41cc45a3065ef88c" // or try this "0x57a204aa1042f6e66dd7730813f4024114d74f37"
  );
  const [items, setItems] = useState([]);
  const web3 = new Web3(Web3.givenProvider);

  function cleanHex(hex) {
    return web3.utils.hexToUtf8(hex).substring(33);
  }

  function uint256ToNum(hex) {
    const len = hex.length;
    return parseInt(hex.substring(len - 3, len), 16);
  }

  function numToUint256(num) {
    const BASE =
      "0xc87b56dd000000000000000000000000000000000000000000000000000000000000"; // Base unint256 hex with last 16bits removed.
    const TOTAL = 4;
    const n = num.toString(16);
    let extra = "";
    for (let i = 0; i < TOTAL - n.length; i++) {
      extra += "0";
    }
    return BASE + extra + n;
  }

  useEffect(async () => {
    const network = await web3.eth.net.getNetworkType();
    console.log(network); // should give you main if you're connected to the main network via metamask...
    await window.ethereum.enable();
    const acc = await web3.eth.getAccounts();
    console.log(acc);
    setAccounts(acc);
    setContract(CONTRACT);
    const totalSupply = Array(10)
      .fill()
      .map((x, i) => i);
    const data = [];
    for (const i of totalSupply) {
      try {
        const hex = numToUint256(i);
        const res = await web3.eth.call({
          to: CONTRACT,
          data: hex,
        });
        if (res) {
          data.push(cleanHex(res));
        }
      } catch (error) {
        console.log(error);
      }
    }
    console.log(data);
    setItems(data);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ paddingBottom: 20 }}>
        <h1 className="text-6xl font-bold">Accounts: {accounts}</h1>
        <h2 className="text-4xl font-bold">Contract: {CONTRACT}</h2>
      </div>
      <div>
        <table>
          <tr>
            <th>metadata URI</th>
          </tr>
          {items.map((i) => {
            return (
              <tr>
                <td>
                  <a href={i}>{i}</a>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}
