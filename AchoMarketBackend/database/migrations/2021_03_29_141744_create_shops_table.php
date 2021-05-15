<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shops', function (Blueprint $table) {
            $table->id();
            $table->string('name',50)->nullable()->default(null);
            $table->text('description')->nullable()->default(null);
            $table->string('address',100)->nullable()->default(null);
            $table->string('tlf',9)->unique()->nullable()->default(null);
            $table->string('email',100)->unique()->nullable()->default(null);   
            $table->foreignId('shop_user_id')->unique()->constrained()
            ->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('shops');
    }
}
