"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { addTweet } from "@/services/Web3Service";
import Image from "next/image";

export default function NewTweet() {

  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const { push } = useRouter();

  function btnPublishClick() {
    setMessage("Enviando seu tweet para a blockchain...aguarde...");
    addTweet(text)
      .then(result => {
        setText("");
        setMessage("Tweet foi enviado. Aguarde um minuto para atualizar.");
      })
      .catch(err => {
        setMessage(err.message);
        console.error(err);
      })
  }

  useEffect(() => {
    const wallet = localStorage.getItem("wallet");
    if (!wallet)
      push("/");
  }, [])

  return (
    <>
      <div className="flex flex-col justify-between max-sm:flex-col">
        <div className="flex flex-col justify-center items-center">
          <Image src="/metamask.svg" height={64} width={64} alt="metamask Logo" />
          <h1>
            Bem vindo de volta!
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p>O que está acontecendo?</p>
          <textarea className="my-3"
            value={text}
            onChange={evt => setText(evt.target.value)}
          />
          <div>
            <button
              type="button"
              onClick={btnPublishClick}
              className="bg-slate-400 px-2 py-1 rounded-lg hover:bg-slate-00"
            >
              Enviar
            </button>
            <span className="message">
              {message}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}