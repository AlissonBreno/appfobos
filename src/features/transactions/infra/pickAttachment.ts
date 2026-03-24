import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Alert, Platform } from "react-native";

export type PickAttachmentResult = {
  uri: string;
  name: string;
  mimeType?: string | null;
};

const pickWithDocumentPicker = async (): Promise<PickAttachmentResult | null> => {
  const result = await DocumentPicker.getDocumentAsync({
    type: "*/*",
    copyToCacheDirectory: true,
    multiple: false
  });

  if (result.canceled || result.assets == null || result.assets.length === 0) {
    return null;
  }

  const asset = result.assets[0];
  return {
    uri: asset.uri,
    name: asset.name || "documento",
    mimeType: asset.mimeType ?? null
  };
};

const pickWithImageLibrary = async (): Promise<PickAttachmentResult | null> => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    quality: 1
  });

  if (result.canceled || result.assets == null || result.assets.length === 0) {
    return null;
  }

  const asset = result.assets[0];
  const name = asset.fileName ?? `imagem-${Date.now()}.jpg`;

  return {
    uri: asset.uri,
    name,
    mimeType: asset.mimeType ?? "image/jpeg"
  };
};

export const pickAttachment = async (): Promise<PickAttachmentResult | null> => {
  if (Platform.OS === "web") {
    return pickWithDocumentPicker();
  }

  return new Promise((resolve) => {
    Alert.alert("Adicionar anexo", "Escolha a origem do arquivo", [
      {
        text: "Documento",
        onPress: () => {
          void pickWithDocumentPicker().then(resolve);
        }
      },
      {
        text: "Galeria",
        onPress: () => {
          void pickWithImageLibrary().then(resolve);
        }
      },
      {
        text: "Cancelar",
        style: "cancel",
        onPress: () => resolve(null)
      }
    ]);
  });
};
