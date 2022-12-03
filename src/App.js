import { ethers, providers } from 'ethers';
import { contractByteCode } from '../src/contract/bytecode'
import contractAbi from '../src/contract/abi.json'


import './App.css';

function App() {

  // let provider;
  let wallet;

  const connectToMetaMask = async () => {
    
     /* eslint-disable */
    const provider = new providers.Web3Provider(window.ethereum);
    wallet = provider.getSigner();
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

  const contractAddrerss = '0x867fb1D4154Ee0ec484589594a887f32FAa3daDa';
  //const wallet = await connectToMetaMask();


  const getMessages = async () => {
    console.log('getMessages');
    const contract = new ethers.Contract(contractAddrerss, contractAbi, wallet);
    const messages = await contract._getMessage();
    console.log(messages);
  }

  const setMessages = async () => {
    console.log('getMessages');
    const contract = new ethers.Contract(contractAddrerss, contractAbi, wallet);
    const messages = await contract._setMessage('Hello World');
    console.log(messages);
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
