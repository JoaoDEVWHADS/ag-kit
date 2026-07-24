# C# / .NET TeamTalk SDK Reference Guide

> Complete reference for developing Windows C# / .NET applications using `TeamTalk.cs` (`TeamTalk.NET`).

---

## 🔷 Initialization & Event Handlers

```csharp
using BearWare;
using System;

class Program
{
    static void Main(string[] args)
    {
        TeamTalk tt = new TeamTalk();

        // Connect
        if (tt.Connect("127.0.0.1", 10333, 10333, 0))
        {
            Console.WriteLine("Connecting to TeamTalk...");
        }

        TTMessage msg = new TTMessage();
        while (true)
        {
            if (tt.GetMessage(msg, 1000))
            {
                switch (msg.nClientEvent)
                {
                    case ClientEvent.CLIENTEVENT_CON_SUCCESS:
                        tt.DoLogin("CSharpBot", "pass", "DotNetClient", "1.0");
                        break;

                    case ClientEvent.CLIENTEVENT_CMD_SUCCESS:
                        if (msg.nCMDID == ClientCommand.CMD_LOGIN)
                        {
                            Console.WriteLine("Logged in!");
                            tt.DoJoinChannelByID(1, "");
                        }
                        break;

                    case ClientEvent.CLIENTEVENT_USER_TEXTMSG:
                        Console.WriteLine($"[{msg.textmessage.szFromUsername}]: {msg.textmessage.szMessage}");
                        break;
                }
            }
        }
    }
}
```

---

## 🎧 Sound Device Configuration in C#

```csharp
// Get input sound devices
SoundDevice[] inputDevs = tt.GetSoundInputDevices();
foreach (var dev in inputDevs)
{
    Console.WriteLine($"Device ID: {dev.nDeviceID}, Name: {dev.szDeviceName}");
}

// Init sound device
tt.InitSoundInputDevice(inputDevs[0].nDeviceID);
```
