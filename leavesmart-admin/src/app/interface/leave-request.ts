export interface ILeaveRequest {
    leave_title: string;
    start_date: Date;
    end_date: Date;
    total_days: number;
    manager_comments: string;
    status: string;
    staff_id: number;
    leave_type_id: number;
    company_id: number;
  }