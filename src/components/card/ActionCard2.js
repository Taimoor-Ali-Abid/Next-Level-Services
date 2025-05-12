import { View, StyleSheet, TouchableOpacity } from "react-native"
import LinearGradient from "react-native-linear-gradient"

const ActionCard2 = ({
  style,
  leftContent,
  rightContent,
  onPress,
  gradientColors = ["#5E0A0A", "#FF003D"],
  gradientStart = { x: 0, y: 1 },
  gradientEnd = { x: 1, y: 0 },
}) => {
  // Create a unique string from the gradient colors to use as a key
  const gradientKey = JSON.stringify(gradientColors)

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress} activeOpacity={onPress ? 0.7 : 1}>
      <LinearGradient
        key={gradientKey} // This is the critical change - adding a key that changes when colors change
        colors={gradientColors}
        start={gradientStart}
        end={gradientEnd}
        style={styles.gradient}
      >
        <View style={styles.contentContainer}>
          <View style={styles.leftContent}>{leftContent}</View>
          {rightContent && <View style={styles.rightContent}>{rightContent}</View>}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: "100%",
  },
  gradient: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {
    marginLeft: 16,
  },
})

export default ActionCard2
