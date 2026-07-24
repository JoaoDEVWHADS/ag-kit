# Java & Android JNI TeamTalk SDK Reference Guide

> Complete reference for Java and Android TeamTalk 5 development (`TeamTalkBase.java`).

---

## ☕ Client Setup in Java / Android

```java
import dk.bearware.TeamTalkBase;
import dk.bearware.TTMessage;
import dk.bearware.ClientEvent;

TeamTalkBase ttclient = new TeamTalkBase();

// Connect
if (ttclient.connect("127.0.0.1", 10333, 10333, 0)) {
    System.out.println("Connected!");
}

// Event Loop
TTMessage msg = new TTMessage();
while (true) {
    if (ttclient.getMessage(msg, 1000)) {
        if (msg.nClientEvent == ClientEvent.CLIENTEVENT_CON_SUCCESS) {
            ttclient.doLogin("JavaBot", "pass", "JavaClient", "1.0");
        }
    }
}
```

---

## 🎙️ Audio Recording & Directory Configuration

```java
// Setup user media storage dir with filename formatting (v5.8.1+)
ttclient.setUserMediaStorageDir(
    userID, 
    "/sdcard/TeamTalkRecordings", 
    "%username%_%counter%", 
    AudioFileFormat.AFF_CHANNELCODEC_FORMAT
);
```
