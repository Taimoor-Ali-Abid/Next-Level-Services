import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal } from "react-native"
import { Star } from "react-native-feather"
import Svg, { Path, Rect, Circle } from "react-native-svg"

const { width: SCREEN_WIDTH } = Dimensions.get("window")
const CARD_WIDTH = SCREEN_WIDTH * 0.95

// Gift Box Icon Component
const GiftIcon = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="8" width="18" height="13" rx="2" fill="#fff" stroke="#333" strokeWidth="1.5" />
    <Path d="M3 12h18" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M12 8V21" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
    <Path
      d="M12 8c1.5 0 3-1.5 3-3s-1.5-1-3 1c-1.5-2-3-2.5-3-1s1.5 3 3 3z"
      stroke="#8B0000"
      strokeWidth="1.5"
      fill="#8B0000"
    />
  </Svg>
)

// Scissors Icon Component
const ScissorsIcon = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="6" cy="6" r="3" stroke="#8B0000" strokeWidth="1.5" />
    <Circle cx="6" cy="18" r="3" stroke="#8B0000" strokeWidth="1.5" />
    <Path d="M20 4L8.12 15.88" stroke="#8B0000" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M14.47 14.48L20 20" stroke="#8B0000" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M8.12 8.12L12 12" stroke="#8B0000" strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
)

// Touch Icon Component
const TouchIcon = ({ size = 40 }) => (
  <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <Circle cx="20" cy="20" r="15" stroke="#8B0000" strokeWidth="2" />
    <Path
      d="M20 12v8M25 25l-5-5M25 25c2 2 4 2 6 0s2-4 0-6-4-2-6 0"
      stroke="#8B0000"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M15 25h5M15 25c-2 0-4 1-4 4s1 4 4 4h8c2 0 4-2 4-4"
      stroke="#8B0000"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
)

const ActionCardProfile = ({ visible, onClose, onShare, points = 5, title = "Share your profile on social media" }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.container}>
          {/* Top Section */}
          <View style={styles.topSection}>
            <View style={styles.pointsContainer}>
              <View style={styles.starContainer}>
                <Star width={24} height={24} fill="#8B0000" stroke="#8B0000" />
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
            <TouchableOpacity style={styles.giftTapArea}>
              <View style={styles.giftCircle}>
                <View style={styles.giftIconContainer}>
                  <GiftIcon size={50} />
                  <TouchIcon size={40} style={styles.touchIcon} />
                </View>
              </View>
              <Text style={styles.tapText}>(tap the gift to see what you can get)</Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons - At the end of the card */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.shareButton} onPress={onShare}>
              <Text style={styles.shareButtonText}>SHARE TO SOCIAL MEDIA</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

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
    display: "flex",
    flexDirection: "column",
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
    borderColor: "#8B0000",
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
    flex: 1,
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
    backgroundColor: "#8B0000",
    marginRight: 8,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#8B0000",
    textDecorationLine: "underline",
    flex: 1,
  },
  giftTapArea: {
    alignItems: "center",
    marginBottom: 24,
  },
  giftCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
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
  giftIconContainer: {
    position: "relative",
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  touchIcon: {
    position: "absolute",
    bottom: -10,
    right: -10,
  },
  tapText: {
    fontSize: 14,
    color: "#999999",
    textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: "#F8F8F8",
  },
  shareButton: {
    backgroundColor: "#FFE5E5",
    paddingVertical: 16,
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8B0000",
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
})

export default ActionCardProfile
