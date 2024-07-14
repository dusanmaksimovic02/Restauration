export type UserLogin = {
  username: string;
  password: string;
  token: string;
};

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  username: string;
  address?: string;
  city?: string;
  birtdate?: string;
  phone?: string;
  pol?: string;
  profilePicture?: string;
};

export type UserProfile = {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  ime: string;
  prezime: string;
  pol: string;
  datumRodjenja: Date;
  adresa: string;
  grad: string;
};
