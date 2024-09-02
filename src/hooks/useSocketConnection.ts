import { io } from "socket.io-client";

const useSocketConnection = ({ url }: { url: string }) => {
  const socket = io(url);

  return [socket];
};

export default useSocketConnection;
