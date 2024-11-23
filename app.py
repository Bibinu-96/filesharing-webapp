from flask import Flask, request, send_from_directory, render_template, jsonify
import os
from threading import Lock
import socket
import psutil

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
CHUNK_SIZE = 10 * 1024 * 1024  # 10MB

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Thread lock to handle concurrent uploads
upload_lock = Lock()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/upload', methods=['POST'])
def upload():
    try:
        file = request.files['file']
        if not file:
            return jsonify({'error': 'No file uploaded'}), 400

        filename = file.filename
        save_path = os.path.join(UPLOAD_FOLDER, filename)

        with upload_lock, open(save_path, 'ab') as f:
            chunk = request.files['file'].read()
            f.write(chunk)

        return jsonify({'message': f'Chunk uploaded for {filename}'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/download/<filename>', methods=['GET'])
def download(filename):
    try:
        return send_from_directory(UPLOAD_FOLDER, filename, as_attachment=True)
    except FileNotFoundError:
        return jsonify({'error': 'File not found'}), 404


@app.route('/list-files', methods=['GET'])
def list_files():
    try:
        files = os.listdir(UPLOAD_FOLDER)
        return jsonify({'files': files}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/get-ips', methods=['GET'])
def get_ips():
    try:
        ip_addresses = []
        for interface, addrs in psutil.net_if_addrs().items():
            for addr in addrs:
                if addr.family == socket.AF_INET:
                    ip_addresses.append({'interface': interface, 'ip': addr.address})
        return jsonify({'ips': ip_addresses}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(threaded=True, host="0.0.0.0", port=8080)
