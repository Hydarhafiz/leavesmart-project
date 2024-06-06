export interface ILeaveRequest {
    leave_type?: any;
    staff?: any;
    id: number
    leave_title: string;
    start_date: Date;
    end_date: Date;
    total_days: number;
    reason: string;
    manager_comments: string;
    status: string;
    staff_id: number;
    leave_type_id: number;
    company_id: number;

}