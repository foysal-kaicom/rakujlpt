<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('our_team', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('designation');
            $table->text('description')->nullable();
            $table->string('photo')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->string('facebook_url')->nullable();
            $table->string('github_url')->nullable();
            $table->integer('serial_no')->default(0);
            $table->boolean('status')->default(1);
            $table->timestamps();
        });
        
    }

    public function down()
    {
        Schema::dropIfExists('our_team');
    }
};
