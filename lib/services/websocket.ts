export function initCryptoWebSocket(onMessage: (data: Record<string, string>) => void) {
    const ws = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum')
  
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      onMessage(data)
    }
  
    return ws
  }
  