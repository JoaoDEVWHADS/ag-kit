# TeamTalk 5 SDK Events Catalog (`ClientEvent` & `TTMessage`)

> Complete reference of all SDK event notifications and message structures.

---

## 📡 `ClientEvent` Enum Reference

| Event Name | Value | Trigger Description |
| :--- | :--- | :--- |
| `CLIENTEVENT_NONE` | 0 | No event pending in queue. |
| `CLIENTEVENT_CON_SUCCESS` | 1 | Connection to server succeeded. |
| `CLIENTEVENT_CON_FAILED` | 2 | Connection attempt failed or timed out. |
| `CLIENTEVENT_CON_LOST` | 3 | Active connection lost. |
| `CLIENTEVENT_CMD_SUCCESS` | 4 | Server command executed successfully. |
| `CLIENTEVENT_CMD_PROCESSING_FAILED` | 5 | Server rejected command or returned error. |
| `CLIENTEVENT_USER_LOGGEDIN` | 6 | User logged in to server. |
| `CLIENTEVENT_USER_LOGGEDOUT` | 7 | User logged out of server. |
| `CLIENTEVENT_USER_JOINED_CHANNEL` | 8 | User entered channel. |
| `CLIENTEVENT_USER_LEFT_CHANNEL` | 9 | User exited channel. |
| `CLIENTEVENT_USER_TEXTMSG` | 10 | Text message received (channel, broadcast, or direct). |
| `CLIENTEVENT_USER_TYPING` | 11 | User typing status changed (v5.12+). |
| `CLIENTEVENT_USER_RECORD_MEDIAFILE`| 12 | Voice recording started or finished (`MFS_STARTED` / `MFS_FINISHED`). |
| `CLIENTEVENT_STREAM_MEDIAFILE` | 13 | Media file playback state changed (pause, resume, end). |
| `CLIENTEVENT_AUDIO_INPUT` | 14 | Raw audio input buffer captured from microphone. |
| `CLIENTEVENT_AUDIO_OUTPUT` | 15 | Raw audio output buffer ready for playback. |

---

## 📩 `TTMessage` Structure Breakdown

```cpp
typedef struct TTMessage {
    ClientEvent nClientEvent; // Event identifier
    int nCMDID;               // Command ID (if CMD_SUCCESS or CMD_FAILED)
    int nSourceID;            // Originating UserID or ChannelID
    
    // Event payloads (union or sub-structs)
    User user;
    Channel channel;
    TextMessage textmessage;
    MediaFileInfo mediafileinfo;
    AudioBlock audioblock;
} TTMessage;
```
