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

export default function Index() {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const { setUserEmail, setUserPassword } = useContext(ClickCountContext); // Access context functions
  const router = useRouter(); 

  const handleSignUp = () => {
    let formValid = true;
    const newErrors: any = {}; 

    if (!name) {
      newErrors.name = "Name is required";
      formValid = false;
    }

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
      // Save email and password in context
      setUserEmail(email);
      setUserPassword(password);
      console.log("Form submitted successfully");
      router.push("/login"); // Navigate to login page
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoBox}></View>
        <View style={styles.logoBox}></View>
        <View style={styles.logoBox}></View>
      </View>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        placeholderTextColor="#888"
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
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
      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      {/* Footer Text */}
      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Text style={styles.link}>
          <Link href="/login">Login</Link>
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
