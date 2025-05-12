import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Star } from "react-native-feather";
import Svg, { Path, Rect, Circle } from "react-native-svg";
import GiftHand from "../../assets/Icons/GiftHand.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.95;

const GiftIcon = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="8" width="18" height="13" rx="2" fill="#fff" stroke="#333" strokeWidth="1.5" />
    <Path d="M3 12h18" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M12 8V21" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
    <Path
      d="M12 8c1.5 0 3-1.5 3-3s-1.5-1-3 1c-1.5-2-3-2.5-3-1s1.5 3 3 3z"
      stroke="#CC0000"
      strokeWidth="1.5"
      fill="#CC0000"
    />
  </Svg>
);

const ScissorsIcon = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="6" cy="6" r="3" stroke="#CC0000" strokeWidth="1.5" />
    <Circle cx="6" cy="18" r="3" stroke="#CC0000" strokeWidth="1.5" />
    <Path d="M20 4L8.12 15.88" stroke="#CC0000" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M14.47 14.48L20 20" stroke="#CC0000" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M8.12 8.12L12 12" stroke="#CC0000" strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
);

const TwoPoints = ({ visible, onClose, points = 2, title = "Share a story about us on facebook" }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [titleText, setTitleText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    if (visible) {
      loadSavedItems();
    }
  }, [visible]);

  const loadSavedItems = async () => {
    try {
      const existingData = await AsyncStorage.getItem("userUploads");
      const uploads = existingData ? JSON.parse(existingData) : [];
      setSavedItems(uploads);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const openGallery = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: "photo" });
      if (result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleSave = async () => {
    if (!selectedImage || !titleText || !descriptionText) {
      alert("Please select an image and fill in the title and description.");
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      image: selectedImage,
      title: titleText,
      description: descriptionText,
      timestamp: new Date().toISOString(),
    };

    try {
      const updatedItems = [...savedItems, newItem];
      await AsyncStorage.setItem("userUploads", JSON.stringify(updatedItems));
      setSavedItems(updatedItems);
      setSelectedImage(null);
      setTitleText("");
      setDescriptionText("");
      alert("Saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const filteredItems = savedItems.filter(item => item.id !== id);
              await AsyncStorage.setItem("userUploads", JSON.stringify(filteredItems));
              setSavedItems(filteredItems);
            } catch (error) {
              console.error("Error deleting data:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <KeyboardAvoidingView
        style={styles.modalOverlay}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            {/* Top Section */}
            <View style={styles.topSection}>
              <View style={styles.pointsContainer}>
                <View style={styles.starContainer}>
                  <Star width={24} height={24} fill="#CC0000" stroke="#CC0000" />
                </View>
                <Text style={styles.pointsText}>{points} points</Text>
                <Text style={styles.plusText}>+</Text>
                <GiftIcon size={30} />
              </View>
            </View>

            {/* Dotted Line with Scissors */}
            <View style={styles.dottedLineContainer}>
              <View style={styles.scissorsContainer}>
                <ScissorsIcon size={24} />
              </View>
              <View style={styles.dottedLine} />
            </View>

            {/* Award Section */}
            <View style={styles.awardSection}>
              <Text style={styles.awardedForText}>AWARDED FOR</Text>

              <View style={styles.titleContainer}>
                <View style={styles.redDot} />
                <Text style={styles.titleText}>{title}</Text>
              </View>

              {/* Gift Tap Area */}
              <TouchableOpacity style={styles.giftTapArea} onPress={openGallery}>
                <View style={styles.giftCircle}>
                  <GiftHand />
                </View>
                <Text style={styles.tapText}>(tap the gift to select an image)</Text>
              </TouchableOpacity>

              {/* Show Selected Image and Inputs */}
              {selectedImage && (
                <View style={{ alignItems: "center", marginTop: 10 }}>
                  <Image
                    source={{ uri: selectedImage }}
                    style={{ width: 150, height: 150, borderRadius: 10 }}
                  />
                  <TextInput
                    placeholder="Title"
                    value={titleText}
                    onChangeText={setTitleText}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Description"
                    value={descriptionText}
                    onChangeText={setDescriptionText}
                    style={[styles.input, { height: 80 }]}
                    multiline
                  />
                </View>
              )}
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.shareButton} onPress={handleSave}>
                <Text style={styles.shareButtonText}>Savee</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>CANCEL</Text>
              </TouchableOpacity>
            </View>

            {/* List of saved uploads */}
            <View style={styles.savedItemsContainer}>
              {savedItems.map((item) => (
                <View key={item.id} style={styles.savedItem}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 80, height: 80, borderRadius: 8 }}
                  />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
                    <Text style={{ color: "#555" }}>{item.description}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Text style={{ color: "red", fontWeight: "bold" }}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: CARD_WIDTH,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    height: 650,
  },
  topSection: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  starContainer: {
    marginRight: 8,
  },
  pointsText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    marginRight: 8,
  },
  plusText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    marginRight: 8,
  },
  dottedLineContainer: {
    position: "relative",
    height: 2,
    backgroundColor: "#FFFFFF",
  },
  dottedLine: {
    height: 1,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#CC0000",
    marginHorizontal: 16,
  },
  scissorsContainer: {
    position: "absolute",
    left: 0,
    top: -10,
    backgroundColor: "#FFFFFF",
    zIndex: 1,
  },
  awardSection: {
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: "#F8F8F8",
  },
  awardedForText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  redDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#CC0000",
    marginRight: 8,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#CC0000",
    textDecorationLine: "underline",
    flex: 1,
  },
  giftTapArea: {
    alignItems: "center",
    marginBottom: 24,
  },
  giftCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  tapText: {
    fontSize: 14,
    color: "#999999",
    textAlign: "center",
  },
  input: {
    width: "80%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    backgroundColor: "#F8F8F8",
    marginTop: "auto",
    paddingBottom: 10,
  },
  shareButton: {
    backgroundColor: "#FFE5E5",
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#CC0000",
  },
  cancelButton: {
    backgroundColor: "#CCCCCC",
    paddingVertical: 16,
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  savedItemsContainer: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  savedItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default TwoPoints;
