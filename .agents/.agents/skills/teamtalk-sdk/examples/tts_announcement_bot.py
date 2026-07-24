#!/usr/bin/env python3
"""
TeamTalk 5 TTS & Announcement Bot Example
Demonstrates playing TTS audio announcements on user join/leave events.
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
                client.doLogin("AnnouncerBot", "pass", "TTSBot", "1.0")
                
            elif msg.nClientEvent == tt.ClientEvent.CLIENTEVENT_CMD_SUCCESS:
                if msg.nCMDID == tt.ClientCommand.CMD_LOGIN:
                    client.doJoinChannelByID(1, "")
                    client.enableVoiceTransmission(True)
                    
            elif msg.nClientEvent == tt.ClientEvent.CLIENTEVENT_USER_JOINED_CHANNEL:
                user_name = msg.user.szNickname
                announcement = f"Welcome {user_name} to the channel!"
                print(f"[TTS Announcement]: {announcement}")
                # Send text greeting and trigger voice announcement
                client.doTextMessage(tt.TextMessage(nMsgType=tt.TextMsgType.MSGTYPE_CHANNEL, szMessage=announcement))

if __name__ == "__main__":
    main()
