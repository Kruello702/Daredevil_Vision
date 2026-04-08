import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { FaceDetector } from 'expo-face-detector';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [faces, setFaces] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const handleFacesDetected = ({ faces }) => {
    setFaces(faces);
  };

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        onFacesDetected={handleFacesDetected}
        faceDetectionMode={FaceDetector.FaceDetection.Mode.fast}
        type={Camera.Constants.Type.back}
      >
        <View style={styles.facesContainer}>
          {faces.map((face) => {
            return <View key={face.bounds.origin.x} style={[styles.face, { 
              width: face.bounds.size.width, 
              height: face.bounds.size.height,
              left: face.bounds.origin.x, 
              top: face.bounds.origin.y,
            }]} />;
          })}
        </View>
      </Camera>
      <Button title="Detect Faces" onPress={() => alert('Face detection feature will be added here')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  facesContainer: {
    flex: 1,
  },
  face: {
    position: 'absolute',
    borderColor: 'red',
    borderWidth: 1,
  },
});
