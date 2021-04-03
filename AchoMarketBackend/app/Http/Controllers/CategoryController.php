<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function findAllCategories()
    {
        $categories = Category::all();
        return response()->json($categories,200);
    }

    public function findSubcategoryByCategoryId($category_id)
    {
        $categories = Subcategory::where('category_id',$category_id)->get();
        return response()->json($categories,200);
    }
}
