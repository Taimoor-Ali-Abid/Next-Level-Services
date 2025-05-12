"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, StatusBar, Image, TouchableOpacity, Dimensions } from "react-native"
import BottomBar from "../../components/BottomBar/BottomBar"
import LogoVape from "../../assets/Images/LogoVape.png"
import { ArrowLeft, Star } from "react-native-feather"
import LinearGradient from "react-native-linear-gradient"
import SliderCard from "../../components/card/SliderCard"
import { WP,HP } from "../../theme/PixelResponsive"
import HeaderS from "../../components/Header/HeaderS"
import { useNavigation } from "@react-navigation/native"
const { width: SCREEN_WIDTH } = Dimensions.get("window")

const HomeScreen = () => {
  const [currentReward, setCurrentReward] = useState(null)
  const navigation = useNavigation()

  // Handle reward item change from slider
  const handleRewardChange = (item) => {
    setCurrentReward(item)
  }

  // Custom rewards data
  const rewardsData = [
    {
      id: 1,
      title: "Welcome Reward",
      points: 3,
      description: "Get a welcome discount on your first purchase",
    },
    {
      id: 2,
      title: "Share on Facebook",
      points: 2,
      description: "Share your experience on Facebook",
    },
    {
      id: 3,
      title: "Birthday Reward",
      points: 5,
      description: "Special gift for your birthday",
    },
    {
      id: 4,
      title: "Birthday Reward",
      points: 2,
    },
  ]

  return (
    <LinearGradient
      colors={["#5E0A0A", "#FF003D"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <HeaderS />

      {/* Main Content */}
    

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Back & Logo Section */}
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft width={24} height={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Image source={LogoVape} style={styles.logo} />
        <Text style={styles.title}>House of Vape</Text>
        <TouchableOpacity style={styles.visitButton}>
          <Text style={styles.visitButtonText}>VISIT STORE ITEMS</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Available rewards</Text>
          <TouchableOpacity style={styles.visitButton} onPress={() => navigation.navigate("ChatScreen")}>
            <Text style={styles.sectionTitle}>Go to ChatScreen</Text>
          </TouchableOpacity>
        
          <TouchableOpacity style={styles.visitButton} onPress={() => navigation.navigate("GroupChatScreen")}>
            <Text style={styles.sectionTitle}>Go to GroupChat</Text>
          </TouchableOpacity>
        <SliderCard items={rewardsData} onItemChange={handleRewardChange} />
      </ScrollView>

      <BottomBar />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: WP(4),
    paddingTop: HP(6),
    paddingBottom: HP(1.2),
  },
  content: {
    paddingHorizontal: WP(4),
    paddingBottom: HP(2),
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: HP(2),
    marginBottom: HP(2),
  },
  logo: {
    width: WP(30),
    height: WP(30),
    resizeMode: 'contain',
    marginBottom: HP(1),
  },
  title: {
    fontSize: WP(7),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: HP(2),
  },
  visitButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingVertical: HP(1.5),
    paddingHorizontal: WP(6),
    borderRadius: WP(2),
    marginBottom: HP(3),
  },
  visitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: WP(4),
  },
  sectionTitle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: WP(5),
    fontWeight: '300',
    marginBottom: HP(2),
  },
  infoSection: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: WP(4),
    borderRadius: WP(3),
    marginTop: HP(2.5),
    width: '100%',
  },
  infoTitle: {
    color: '#fff',
    fontSize: WP(4),
    fontWeight: 'bold',
    marginBottom: HP(1),
  },
  infoText: {
    color: '#fff',
    fontSize: WP(3.5),
    lineHeight: HP(2.5),
  },
})
export default HomeScreen
