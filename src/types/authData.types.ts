export interface ILoginData {
  phoneNumber: string;
  password: string;
  profileType: string;
}

export interface IRegistrationData extends ILoginData {
  name: string;
}
