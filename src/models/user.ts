export interface UserRequestBody {
  email?: string;
  name?: string;
  userId?: string;
}

export interface UserResponseData {
  id?: string;
  message?: string;
  error?: string;
  userId?: string;
  data?: UserRequestBody | {}; // Assuming the data can be the shape of UserRequestBody or an empty object
}

export interface UserProfile {
  email: string;
  name: string;
}

export interface UserData {
  email: string;
  name: string;
  firebaseId: string;
  id: string;
}
