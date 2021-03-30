<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name',50);
            $table->decimal('price',7,2);
            $table->text('description');
            $table->integer('discount');
            $table->integer('stock');
            $table->integer('availability');
            $table->foreignId('shop_id')->constrained()->onUpdate('cascade')
            ->onDelete('cascade');
            $table->foreignId('subcategory_id')->constrained()->onUpdate('cascade')
            ->onDelete('cascade');
            $table->foreignId('trademark_id')->constrained()->onUpdate('cascade')
            ->onDelete('cascade');
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
        Schema::dropIfExists('products');
    }
}
