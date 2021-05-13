import * as SecureStore from "expo-secure-store";

async function generateHeader() {
  const defaultHeader = { "Content-Type": "application/json" };

  // const token = await SecureStore.getItemAsync("token");
  // TODO: delete this mock
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOWJlNmU5ZGY4YTE1MzU2YzEzMTM2ZiIsImlhdCI6MTYyMDg3ODQ2NX0.2ooS7p7o9HTu2a9t3AbzzSrqM2JNV0rhTfBOf8bh0k4";

  if (!token) {
    return defaultHeader;
  }

  return { ...defaultHeader, Authorization: `bearer ${token}` };
}

export default generateHeader;
