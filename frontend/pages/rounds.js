import { motion } from "framer-motion";
import Head from 'next/head'
import Link from 'next/link'
import { rounds } from '../data/rounds'
import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'
const siwe = require('siwe');
import { ethers } from 'ethers'

const domain = "localhost";
const origin = "https://localhost/login";

function createSiweMessage (address, statement) {
  const siweMessage = new siwe.SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: '1',
    chainId: '1'
  });
  return siweMessage.prepareMessage();
}

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const variantItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

const Aside = () => (
  <motion.aside
  transition={{ duration: 0.2 }}
  initial={{ x: -88}}
        animate={{ x: 0 }}

  className="hidden sm:flex sm:flex-col">
  <Link href="/">
    <a
      className="inline-flex items-center justify-center h-20 w-20 bg-gradient-to-r from-green-500 to-blue-700 hover:bg-blue-500 focus:bg-blue-500 text-white"
    >
      Retro
    </a>
    </Link>
    <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
      <motion.nav
      initial="hidden"
      animate="visible"
        variants={container}
      className="flex flex-col mx-4 my-6 space-y-4">

      <Link href="/rounds">
        <a
          className="inline-flex items-center justify-center py-3 text-purple-600 bg-white rounded-xl"
        >
          <span className="sr-only">Dashboard</span>
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </a>
        </Link>

        <a
          className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-xl"
        >
          <span className="sr-only">Dashboard</span>
          <svg
          aria-hidden="true"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
          >
          <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
          </svg>
        </a>

      </motion.nav>
      <div className="inline-flex items-center justify-center h-20 w-20 border-t border-gray-700">
        <button className="p-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
          <span className="sr-only">Settings</span>
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  </motion.aside>
);

const Header = (props) => (
  <header className="flex items-center h-20 px-6 sm:px-10 bg-white">
    <button className="block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full">
      <span className="sr-only">Menu</span>
      <svg
        aria-hidden="true"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h7"
        />
      </svg>
    </button>
    <div className="relative w-full max-w-md sm:-ml-2 flex items-center">
      <input
        type="text"
        role="search"
        placeholder="Search..."
        className="py-2 pl-10 pr-4 w-full border placeholder-gray-400 focus:bg-gray-50 rounded-lg"
      />
    </div>
    <div className="flex flex-shrink-0 items-center ml-auto">
      <button className="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg" onClick={props.address ? null : () => props.signIn()}>
        <span className="sr-only">User Menu</span>
        <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
          <span className="font-semibold">{props.address ? props.address.slice(0, 6) + '...' + props.address.slice(38): 'Connect wallet'}</span>
          <span className="text-sm text-gray-600">{props.address ? 'Connected' : null}</span>
        </div>
      </button>

    </div>
  </header>
);

function Cards(cardClick) {
  const cards = rounds.map((round) =>
    <div className="flex items-center p-8 bg-white rounded-xl shadow-md hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-700 hover:text-white" onClick={() => cardClick(round.id)} key={round.id}>
    <div className="flex flex-col">
      <span className="font-semibold">{round.name}</span>
      <span className="text-gray-400">Nominations open</span>
    </div>
    <span className="ml-auto">19/04/2022</span>
    </div>
  );
  return (
    <>{cards}</>
  );
}


const Main = (props) => (
  <motion.main

  transition={{ duration: 0.3, delay: 0}}
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 15, opacity: 0 }}
  className="p-6 sm:p-10 space-y-6">
    <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
      <div className="mr-6">
        <h1 className="text-4xl font-semibold mb-2">Rounds</h1>
      </div>
      <div className="flex flex-wrap items-start justify-end -mb-3">
        <Link href="/new-round">
        <a className="inline-flex px-5 py-3 text-white bg-gradient-to-r from-blue-700 to-purple-600 hover:from-purple-700 hover:to-blue-800 rounded-xl shadow-md ml-6 mb-3">
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Create new round
        </a>
        </Link>
      </div>
    </div>

    <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {Cards(props.cardClick)}
    </section>

    <section className="text-right font-semibold text-gray-500">
      Made with {String.fromCodePoint('0x2764')} by the Oxford Team
    </section>
  </motion.main>
);

function Layout(props) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Aside></Aside>

      <div className="flex-grow text-gray-800">
        <Header signIn={props.signIn} address={props.address}></Header>
        <Main cardClick={props.cardClick}></Main>
      </div>
    </div>
  );
}

export default function Rounds() {
  const [address, setAddress] = useState('');
  const router = useRouter()
  function cardClick(id) {
    router.push('round-detail?id=' + id)
  }

  async function logIn() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await ethereum.request({method: 'eth_requestAccounts'});
    const signer = provider.getSigner();
    const address = await signer.getAddress()
    const signedMessage = await signer.signMessage(createSiweMessage(
      address,
      "Welcome to Retro."
    ));
    window.localStorage.setItem('signedMessage', signedMessage);
    window.localStorage.setItem('userAddress', address)
    setAddress(address);
  }

  useEffect(() => {
    setAddress(window.localStorage.getItem("userAddress"))
  }, []);

  return (
    <>
    <Head>
      <title>Create Next App</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout cardClick={cardClick} signIn={logIn} address={address}></Layout>
    </>
  );
}