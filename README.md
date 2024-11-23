File Sharing Webserver
This is a simple File Sharing Webserver that allows you to upload and download files between devices connected to the same local network. The webserver is hosted on a laptop and can be accessed by any device within the network.

Features:
Upload Files: Upload files to the server from any device on the local network.
Download Files: Download files that are uploaded to the server from any device on the same network.
Access Through Web Browser: Access the file sharing server via a web browser from any device.
Local Network Only: Only devices within the same local network can access the server.
Technologies Used:
Frontend: HTML, CSS, JavaScript
Backend: Python (Flask)
Networking: Local network-based communication
File Handling: Support for large file uploads (up to 10GB) with chunked transfers
Prerequisites
Laptop to host the server (This can be any computer with Python installed).
Python 3 and Flask installed on the server machine.
Devices connected to the same local WiFi network to upload and download files.
Web browser for interacting with the file server.

Install Dependencies:

pip install -r requirement.txt

Start the Server:
python app.py

Convert this to binary:
pip install pyinstaller
pyinstaller --onefile --add-data "static:static" --add-data "templates:templates" app.py


