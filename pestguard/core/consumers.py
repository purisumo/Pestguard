# consumers.py
import asyncio
import cv2
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class VideoConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        # This is where you process the incoming data, e.g., frame processing
        # Replace the following line with your actual video processing logic
        frame_data = b'\x00\x01\x02'  # Example: replace with actual video frame data

        await self.send(text_data=json.dumps({
            'type': 'video.frame',
            'frame': frame_data.decode('utf-8'),
        }))
