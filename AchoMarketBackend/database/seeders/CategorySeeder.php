<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $category1 = new Category();
       $category1->name = 'Moda / Accesorios';
       $category1->save();
       $category2 = new Category();
       $category2->name = 'Artesanía y hogar';
       $category2->save();
       $category3 = new Category();
       $category3->name ='Informática';
       $category3->save();
       $category4 = new Category();
       $category4->name ='Belleza y salud';
       $category4->save();
       $category5 = new Category();
       $category5->name ='Electrónica';
       $category5->save();
       $category6 = new Category();
       $category6->name ='Bodega';
       $category6->save();
       $category7 = new Category();
       $category7->name ='Iluminación';
       $category7->save();
       $category8 = new Category();
       $category8->name ='Ferretería';
       $category8->save();
       $category9 = new Category();
       $category9->name ='Papelería';
       $category9->save();
       $category10 = new Category();
       $category10->name ='Óptica';
       $category10->save();
       $category11 = new Category();
       $category11->name ='Bebés';
       $category11->save();
       $category12 = new Category();
       $category12->name ='Electrodomésticos';
       $category12->save();
       $category13 = new Category();
       $category13->name ='Joyería y bisutería';
       $category13->save();
    }
}
