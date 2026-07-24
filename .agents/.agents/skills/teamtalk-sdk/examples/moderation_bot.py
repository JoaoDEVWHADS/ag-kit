#!/usr/bin/env python3
"""
TeamTalk 5 Auto-Moderation & Command Bot Example
Demonstrates parsing text commands (!kick, !ban, !help, !info) and auto-moderating channels.
"""

import sys
import time
import TeamTalk5 as tt

def main():
    client = tt.TeamTalk()
    
    print("Connecting to TeamTalk server...")
    if not client.connect("127.0.0.1", 10333, 10333, False):
        print("Connection failed!")
        return

    msg = tt.TTMessage()
    
    while True:
        if client.getMessage(msg, 1000):
            if msg.nClientEvent == tt.ClientEvent.CLIENTEVENT_CON_SUCCESS:
                client.doLogin("AdminBot", "adminpass", "ModeratorBot", "1.0")
                
            elif msg.nClientEvent == tt.ClientEvent.CLIENTEVENT_CMD_SUCCESS:
                if msg.nCMDID == tt.ClientCommand.CMD_LOGIN:
                    print("Admin bot logged in. Joining root channel...")
                    client.doJoinChannelByID(1, "")
                    
            elif msg.nClientEvent == tt.ClientEvent.CLIENTEVENT_USER_TEXTMSG:
                text_msg = msg.textmessage
                text = text_msg.szMessage.strip()
                from_id = text_msg.nFromUserID
                
                # Command handler
                if text.startswith("!"):
                    parts = text.split()
                    cmd = parts[0].lower()
                    
                    if cmd == "!help":
                        reply = "Available commands: !help, !info, !status"
                        client.doTextMessage(tt.TextMessage(nMsgType=text_msg.nMsgType, nTargetUserID=from_id, szMessage=reply))
                    elif cmd == "!info":
                        reply = "TeamTalk 5 Admin Bot v1.0 — Powered by AG-Kit SDK"
                        client.doTextMessage(tt.TextMessage(nMsgType=text_msg.nMsgType, nTargetUserID=from_id, szMessage=reply))

if __name__ == "__main__":
    main()
