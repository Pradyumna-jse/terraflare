# 🛰️ ANV26-AI-49_TerraFlare — Autonomous Fire & Smoke Intelligence

Real-time Fire and smoke detection using custom YOLO11 weights, NASA FIRMS orbital telemetry, secondary CNN verification, and an animated mission control dashboard.

## ⚙️ Real-Time Smoke & Fire Detection System

An end-to-end Computer Vision system designed to detect fire and smoke in real time. Built with custom-trained **YOLO11** weights, an interactive **Streamlit** dashboard, and a modern **React + Vite** animated landing page, the application handles image analysis, video file processing, continuous webcam streams, satellite telemetry cross-verification, and automated emergency notification dispatch.

🚀 **Live Interactive Demo:** [terraflare-ya3bcyu7advdfv3vwrdqzs.streamlit.app](https://terraflare-ya3bcyu7advdfv3vwrdqzs.streamlit.app/)      
💼 **LinkedIn Post:** [Fire detection project post](https://lnkd.in/p/eQQpQ-eu)

---

## 📌 Key Highlights

* **Multi-Input Inference:** Seamlessly switch between static image inspection, video file batch processing, and live webcam feeds.
* **H.264 Web-Compatible Video Processing:** Uses `imageio` with embedded FFmpeg encoding to write `.mp4` video files directly streamable inside modern web browsers.
* **Automated SMTP Email Alerts:** Sends direct JPEG snapshot attachments via Gmail SMTP when fire/smoke is detected on live streams.
* **Secondary CNN & Grad-CAM:** Hard-negative false-positive suppression with explainable AI heatmap visualization.
* **NASA FIRMS Satellite Verification:** Cross-verifies active ground detections with orbital thermal anomaly data.
* **Real-time Performance Optimization:** Includes dynamic resolution scaling ($320\text{px}$ to $640\text{px}$), frame-skipping controls, and CLAHE (Contrast Limited Adaptive Histogram Equalization) image enhancement for low-light environments.

---

## 🛠️ Tech Stack & Dependencies

| Layer | Component / Library | Purpose |
| :--- | :--- | :--- |
| **Model** | `ultralytics` (YOLO11) | Object detection for `fire` and `smoke` classes |
| **Frontend UI** | `streamlit` + `React/Vite` | Interactive GUI, live telemetry radar, and animated landing page |
| **Vision & Image** | `opencv-python-headless`, `pillow`, `numpy` | Image decoding, color transformation, CLAHE preprocessing |
| **Video Processing**| `imageio`, `imageio-ffmpeg` | Frame-by-frame annotation and H.264 MP4 export |
| **Alert Systems** | `smtplib`, `email.mime`, Web Audio | Background email dispatch with image attachments and audio siren alerts |
| **Satellite Grid** | NASA FIRMS REST API | Orbital thermal anomaly correlation |

---

## 📁 Repository Architecture

```text
terraflare/
├── .streamlit/
│   └── secrets.toml          # Encrypted local SMTP credentials (git-ignored)
├── weights/
│   └── best.pt               # Trained YOLO11 model weights file
├── frontend/                 # React + Vite + TypeScript + Tailwind landing page & dashboard
├── app.py                    # Main Streamlit web application & inference logic
├── risk_engine.py            # Multi-factor wildfire risk engine
├── cnn_verifier.py           # Secondary CNN false-positive filter
├── map_engine.py             # Geospatial interactive maps
├── sound_notifier.py         # Emergency sound alert manager
├── packages.txt              # Debian system dependencies for Streamlit Cloud
├── requirements.txt          # Python runtime dependencies for Streamlit Cloud
├── package.json              # Root npm scripts
├── .gitignore                # Excludes virtual environments and sensitive files
└── README.md                 # Project documentation
```
