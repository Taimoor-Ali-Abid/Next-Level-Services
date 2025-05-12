import React, { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
} from "react-native"
import {
  ArrowLeft,
  Settings,
  Camera,
  Power,
  Eye,
  EyeOff,
  Calendar,
  MapPin,
} from "react-native-feather"
import { useNavigation } from "@react-navigation/native"
import { launchCamera } from "react-native-image-picker"
import ActionCardProfile from "../../components/card/ActionCardProfile"
import BottomBar from "../../components/BottomBar/BottomBar"
import { WP, HP } from "../../theme/PixelResponsive"
import CustomTextInput from "../../components/TextInput/CustomTextInput"

const ProfileSettingScreen = () => {
  const navigation = useNavigation()
  const [showPassword, setShowPassword] = useState(false)
  const [showActionCard, setShowActionCard] = useState(false)

  const [userId, setUserId] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [aboutMe, setAboutMe] = useState("")
  const [phone, setPhone] = useState("")
  const [dob, setDob] = useState("")
  const [zipCode, setZipCode] = useState("")

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleActionCardClose = () => {
    setShowActionCard(false)
  }

  const handleActionCardShare = () => {
    setShowActionCard(false)
  }

  const handleOpenCamera = async () => {
    const requestCameraPermission = async () => {
      if (Platform.OS === "android") {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Camera Permission",
              message: "This app needs access to your camera",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            }
          )
          return granted === PermissionsAndroid.RESULTS.GRANTED
        } catch (err) {
          console.warn(err)
          return false
        }
      }
      return true
    }

    const hasPermission = await requestCameraPermission()
    if (!hasPermission) {
      console.log("Camera permission denied")
      return
    }

    const options = {
      mediaType: "photo",
      cameraType: "back",
      saveToPhotos: true,
    }

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled camera")
      } else if (response.errorCode) {
        console.log("Camera error: ", response.errorMessage)
      } else {
        const imageUri = response.assets?.[0]?.uri
        console.log("Captured image: ", imageUri)
      }
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B0000" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft width={24} height={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MY PROFILE</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: "https://i.pravatar.cc/300?img=25" }}
              style={styles.profileImage}
            />
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate("SettingsScreen" )}
            >
              <Settings width={20} height={20} color="#8B0000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleOpenCamera}>
              <Camera width={20} height={20} color="#8B0000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Power width={20} height={20} color="#8B0000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>XYZ</Text>
        </View>

        <View style={styles.formContainer}>
          {[
            { label: "MY USER ID", value: userId, set: setUserId, placeholder: "User ID" },
            { label: "FIRST NAME", value: firstName, set: setFirstName, placeholder: "First Name" },
            { label: "LAST NAME", value: lastName, set: setLastName, placeholder: "Last Name" },
            { label: "EMAIL", value: email, set: setEmail, placeholder: "Email", keyboardType: "email-address" },
            { label: "PHONE", value: phone, set: setPhone, placeholder: "+1 (555) 123-4567", keyboardType: "phone-pad" },
          ].map((field, i) => (
            <View key={i} style={styles.formField}>
              <Text style={styles.fieldLabel}>{field.label}</Text>
              <CustomTextInput
                value={field.value}
                onChangeText={field.set}
                placeholder={field.placeholder}
                keyboardType={field.keyboardType}
              />
            </View>
          ))}

          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>PASSWORD</Text>
            <View style={styles.inputWithIcon}>
              <CustomTextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={{ flex: 1 }}
                placeholder="Password"
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                {showPassword ? (
                  <EyeOff width={20} height={20} color="#999" />
                ) : (
                  <Eye width={20} height={20} color="#999" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>ABOUT ME</Text>
            <CustomTextInput
              value={aboutMe}
              onChangeText={setAboutMe}
              multiline
              numberOfLines={4}
              style={styles.textArea}
              placeholder="Tell us about yourself..."
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>DATE OF BIRTH</Text>
            <View style={styles.inputWithIcon}>
              <CustomTextInput
                value={dob}
                onChangeText={setDob}
                style={{ flex: 1 }}
                placeholder="MM/DD/YYYY"
              />
              <TouchableOpacity>
                <Calendar width={20} height={20} color="#8B0000" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>ZIP CODE</Text>
            <View style={styles.inputWithIcon}>
              <CustomTextInput
                value={zipCode}
                onChangeText={setZipCode}
                keyboardType="number-pad"
                style={{ flex: 1 }}
                placeholder="Zip Code"
              />
              <TouchableOpacity>
                <MapPin width={20} height={20} color="#8B0000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomBar />

      <ActionCardProfile
        visible={showActionCard}
        onClose={handleActionCardClose}
        onShare={handleActionCardShare}
        points={5}
        title="Share your profile on social media"
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8B0000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: WP(4),
    paddingVertical: HP(1.5),
  },
  backButton: {
    padding: WP(1),
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: WP(4),
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: WP(4),
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: HP(2.5),
  },
  profileImageContainer: {
    width: WP(30),
    height: WP(30),
    borderRadius: WP(15),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profileImage: {
    width: WP(30),
    height: WP(30),
    borderRadius: WP(15),
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: HP(2),
    justifyContent: "center",
  },
  actionButton: {
    width: WP(10),
    height: WP(10),
    borderRadius: WP(5),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: WP(2),
  },
  userName: {
    fontSize: WP(6),
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: HP(2),
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: WP(7.5),
    borderTopRightRadius: WP(7.5),
    padding: WP(5),
    paddingBottom: HP(12),
  },
  formField: {
    marginBottom: HP(2),
  },
  fieldLabel: {
    fontSize: WP(3),
    fontWeight: "bold",
    color: "#333333",
    marginBottom: HP(1),
  },
  inputWithIcon: {
    backgroundColor: "#F5F5F5",
    borderRadius: WP(2),
    paddingHorizontal: WP(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textArea: {
    height: HP(12),
    textAlignVertical: "top",
  },
})

export default ProfileSettingScreen
