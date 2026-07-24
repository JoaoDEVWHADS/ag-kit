---
name: teamtalk-sdk
description: Comprehensive TeamTalk 5 SDK development knowledge base (v5.8.1 to latest) for C/C++, Python, C# (.NET), and Java/Android. Event loops, sound streaming, channel management, bot creation, and voice logging.
---

# TeamTalk 5 SDK Knowledge Base & Master Guide

> Complete reference for building applications and bots using TeamTalk 5 SDK (v5.8.1 foundation to latest releases).

---

## 📚 Multi-Language API Mapping

| Feature | C / C++ (`TeamTalk.h`) | Python (`TeamTalk5.py`) | C# (`TeamTalk.cs`) | Java (`TeamTalkBase.java`) |
| :--- | :--- | :--- | :--- | :--- |
| **Instance** | `TT_InitTeamTalk()` | `TeamTalk5.TeamTalk()` | `new TeamTalk()` | `new TeamTalkBase()` |
| **Connect** | `TT_Connect()` | `tt.connect()` | `tt.Connect()` | `tt.connect()` |
| **Login** | `TT_Login()` | `tt.doLogin()` | `tt.DoLogin()` | `tt.doLogin()` |
| **Join Channel** | `TT_DoJoinChannel()` | `tt.doJoinChannel()` | `tt.DoJoinChannel()` | `tt.doJoinChannel()` |
| **Send Message** | `TT_DoTextMessage()` | `tt.doTextMessage()` | `tt.DoTextMessage()` | `tt.doTextMessage()` |
| **Enable Voice** | `TT_EnableVoiceTransmission()` | `tt.enableVoiceTransmission()` | `tt.EnableVoiceTransmission()` | `tt.enableVoiceTransmission()` |
| **Audio Storage**| `TT_SetUserMediaStorageDir()` | `tt.setUserMediaStorageDir()` | `tt.SetUserMediaStorageDir()` | `tt.setUserMediaStorageDir()` |

---

## 🔄 Core Event-Driven Workflow

### 1. Connection & Login Sequence
```python
# Python TeamTalk 5 SDK Example
import TeamTalk5 as tt

client = tt.TeamTalk()

# Connect to server
if client.connect("127.0.0.1", 10333, 10333, 0):
    print("Connected to TeamTalk server!")

# Login
msg = tt.TTMessage()
cmd_id = client.doLogin("BotUser", "password", "MyBot", "1.0")

# Event Loop
while True:
    if client.getMessage(msg, 1000):
        if msg.nCMDID == cmd_id and msg.nClientEvent == tt.ClientEvent.CLIENTEVENT_CMD_SUCCESS:
            print("Logged in successfully!")
            # Join root or custom channel
            client.doJoinChannelByID(1, "")
```

### 2. Audio Streaming & Media Files (v5.8.1+)
- **Pause & Resume Media Streams (v5.16+):** `TT_PauseLocalMediaFile()`, `TT_ResumeLocalMediaFile()`.
- **Custom Voice Recording (v5.8.1+):**
  ```java
  // Java / Android JNI Example
  ttclient.setUserMediaStorageDir(userID, "/sdcard/recordings", "%username%_%counter%", AudioFileFormat.AFF_CHANNELCODEC_FORMAT);
  ```

---

## 📜 Version Evolution & Compatibility

### Version 5.8.1 (Baseline Foundation)
- Custom pattern string for recorded audio files (`%username%_%counter%`).
- Support for Speex, Opus, CELT, and raw PCM audio streams.
- Full administration rights (`UserRight` flags for Kick, Ban, Channel Create).

### Version 5.12 - 5.16+ (Latest Enhancements)
- **Typing Indicator Events:** `CLIENTEVENT_USER_TYPING`.
- **Classroom Broadcast Controls:** Audio transmission toggles for classroom channels.
- **Media File Controls:** Stream pause/resume support (`#3344`).
- **Continuous Voice Logger:** Auto-archiving of channel communications.

---

## 🤖 Bot Architecture Patterns

1. **Media Bot:** Reads audio source (MP3/WAV/PCM) and injects into TeamTalk audio pipeline using `TT_InsertAudioBlock()`.
2. **Moderation Bot:** Listens for `CLIENTEVENT_USER_LOGGEDIN` and `CLIENTEVENT_USER_JOINED_CHANNEL`, checks user rights or banlists, and issues `TT_DoKickUser()` / `TT_DoBanUser()`.
3. **TTS / Announcement Bot:** Plays audio alerts or text messages on events (user joined, left, channel created).
