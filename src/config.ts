type Environment = keyof typeof configs;

export const environment: Environment = "development";

const defaultConfig = {
  currentAppVersion: 1,
  appStoreLink: "https://",
  playStoreLink: "https://",
  supportUrl: "",
  regulationsUrl: "",
  policyUrl: "",
  faqUrl: "",
};

const configs = {
  local: {
    ...defaultConfig,
    baseUrl: "https://chat.thewidlarzgroup.com",
    websocketUrl: "wss://chat.thewidlarzgroup.com/socket",
  },
  development: {
    ...defaultConfig,
    baseUrl: "https://chat.thewidlarzgroup.com",
    websocketUrl: "wss://chat.thewidlarzgroup.com/socket",
  },
  staging: {
    ...defaultConfig,
    baseUrl: "https://chat.thewidlarzgroup.com",
    websocketUrl: "wss://chat.thewidlarzgroup.com/socket",
  },
  production: {
    ...defaultConfig,
    baseUrl: "https://chat.thewidlarzgroup.com",
    websocketUrl: "wss://chat.thewidlarzgroup.com/socket",
  },
};
export const config = configs[environment];
