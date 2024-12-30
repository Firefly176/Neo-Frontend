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
// import { Calendar } from "lucide-react";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { disconnect } from "../../store/reducer.js";
import { post, get } from "../../utils/api_helper.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const AcmeLogo = () => {
  // ... (AcmeLogo component remains unchanged)
};

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const userDetails = useSelector((state) => state.auth?.userDetails);
  const [loading, setLoading] = useState(false);
  // const token = useSelector((state) => state.auth?.userToken);

  const connectWallet = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        setLoading(true);
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
          setLoading(false);
          console.error("Authentication failed");
        }
      } catch (error) {
        setLoading(false);
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      setLoading(false);
      console.error("MetaMask is not installed");
    }
  };

  const disconnectWallet = async () => {
    setLoading(true);
    await get("/auth/logout");
    dispatch(disconnect());
    setLoading(false);
    Navigate("/");
  };

  return (
    <Navbar
      isBordered={true}
      maxWidth="full"
      className="py-4 px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40"
    >
      <NavbarBrand>
        <EventAvailableIcon className="mr-2" />
        <p className="font-bold text-inherit">Crypto Scheduler</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          {userDetails ? (
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  isLoading={loading}
                  isDisabled={loading}
                >
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
              isLoading={loading}
              isDisabled={loading}
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
