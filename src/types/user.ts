export interface IUser {
  id: string;
  email: string;
  name: string;
  password: string;
  role: 'user' | 'admin';
  created_at: string;
}