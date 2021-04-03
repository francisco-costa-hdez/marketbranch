<?php

namespace Database\Seeders;

use App\Models\Subcategory;
use Illuminate\Database\Seeder;

class SubcategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $subcategory11 = new Subcategory();
        $subcategory11->name = 'Deportiva';
        $subcategory11->category_id = 1;
        $subcategory11->save();
        $subcategory12 = new Subcategory();
        $subcategory12->name = 'Moda niño';
        $subcategory12->category_id = 1;
        $subcategory12->save();
        $subcategory13 = new Subcategory();
        $subcategory13->name = 'Moda niña';
        $subcategory13->category_id = 1;
        $subcategory13->save();
        $subcategory14 = new Subcategory();
        $subcategory14->name = 'Hombre';
        $subcategory14->category_id = 1;
        $subcategory14->save();
        $subcategory15 = new Subcategory();
        $subcategory15->name = 'Mujer';
        $subcategory15->category_id = 1;
        $subcategory15->save();
        $subcategory16 = new Subcategory();
        $subcategory16->name = 'Accesorios';
        $subcategory16->category_id = 1;
        $subcategory16->save();

        $subcategory21 = new Subcategory();
        $subcategory21->name = 'Artesanía';
        $subcategory21->category_id = 2;
        $subcategory21->save();
        $subcategory22 = new Subcategory();
        $subcategory22->name = 'Regalos';
        $subcategory22->category_id = 2;
        $subcategory22->save();
        $subcategory23 = new Subcategory();
        $subcategory23->name = 'Hogar';
        $subcategory23->category_id = 2;
        $subcategory23->save();

        $subcategory31 = new Subcategory();
        $subcategory31->name = 'Portátiles y sobremesa';
        $subcategory31->category_id = 3;
        $subcategory31->save();
        $subcategory32 = new Subcategory();
        $subcategory32->name = 'Componentes';
        $subcategory32->category_id = 3;
        $subcategory32->save();
        $subcategory33 = new Subcategory();
        $subcategory33->name = 'Impresoras';
        $subcategory33->category_id = 3;
        $subcategory33->save();
        $subcategory34 = new Subcategory();
        $subcategory34->name = 'Redes';
        $subcategory34->category_id = 3;
        $subcategory34->save();
        $subcategory35 = new Subcategory();
        $subcategory35->name = 'Otros';
        $subcategory35->category_id = 3;
        $subcategory35->save();

        $subcategory41 = new Subcategory();
        $subcategory41->name = 'Belleza';
        $subcategory41->category_id = 4;
        $subcategory41->save();
        $subcategory42 = new Subcategory();
        $subcategory42->name = 'Higiente';
        $subcategory42->category_id = 4;
        $subcategory42->save();
        $subcategory43 = new Subcategory();
        $subcategory43->name = 'Perfumes';
        $subcategory43->category_id = 4;
        $subcategory43->save();
        $subcategory44 = new Subcategory();
        $subcategory44->name = 'Salud';
        $subcategory44->category_id = 4;
        $subcategory44->save();

        $subcategory51 = new Subcategory();
        $subcategory51->name = 'Móviles y tablets';
        $subcategory51->category_id = 5;
        $subcategory51->save();
        $subcategory52 = new Subcategory();
        $subcategory52->name = 'Radio y TV';
        $subcategory52->category_id = 5;
        $subcategory52->save();
        $subcategory53 = new Subcategory();
        $subcategory53->name = 'Consolas y Gaming';
        $subcategory53->category_id = 5;
        $subcategory53->save();
        $subcategory54 = new Subcategory();
        $subcategory54->name = 'Otros';
        $subcategory54->category_id = 5;
        $subcategory54->save();

        $category6 = new Subcategory();
        $category6->name ='Bodega';
        $category6->category_id = 6;
        $category6->save();
        $category7 = new Subcategory();
        $category7->name ='Iluminación';
        $category7->category_id = 7;
        $category7->save();
        $category8 = new Subcategory();
        $category8->name ='Ferretería';
        $category8->category_id = 8;
        $category8->save();
        $category9 = new Subcategory();
        $category9->name ='Papelería';
        $category9->category_id = 9;
        $category9->save();
        $category10 = new Subcategory();
        $category10->name ='Óptica';
        $category10->category_id = 10;
        $category10->save();
        $category11 = new Subcategory();
        $category11->name ='Bebés';
        $category11->category_id = 11;
        $category11->save();
        $category12 = new Subcategory();
        $category12->name ='Electrodomésticos';
        $category12->category_id = 12;
        $category12->save();
        $category13 = new Subcategory();
        $category13->name ='Joyería y bisutería';
        $category13->category_id = 13;
        $category13->save();
    }
}
