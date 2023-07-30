import { useEffect, useRef, useState } from "react";
import { useToast} from "@chakra-ui/react";
import { BsWifi, BsWifiOff } from "react-icons/bs";

const OnlineStatusToast = () => {
  const toast = useToast();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const isFirstRender = useRef(true); // useRef will persist value across re-renders

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // skip the first render
      return;
    }

    const status = isOnline ? "Online" : "Offline";
    toast({
      title: `You are now ${status}`,
      status: isOnline ? "success" : "warning",
      position: "bottom-left",
      duration: 3000,
      isClosable: true,
      icon: isOnline ? <BsWifi size={20} /> : <BsWifiOff size={20} />
    });
  }, [isOnline, toast]);

  return null;
};

export default OnlineStatusToast;
