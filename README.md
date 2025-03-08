# PlantDoctor - Plant Disease Recognition App

Інструкція згенерована чатом ЖИПИТИ на основі скріна структури та великого голосоваго запиту.
Присутні неточноті.

PlantDoctor is an AI-powered application that helps users identify plant diseases from images. By simply uploading a photo of a plant, users can quickly get an analysis of potential diseases affecting their plants.

## Features

- **Image Upload**: Easy-to-use interface for uploading plant images
- **AI Analysis**: Advanced CNN model to detect plant diseases
- **Quick Results**: Get instant diagnosis with confidence scores
- **Multiple Diseases**: Support for 38 different plant diseases
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

### Backend
- **Flask**: Python web framework for the API
- **TensorFlow/Keras**: Deep learning framework for the CNN model
- **OpenCV/Pillow**: Image processing libraries

### Frontend
- **React**: JavaScript library for building the user interface
- **React Router**: For navigation between pages
- **SCSS**: For styling components

### Deployment
- **Docker**: Containerization for easy deployment
- **Docker Compose**: Multi-container Docker applications

## Project Structure

```
plant_disease_recognition/
│
├── backend/                  # Backend code
│   ├── app.py                # Main Flask application
│   ├── config.py             # Configuration settings
│   ├── models/               # ML model architecture
│   ├── utils/                # Utility functions
│   ├── routes/               # API routes
│   ├── services/             # Business logic
│   └── requirements.txt      # Python dependencies
│
├── frontend/                 # Frontend code
│   ├── public/               # Public assets
│   ├── src/                  # Source code
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── utils/            # Utility functions
│   │   ├── styles/           # CSS/SCSS styles
│   │   ├── App.jsx           # Main App component
│   │   └── index.jsx         # Application entry point
│   └── package.json          # Node.js dependencies
│
├── docker-compose.yml        # Docker compose configuration
└── README.md                 # Project documentation
```

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (for local frontend development)
- Python 3.9+ (for local backend development)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/plant-disease-recognition.git
   cd plant-disease-recognition
   ```

2. Start the application using Docker Compose:
   ```
   docker-compose up
   ```

3. Access the application:
    - Frontend: http://localhost:3000
    - Backend API: http://localhost:5000/api

### Development Setup

#### Backend (without Docker)

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv venv
   venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the Flask application:
   ```
   python app.py
   ```

## Mobile App Setup (Expo)

### Prerequisites:
- Node.js 14 or higher
- npm or yarn package manager
- Expo CLI
- Expo Go app on your mobile device

### Setup Steps:

1. Find your local IP address:
   ```
   # Windows
   ipconfig

   # macOS
   ifconfig en0

   # Linux
   ip addr show
   ```

2. Open `mobile/utils/api.js` and update the IP address to your local IP:
   ```javascript
   // Replace 192.168.1.100 with your local IP address
   const API_URL = 'http://192.168.X.X:5000/api';
   ```

3. Navigate to the mobile directory:
   ```
   cd plant_disease_recognition/mobile
   ```

4. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

5. Start the Expo development server:
   ```
   npx expo start
   ```

6. Connect your mobile device:
   - Install the Expo Go app from App Store (iOS) or Google Play Store (Android)
   - Make sure your mobile device is connected to the same Wi-Fi network as your computer
   - Scan the QR code shown in the terminal or browser with the Expo Go app

## Testing the Application

1. Launch the app on your device by scanning the QR code
2. On the home screen, tap "Choose from Gallery" or "Take a Photo"
3. Select an image of a plant that may have a disease
4. Tap "Analyze Plant" to send the image to the backend
5. View the analysis results showing the detected plant diseases with confidence scores

## Network Troubleshooting

If you're having trouble connecting to the backend:

1. Make sure your backend server is running
2. Verify that your mobile device and computer are on the same network
3. Check if your firewall is blocking the connection
4. Try using Expo's tunnel feature:
   ```
   npx expo start --tunnel
   ```

## Development Notes

- The application uses modular styles separated into individual files
- Global styles are defined in `styles/global.js`
- The backend requires TensorFlow models which will be loaded on startup
- API endpoints are in the `routes/api.py` file

## Deployment

For production deployment:

1. Backend: Deploy the Flask application to a server or cloud service
2. Mobile: Build a standalone app using EAS Build:
   ```
   npx eas build --platform ios
   npx eas build --platform android
   ```

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [TensorFlow Documentation](https://www.tensorflow.org/api_docs)