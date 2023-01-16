import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Upload() {
  const [file, setFile] = useState(false);
  const [status, setStatus] = useState('Upload');

  const upload = (files, type) => {
    setStatus('Uploading...');
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'hsqe4h9m');

    axios
      .post('https://api.cloudinary.com/v1_1/dvwpbbisf/image/upload', formData)
      .then((Response) => {
        if (type === 'pic') {
          navigator.clipboard.writeText(
            Response.data.url
              .replace(/\.[^\/.]+$/, '')
              .replace('/upload/', '/upload/q_auto:eco/') + '.webp'
          );
          document.getElementById('file-input').value = '';
          setFile(false);
          showToast();
        }
      });
  };

  function showToast() {
    setStatus('Upload');
    var x = document.getElementById('toast');
    x.className = 'show';
    setTimeout(function () {
      x.className = x.className.replace('show', '');
    }, 3000);
  }

  useEffect(() => {
    const fileInput = document.getElementById('file-input');

    window.addEventListener('paste', (e) => {
      setFile(e.clipboardData.files);
      fileInput.files = e.clipboardData.files;
    });
  }, []);

  return (
    <div className='container'>
      <label className='upload-label'>
        <div className='upload-label-title'>
          <div className='upload-label-input'>
            <div className='upload-label-icon'>
              <div>Choose or Paste</div>
            </div>
          </div>
        </div>
        <input
          id='file-input'
          type='file'
          multiple
          accept='image/png, image/jpg, image/jpeg'
          onChange={(e) => {
            setFile(e.target.files);
            console.log(file);
          }}
        />
        <img
          className='image'
          src={
            file
              ? URL.createObjectURL(file[0])
              : 'http://res.cloudinary.com/dvwpbbisf/image/upload/q_auto:eco/v1662211159/cfcrzb6wuqrbgmvzz6ee.webp'
          }
          height='150px'
        />
        <div className='file-name'>{file ? file[0].name : 'Filename'}</div>
      </label>

      {status === 'Uploading...' ? (
        <button disabled={true} className='upload-button'>
          {status}
        </button>
      ) : (
        <button
          onClick={() => {
            upload(file, 'pic');
          }}
          disabled={file ? false : true}
          className='upload-button'
        >
          {status}
        </button>
      )}
      <div id='toast'>Uploaded & Link Copied!</div>
    </div>
  );
}
