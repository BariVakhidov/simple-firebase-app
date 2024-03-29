export const filterNonNull = <T extends object>(obj: T) => {
	return Object.fromEntries(Object.entries(obj).filter(([, v]) => v));
};
