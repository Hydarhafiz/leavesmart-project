import { Component } from '@angular/core';
import { IAdmin } from '../interface/admin';
import { ICompany } from '../interface/company';
import { IPackageType } from '../interface/package-type';
import { AdminService } from '../services/admin.service';
import { PackageService } from '../services/package.service';
import { CompanyService } from '../services/company.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  admin: IAdmin = {
    username: '',
    email: '',
    password: '',
    gender: '',
    contact_number: '',
    photo_admin: null
  }
  company: ICompany = {
    company_name: '',
    registration_number: '',
    company_contact_number: '',
    company_email: '',
    industry: '',
    website: '',
    package_type_id: 0
  };
  packageType: IPackageType[] = [];
  packageTypeOptions: { value: number, display: string, maxStaff: number }[] = []; // Array to store leave options

  getCompany: ICompany[] = [];
  companyOptions: { value: number, display: string }[] = [];

  hasRegisteredCompany: string = 'no';

  constructor(
    private adminService: AdminService,
    private packageTypeService: PackageService,
    private companyService: CompanyService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchPackageTypeData();
    this.fetchCompanyData();
  }

  fetchPackageTypeData() {
    this.packageTypeService.fetchPackageTypes().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.packageType = response.data;

          // Create leave options array with value (leave_type_id) and display (leave_name)
          this.packageTypeOptions = this.packageType.map(packageType => {
            if (packageType.id !== undefined) {
              return { value: packageType.id, display: packageType.type_name, maxStaff: packageType.max_staff_count };
            } else {
              // handle the case where id is undefined, maybe log an error or handle it differently
              return { value: 0, display: 'Undefined package', maxStaff: 0 }; // Default value for example
            }
          });

        } else {
          console.error('Invalid response format:', response);
        }
      },
      error => {
        console.error('Error fetching package type:', error);
        // Handle error
      }
    );
  }

  fetchCompanyData() {
    this.companyService.fetchCompanies().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.getCompany = response.data;

          // Create leave options array with value (leave_type_id) and display (leave_name)
          this.companyOptions = this.getCompany.map(getCompany => {
            if (getCompany.id !== undefined) {
              return { value: getCompany.id, display: getCompany.company_name };
            } else {
              // handle the case where id is undefined, maybe log an error or handle it differently
              return { value: 0, display: 'Undefined company' }; // Default value for example
            }
          });

        } else {
          console.error('Invalid response format:', response);
        }
      },
      error => {
        console.error('Error fetching company:', error);
        // Handle error
      }
    );
  }


  resetForm() {
    this.admin = {
      username: '',
      email: '',
      password: '',
      gender: '',
      contact_number: '',
      photo_admin: null

    }
    this.company = {
      company_name: '',
      registration_number: '',
      company_contact_number: '',
      company_email: '',
      industry: '',
      website: '',
      package_type_id: 0
    };
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.admin.photo_admin = file;
    }
  }

  submitRegister() {
    //if company have registered
    if (this.hasRegisteredCompany === 'yes') {


      const formData = new FormData();
      if (this.admin.photo_admin) {
        formData.append('photo_admin', this.admin.photo_admin);
      }
      formData.append('username', this.admin.username);
      formData.append('email', this.admin.email);
      formData.append('password', this.admin.password);
      formData.append('gender', this.admin.gender);
      formData.append('contact_number', this.admin.contact_number);
      // Check if company_id is defined before appending
      if (this.admin.company_id !== undefined) {
        formData.append('company_id', String(this.admin.company_id));
      }

      this.adminService.postNewAdmin(formData).subscribe(
        (response: any) => {
          console.log('Your account has been registered successfully:', response);
          this.toastr.success('Account Registration Successful', 'Success');
          this.router.navigate(['/login'])
        },
        error => {
          console.error('Error registering:', error);
          if (error.error.error) {
            this.toastr.error(error.error.error, 'Error');
          } else {
            this.toastr.error('An unexpected error occurred', 'Error');
          }        
        }
      );

    }

    //if company not registered yet
    else {

      const formData = new FormData();
      if (this.admin.photo_admin) {
        formData.append('photo_admin', this.admin.photo_admin);
      }
      formData.append('username', this.admin.username);
      formData.append('email', this.admin.email);
      formData.append('password', this.admin.password);
      formData.append('gender', this.admin.gender);
      formData.append('contact_number', this.admin.contact_number);
      formData.append('company_name', this.company.company_name);
      formData.append('registration_number', this.company.registration_number);
      formData.append('company_contact_number', this.company.company_contact_number);
      formData.append('company_email', this.company.company_email);
      formData.append('industry', this.company.industry);
      formData.append('website', this.company.website);
      formData.append('package_type_id', this.company.package_type_id.toString());
      formData.append('company_id', String(this.company.id));


      console.log(formData); // Just to verify the data being sent
      this.adminService.postNewAdminAndCompany(formData).subscribe(
        (response: any) => {
          console.log('Your account has been registered successfully:', response);
          this.toastr.success('Account Registration Successful', 'Success');
          this.router.navigate(['/login']);
        },
        (error: any) => {
          if (error.error && error.error.error) {
            this.toastr.error(error.error.error, 'Error');
          } else {
            this.toastr.error('An unexpected error occurred', 'Error');
          }
        }
      );
    }

  }

}
