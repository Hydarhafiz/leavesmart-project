# LeaveSmart

## Introduction
LeaveSmart is a web-based application developed in collaboration with Double Bubble Enterprise to streamline leave management processes for companies of all sizes. Built using Angular for the frontend, PHP for the backend, and MySQL for the database, the platform offers a user-friendly interface for both employees and administrators.

## Technologies Used
- Angular (frontend)
- Laravel (backend)
- MySQL (database)

## Key Features

### LeaveSmart Client
- Allows employees to easily access and manage their leave balances.
- Enables viewing of current leave requests and submission of new leave applications.

### LeaveSmart Admin
- Provides administrators with comprehensive tools to manage company leave policies.
- Enables creation of employee accounts, approval or rejection of leave requests, and generation of leave reports.

LeaveSmart is offered as a subscription-based service, providing companies with a cost-effective solution for managing employee leave.

## Setup Instructions
1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Set up the MySQL database by installing XAMPP.
3. Connect MySQL to `leavesmart-backend` using the environment configuration file (`.env`).
4. In the `leavesmart-system` directory, install the necessary packages:
    ```bash
    npm install
    ```
5. Run Laravel in `leavesmart-backend`:
    ```bash
    php artisan serve
    ```
6. Run Angular in `leavesmart-system`:
    ```bash
    npm run start
    ```
