export interface IJobPositionLeaveType {
    id?: number;
    job_position_id: number;
    leave_type_id: number;
    max_allowed_days: number;
    company_id: number;
    leave_type?: { leave_name: string }; // Include leave_type property
  }