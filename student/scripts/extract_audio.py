from moviepy.editor import VideoFileClip

def extract_audio(video_file_path, audio_output_path):
    video = VideoFileClip(video_file_path)
    video.audio.write_audiofile(audio_output_path)
    print(f'Audio extracted to file "{audio_output_path}"')
