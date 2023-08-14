"use client";

import Head from "next/head";
import { Login } from "@/services/Web3Service";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {

  const { push } = useRouter();
  const [message, setMessage] = useState("");

  function btnLoginClick() {
    setMessage("Conectando com a MetaMask...aguarde...");
    Login()
      .then(wallet => push("/timeline"))
      .catch(err => {
        console.error(err);
        setMessage(err.message);
      })
  }

  return (
    <>
      <Head>
        <title>CrypTwitter | Login</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container px-4 py-5">
        <div className="flex items-center gap-5 py-5 max-sm:flex-col">

          <div className="flex flex-col justify-center text-center">
            <h1 className="text-2xl font-bold mb-3">CrypTwitter</h1>
            <p className="leading-normal">Sua rede social descentralizada.</p>
            <p className="leading-normal mb-3">Autentique-se com a sua carteira, escreva suas mensagens e saiba o que está acontecendo no mundo.</p>
            <div className="flex gap-2 justify-center items-center">
              <button
                type="button"
                className="bg-slate-400 p-4 rounded-xl justify-center items-center flex gap-2"
                onClick={btnLoginClick}
              >
                <Image src="/metamask.svg" width={32} height={32} alt="metamask logo" />
                Conectar com a MetaMask
              </button>
            </div>
            <p className="message">{message}</p>
          </div>
          <div>
            <Image
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3432&q=80"
              className="d-block mx-lg-auto img-fluid"
              width="700"
              height="500"
              alt="people happy"
            />
          </div>
        </div>
      </div>
    </>
  )
}
