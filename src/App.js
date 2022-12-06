import { ethers, providers } from 'ethers';
import { Biconomy } from "@biconomy/mexa";
import { contractByteCode } from '../src/contract/bytecode'
import contractAbi from '../src/contract/abi.json'


import './App.css';

function App() {

  // let provider;
  let wallet;

  const biconomy = new Biconomy(window.ethereum, {
    apiKey: 'kWCBVTDt2.bef4e67e-f425-4828-98ce-691ffcd858e7',
    debug: true,
    contractAddresses: ['0x4ad8b97E772b51fbC8a2F81250C6BD7D565269f8'], // list of contract address you want to enable gasless on
  });

  biconomy.init();

  const connectToMetaMask = async () => {

    /* eslint-disable */
    const provider = new providers.Web3Provider(window.ethereum);
    wallet = provider.getSigner('0xa7C216e37bDDEd4C37F70F036b783B5181cc20A3');
    return wallet;
  }

  const deployContract = async () => {
    const wallet = await connectToMetaMask();
    const factory = new ethers.ContractFactory(contractAbi, contractByteCode, wallet);
    const contract = await factory.deploy();
    await contract.deployed();
    console.log(contract.address);
  }
  // console.log(contractAbi);

  const contractAddrerss = '0x4ad8b97E772b51fbC8a2F81250C6BD7D565269f8';
  //const wallet = await connectToMetaMask();


  const getMessages = async () => {
    console.log('getMessages', biconomy);
    const contract = new ethers.Contract(contractAddrerss, contractAbi, biconomy.ethersProvider);
    const messages = await contract._getMessage();
    console.log(messages);
  }

  const setMessages = async () => {
    //const wallet = await connectToMetaMask();



    console.log('setMessages');



    const provider = await biconomy.provider;
    const contractInstance = new ethers.Contract(
      contractAddrerss,
      contractAbi,
      biconomy.ethersProvider
    );
    let { data } = await contractInstance.populateTransaction._setMessage('yooooooo');
    let txParams = {
      data: data,
      to: '0x4ad8b97E772b51fbC8a2F81250C6BD7D565269f8',
      from: '0xa7C216e37bDDEd4C37F70F036b783B5181cc20A3',
      signatureType: "EIP712_SIGN",
    };
    await provider.send("eth_sendTransaction", [txParams]);
    // Listen to transaction updates:

    biconomy.on("txHashGenerated", (data) => {
      console.log(data);
      showSuccessMessage(`tx hash ${data.hash}`);
    });

    biconomy.on("txMined", (data) => {
      console.log(data);
    });


    biconomy.on("onError", (data) => {
      console.log(data);
    });

    biconomy.on("txHashChanged", (data) => {
      console.log(data);
    });

    // const contract = new ethers.Contract(contractAddrerss, contractAbi, wallet);
    // const messages = await contract._setMessage('Hello World second thrd');
    // console.log(messages);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getMessages}>Get Message</button>
        <button onClick={setMessages}>Set Message</button>

        <button onClick={deployContract}>Deploy Contract</button>
      </header>
    </div>
  );
}

export default App;
