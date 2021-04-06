<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    public function findAllCategories()
    {
        $categories = Category::all();
        return response()->json(['categories'=>$categories],200);
    }

    public function findSubcategoryByCategoryId($category_id)
    {
        $subcategories = Subcategory::where('category_id',$category_id)->get();
        return response()->json(['subcategories'=>$subcategories],200);
    }

    public function findCategoryBySubcategoryId($subcategory_id){
        $category = DB::select('select subcategories.name as subcategory_name, categories.name as category_name, categories.id as category_id FROM
        categories JOIN subcategories on categories.id = subcategories.category_id
        WHERE subcategories.id = ?', [$subcategory_id]);
        return response()->json(['category'=>$category],200);
    }
}
