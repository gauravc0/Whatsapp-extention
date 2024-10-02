document.getElementById('saveLanguageButton').addEventListener('click', () => {
    const selectedLanguage = document.getElementById('language').value;
  
    chrome.storage.local.set({ preferredLanguage: selectedLanguage }, () => {
      console.log('Language set to ' + selectedLanguage);
    });
  
    // Inject the content script to WhatsApp Web
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: injectTranslateButton // Make sure the content script runs in WhatsApp context
      });
    });
  });
  
  function injectTranslateButton() {
    console.log("Content script injected!");
  }
  