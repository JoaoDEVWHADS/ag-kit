# TeamTalk 5 SDK Functions, Structs, Enums & Flags Reference

> Complete low-level catalog of TeamTalk 5 C-API / SDK functions, error codes, and permission flags.

---

## 🛠️ Core SDK Functions (`TT_*`)

### Client Lifecycle
- `TT_InitTeamTalk()` -> Initializes native TeamTalk instance. Returns `TTInstance`.
- `TT_CloseTeamTalk(TTInstance ttInst)` -> Frees instance and releases native resources.
- `TT_Connect(TTInstance ttInst, const char* szHostAddr, int nTcpPort, int nUdpPort, int nEncryptedTcp, int nEncryptedUdp)` -> Connects to server.
- `TT_Disconnect(TTInstance ttInst)` -> Disconnects from server.
- `TT_Login(TTInstance ttInst, const char* szNickname, const char* szPassword, const char* szAppTitle, const char* szVersion)` -> Sends login credentials.
- `TT_Logout(TTInstance ttInst)` -> Logs out from server.

### Channels & Permissions
- `TT_DoJoinChannel(TTInstance ttInst, const Channel* lpChannel)` -> Joins channel.
- `TT_DoJoinChannelByID(TTInstance ttInst, int nChannelID, const char* szPassword)` -> Joins channel by ID.
- `TT_DoLeaveChannel(TTInstance ttInst)` -> Leaves current channel.
- `TT_DoMakeOperator(TTInstance ttInst, int nChannelID, int nUserID)` -> Grants channel operator status.

---

## 🔐 User Rights Flags (`UserRight`)

Bitwise flags passed in `User.nUserRights`:

```cpp
#define USERRIGHT_NONE                     0x00000000
#define USERRIGHT_MULTI_CHANNEL           0x00000001
#define USERRIGHT_VIEW_ALL_USERS          0x00000002
#define USERRIGHT_CREATE_TEMPORARY_CHANNELS 0x00000004
#define USERRIGHT_CREATE_PERMANENT_CHANNELS 0x00000008
#define USERRIGHT_UPLOAD_FILES            0x00000010
#define USERRIGHT_DOWNLOAD_FILES          0x00000020
#define USERRIGHT_TRANSMIT_VOICE          0x00000040
#define USERRIGHT_TRANSMIT_VIDEOCAPTURE   0x00000080
#define USERRIGHT_TRANSMIT_DESKTOP        0x00000100
#define USERRIGHT_TRANSMIT_DESKTOP_INPUT  0x00000200
#define USERRIGHT_TRANSMIT_MEDIAFILE_AUDIO0x00000400
#define USERRIGHT_TRANSMIT_MEDIAFILE_VIDEO0x00000800
#define USERRIGHT_KICK_USERS              0x00001000
#define USERRIGHT_BAN_USERS               0x00002000
#define USERRIGHT_MOVE_USERS              0x00004000
#define USERRIGHT_OPERATOR_ENABLE         0x00008000
#define USERRIGHT_ADMINISTRATOR           0x00010000
```

---

## ⚠️ Client Error Codes (`ClientError`)

| Error Code | Constant | Meaning |
| :--- | :--- | :--- |
| `0` | `MOK` | Operation succeeded. |
| `1` | `MERR_UNKNOWN` | Unknown native SDK error. |
| `2` | `MERR_NOT_CONNECTED` | Client is not connected to a server. |
| `3` | `MERR_NOT_LOGGEDIN` | Client is connected but not logged in. |
| `4` | `MERR_SYNTAX_ERROR` | Command parameter syntax error. |
| `5` | `MERR_MAX_COMMANDS_EXCEEDED` | Command rate limit exceeded. |
| `6` | `MERR_ALREADY_CONNECTED` | Connection already active. |
