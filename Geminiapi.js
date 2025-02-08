// Declare userInput outside of the event listener function
let userInput = '';
document.querySelector('.buttons').style.visibility = 'hidden';

document.getElementById('userInputForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission
  document.getElementById('copyButton').innerText="copy";
  document.querySelector('.buttons').style.visibility = 'visible';
  // Show content loading text
  document.getElementById('responseContainer').textContent = 'Loading...';

  // Update userInput with the current input value
  userInput = document.getElementById('inputText').value;

  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCxrjWwKYDy9mAn3GwDbzxbxI6KsDeAHhY";
  const payload = {
    contents: [{
      parts: [{ text: userInput }]
    }]
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(data => {
    if (data.candidates && data.candidates.length > 0) {
      const content = data.candidates[0].content;
      console.log('Content:', content.parts[0].text);

      // Format the response content in a neat format
      let formattedContent = '';
      content.parts.forEach(part => {
        formattedContent += `<p>${part.text}</p>`;
      });

      document.getElementById('responseContainer').innerHTML = formattedContent;
    } else {
      console.log('No content found');
      document.getElementById('responseContainer').textContent = 'No content found';
    }
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('responseContainer').textContent = 'Error occurred';
  });
});




document.getElementById('clearButton').addEventListener('click', function() {
  // Clear the response container
  document.getElementById('responseContainer').textContent = '';
  document.getElementById('userInputForm').reset();
  document.getElementById('copyButton').innerText="copy";
});

document.getElementById('copyButton').addEventListener('click', function() {
  // Copy the response content to the clipboard
  const responseContent = document.getElementById('responseContainer').textContent;
  navigator.clipboard.writeText(responseContent);
  document.getElementById('copyButton').innerText="copied";

});
document.getElementById('themeSwitcher').addEventListener('click', function() {
    const body = document.body;
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        document.getElementById('themeSwitcher').innerText="dark-theme";
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        document.getElementById('themeSwitcher').innerText="light-theme";
    }
});