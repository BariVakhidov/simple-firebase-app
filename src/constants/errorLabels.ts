import i18n from "@/localization/i18n";

export const errorLabels = Object.freeze({
	emailInvalid: i18n.t("errors.email", { ns: "common" }),
	emailRequired: i18n.t("errors.emailRequired", { ns: "common" }),
	passwordRequired: i18n.t("errors.passwordRequired", { ns: "common" }),
	passwordInvalid: i18n.t("errors.passwordInvalid", { ns: "common" }),
	passwordsMatching: i18n.t("errors.passwordsMatching", { ns: "common" }),
});
