  document.addEventListener('DOMContentLoaded', async () => {
    const videoElement = document.getElementById('video');
    const canvasElement = document.getElementById('canvas');
    const detectedInfoElement = document.getElementById('detectedInfo');
    const context = canvasElement.getContext('2d');
    let currentStream;

    try {
      // Function to get the user media stream based on the selected camera
      const getUserMedia = async (deviceId) => {
        const constraints = {
          video: { deviceId: { exact: deviceId } }
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoElement.srcObject = stream;
        currentStream = stream;
        videoElement.play();
        captureFrames();
      };

      // Get available media devices and filter video input devices
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');

      // Use the first video input device by default
      const defaultDeviceId = videoDevices.length > 0 ? videoDevices[0].deviceId : null;

      // Toggle button click event handler
      document.getElementById('toggleCamera').addEventListener('click', async () => {
        if (currentStream) {
          // Stop the current stream
          currentStream.getTracks().forEach(track => track.stop());
        }

        // Find the next available video input device
        const currentIndex = videoDevices.findIndex(device => device.deviceId === currentStream.getVideoTracks()[0].getSettings().deviceId);
        const nextIndex = (currentIndex + 1) % videoDevices.length;
        const nextDeviceId = videoDevices[nextIndex].deviceId;

        // Get the user media stream for the selected device
        await getUserMedia(nextDeviceId);
      });

      // Use the default video input device
      await getUserMedia(defaultDeviceId);

    } catch (error) {
      console.error('Error accessing camera:', error);
    }

    function captureFrames() {
      setInterval(() => {
        videoElement.style.transform = 'scaleX(-1)';
        // Flip the canvas horizontally
        context.save();  // Save the current state
        context.scale(-1, 1);
        context.drawImage(videoElement, -canvasElement.width, 0, canvasElement.width, canvasElement.height);
        context.restore();  // Restore the original state

        const resizedCanvas = document.createElement('canvas');
        resizedCanvas.width = 640;  // Set your desired width
        resizedCanvas.height = 480;  // Set your desired height
        const resizedContext = resizedCanvas.getContext('2d');
        resizedContext.drawImage(videoElement, 0, 0, resizedCanvas.width, resizedCanvas.height);
        const resizedImageData = resizedCanvas.toDataURL('image/jpeg');

        // Construct the URL dynamically based on the current page's location
        const url = window.location.origin + '/generate_frames/';

        // Send imageDataURL to the Django backend using AJAX
        sendDataToBackend(resizedImageData, url);
      }, 100);
    }

    // Inside the sendDataToBackend function
    function sendDataToBackend(imageDataURL, url) {
      // Use AJAX to send the data to the Django backend
      const xhr = new XMLHttpRequest();

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // Handle response from the backend
            const data = JSON.parse(xhr.responseText);

            // Draw bounding boxes and text on the canvas
            drawBoundingBoxes(data.boxes, data.texts);

            detectedInfoElement.textContent = 'Detected Class: ' + data.texts;
          } else {
            console.error('Error sending data to backend. Status:', xhr.status);
          }
        }
      };

      const data = 'image=' + encodeURIComponent(imageDataURL);
      xhr.send(data);
    }

    // Function to draw bounding boxes and text on the canvas
    function drawBoundingBoxes(boxes, texts) {
      for (const box of boxes) {
        // Flip the x-coordinate to match the flipped canvas
        const flippedX = canvasElement.width - (box.x + box.width);

        context.beginPath();
        context.rect(flippedX, box.y, box.width, box.height);
        context.strokeStyle = 'red';
        context.lineWidth = 2;
        context.fillStyle = 'rgba(255, 0, 0, 0.1)';
        context.stroke();
        context.fillRect(flippedX, box.y, box.width, box.height);

        // Draw detected class text with shadow
        const text = texts;
        context.font = '16px Arial';

        // Draw shadow
        context.fillStyle = 'black';
        context.globalAlpha = 0.8; // Adjust the alpha value to control the shadow darkness
        context.fillText(text, flippedX + 2, box.y - 3);
        context.globalAlpha = 1; // Reset alpha value for subsequent drawings

        // Draw text
        context.fillStyle = 'white';
        context.fillText(text, flippedX, box.y - 5);
      }
    }

  });