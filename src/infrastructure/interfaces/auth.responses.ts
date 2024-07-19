/* eslint-disable prettier/prettier */
export interface AuthResponses {
    id:       string;
    email:    string;
    fullName: string;
    isActive: boolean;
    roles:    string[];
    token:    string;
}
