import { Spacer } from "@/components/spacer/spacer.component";
import { Text } from "@/components/typography/text.component";
import { AuthenticationContext } from "@/services/authentication/authentication.context";
import { SafeArea } from "@/utils/safe-area.component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Avatar, List } from "react-native-paper";
import { styled } from "styled-components/native";

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;

const AvatarContainer = styled.View`
  align-items: center;
  padding: ${(props) => props.theme.space[3]};
`;

export const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const [photo, setPhoto] = useState(null);

  useFocusEffect(() => {
    const loadPhoto = async () => {
      if (user) {
        const photoUri = await AsyncStorage.getItem(`${user.uid}-photo`);
        if (photoUri) {
          setPhoto(photoUri);
          console.log("photo stored in async storage:", photoUri);
        }
      }
    };
    loadPhoto();
  });
  return (
    <SafeArea>
      <AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          {photo ? (
            <Avatar.Image size={128} source={{ uri: photo }} />
          ) : (
            <Avatar.Icon size={128} icon="account" backgroundColor="#2182BD" />
          )}
          <Spacer position="top" size="large">
            <Text variant="label">{user?.email}</Text>
          </Spacer>
        </TouchableOpacity>
      </AvatarContainer>

      <List.Section>
        <SettingsItem
          title="Favourites"
          description="View your favourites"
          left={(props) => <List.Icon {...props} icon="heart" />}
          onPress={() => navigation.navigate("Favourites")}
        />
        <SettingsItem
          title="Logout"
          left={(props) => <List.Icon {...props} icon="logout" />}
          onPress={() => onLogout()}
        />
      </List.Section>
    </SafeArea>
  );
};
