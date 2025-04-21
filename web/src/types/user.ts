export interface User {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
