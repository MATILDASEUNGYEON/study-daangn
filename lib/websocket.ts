let socket: WebSocket | null = null;

export const connectSocket = (user_id: number) => {
    socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
        socket?.send(
            JSON.stringify({
                type: 'JOIN',
                user_id,
            }),
        );
    };

    return socket;
};

export const sendMessage = (message: object) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    }
};
