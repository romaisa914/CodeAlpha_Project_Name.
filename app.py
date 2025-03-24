from flask import Flask, request, jsonify, send_file
import requests
import os

app = Flask(__name__)

# Replace this with your Hugging Face API key
HUGGINGFACE_API_KEY = "your_huggingface_api_key_here"
MODEL_URL = "https://api-inference.huggingface.co/models/facebook/musicgen-small"

@app.route("/generate-music", methods=["POST"])
def generate_music():
    data = request.json
    prompt = data.get("prompt", "")

    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    headers = {"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"}
    response = requests.post(MODEL_URL, headers=headers, json={"inputs": prompt})

    if response.status_code != 200:
        return jsonify({"error": "Failed to generate music"}), 500

    # Save audio file
    audio_path = "generated_music.wav"
    with open(audio_path, "wb") as f:
        f.write(response.content)

    return send_file(audio_path, as_attachment=True, mimetype="audio/wav")

if __name__ == "__main__":
    app.run(debug=True)
