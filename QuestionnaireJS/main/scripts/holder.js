function uploadFileWithProgress(url, file, progressCallback) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Track upload progress
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        progressCallback(percentComplete);
      }
    });

    // Handle load and error events
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    });

    xhr.addEventListener("error", () => reject(new Error("Network error")));
    xhr.addEventListener("abort", () => reject(new Error("Upload aborted")));

    // Prepare and send the request
    const formData = new FormData();
    formData.append("file", file, file.name); // 'file' is the field name on the server

    xhr.open("POST", url, true);
    xhr.send(formData);
  });
}


// usage

const fileInput = document.getElementById('file-input');
const progressBar = document.getElementById('file-progress');

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    uploadFileWithProgress('/your-upload-endpoint', file, (progress) => {
      // Update your progress bar UI element
      progressBar.value = progress;
      console.log(`Uploaded ${progress}%`);
    })
    .then(response => {
      console.log('Upload complete:', response);
      alert('File uploaded successfully!');
    })
    .catch(error => {
      console.error(error);
      alert('Upload failed!');
    });
  }
});

// html

<label for="file-progress">File Upload Progress:</label>
<progress id="file-progress" value="0" max="100">0%</progress>
<button onclick="startProgress()">Start Upload</button>

