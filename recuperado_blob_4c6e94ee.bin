#!/usr/bin/env python3
"""
TeamTalk 5 Media Streaming Bot Example
Demonstrates connecting, joining a channel, and streaming PCM audio into TeamTalk.
"""

import sys
import time
import TeamTalk5 as tt

def main():
    client = tt.TeamTalk()
    
    server_ip = "127.0.0.1"
    tcp_port = 10333
    udp_port = 10333
    
    print("Connecting to TeamTalk server...")
    if not client.connect(server_ip, tcp_port, udp_port, False):
        print("Failed to connect!")
        return

    msg = tt.TTMessage()
    logged_in = False
    
    while True:
        if client.getMessage(msg, 1000):
            if msg.nClientEvent == tt.ClientEvent.CLIENTEVENT_CON_SUCCESS:
                print("Connection established. Logging in...")
                client.doLogin("MediaBot", "password", "MediaStreamer", "1.0")
                
            elif msg.nClientEvent == tt.ClientEvent.CLIENTEVENT_CMD_SUCCESS:
                if msg.nCMDID == tt.ClientCommand.CMD_LOGIN:
                    print("Logged in successfully!")
                    logged_in = True
                    client.doJoinChannelByID(1, "")
                    client.enableVoiceTransmission(True)
                    
            elif msg.nClientEvent == tt.ClientEvent.CLIENTEVENT_USER_TEXTMSG:
                print(f"Message received: {msg.textmessage.szMessage}")

        # Sleep briefly if no event
        time.sleep(0.01)

if __name__ == "__main__":
    main()
