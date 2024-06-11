<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompaniesTable extends Migration
{
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('company_name');
            $table->string('registration_number');
            $table->string('contact_number');
            $table->string('email')->unique();
            $table->string('industry');
            $table->string('website')->nullable();
            $table->integer('total_staffs');
            $table->integer('total_admins');

            //$table->string('photo_company')->nullable();
            $table->unsignedBigInteger('package_type_id');
            $table->timestamps();
            $table->foreign('package_type_id')->references('id')->on('package_types')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('companies');
    }
}
