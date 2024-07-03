export interface IStaff {
    id?: number;
    FullName: string;
    gender: string;
    contact_number: string;
    email: string;
    password: string;
    photo_staff: File | null; // Use File type for the file object

    job_position_id: number;
    admin_id: number;
    company_id: number;
    job_position?: { position_name: string }; // Include job_position property
    admin?: { username: string }; // Include admin property
    company?: { company_name: string }; // Include company property
  }
  