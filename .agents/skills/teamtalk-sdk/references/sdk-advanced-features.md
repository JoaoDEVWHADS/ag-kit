# TeamTalk 5 SDK Advanced Features Reference Guide

> Complete reference for File Transfers, Server Admin via SDK, Desktop Remote Input, and SDK Licensing.

---

## 📂 1. File Transfer API (`TT_DoSendFile` / `TT_DoRecvFile`)

### Uploading a File to a Channel
```python
# Python SDK File Upload Example
channel_id = 1
file_path = "/path/to/document.pdf"

# Initiates file transfer to channel
file_id = client.doSendFile(channel_id, file_path)
```

### Event Handling for Transfers
```python
# Event notification for file upload/download progress
elif msg.nClientEvent == tt.ClientEvent.CLIENTEVENT_FILE_TRANSFER:
    transfer = msg.filetransfer
    print(f"Transfer ID: {transfer.nTransferID}, Bytes Transferred: {transfer.nBytesTransferred}/{transfer.nFileSize}")
```

---

## 👑 2. Server Administration API via SDK

### User Account Registration (`TT_DoRegisterUser`)
```python
# Create new user account on server programmatically
user_account = tt.UserAccount()
user_account.szUsername = "NewUser"
user_account.szPassword = "Password123"
user_account.nUserRights = tt.UserRight.USERRIGHT_MULTI_CHANNEL | tt.UserRight.USERRIGHT_TRANSMIT_VOICE

client.doRegisterUser(user_account)
```

### Dynamic Channel Property Update (`TT_DoUpdateChannel`)
```python
# Update channel properties dynamically from bot
chan = client.getChannel(channel_id)
chan.szName = "Updated Channel Name"
chan.nMaxUsers = 50

client.doUpdateChannel(chan)
```

---

## 🖥️ 3. Desktop Remote Input Control (`TT_SendDesktopInput`)

Inject mouse and keyboard events into remote desktop sessions via SDK:

```python
# Inject Desktop Input Event
desktop_input = tt.DesktopInput()
desktop_input.nUserID = target_user_id
desktop_input.nInputType = tt.DesktopInputType.DESKTOPINPUT_MOUSE_MOVE
desktop_input.nCursorX = 500
desktop_input.nCursorY = 300

client.sendDesktopInput(desktop_input)
```

---

## 🔑 4. SDK Licensing & SSL Verification

```python
# Set License Key (Required for Commercial/Custom SDK builds)
client.setLicense("LicenseeName", "LicenseKey12345")
```
