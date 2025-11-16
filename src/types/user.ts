export interface IUser {
  id: string;
  email: string;
  name: string;
  password: string;
  role: 'user' | 'admin';
  created_at: string;
}

export interface ICreateUser{
  name: string
  email: string
  password: string
}

export interface ICreateUserReponse{
  message: string,
	user: {
		id: string,
		email: string,
		name: string,
		role: string
	}
}