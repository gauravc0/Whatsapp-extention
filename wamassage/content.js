chrome.storage.local.get("preferredLanguage", (data) => {
    const preferredLanguage = data.preferredLanguage || "en";
  
    const inputField = document.querySelector('div[contenteditable="true"]');
  
    if (inputField) {
      inputField.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
  
          const message = inputField.innerText;
  
          // Use Google Translate's web interface to translate the message
          const googleTranslateUrl = `https://translate.google.com/?sl=auto&tl=${preferredLanguage}&text=${encodeURIComponent(message)}&op=translate`;
  
          // Open an iframe for Google Translate (works in some cases if allowed)
          const iframe = document.createElement("iframe");
          iframe.style.display = "none";
          iframe.src = googleTranslateUrl;
          document.body.appendChild(iframe);
  
          iframe.onload = () => {
            try {
              const translatedText = iframe.contentWindow.document.querySelector('.result-shield-container').innerText;
  
              if (translatedText) {
                // Set the translated text into the input field
                inputField.innerText = translatedText;
  
                // Simulate "Enter" key press to send the message
                const event = new KeyboardEvent("keydown", {
                  bubbles: true,
                  cancelable: true,
                  keyCode: 13,
                });
                inputField.dispatchEvent(event); // Trigger send
  
                // Clean up
                document.body.removeChild(iframe);
              }
            } catch (error) {
              console.error("Translation failed: ", error);
            }
          };
        }
      });
    }
  });
  