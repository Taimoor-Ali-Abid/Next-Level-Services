import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Switch,
} from 'react-native';
import {ArrowLeft} from 'react-native-feather';
import BottomBar from '../../components/BottomBar/BottomBar';
import {WP, HP} from '../../theme/PixelResponsive';

const SettingsScreen = () => {
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [smsNotifications, setSmsNotifications] = React.useState(true);
  const [newProducts, setNewProducts] = React.useState(true);
  const [newRewards, setNewRewards] = React.useState(true);
  const [productDiscount, setProductDiscount] = React.useState(false);
  const [redeemApproved, setRedeemApproved] = React.useState(true);
  const [usedRewards, setUsedRewards] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B0000" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft width={WP(6)} height={WP(6)} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SETTINGS</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Image
            source={{uri: 'https://i.pravatar.cc/300?img=25'}}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>AAAA</Text>
        </View>

        <View style={styles.settingsContainer}>
          {/* Privacy Policy and Terms */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PRIVACY POLICY</Text>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkText}>
                Read Next Level Services Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>TERMS AND CONDITIONS</Text>
            <TouchableOpacity style={styles.linkButton}>
              <Text style={styles.linkText}>
                Read Next Level Services Terms and conditions
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Push Notifications Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PUSH NOTIFICATIONS SETTINGS</Text>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Push notifications</Text>
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{false: '#767577', true: '#8B0000'}}
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Email</Text>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{false: '#767577', true: '#8B0000'}}
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>SMS</Text>
              <Switch
                value={smsNotifications}
                onValueChange={setSmsNotifications}
                trackColor={{false: '#767577', true: '#8B0000'}}
              />
            </View>
          </View>

          <View style={styles.divider} />

          {/* Notifications */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>New products</Text>
              <Switch
                value={newProducts}
                onValueChange={setNewProducts}
                trackColor={{false: '#767577', true: '#8B0000'}}
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>New rewards available</Text>
              <Switch
                value={newRewards}
                onValueChange={setNewRewards}
                trackColor={{false: '#767577', true: '#8B0000'}}
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Product discount</Text>
              <Switch
                value={productDiscount}
                onValueChange={setProductDiscount}
                trackColor={{false: '#767577', true: '#8B0000'}}
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Redeem request approved</Text>
              <Switch
                value={redeemApproved}
                onValueChange={setRedeemApproved}
                trackColor={{false: '#767577', true: '#8B0000'}}
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Used reward points</Text>
              <Switch
                value={usedRewards}
                onValueChange={setUsedRewards}
                trackColor={{false: '#767577', true: '#8B0000'}}
              />
            </View>
          </View>

          <View style={styles.divider} />

          {/* Password Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PASSWORD SETTINGS</Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Change password</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Account Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ACCOUNT SETTINGS</Text>
            <TouchableOpacity
              style={[styles.actionButton, styles.dangerButton]}>
              <Text style={[styles.actionButtonText, styles.dangerText]}>
                Deactivate account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <BottomBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8B0000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: WP(4),
    paddingVertical: HP(1.5),
  },
  backButton: {
    padding: WP(1),
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: WP(4.5),
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: WP(4),
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: HP(2.5),
  },
  profileImage: {
    width: WP(25),
    height: WP(25),
    borderRadius: WP(12.5),
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: WP(5),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: HP(2),
  },
  settingsContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: WP(8),
    borderTopRightRadius: WP(8),
    padding: WP(5),
    paddingBottom: HP(12),
  },
  section: {
    marginBottom: HP(2.5),
  },
  sectionTitle: {
    fontSize: WP(3.5),
    fontWeight: 'bold',
    color: '#8B0000',
    marginBottom: HP(1.2),
  },
  linkButton: {
    paddingVertical: HP(1),
  },
  linkText: {
    fontSize: WP(3.5),
    color: '#333333',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: HP(2),
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: HP(1.5),
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  settingLabel: {
    fontSize: WP(3.5),
    color: '#333333',
  },
  actionButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: WP(2),
    padding: HP(2),
    alignItems: 'center',
    marginTop: HP(1.5),
  },
  actionButtonText: {
    fontSize: WP(3.5),
    fontWeight: 'bold',
    color: '#333333',
  },
  dangerButton: {
    backgroundColor: '#FFF0F0',
  },
  dangerText: {
    color: '#FF0000',
  },
});

export default SettingsScreen;
