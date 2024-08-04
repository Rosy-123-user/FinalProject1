

function openSlideIn(page) {
  fetch(page)
    .then(response => response.text())
    .then(data => {
      const slideInContainer = document.getElementById('slide-in-container');
      slideInContainer.innerHTML = data;
      const slideIn = slideInContainer.querySelector('.slide-in');
      slideIn.style.width = '100%';
      slideInContainer.style.display = 'block';
    })
    .catch(error => console.error('Error loading slide-in content:', error));
}

function closeSlideIn(id) {
  const slideIn = document.getElementById(id);
  if (slideIn) {
    slideIn.style.width = '0';
    setTimeout(() => {
      slideIn.parentElement.style.display = 'none';
      slideIn.remove();
    }, 500); // Remove from DOM after transition
  }
}

function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');
}

// playing video or stopping and writing words
let recognition;
let isRecognizing = false;

function playVideo() {
    const video = document.getElementById('lecture-video');
    video.play();
    startRecognition();
}

function pauseVideo() {
    const video = document.getElementById('lecture-video');
    video.pause();
    stopRecognition();
}

function stopVideo() {
    const video = document.getElementById('lecture-video');
    video.pause();
    video.currentTime = 0;
    stopRecognition();
}

function startRecognition() {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            isRecognizing = true;
            console.log('Speech recognition started');
        };

        recognition.onresult = (event) => {
            let transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');
            document.getElementById('subtitles').innerText = transcript;
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

        recognition.onend = () => {
            isRecognizing = false;
            console.log('Speech recognition ended');
            if (isRecognizing) {
                recognition.start();
            }
        };

        recognition.start();
    } else {
        console.error('Speech recognition not supported in this browser.');
    }
}

function stopRecognition() {
    if (recognition && isRecognizing) {
        recognition.stop();
        isRecognizing = false;
    }
}


// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    document.querySelector('.submit-button').addEventListener('click', saveSettings);

    // Check for saved settings on page load
    applySavedSettings();
});

// // high contrast
// function toggleHighContrast() {
//   document.body.classList.toggle('high-contrast');
// }
// // Event listener for high contrast toggle button
// document.getElementById('high-contrast-toggle').addEventListener('click', toggleHighContrast);


// function setFontSize(size) {
//   document.body.className = size;
// }


// for the audios  and text stuff

document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  document.querySelector('.submit-button').addEventListener('click', saveSettings);

  // Check for saved settings on page load
  applySavedSettings();
});

function saveSettings() {
  console.log('saveSettings function called');

  const textToSpeech = document.getElementById('text-to-speech').checked;
  const highContrast = document.getElementById('high-contrast-toggle').checked;
  const fontSize = document.getElementById('font-size').value;

  // Save settings to localStorage
  localStorage.setItem('textToSpeech', textToSpeech);
  localStorage.setItem('highContrast', highContrast);
  localStorage.setItem('fontSize', fontSize);

  applySettings(textToSpeech, highContrast, fontSize);
}

function applySettings(textToSpeech, highContrast, fontSize) {
  if (highContrast) {
      document.body.classList.add('high-contrast');
  } else {
      document.body.classList.remove('high-contrast');
  }

  document.body.className = fontSize;

  if (textToSpeech) {
      speakText(document.body.innerText);
  } else {
      cancelSpeech();
  }
}

function applySavedSettings() {
  const textToSpeech = localStorage.getItem('textToSpeech') === 'true';
  const highContrast = localStorage.getItem('highContrast') === 'true';
  const fontSize = localStorage.getItem('fontSize') || 'medium';

  document.getElementById('text-to-speech').checked = textToSpeech;
  document.getElementById('high-contrast').checked = highContrast;
  document.getElementById('font-size').value = fontSize;

  applySettings(textToSpeech, highContrast, fontSize);
}

function speakText(text) {
  if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
  } else {
      console.error('Text-to-Speech not supported.');
  }
}

function cancelSpeech() {
  if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
  }
}

function addSubtitlesToVideo(videoElement) {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.interimResults = true;
  recognition.continuous = true;
  recognition.lang = 'en-US';

  let subtitleContainer = document.createElement('div');
  subtitleContainer.id = 'subtitles';
  videoElement.parentNode.insertBefore(subtitleContainer, videoElement.nextSibling);

  recognition.onresult = (event) => {
      let transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');

      subtitleContainer.innerText = transcript;
  };

  recognition.start();

  videoElement.onplay = () => recognition.start();
  videoElement.onpause = () => recognition.stop();
  videoElement.onended = () => recognition.stop();
}

document.addEventListener('DOMContentLoaded', (event) => {
  const videoElement = document.querySelector('video');
  if (videoElement) {
      addSubtitlesToVideo(videoElement);
  }
});


























// AI chat bot script

// Function to close the chat

document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  // Function to close the chat
  function closeChat() {
    console.log('closeChat called');
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
      chatContainer.style.display = 'none';
    } else {
      console.error('Chat container not found');
    }
  }

  // Function to toggle the size of the chat window
  function toggleEnlarge() {
    console.log('toggleEnlarge called');
    const chatContainer = document.querySelector('.chat-container');
    const enlargeBtn = document.querySelector('.chat-enlarge-btn');
    
    if (chatContainer) {
      if (chatContainer.classList.contains('chat-enlarged')) {
        chatContainer.classList.remove('chat-enlarged');
        enlargeBtn.innerText = '[ ]';
      } else {
        chatContainer.classList.add('chat-enlarged');
        enlargeBtn.innerText = '] [';
      }
    } else {
      console.error('Chat container not found');
    }
  }

  // Function to open the chat window
  function openChat(chatId) {
    console.log('Opening chat with ID:', chatId);
    const chatWindows = document.querySelectorAll('.chat-window');
    chatWindows.forEach(window => window.style.display = 'none');
    const chatWindow = document.getElementById(chatId);
    if (chatWindow) {
      chatWindow.style.display = 'flex';
      document.querySelector('.conversation-list').style.display = 'none';
      console.log('Chat window found and displayed:', chatId);
    } else {
      console.error('Chat window not found:', chatId);
    }
  }

  // Function to go back to the conversation list
  function goBack() {
    const chatWindows = document.querySelectorAll('.chat-window');
    chatWindows.forEach(window => window.style.display = 'none');
    const conversationList = document.querySelector('.conversation-list');
    if (conversationList) {
      conversationList.style.display = 'block';
    } else {
      console.error('Conversation list not found');
    }
  }

  // Make the functions accessible globally
  window.closeChat = closeChat;
  window.toggleEnlarge = toggleEnlarge;
  window.openChat = openChat;
  window.goBack = goBack;
});
