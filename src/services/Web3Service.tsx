import Web3 from "web3";
import ABI from "@/services/ABI.json"

declare global {
  interface Window {
    ethereum: Ethereum | undefined;
  }
}

interface Ethereum {
  isMetaMask?: boolean;
  request?: (args: Web3APIPayload) => Promise<any>; // Adjust the type here
}

interface Web3APIPayload {
  method: string;
  params?: any[];
}

// const CONTRACT = process.env.CONTRACT_ADDRESS


export async function Login(): Promise<string> {
  if (!window.ethereum) {
    throw new Error("No metamask found")
  }

  const web3 = new Web3(window.ethereum);

  const account = await web3.eth.requestAccounts();

  if (!account || !account.length) {
    throw new Error("Account not found or not authorized.")
  }

  localStorage.setItem("wallet", account[0]);

  return account[0];
}

async function getContract(): Promise<any> {
  if (!window.ethereum) {
    throw new Error("No metamask found")
  }

  const web3 = new Web3(window.ethereum);
  const from = localStorage.getItem("wallet") as string;
  // console.log(CONTRACT);

  const contract = new web3.eth.Contract(ABI, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, { from });
  console.log(contract);

  return contract
}

export async function addTweet(text: string) {
  try {
    const contract = await getContract();
    return contract.methods.addTweet(text).send();

  } catch (error) {
    console.error(error);

  }
}

export async function changeUsername(newName: string) {
  try {
    const contract = await getContract();
    return contract.methods.changeUsername(newName).send();

  } catch (error) {
    console.error(error);

  }
}

export async function getLastTweets(page: any) {
  try {
    const contract = await getContract();
    console.log(contract._methods.getLastTweets(page).call());

    const tweets = await contract._methods.getLastTweets(page).call();
    return tweets.map(tweet => {
      return { ...tweet }
    }).filter(tweet => tweet.text !== "");

  } catch (error) {
    console.error(error);

  }
}