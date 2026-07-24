# TeamTalk 5 Bot Architectures & Design Patterns

> Complete guide for building production-ready TeamTalk 5 bots: Media Streaming, Moderation, TTS Announcements, and Voice Logging.

---

## 🤖 Bot Architecture Types

```
                       +---------------------------+
                       |    TeamTalk 5 Server      |
                       +-------------+-------------+
                                     | (TCP / UDP)
                                     v
                       +-------------+-------------+
                       |  TeamTalk SDK Event Loop  |
                       +-------------+-------------+
                                     |
         +-------------------+-------+-------+-------------------+
         |                   |               |                   |
         v                   v               v                   v
+--------+-------+   +-------+-------+   +---+-----------+   +---+-----------+
|   Media Bot    |   | Moderation    |   | TTS Announce  |   | Voice Logger  |
|  (PCM Stream)  |   | (Admin/ACL)   |   | (Text-to-Speech) | | (Audio Store) |
+----------------+   +---------------+   +---------------+   +---------------+
```

---

## 📻 1. Media & Music Streaming Bot Pattern

### Design Requirements
1. Read audio source (MP3, WAV, FLAC, AAC, or Radio Stream).
2. Decode audio into uncompressed 16-bit PCM frames (e.g. 48kHz, Stereo or Mono).
3. Pump PCM frames at fixed intervals (e.g. 20ms = 960 samples/channel) using `insertAudioBlock`.

### Text Command Routing Framework
```python
# Command Router Pattern
def process_command(client, from_user_id, message_text):
    parts = message_text.strip().split()
    cmd = parts[0].lower()
    
    if cmd == "!play":
        url_or_file = parts[1] if len(parts) > 1 else ""
        start_playback(client, url_or_file)
    elif cmd == "!stop":
        stop_playback(client)
    elif cmd == "!volume":
        set_volume(int(parts[1]))
```

---

## 🛡️ 2. Moderation & Admin Bot Pattern

### Key Capabilities
- Listen for `CLIENTEVENT_USER_JOINED_CHANNEL`.
- Verify user rights using bitwise comparison:
  ```python
  is_admin = (user.nUserRights & tt.UserRight.USERRIGHT_ADMINISTRATOR) != 0
  ```
- Trigger `doKickUser` or `doBanUser` on unauthorized access or bad language in text messages.

---

## 🗣️ 3. TTS Announcement Bot Pattern

### Logic Flow
1. Convert event text ("User Joao joined the channel") to PCM audio using TTS engine.
2. Inject generated PCM audio block directly into TeamTalk channel audio stream.
