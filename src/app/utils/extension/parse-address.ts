import { IAddress } from "app/model";

export enum IFlag {
  apartmentNumber = "apartmentNumber",
  street = "street",
  district = "district",
  province = "province",
  country = "country",
}

function clearAddress(result: string): string {
  result = result.trim();
  
  if (result.includes(", ,")) result = result.replaceAll(", ,", ", ");
  if (result[0] == ",") result = result.slice(1);
  if (result[result.length - 1] == ",") result = result.slice(0, result.length-1);
  return result;
}

export function parseAddress(
  address: IAddress,
  flag?: IFlag | string,
  except?: IFlag | string
): string {
  let result = "";

  if (except) {
    address[except] = "";
  }

  if (flag == IFlag.apartmentNumber) result = `${address.apartmentNumber}`;
  else if (flag == IFlag.street)
    result = `${address.apartmentNumber} ${address.street}`;
  else if (flag == IFlag.district)
    result = `${address.apartmentNumber} ${address.street}, ${address.district}`;
  else if (flag == IFlag.province)
    result = `${address.apartmentNumber} ${address.street}, ${address.district}, ${address.province}`;
  else
    result = `${address.apartmentNumber} ${address.street}, ${address.district}, ${address.province}, ${address.country}`;

  return clearAddress(result);
}
