export interface IAdmin {
  photo_admin: File | null; // Use File type for the file object
    id?: number;
    username: string;
    email: string;
    password: string;
    gender: string;
    contact_number: string;
    company_id?: number;

  }
  