export interface ILoginData {
  phoneNumber: string;
  password: string;
  profileType: string;
  referralCode?: string;
}

export interface IRegistrationData extends ILoginData {
  name: string;
}
