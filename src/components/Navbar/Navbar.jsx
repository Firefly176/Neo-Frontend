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
import { setAccountAddress, disconnect } from "../../store/reducer.js";
import { post } from "../../utils/api_helper.js";
import { useNavigate } from "react-router-dom";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const account = useSelector((state) => state.metamask.accountAddress);

  const connectWallet = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await web3Instance.eth.getAccounts();
        await post("/api/v1/auth/web3/", { address: accounts[0] });

        dispatch(setAccountAddress(accounts[0]));
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.error("MetaMask is not installed");
    }
  };

  const disconnectWallet = () => {
    dispatch(disconnect());
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
          {account ? (
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
              {account
                ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
                : "Connect Wallet"}
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarComponent;
