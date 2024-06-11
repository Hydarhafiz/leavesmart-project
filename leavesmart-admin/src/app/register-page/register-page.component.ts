import { Component } from '@angular/core';
import { IAdmin } from '../interface/admin';
import { ICompany } from '../interface/company';
import { IPackageType } from '../interface/package-type';
import { AdminService } from '../services/admin.service';
import { PackageService } from '../services/package.service';
import { CompanyService } from '../services/company.service';
import { Router } from '@angular/router';

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
  packageTypeOptions: { value: number, display: string }[] = []; // Array to store leave options

  getCompany: ICompany[] = [];
  companyOptions: { value: number, display: string }[] = [];

  hasRegisteredCompany: string = 'no'; 

  constructor(
    private adminService: AdminService,
    private packageTypeService: PackageService,
    private companyService: CompanyService,
    private router: Router
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
              return { value: packageType.id, display: packageType.type_name };
            } else {
              // handle the case where id is undefined, maybe log an error or handle it differently
              return { value: 0, display: 'Undefined package' }; // Default value for example
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
  
  submitRegister() {
    //if company have registered
    if(this.hasRegisteredCompany ==='yes'){
      const data = { 
        username: this.admin.username,
        email: this.admin.email,
        password: this.admin.password,
        gender: this.admin.gender,
        contact_number: this.admin.contact_number,
        company_id: this.admin.company_id
      };

      this.adminService.postNewAdmin(data).subscribe(
        (response: any) => {
          console.log('Your account has been registered successfully:', response);
          this.router.navigate(['/login'])
        },
        error => {
          console.error('Error registering:', error);
          // Handle error
        }
      );

    } 
    
    //if company not registered yet
    else{
      const data = { 
        username: this.admin.username,
        email: this.admin.email,
        password: this.admin.password,
        gender: this.admin.gender,
        contact_number: this.admin.contact_number,
        company_name: this.company.company_name,
        registration_number: this.company.registration_number,
        company_contact_number: this.company.company_contact_number,
        company_email: this.company.company_email,
        industry: this.company.industry,
        website: this.company.website,
        package_type_id: this.company.package_type_id
      };
      console.log(data); // Just to verify the data being sent
      this.adminService.postNewAdminAndCompany(data).subscribe(
        (response: any) => {
          console.log('Your account has been registered successfully:', response);
          this.router.navigate(['/login'])
        },
        error => {
          console.error('Error registering:', error);
          // Handle error
        }
      );
    }
    
  }
  
}
