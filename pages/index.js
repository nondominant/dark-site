import Head from "next/head";
import Cors from "cors";
import Web3 from "web3";
import { useEffect, useState } from "react";
import { BigNumber } from "bignumber.js";
import axios from "axios";
import { parse } from "node-html-parser";
import { uint256ToNum, numToUint256 } from "../util/helpers";
export default function Home() {
  const [result, setResult] = useState("");
  const [accounts, setAccounts] = useState("");
  const [CONTRACT, setContract] = useState(
    "0x05Fee3B8e939acBb4E8073D784e3EC0977509770" // or try this "0x57a204aa1042f6e66dd7730813f4024114d74f37"
  );
  const [items, setItems] = useState([]);
  const web3 = new Web3(Web3.givenProvider);

  function cleanHex(hex) {
    return web3.utils.hexToUtf8(hex).substring(33);
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
          const cleaned = cleanHex(res);
          const result = await axios.get(cleaned);
          if (result.data) {
            const metadata = result.data;
            metadata["symbol"] = "ETH";
            metadata["primary_sale_happened"] = false;
            metadata["seller_fee_basis_points"] = 10;
            metadata["uri"] = cleaned;
            metadata["properties"] = {
              creators: [
                {
                  address: "xEtQ9Fpv62qdc1GYfpNReMasVTe9YW5bHJwfVKqo72u",
                  share: 100,
                },
              ],
            };
            console.log(metadata);
            data.push(cleaned);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    console.log(data);
    setItems(data);
  }, []);

  useEffect(async () => {});

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ paddingBottom: 20 }}>
        <h1 className="text-6xl font-bold">Accounts: {accounts}</h1>
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
