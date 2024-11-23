async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const progressBar = document.getElementById('progressBar');
    if (!fileInput.files.length) {
        alert("Please select a file to upload.");
        return;
    }

    const file = fileInput.files[0];
    const chunkSize = 10 * 1024 * 1024; // 10MB
    const totalChunks = Math.ceil(file.size / chunkSize);
    let uploadedChunks = 0;

    progressBar.style.display = 'block';
    progressBar.innerHTML = `<div class="progress-bar-inner"></div>`;
    const progressBarInner = progressBar.querySelector('.progress-bar-inner');

    for (let start = 0; start < file.size; start += chunkSize) {
        const chunk = file.slice(start, start + chunkSize);

        const formData = new FormData();
        formData.append('file', chunk, file.name);

        try {
            await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            uploadedChunks++;
            const progress = Math.round((uploadedChunks / totalChunks) * 100);
            progressBarInner.style.width = `${progress}%`;
        } catch (error) {
            alert(`Error uploading chunk: ${error.message}`);
            return;
        }
    }

    alert('File uploaded successfully!');
    progressBar.style.display = 'none';
    fetchFileList(); // Refresh the available files list after upload
}

function setupDownload() {
    const fileNameInput = document.getElementById('fileName');
    const downloadLink = document.getElementById('downloadLink');

    fileNameInput.addEventListener('input', () => {
        const fileName = fileNameInput.value.trim();
        if (fileName) {
            downloadLink.href = `/download/${fileName}`;
            downloadLink.textContent = `Download ${fileName}`;
        } else {
            downloadLink.href = '#';
            downloadLink.textContent = 'Download';
        }
    });
}

async function fetchFileList() {
    try {
        const response = await fetch('/list-files');
        const data = await response.json();

        if (data.error) {
            alert(`Error fetching file list: ${data.error}`);
            return;
        }

        const fileList = document.getElementById('fileList');
        fileList.innerHTML = ''; // Clear existing list

        data.files.forEach((file) => {
            const listItem = document.createElement('li');
            const downloadLink = document.createElement('a');

            downloadLink.href = `/download/${file}`;
            downloadLink.textContent = file;
            downloadLink.setAttribute('download', file);

            listItem.appendChild(downloadLink);
            fileList.appendChild(listItem);
        });
    } catch (error) {
        alert(`Error fetching file list: ${error.message}`);
    }
}
async function fetchIPs() {
    try {
        const response = await fetch('/get-ips');
        const data = await response.json();

        if (data.error) {
            alert(`Error fetching IP addresses: ${data.error}`);
            return;
        }

        const ipList = document.getElementById('ipList');
        ipList.innerHTML = ''; // Clear existing list

        data.ips.forEach((ip) => {
            const listItem = document.createElement('li');
            listItem.textContent = ` ${ip.ip}`;
            ipList.appendChild(listItem);
        });
    } catch (error) {
        alert(`Error fetching IP addresses: ${error.message}`);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    setupDownload();
    fetchFileList();
     fetchIPs();
});
