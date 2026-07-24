# C++ TeamTalkLib (Native API) Reference Guide

> Complete reference for C/C++ native TeamTalk SDK development using `TeamTalk.h`.

---

## ⚙️ Native Client Initialization

```cpp
#include "TeamTalk.h"

// Create native client instance
TTInstance ttInst = TT_InitTeamTalk();

if (ttInst) {
    // Connect to server
    TT_Connect(ttInst, "127.0.0.1", 10333, 10333, 0, FALSE);
}
```

---

## 🔄 C++ Event Polling Loop

```cpp
TTMessage msg;
while (TT_GetMessage(ttInst, &msg, 1000)) {
    switch (msg.nClientEvent) {
        case CLIENTEVENT_CON_SUCCESS:
            TT_DoLogin(ttInst, "CppBot", "password", "MyCppApp", "1.0");
            break;
            
        case CLIENTEVENT_CMD_SUCCESS:
            if (msg.nCMDID == CMD_LOGIN) {
                TT_DoJoinChannelByID(ttInst, 1, "");
            }
            break;
            
        case CLIENTEVENT_USER_TEXTMSG:
            printf("Received text message from UserID %d: %s\n", 
                   msg.textmessage.nFromUserID, 
                   msg.textmessage.szMessage);
            break;
    }
}
```

---

## 🧹 Memory & Cleanup

```cpp
TT_Logout(ttInst);
TT_Disconnect(ttInst);
TT_CloseTeamTalk(ttInst);
```
