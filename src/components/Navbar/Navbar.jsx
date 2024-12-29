import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import { setAccountAddress, setToken, disconnect } from "../../store/reducer.js";
import { post } from "../../utils/api_helper.js";
import { useNavigate } from "react-router-dom";

export const AcmeLogo = () => {
  // ... (AcmeLogo component remains unchanged)
};

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const account = useSelector((state) => state.auth?.accountAddress);
  const token = useSelector((state) => state.auth?.token);

  const connectWallet = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await web3Instance.eth.getAccounts();
        const address = accounts[0];

        // Create a message to sign
        const message = `Sign this message to authenticate: ${Date.now()}`;

        // Request signature from user
        const signature = await web3Instance.eth.personal.sign(message, address, '');

        // Send the signature, message, and address to the backend for verification
        const response = await post("/api/v1/auth/web3", { signature, message, address });
        console.log(response);

        if (response.token) {
          dispatch(setAccountAddress(address));
          dispatch(setToken(response.token));
          // Store the token in localStorage for persistence
          localStorage.setItem('token', response.token);
        } else {
          console.error("Authentication failed");
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.error("MetaMask is not installed");
    }
  };

  const disconnectWallet = () => {
    dispatch(disconnect());
    // Remove the token from localStorage
    localStorage.removeItem('token');
    Navigate("/");
  };

  return (
    <Navbar isBordered={true} maxWidth="2xl">
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">Crypto Scheduler</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          {account && token ? (
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">
                  Connected: {account.slice(0, 6)}...{account.slice(-4)}
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onClickCapture={disconnectWallet}
                >
                  Disconnect
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              color="primary"
              href="#"
              variant="flat"
              onPress={connectWallet}
            >
              Connect Wallet
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarComponent;
