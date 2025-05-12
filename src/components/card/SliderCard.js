"use client";

import { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from "react-native";
import { Star } from "react-native-feather";
import Svg, { Rect, Path } from "react-native-svg";
import TwoPoints from "./TwoPoints";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.92;
const CARD_HEIGHT = 150;

const GiftIcon = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="8" width="18" height="13" rx="2" fill="#fff" stroke="#000" />
    <Path d="M3 12h18" stroke="#000" strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 8V21" stroke="#000" strokeWidth="2" strokeLinecap="round" />
    <Path
      d="M12 8c1.5 0 3-1.5 3-3s-1.5-1-3 1c-1.5-2-3-2.5-3-1s1.5 3 3 3z"
      stroke="#000"
      strokeWidth="2"
      fill="white"
    />
  </Svg>
);

const SliderCard = ({ items = [], onItemChange = () => {} }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const scrollRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const position = Animated.divide(scrollX, CARD_WIDTH);

  const cardItems = items.length
    ? items.map((item) => ({
        ...item,
        width: item.width || CARD_WIDTH,
        height: item.height || CARD_HEIGHT,
      }))
    : [];

  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false });

  const handleScrollEnd = (e) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH);
    setActiveIndex(idx);
    onItemChange(cardItems[idx]);
  };

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: index * CARD_WIDTH, animated: true });
      setActiveIndex(index);
      onItemChange(cardItems[index]);
    }
  };

  const handleCardPress = (item) => {
    setSelectedReward(item);
    setShowRewardModal(true);
  };

  const handleCloseModal = () => {
    setShowRewardModal(false);
  };

  useEffect(() => {
    if (cardItems.length > 0) {
      onItemChange(cardItems[0]);
    }
  }, []);

  const maxCardHeight = Math.max(...(cardItems.length ? cardItems.map((item) => item.height) : [CARD_HEIGHT]));

  return (
    <View style={[styles.container, { height: maxCardHeight + 60 }]}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
      >
        {cardItems.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.cardContainer, { width: item.width }]}
            activeOpacity={0.9}
            onPress={() => handleCardPress(item)}
          >
            <View style={[styles.cardShadow, { height: item.height }]}>
              <View style={[styles.card, { height: item.height }]}>
                <View style={styles.cardHeader}>
                  <Star stroke="#8B0000" fill="#8B0000" width={24} height={24} />
                  <Text style={styles.pointsText}>{item.points} points</Text>
                  {item.id === 3 && <GiftIcon size={24} />}
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>

      <View style={styles.pagination}>
        {cardItems.map((_, index) => {
          const opacity = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          const scale = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: "clamp",
          });
          return (
            <TouchableOpacity key={index} onPress={() => scrollToIndex(index)}>
              <Animated.View
                style={[styles.dot, { opacity, transform: [{ scale }] }, index === activeIndex && styles.activeDot]}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* TwoPoints Modal */}
      <TwoPoints
        visible={showRewardModal}
        onClose={handleCloseModal}
        points={selectedReward?.points || 2}
        title={selectedReward?.title || "Share a story about us on Facebook"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 100,
  },
  scrollContent: {
    paddingHorizontal: SCREEN_WIDTH * 0.01,
  },
  cardContainer: {
    paddingHorizontal: 5,
  },
  cardShadow: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    gap: 8,
  },
  pointsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8B0000",
  },
  cardContent: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});

export default SliderCard;
