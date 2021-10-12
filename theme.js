const colors = {
    blue: "#06BCC1",
    blueLight: "#6eecf1",
    blueDark: "#079498",
    red: "#FF5A5F",
    redLight: "#F17b7d",
    redDark: "#E42B30",
    green: "#66C184",
    greenLight: "#74e098",
    greenDark: "#3c8153",
    yellow: "#F4B860",
    yellowLight: "#Fbc67d",
    yellowDark: "#B57d2b",
    white: "#FFFFFC",
    whiteLight: "#ffffff",
    whiteDark: "#F1f1ef",
    black: "#182825",
    blackLight: "#2f2f2f",
    blackDark: "#000000",
    blackTransclucent: "#18282555",
    grey: "#3A4745"
}

export const themeLight = {
    colors,
    backgroundColor: colors.white,
    backgroundColorElevated: colors.whiteLight,
    textColorEmphasis: colors.black,
    textColorSubtitle: colors.grey,
    shadow: colors.blackTransclucent
}

export const themeDark = {
    colors,
    backgroundColor: colors.black,
    backgroundColorElevated: colors.blackLight,
    textColorEmphasis: colors.white,
    textColorSubtitle: colors.whiteDark,
    shadow: colors.blackDark
}