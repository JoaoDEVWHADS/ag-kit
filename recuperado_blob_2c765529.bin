# TeamTalk 5 SDK Threading, Proxies & High-Performance Bots

> Complete reference for Thread Safety, Proxy Configuration, and Multi-Instance High-Density Bot Deployments.

---

## 🧵 1. Threading Model & Thread Safety

TeamTalk SDK instances maintain an internal state machine.

### Rules for Multi-Threaded Bots
1. **Single Event Loop Thread:** Always call `TT_GetMessage()` or `client.getMessage()` from a single dedicated thread.
2. **Worker Thread Synchronization:** Queue commands (e.g. text messages or audio blocks) from background threads to a thread-safe queue before calling `TT_*` API methods.

```python
# Python Thread-Safe Command Queue Example
import queue
import threading
import TeamTalk5 as tt

command_queue = queue.Queue()

def background_worker():
    # Push actions to queue from background thread
    command_queue.put(("say", "Hello from worker thread!"))

def event_loop_thread(client):
    msg = tt.TTMessage()
    while True:
        # Process API messages
        if client.getMessage(msg, 50):
            pass
            
        # Drain background thread commands
        while not command_queue.empty():
            action, data = command_queue.get()
            if action == "say":
                client.doTextMessage(tt.TextMessage(nMsgType=tt.TextMsgType.MSGTYPE_CHANNEL, szMessage=data))
```

---

## 🌐 2. Proxy Configuration (`TT_SetProxy`)

Configure SOCKS5 or HTTP proxies inside the TeamTalk SDK for firewall traversal:

```python
# SOCKS5 Proxy Configuration Example
proxy = tt.ServerProxy()
proxy.nProxyType = tt.ProxyType.PROXY_SOCKS5
proxy.szProxyAddress = "192.168.1.100"
proxy.nProxyPort = 1080
proxy.szUsername = "proxyuser"
proxy.szPassword = "proxypassword"

client.setProxy(proxy)
```

---

## ⚡ 3. High-Density Multi-Instance Bot Optimization

Running 50+ bot instances on a single server:

### Best Practices
- **Disable Video & Desktop Receiving:** Disable video decoding on bots that only require audio or text:
  ```python
  client.enableVideoTransmission(False)
  ```
- **CPU Throttling & Polling Timeout:** Use a 50ms-100ms timeout on `getMessage(msg, 50)` to prevent 100% CPU spinning.
- **Buffer Reuse:** Allocate audio PCM byte buffers once and reuse them across calls to `insertAudioBlock`.
