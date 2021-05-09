import * as Google from "expo-google-app-auth";
import { IOS_CLIENT_ID } from "@env";

export default async function loginWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      iosClientId: IOS_CLIENT_ID,
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      const { email, name, photoUrl } = result.user;

      return { user: { email, name, photoUrl } };
    }

    return { cancelled: true };
  } catch (err) {
    return { error: true };
  }
}
