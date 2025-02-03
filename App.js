import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState("");
  const [allTasks, setAllTasks] = useState([]);

  const handleAdd = () => {
    Keyboard.dismiss();
    setAllTasks([...allTasks, task]);
    setTask("");
  };

  const handleComplete = (idx) => {
    let itemsCopy = [...allTasks];
    itemsCopy.splice(idx, 1);
    setAllTasks(itemsCopy);
  };
  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Todays' tasks</Text>
        <View style={styles.items}>
          {allTasks.map((item, idx) => {
            return (
              <TouchableOpacity key={idx} onPress={() => handleComplete(idx)}>
                <Task text={item} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Enter a task here..."}
          onChangeText={(value) => setTask(value)}
          value={task}
        />

        <TouchableOpacity onPress={() => handleAdd()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>Add</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#0001",
    borderRadius: 60,
    width: 250,
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  addWrapper: {
    width: 90,
    height: 50,
    backgroundColor: "#0001",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  addText: {},
});
