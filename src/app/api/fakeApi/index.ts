import { ResponseStatus } from "app/definitions/Enum";

type Option = {
    time?:number;
    response?:any;
    status: ResponseStatus;
    data?:any;
}

export const callAPI = async (url:string, options:Option): Promise<any> => {
	const { time, response, status, data } = options;
	return new Promise((resolve, reject) => {
		console.log(
			`✈️✈️ Fake API called url ${url},request: ${data}, response: ${response} `,
		);
		setTimeout(() => {
			switch (status) {
			case ResponseStatus.s200:
				resolve(response || { data: "no-response" });
				break;

			default:
				reject({ data: "error" });
				break;
			}
		}, time || 1000);
	});
};
