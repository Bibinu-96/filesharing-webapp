 async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const progressBar = document.getElementById('progressBar');
    const progressBarDeterminate = progressBar.querySelector('.determinate');
    const progressPercent = document.getElementById('progressPercent');
    //const progressTextContent= document.getElementById('progressPercent')

    if (!fileInput.files.length) {
        M.toast({ html: "Please select a file to upload." });
        return;
    }

    const file = fileInput.files[0];
    const chunkSize = 10 * 1024 * 1024; // 10MB chunks
    const totalChunks = Math.ceil(file.size / chunkSize);
    let uploadedChunks = 0;

    // Display the progress bar
    progressBar.style.display = 'block';
    progressBar.style.height='20px';
    progressBarDeterminate.style.width = '0%';
    progressPercent.textContent = '0%';  // Initialize percentage at 0%

    for (let start = 0; start < file.size; start += chunkSize) {
        const chunk = file.slice(start, start + chunkSize);

        const formData = new FormData();
        formData.append('file', chunk, file.name);

        try {
            // Upload each chunk
            await fetch('/upload', {
                method: 'POST',
                body: formData,
            });

            uploadedChunks++;
            const progress = Math.round((uploadedChunks / totalChunks) * 100);

            // Update the progress bar width and percentage text
            progressBarDeterminate.style.width = `${progress}%`;
            progressPercent.textContent = `${progress}%`;  // Update percentage inside the progress bar
        } catch (error) {
            M.toast({ html: `Error uploading chunk: ${error.message}` });
            progressBar.style.display = 'none'; // Hide the progress bar in case of an error
            return;
        }
    }

    // Hide the progress bar and reset it after upload completion
    M.toast({ html: 'File uploaded successfully!' });
    progressBar.style.display = 'none';
    progressBar.style.height='0px';
    progressBarDeterminate.style.width = '0%';
    progressPercent.textContent = '0%'; // Reset the percentage text

    // Refresh the file list after upload
    fetchFileList();
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
            listItem.textContent = ` ${ip.ip}:8080`;
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
