function uploadFileWithProgress(url, info, file, progressCallback) {
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
    formData.append("file", file, file.name); // 'file' is the field name on the 
    // server
    formData.append('subjectId', JSON.parse(sessionStorage.getItem('subjectId')));
    formData.append('info', info.info);
    formData.append('type', info.option);
    formData.append('position', info.position);
    xhr.open("POST", url, true);
    xhr.send(formData);
  });
}

const back = (e) => {
    e.preventDefault();
        let params = new URLSearchParams(window.location.search);
        let numeral = params.get('alter');
        console.log(numeral, params);
        if (numeral === '1') {
        location.href = '/main/alterSubject.html';
        } else {
          location.href = '/main/fillSubject.html';
        }

}