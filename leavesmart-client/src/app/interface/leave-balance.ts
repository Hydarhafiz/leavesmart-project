export interface ILeaveBalance{
    id?: number;
    title: string;
    days_left: number;
    staff_id: number;
    leave_type_id: number;
    job_position_id: number;
    company_id: number;
    leave_type?: { leave_name: string }; // Include job_position property
}