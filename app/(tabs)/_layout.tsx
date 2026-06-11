import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Municipios",
        }}
      />

      <Stack.Screen
        name="weather"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="info"
        options={{
          title: "Información",
        }}
      />
    </Stack>
  );
}
