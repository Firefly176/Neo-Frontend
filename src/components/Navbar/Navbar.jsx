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
import { setUserToken, disconnect } from "../../store/reducer.js";
import { post } from "../../utils/api_helper.js";
import { useNavigate } from "react-router-dom";

export const AcmeLogo = () => {
  // ... (AcmeLogo component remains unchanged)
};

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const userDetails = useSelector((state) => state.auth?.userDetails);
  const token = useSelector((state) => state.auth?.userToken);

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
        const signature = await web3Instance.eth.personal.sign(
          message,
          address,
          "",
        );

        // Send the signature, message, and address to the backend for verification
        const response = await post("/auth/web3", {
          signature,
          message,
          address,
        });

        if (response.status) {
          // dispatch(setUserToken(response.token));
          // Store the token in localStorage for persistence
          // localStorage.setItem("auth_token", response.token);
          Navigate("/home");
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
    localStorage.removeItem("auth_token");
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
          {userDetails && token ? (
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">
                  Connected: {userDetails.walletAddress.slice(0, 6)}...
                  {userDetails.walletAddress.slice(-4)}
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onPress={disconnectWallet}
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
