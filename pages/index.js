import Head from "next/head";
import Cors from "cors";
import Web3 from "web3";
import { useEffect, useState } from "react";

export default function Home() {
  const [result, setResult] = useState("");
  const [accounts, setAccounts] = useState("");

  useEffect(async () => {
    const web3 = new Web3(Web3.givenProvider);
    const network = await web3.eth.net.getNetworkType();
    console.log(network); // should give you main if you're connected to the main network via metamask...
    await window.ethereum.enable();
    const acc = await web3.eth.getAccounts();
    console.log(acc)
    setAccounts(acc);
    const res = await web3.eth.call({
      to: "0xa7206d878c5c3871826dfdb42191c49b1d11f466",
      data: "0x0e89341c0000000000000000000000000000000000000000000000000000000000000001",
    });
    console.log(web3.utils.hexToUtf8(res).substring(33));
    setResult(res);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-6xl font-bold">Accounts: {accounts}</h1>
      <h1 className="text-6xl font-bold">Result: {result}</h1>
    </div>
  );
}
