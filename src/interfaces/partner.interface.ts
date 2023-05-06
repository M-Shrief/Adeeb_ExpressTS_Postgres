export enum ERROR_MSG {
  NOT_FOUND = "Partner's not found",
  NOT_VALID = 'Data for partner is not valid',
}
export interface PartnerType {
  _id: string;
  name: string;
  phone: string;
  address: string | string[];
  password: string;
}
