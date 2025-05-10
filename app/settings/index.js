import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import Welcome from "../../components/Welcome";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const user = await AsyncStorage.getItem("userDetails");
    console.log("user", user);
    setUserDetails(user);
  };

  return (
    <SafeAreaView style={styles.container}>
        <ScreenHeaderBtn />
        <Welcome
              userDetails={userDetails ? JSON.parse(userDetails) : null}
            />
      <Text style={styles.subtitle}>Would you like to change any settings?</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/settings/ThemeChange")}>
        <Ionicons name="settings" size={24} color="black" />
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/settings/Favourites")}>
        <FontAwesome5 name="heart" size={22} color="black" />
        <Text style={styles.buttonText}>My Favourites</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/settings/DailyReminders")}>
        <MaterialIcons name="access-time" size={24} color="black" />
        <Text style={styles.buttonText}>Daily Reminders</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={() => router.push("/login")}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    marginBottom: 15,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fcdcdc",
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    marginLeft: 15,
    fontSize: 16,
  },
});
