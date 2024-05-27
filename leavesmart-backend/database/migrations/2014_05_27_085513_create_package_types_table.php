<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePackageTypesTable extends Migration
{
    public function up()
    {
        Schema::create('package_types', function (Blueprint $table) {
            $table->id();
            $table->string('type_name');
            $table->integer('max_staff_count');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('package_types');
    }
}
