import i18n from "i18next";
import LanguageDetector, { DetectorOptions } from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import commonEn from "./en/common.json";
import modelsEn from "./en/models.json";
import profileEn from "./en/profile.json";
import commonRu from "./ru/common.json";
import modelsRu from "./ru/models.json";
import profileRu from "./ru/profile.json";

export const resources = {
	en: {
		common: commonEn,
		models: modelsEn,
		profile: profileEn,
	},
	ru: {
		common: commonRu,
		models: modelsRu,
		profile: profileRu,
	},
} as const;

const DETECTION_OPTIONS: DetectorOptions = {
	order: ["navigator"],
};

i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		detection: DETECTION_OPTIONS,
		resources,
		supportedLngs: ["en", "ru"],
		ns: ["common", "models", "profile"],
		debug: true,
		fallbackLng: "en",
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
