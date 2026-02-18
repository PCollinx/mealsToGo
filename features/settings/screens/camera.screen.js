import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useContext, useRef, useState } from "react";
import { Button, View } from "react-native";
import { styled } from "styled-components/native";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

const Message = styled.Text`
  text-align: center;
  padding-bottom: 10px;
`;

const ProfileCamera = styled(CameraView)`
  flex: 1;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 40px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

const FlipButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.3);
  justify-content: center;
  align-items: center;
`;

const SnapButton = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background-color: white;
  justify-content: center;
  align-items: center;
  border-width: 4px;
  border-color: rgba(255, 255, 255, 0.5);
`;

const SnapButtonInner = styled.View`
  width: 58px;
  height: 58px;
  border-radius: 29px;
  background-color: white;
  border-width: 2px;
  border-color: #ccc;
`;

const PlaceholderButton = styled.View`
  width: 50px;
  height: 50px;
`;

export const CameraScreen = ({ navigation }) => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);
  const { user } = useContext(AuthenticationContext);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <Container>
        <Message>We need your permission to show the camera</Message>
        <Button onPress={requestPermission} title="grant permission" />
      </Container>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function snap() {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync();
      setPhoto(photoData);
      await AsyncStorage.setItem(`${user.uid}-photo`, photoData.uri);
      navigation.goBack();
    }
  }

  return (
    <Container>
      <ProfileCamera ref={cameraRef} facing={facing} />
      <ButtonContainer>
        <FlipButton onPress={toggleCameraFacing}>
          <Ionicons name="camera-reverse-outline" size={28} color="white" />
        </FlipButton>
        <SnapButton onPress={snap}>
          <SnapButtonInner />
        </SnapButton>
        <PlaceholderButton />
      </ButtonContainer>
    </Container>
  );
};
