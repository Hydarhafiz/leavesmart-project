export interface ILeaveRequest {
    leave_title: string;
    start_date: Date;
    end_date: Date;
    total_days: number;
    reason: string;
    manager_comments: string;
    status: string;
    staff_id: number;
    leave_type_id: number;
    admin_id: number;
    company_id: number;
    leave_type?: { leave_name: string }; // Include job_position property
  }