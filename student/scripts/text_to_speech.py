import requests
import json

def text_to_speech(text, output_file, api_key):
    url = f"https://texttospeech.googleapis.com/v1/text:synthesize?key={api_key}"
    
    headers = {
        "Content-Type": "application/json; charset=utf-8",
    }
    
    data = {
        "input": {"text": text},
        "voice": {"languageCode": "en-US", "ssmlGender": "NEUTRAL"},
        "audioConfig": {"audioEncoding": "MP3"},
    }

    # Print the request details for debugging
    print("Sending request to API:")
    print("URL:", url)
    print("Headers:", headers)
    print("Data:", json.dumps(data, indent=2))
    
    response = requests.post(url, headers=headers, json=data)
    
    # Check for HTTP errors
    try:
        response.raise_for_status()
    except requests.exceptions.HTTPError as e:
        print(f"HTTP error occurred: {e}")
        print("Response content:", response.content.decode("utf-8"))
        return

    audio_content = response.json().get("audioContent")

    if not audio_content:
        print("Error: No audio content returned.")
        print("Response content:", response.content.decode("utf-8"))
        return

    with open(output_file, "wb") as out:
        out.write(audio_content.encode("ISO-8859-1"))
    print(f'Audio content written to file "{output_file}"')
