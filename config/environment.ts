import dotenv from "dotenv";
dotenv.config();

export interface SiteConfig {
  baseUrl: string;
  locale: string;
  currency: string;
  country: string;
}

export const siteConfigs: { [key: string]: SiteConfig } = {
  Lebanon: {
    baseUrl: "https://www.ubuy.com.lb",
    locale: "en-LB",
    currency: "USD",
    country: "lebanon",
  },
  Japan: {
    baseUrl: "https://www.ubuy.co.jp",
    locale: "ja-JP",
    currency: "JPY",
    country: "japan",
  },
};

export const getCurrentSiteConfig = (): SiteConfig => {
  const region = process.env.TEST_REGION || "Lebanon";
  return siteConfigs[region];
};
