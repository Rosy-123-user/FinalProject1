import sys
import os

# Add the student/scripts directory to the system path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from scripts.text_to_speech import text_to_speech
from scripts.speech_to_text import speech_to_text_direct
from scripts.extract_audio import extract_audio

def main():
    # Single API Key
    api_key = "AIzaSyDx8R5tsBHSwVRv1jYLpgUoTD4NbwD0OBY"

    # Example usage for Text-to-Speech
    text = "Hello, world! This is a sample text-to-speech conversion."
    tts_output = "output.mp3"
    text_to_speech(text, tts_output, api_key)

    # Extract audio from video
    video_file_path = "student\lecture_video.mp4"
    audio_output_path = "extracted_audio.wav"
    extract_audio(video_file_path, audio_output_path)

    # Example usage for Speech-to-Text
    stt_output = "transcript.txt"
    speech_to_text_direct(audio_output_path, stt_output, api_key)

if __name__ == "__main__":
    main()
