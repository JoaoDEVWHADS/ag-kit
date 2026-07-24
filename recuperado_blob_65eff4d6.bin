# TeamTalk 5 Audio Codecs & Sound Troubleshooting Guide

> Reference guide for configuring audio codecs (Opus/Speex), sample rates, bitrates, and sound devices across all TeamTalk SDK languages.

---

## 🎵 Audio Codec Configuration

### 1. Opus Codec (Recommended for high quality & low latency)
TeamTalk supports two Opus modes:
- **Opus Voice:** Optimized for speech at lower bitrates (8 kbps to 64 kbps).
- **Opus Music:** Fullband stereo music streaming at higher bitrates (64 kbps to 512 kbps).

```python
# Python Codec Configuration Example
codec = tt.AudioCodec()
codec.nCodec = tt.Codec.CODEC_OPUS

# Opus settings
codec.opus.nApplication = tt.OpusApplication.OPUS_APPLICATION_AUDIO  # Audio/Music
codec.opus.nSampleRate = 48000  # 48 kHz
codec.opus.nChannels = 2        # Stereo
codec.opus.nBitRate = 128000    # 128 kbps
codec.opus.nComplexity = 10     # Max quality
```

---

## 🔊 Sound Systems & Drivers

| Operating System | Sound System APIs | Notes |
| :--- | :--- | :--- |
| **Windows** | DirectSound, WASAPI | WASAPI offers lowest latency on Windows 10/11. |
| **Linux** | ALSA, PulseAudio, JACK | ALSA or PulseAudio are standard for Linux bots. |
| **macOS** | CoreAudio | Low latency native macOS driver. |
| **Android** | OpenSL ES, AAudio | High compatibility across Android devices. |

---

## 🛠️ Common Errors & Fixes

1. **`MFS_STARTED` / `MFS_FINISHED` Events:**
   - Always wait for `CLIENTEVENT_USER_RECORD_MEDIAFILE` to confirm recording status when saving audio blocks to disk.
2. **Buffer Underruns / Crackling Audio:**
   - Ensure PCM frame sizes match the codec frame duration (e.g. 20ms at 48kHz = 960 samples per channel).
3. **No Sound Transmitted:**
   - Verify `tt.enableVoiceTransmission(True)` has been called and the user has `USERRIGHT_TRANSMIT_VOICE` rights in the channel.
