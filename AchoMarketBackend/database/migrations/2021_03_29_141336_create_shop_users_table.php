<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shop_users', function (Blueprint $table) {
                $table->id();
                $table->string('nif',9)->unique();
                $table->string('admin_name',50);
                $table->string('email',100)->unique();
                $table->binary('profile_img');
                $table->string('password');
                $table->boolean('confirmed')->default(0);
                $table->string('confirmation_code')->nullable();
                $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shop_users');
    }
}
