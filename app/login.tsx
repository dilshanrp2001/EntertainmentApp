import { useState, useContext } from "react";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ClickCountContext } from "./ClickCountContext";

export default function Login() {
  const {  setYourName } = useContext(ClickCountContext);
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const { userEmail, userPassword, setIsAuthenticated } =
    useContext(ClickCountContext); // Access context values
  const router = useRouter(); // Hook for navigation

  const handleLogin = () => {
    let formValid = true;
    const newErrors: any = {}; // Store errors to display

    // Basic email validation
    if (!email) {
      newErrors.email = "Email is required";
      formValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
      formValid = false;
    }

    // Basic password validation
    if (!password) {
      newErrors.password = "Password is required";
      formValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      formValid = false;
    }

    setErrors(newErrors); // Update error state

    if (formValid) {
      // Check if credentials match with context values
      if (email === userEmail && password === userPassword) {
        setIsAuthenticated(true); // Update authentication status
        setYourName(email);
        console.log("Login successful");
        router.push("/home"); // Redirect to home page
        
        
      } else {
        setErrors({ ...newErrors, password: "Invalid credentials" }); // Show error if credentials don't match
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoBox}></View>
        <View style={styles.logoBox}></View>
        <View style={styles.logoBox}></View>
      </View>
      {/* Login Header */}
      <Text style={styles.title}>Log In</Text>
      {/* Input Fields */}
      <TextInput
        placeholderTextColor="#888"
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <TextInput
        placeholderTextColor="#888"
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}
      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      {/* Footer Text */}
      <Text style={styles.footerText}>
        If you don't have an account?{" "}
        <Text style={styles.link}>
          <Link href="/">Sign Up</Link>
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  logoContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  logoBox: {
    width: 10,
    height: 40,
    backgroundColor: "#8159FA", // Example color for the logo
    margin: 5,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    color: "#000",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#8159FA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#555",
  },
  link: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});
