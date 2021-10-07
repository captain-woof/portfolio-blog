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
    black: "#182825",
    blackDark: "#000000",
    blackTransclucent: "#18282555",
    grey: "#3A4745"
}

export const themeLight = {
    colors,
    backgroundColor: colors.white,
    textColorEmphasis: colors.black,
    textColorSubtitle: colors.grey,
    shadow: colors.blackTransclucent
}

export const themeDark = {
    colors,
    backgroundColor: colors.black,
    textColorEmphasis: colors.white,
    textColorSubtitle: colors.white,
    shadow: colors.blackDark
}