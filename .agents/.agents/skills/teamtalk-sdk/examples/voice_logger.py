#!/usr/bin/env python3
"""
TeamTalk 5 Voice Logger Bot Example
Automatically records user voice streams in channels to formatted audio files.
"""

import sys
import time
import TeamTalk5 as tt

def main():
    client = tt.TeamTalk()
    
    if not client.connect("127.0.0.1", 10333, 10333, False):
        print("Connection failed!")
        return

    msg = tt.TTMessage()
    
    while True:
        if client.getMessage(msg, 1000):
            if msg.nClientEvent == tt.ClientEvent.CLIENTEVENT_CON_SUCCESS:
                client.doLogin("VoiceLoggerBot", "pass", "VoiceLogger", "1.0")
                
            elif msg.nClientEvent == tt.ClientEvent.CLIENTEVENT_CMD_SUCCESS:
                if msg.nCMDID == tt.ClientCommand.CMD_LOGIN:
                    client.doJoinChannelByID(1, "")
                    
            elif msg.nClientEvent == tt.ClientEvent.CLIENTEVENT_USER_JOINED_CHANNEL:
                user_id = msg.user.nUserID
                print(f"User {msg.user.szNickname} joined. Enabling voice recording...")
                # Configure custom storage dir and filename pattern (%username%_%counter%)
                client.setUserMediaStorageDir(
                    user_id,
                    "./recordings",
                    "%username%_%counter%",
                    tt.AudioFileFormat.AFF_CHANNELCODEC_FORMAT
                )

if __name__ == "__main__":
    main()
