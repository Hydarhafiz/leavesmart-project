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
        Schema::create('job_position_leave_types', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('job_position_id');
            $table->unsignedBigInteger('leave_type_id');
            $table->integer('max_allowed_days');
            $table->unsignedBigInteger('company_id');
            $table->timestamps();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
            $table->foreign('job_position_id')->references('id')->on('job_positions')->onDelete('cascade'); 
            $table->foreign('leave_type_id')->references('id')->on('leave_types')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_position_leave_types');
    }
};
