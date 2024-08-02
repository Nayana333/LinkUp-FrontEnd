import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { socketBaseURL } from '../config';

export const useSocket = () => {
    // Define the state with Socket type or null
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (!socket) {
            // Type the newSocket as Socket
            const newSocket: Socket = io(socketBaseURL);
            setSocket(newSocket);
        }

        // Cleanup on component unmount
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [socket]);

    return { socket, setSocket };
};
