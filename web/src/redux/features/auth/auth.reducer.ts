// import { createSlice } from "@reduxjs/toolkit";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum AuthProvider {
  GOOGLE = "GOOGLE",
  EMAIL = "EMAIL",
}

// export class AuthState {
//   id: string;
//   name: string = "";
//   email: string = "";
//   username: string = "";
//   role: Role = Role.USER;
//   avatar: string = "";
//   isEmailVerified: boolean = false;
//   authProvider: AuthProvider | null = null;
//   createdAt: string;
//   updatedAt: string;
// }

// const authReducer = createSlice({
//   name: "auth",
//   initialState: {},
// });
