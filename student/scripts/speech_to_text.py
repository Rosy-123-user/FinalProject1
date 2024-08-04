import requests
import base64

def speech_to_text_direct(audio_file_path, output_file, api_key):
    url = f"https://speech.googleapis.com/v1/speech:recognize?key={api_key}"
    
    headers = {
        "Content-Type": "application/json; charset=utf-8",
    }
    
    with open(audio_file_path, "rb") as audio_file:
        audio_content = base64.b64encode(audio_file.read()).decode("utf-8")
    
    data = {
        "config": {
            "encoding": "LINEAR16",
            "sampleRateHertz": 16000,
            "languageCode": "en-US",
            "enableAutomaticPunctuation": True,
        },
        "audio": {"content": audio_content},
    }

    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    
    transcript = response.json()["results"][0]["alternatives"][0]["transcript"]
    
    with open(output_file, "w") as f:
        f.write(transcript)
    print(f'Transcript written to file "{output_file}"')
