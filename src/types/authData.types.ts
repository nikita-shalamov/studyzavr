export interface ILoginData {
  phoneNumber: string;
  password: string;
}

export interface IRegistrationData extends ILoginData {
  name: string;
}
