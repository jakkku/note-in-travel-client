import * as SecureStore from "expo-secure-store";

async function generateHeader() {
  const defaultHeader = { "Content-Type": "application/json" };

  const token = await SecureStore.getItemAsync("token");

  if (!token) {
    return defaultHeader;
  }

  return { ...defaultHeader, Authorization: `bearer ${token}` };
}

export default generateHeader;
