const black = "#000000";
const white = "#ffffff";
// const lightGrey = '#d8d8d8';
export const grey = "#7f7f7f";
export const error = "#ff0033";
export const primary = "#FEFEFE";
export const secondary = "#F34B4C";
export const background = "#0e2439";
export const backgroundSecondary = "#151A21";
export const backgroundThird = "#242C37";

export const mainFontFamily = "'IBM Plex Sans'";
export const fontFamily =
  "-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif";

export const fontWeight = {
  light: "300",
  regular: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
};
export const theme = {
  colors: {
    primary: {
      default: primary,
    },
    secondary: {
      default: secondary,
    },
    blue100: "#d2d7db",
    blue200: "#a5afb8",
    blue300: "#798694",
    blue400: "#4c5e71",
    blue500: "#1f364d",
    blue600: "#192b3e",
    blue700: "#13202e",
    blue800: "#0c161f",
    blue900: "#060b0f",
    grey400: "#9CA3AF",
    green500: "#10B981",
    purple500: "#2D3142",
    white: white,
    black: black,
    text: {
      default: primary,
      white: white,
      subText: primary,
    },
    error: error,
  },
  font: {
    family: mainFontFamily,
    size: {
      tiny: "6px",
      tinier: "8px",
      tinySmall: "10px",
      smallest: "12px",
      smaller: "13px",
      small: "14px",
      default: "15px",
      medium: "17px",
      large: "24px",
      heading: "30px",
      largeHeading: "35px",
      title: "50px",
      customHeading: "20px",
    },
    lineHeight: {
      default: "20px",
      small: "18px",
      button: "14px",
      medium: "20px",
      large: "24px",
      heading: "30px",
      largeHeading: "40px",
      title: "50px",
    },
    weight: {
      light: fontWeight.light,
      regular: fontWeight.regular,
      medium: fontWeight.medium,
      semiBold: fontWeight.semiBold,
      bold: fontWeight.bold,
    },
  },
  shadow: {},
  layout: {
    background: background,
    backgroundSecondary: backgroundSecondary,
    borderRadius: "8px",
    buttonWidth: "200px",
    navBackground: backgroundThird,
  },
  button: {
    background: backgroundThird,
    border: backgroundThird,
  },
  mQ: {
    mobileSml: 320,
    mobileMed: 480,
    mobileLrg: 590,
    mobileXL: 650,
    tablet: 768,
    laptop: 1000,
    laptopLrg: 1160,
    desktopSml: 1350,
    desktopSmlMed: 1800,
    desktop: 2560,
  },
  zIndex: {
    below: "-1",
    default: "0",
    above: "2",
    priority: "5",
    nav: "9",
    menu: "10",
    toggle: "11",
  },
};
