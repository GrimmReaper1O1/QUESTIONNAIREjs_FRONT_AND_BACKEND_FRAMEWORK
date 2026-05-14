let submitButton = document.getElementById('uploadBtn')
submitButton.addEventListener('click', (e, i) =>
    
{ e.preventDefault();
    submitFile(e); });


const submitFile = (e) => {
    e.preventDefault();
    
    let file = document.getElementById('file');
    console.log(file.files);
    let position = document.getElementById('position');
    let option = 'appendix';
    let info = document.getElementById('info');
    let obj = {position: position.value, option: option, info: info.value}
    const progressBar = document.getElementById('file-progress');
  console.log(position.value);
  file = file.files[0];
  if (file) {

    uploadFileWithProgress('http://localhost:5000/api/auth/uploadFile/upload', obj, file, (progress) => {
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
}

