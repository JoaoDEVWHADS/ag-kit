# TeamTalk 5 SDK 3D Sound Positioning & PCM Buffer Ingestion Guide

> Guide for binaural 3D audio positioning, raw PCM audio block insertion, and audio processing callbacks in TeamTalk 5 SDK.

---

## 🎧 3D Sound Positioning (`TT_SetUser3DSoundPosition`)

TeamTalk SDK supports binaural 3D positional audio. You can set 3D coordinates (X, Y, Z) for any remote user relative to the listener.

```python
# Python 3D Sound Positioning Example
# user_id: ID of remote speaker
# x, y, z: Float coordinates in meters
client.setUser3DSoundPosition(user_id, 2.5, 0.0, 5.0)
```

```cpp
// C++ Native API
TT_SetUser3DSoundPosition(ttInst, nUserID, 2.5f, 0.0f, 5.0f);
```

---

## 🔊 Raw PCM Audio Block Insertion (`TT_InsertAudioBlock`)

Inject uncompressed raw PCM audio samples directly into the TeamTalk audio pipeline (for custom synthesizers, TTS engines, or media playback).

### Struct Definition (`AudioBlock`)
- `lpRawAudio` -> Array of 16-bit signed PCM samples.
- `nSamples` -> Number of samples per channel.
- `nSampleRate` -> Sample rate (e.g., 16000, 32000, 48000 Hz).
- `nChannels` -> Number of audio channels (1 = Mono, 2 = Stereo).

```python
# Ingest PCM Frame (Python Example)
# pcm_data: bytes of 16-bit PCM (e.g. 960 samples @ 48kHz mono = 1920 bytes)
client.insertAudioBlock(pcm_data, len(pcm_data), 48000, 1)
```

---

## 🎛️ Audio Processing Callbacks (`CLIENTEVENT_AUDIO_INPUT`)

To intercept raw audio samples recorded from the sound card before encoding:

```cpp
// C++ Intercept Audio Callback
void OnAudioInput(TTInstance ttInst, const AudioBlock* pAudioBlock) {
    // Process or manipulate pAudioBlock->lpRawAudio samples in real time
}
```
