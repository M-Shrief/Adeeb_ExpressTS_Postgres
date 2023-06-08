export interface PartnerType {
  id: string;
  name: string;
  phone: string;
  address: string | string[];
  password: string;
}

export enum ERROR_MSG {
  NOT_FOUND = "Partner's not found",
  NOT_VALID = 'Data for partner is not valid',
  // Inner properties
  NAME = 'name should be contain letters, and less than 50 in length',
  PHONE = 'phone not right or not supported',
  ADDRESS = 'address can not be empty',
  PASSWORD = 'Password should contain: lowercase and uppercase letters, numbers, and symbols(*&^%%$#!@)',
}
