document.addEventListener("DOMContentLoaded", function () {
    const generateBtn = document.getElementById("generate-btn");
    const musicPlayer = document.getElementById("music-player");
    const textInput = document.getElementById("text-input");

    generateBtn.addEventListener("click", async () => {
        const textPrompt = textInput.value.trim();

        if (!textPrompt) {
            alert("Please enter a description for the music.");
            return;
        }

        generateBtn.innerText = "Generating...";
        generateBtn.disabled = true;

        try {
            // Call Hugging Face API (Example: Meta's MusicGen)
            const response = await fetch("https://api-inference.huggingface.co/models/facebook/musicgen-small", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer YOUR_HUGGINGFACE_API_KEY",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ inputs: textPrompt })
            });

            if (!response.ok) throw new Error("Failed to generate music!");

            const result = await response.json();

            if (result.audio && result.audio.length > 0) {
                const audioUrl = result.audio[0];
                musicPlayer.src = audioUrl;
                musicPlayer.play();
            } else {
                alert("Music generation failed. Try again.");
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Error generating music. Check console.");
        } finally {
            generateBtn.innerText = "Generate Music";
            generateBtn.disabled = false;
        }
    });
});
