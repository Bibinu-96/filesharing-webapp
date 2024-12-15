# File Sharing WebApp - Python Flask Server

This project provides a simple Python Flask server that enables uploading and downloading files for sharing between a variety of devices on a local area network (LAN). It is lightweight, easy to use, and supports deployment as a binary or via Docker.

## Features
- Upload files from any device on the same LAN.
- Download shared files to other devices.
- Simple and intuitive interface.

---

## Build and Run Instructions

### Step 1: Clone the Project Repository
```bash
git clone project filesharing-webapp
cd filesharing-webapp
```

### Step 2: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 3: Convert to a Binary Using PyInstaller
To package the app into a standalone binary for easy distribution:
```bash
pyinstaller --onefile app.py
```
The binary will be available in the `dist/` directory.

### Step 4: Run the Server
To start the server locally, use the following command:
```bash
python app.py
```
The server will be accessible at `http://<local-ip>:5000/`.

---

## Dockerizing the Application

### Step 1: Clone the Project Repository
```bash
git clone project filesharing-webapp
cd filesharing-webapp
```

### Step 2: Build the Docker Image
```bash
docker build -t filesharing-webapp:t .
```

### Step 3: Run the Docker Container
```bash
docker run -d -p 5000:5000 --name filesharing-webapp filesharing-webapp:t
```
Access the server at `http://<local-ip>:5000/`.

---

## Folder Structure
```
filesharing-webapp/
├── app.py               # Main Flask application
├── requirements.txt     # Python dependencies
├── Dockerfile           # Docker build configuration
├── static/              # Static files (CSS, JS, images, etc.)
├── templates/           # HTML templates
└── uploads/             # Directory to store uploaded files
```

---

## Example Use Case
1. Start the server on a device in the local area network.
2. Navigate to the server's URL on any device in the LAN.
3. Upload a file from one device.
4. Download the file from another device connected to the LAN.

---

## Contribution Guidelines
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Commit your changes and push to your fork.
4. Open a pull request explaining your changes.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.
