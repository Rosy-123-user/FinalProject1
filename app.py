from flask import Flask, request, jsonify, send_file, render_template, send_from_directory
import os
from dotenv import load_dotenv
from student.scripts.text_to_speech import text_to_speech
from student.scripts.speech_to_text import speech_to_text_direct
from student.scripts.extract_audio import extract_audio

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__, static_folder='student', template_folder='student')

# Set your API key directly here or import it from .env
API_KEY = os.getenv('API_KEY')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/disability')
def accessibility():
    return render_template('disability.html')

@app.route('/<path:filename>')
def send_static(filename):
    return send_from_directory(app.static_folder, filename)

@app.route('/api/text-to-speech', methods=['POST'])
def handle_text_to_speech():
    text = request.json.get('text')
    output_file = 'output.mp3'
    text_to_speech(text, output_file, API_KEY)
    return send_file(output_file, mimetype='audio/mpeg')

@app.route('/api/speech-to-text', methods=['POST'])
def handle_speech_to_text():
    video_file = request.files['video']
    video_file_path = os.path.join('uploads', video_file.filename)
    video_file.save(video_file_path)

    audio_output_path = 'extracted_audio.wav'
    extract_audio(video_file_path, audio_output_path)

    # Convert audio to LINEAR16 format if necessary
    converted_audio_path = 'extracted_audio_linear16.wav'
    os.system(f'ffmpeg -i {audio_output_path} -ar 16000 -ac 1 -c:a pcm_s16le {converted_audio_path}')

    stt_output = 'transcript.txt'
    speech_to_text_direct(converted_audio_path, stt_output, API_KEY)

    with open(stt_output, 'r') as file:
        transcript = file.read()
    return jsonify({'transcript': transcript})

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True)
