<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('leave_requests', function (Blueprint $table) {
            $table->id();
            $table->string('leave_title');
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('total_days');
            $table->string('reason');
            $table->string('attachment');
            $table->string('manager_comments')->nullable();
            $table->string('status');
            $table->unsignedBigInteger('staff_id');
            $table->unsignedBigInteger('company_id');
            $table->unsignedBigInteger('leave_type_id');
            $table->unsignedBigInteger('admin_id');
            $table->timestamps();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
            $table->foreign('staff_id')->references('id')->on('staff')->onDelete('cascade');
            $table->foreign('leave_type_id')->references('id')->on('leave_types')->onDelete('cascade');
            $table->foreign('admin_id')->references('id')->on('admins')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leave_requests');
    }
};
