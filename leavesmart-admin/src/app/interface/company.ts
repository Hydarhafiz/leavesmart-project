export interface ICompany {
    id?: number;
    company_name: string;
    registration_number: string;
    company_contact_number: string;
    company_email: string;
    industry: string;
    website: string;
    package_type_id: number;
    total_staffs?: number;
    total_admins?: number
  }