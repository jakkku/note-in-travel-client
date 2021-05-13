import * as SecureStore from "expo-secure-store";

import MOCK from "../constants/mock";

async function generateHeader() {
  const defaultHeader = { "Content-Type": "application/json" };

  // TODO: delete this mock
  const { token } = MOCK;
  // const token = await SecureStore.getItemAsync("token");

  if (!token) {
    return defaultHeader;
  }

  return { ...defaultHeader, Authorization: `bearer ${token}` };
}

export default generateHeader;
