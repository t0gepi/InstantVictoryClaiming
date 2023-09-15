// ==UserScript==
// @name          ClaimVictoryBot
// @version       1.0
// @description   Automatically Claim Victory in Lichess Games
// @author        t0gepi
// @match         *://lichess.org/*
// @run-at        document-start
// @grant         none
// ==/UserScript==

let webSocket = window.WebSocket;
const webSocketProxy = new Proxy(webSocket, {
    construct: function (target, args) {
        let wrappedWebSocket = new target(...args);
        wrappedWebSocket.addEventListener("message", function (event) {
            let message = JSON.parse(event.data);
            if(message.d && message.d == true && message.t && typeof message.t === 'string' && message.t == 'gone') {
                wrappedWebSocket.send(JSON.stringify({
                    t: "resign-force"
                }));
            }
        });
        return wrappedWebSocket;
    }
});
window.WebSocket = webSocketProxy;
