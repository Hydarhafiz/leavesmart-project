<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStaffTable extends Migration
{
    public function up()
    {
        Schema::create('staff', function (Blueprint $table) {
            $table->id();
            $table->string('FullName');
            $table->string('gender');
            $table->string('contact_number');
            $table->string('email')->unique();
            $table->string('password');
            //$table->string('photo_staff')->nullable();
            $table->unsignedBigInteger('company_id');
            $table->unsignedBigInteger('job_position_id');
            $table->unsignedBigInteger('admin_id');
            $table->timestamps();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
            $table->foreign('job_position_id')->references('id')->on('job_positions')->onDelete('cascade');
            $table->foreign('admin_id')->references('id')->on('admins')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('staff');
    }
}
