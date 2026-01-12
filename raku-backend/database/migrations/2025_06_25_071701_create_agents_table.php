<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAgentsTable extends Migration
{
    public function up()
    {
        Schema::create('agents', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('business_name');
            $table->string('photo')->nullable();
            $table->decimal('commission_amount', 5, 2)->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('phone');
            $table->string('location');
            $table->boolean('status')->default(true);
            $table->string('last_login_ip')->nullable();
            $table->dateTime('last_login')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('agents');
    }
}
