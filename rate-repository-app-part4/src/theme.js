import { Platform } from "react-native";

const font = Platform.select({
  android: "Roboto",
  ios: "Arial",
  default: "System",
});

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: font,
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
  appBar: {
    primary: "#24292e",
    textPrimary: "#fff",
  },
};

export default theme;
