import "@opengsn/contracts/src/ERC2771Recipient.sol";
// import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

// OR MyContract is ERC2771Context
contract MyContract is ERC2771Recipient {
    string public message;
    string public version = '1';


    /** 
     * Set the trustedForwarder address either in constructor or 
     * in other init function in your contract
     */ 
// OR constructor(address _trustedForwarder) public ERC2771Context(_trustedForwarder)
    constructor() public {
        address trustedForwarder = 0x84a0856b038eaAd1cC7E297cF34A7e72685A8693;
    }
    
    
    /**
     * OPTIONAL
     * You should add one setTrustedForwarder(address _trustedForwarder)
     * method with onlyOwner modifier so you can change the trusted
     * forwarder address to switch to some other meta transaction protocol
     * if any better protocol comes tomorrow or the current one is upgraded.
     */
    
    /** 
     * Override this function.
     * This version is to keep track of BaseRelayRecipient you are using
     * in your contract. 
     */
    // function versionRecipient(string memory _version) external view override returns (string memory) {
    //     version = _version;
    //     return version;
    // }

    function _setMessage(string memory _newMessage) private{
        message = _newMessage;
    }

    function _getMessage() public view returns(string memory){
        return message;
    }
}