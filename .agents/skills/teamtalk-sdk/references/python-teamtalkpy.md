# TeamTalkPy (Python SDK) Reference Guide

> Complete reference for developing Python applications and bots using `TeamTalkPy` (`TeamTalk5.py`).

---

## 🐍 Module Setup & Initialization

```python
import TeamTalk5 as tt

# Create TeamTalk client instance
client = tt.TeamTalk()
```

---

## 📡 Connection & Event Handling

```python
# Connect to TeamTalk server
server_ip = "127.0.0.1"
tcp_port = 10333
udp_port = 10333
encrypted = False

if client.connect(server_ip, tcp_port, udp_port, encrypted):
    print("Connection initiated...")

# Event Polling Loop
msg = tt.TTMessage()
while True:
    if client.getMessage(msg, 1000): # 1000ms timeout
        if msg.nClientEvent == tt.ClientEvent.CLIENTEVENT_CON_SUCCESS:
            print("Connected to server successfully!")
            # Trigger login
            client.doLogin("BotUser", "password", "MyPythonBot", "1.0")
        
        elif msg.nClientEvent == tt.ClientEvent.CLIENTEVENT_CMD_SUCCESS:
            if msg.nCMDID == tt.ClientCommand.CMD_LOGIN:
                print("Login successful! My User ID:", client.getMyUserID())
                # Join root channel (ID 1)
                client.doJoinChannelByID(1, "")
        
        elif msg.nClientEvent == tt.ClientEvent.CLIENTEVENT_USER_TEXTMSG:
            user_msg = msg.textmessage
            if user_msg.nMsgType == tt.TextMsgType.MSGTYPE_CHANNEL:
                print(f"[{user_msg.nFromUserID}]: {user_msg.szFromUsername}: {user_msg.szMessage}")
```

---

## 🔊 Audio & Voice Functions

- **Enable/Disable Microphone Transmission:**
  ```python
  client.enableVoiceTransmission(True)
  ```
- **Insert Raw PCM Audio Block (Media Player):**
  ```python
  # sample_rate: e.g. 48000, channels: 1 or 2, pcm_data: bytes
  client.insertAudioBlock(pcm_bytes, len(pcm_bytes), sample_rate, channels)
  ```
- **Custom Voice Recording (v5.8.1+):**
  ```python
  # Set directory and file pattern (%username%_%counter%)
  client.setUserMediaStorageDir(user_id, "/path/to/recordings", "%username%_%counter%", tt.AudioFileFormat.AFF_CHANNELCODEC_FORMAT)
  ```
