export function setCookie(name: string, value: any, days = 2): void {
	let expires = "";
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function generateId():string {
	return (
		Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
	);
}