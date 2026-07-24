# TeamTalk 5 SDK File & Audio Storage Pipelines Guide

> Complete reference for user media storage configuration, filename pattern formatting, and audio formats.

---

## 💾 `TT_SetUserMediaStorageDir` API Reference

Configure automatic recording of user voice streams directly from the SDK.

```cpp
// C++ Native Function Signature
INT32 TT_SetUserMediaStorageDir(
    TTInstance ttInst,
    INT32 nUserID,
    const char* szFolder,
    const char* szFileNamePattern,
    AudioFileFormat nAudioFileFormat
);
```

---

## 🏷️ Filename Formatting Pattern Macros (v5.8.1+)

| Macro | Description | Example Output |
| :--- | :--- | :--- |
| `%username%` | Nickname of the speaking user | `JoaoDEV` |
| `%counter%` | Zero-padded incremental counter | `000000001` |
| `%userid%` | User ID integer | `12` |
| `%channel%` | Channel name | `Lobby` |

**Example Pattern:** `%username%_%counter%` -> `JoaoDEV_000000001.ogg`

---

## 🎵 `AudioFileFormat` Enum

```cpp
typedef enum AudioFileFormat {
    AFF_NONE = 0,                    // Disable recording
    AFF_WAVE_FORMAT = 1,             // Uncompressed PCM Wave (.wav)
    AFF_CHANNELCODEC_FORMAT = 2,     // Ogg Vorbis / Opus matching channel codec
    AFF_MP3_FORMAT = 3               // MP3 compressed audio (.mp3)
} AudioFileFormat;
```
