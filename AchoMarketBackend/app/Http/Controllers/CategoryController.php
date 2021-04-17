<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Subcategory;
use App\Services\CategoryService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }
    public function findAllCategories()
    {
        $categories = $this->categoryService->findAllCategories();
        return response()->json(['categories'=>$categories],200);
    }

    public function findSubcategoryByCategoryId(int $category_id)
    {
        $subcategories = $this->categoryService->findSubcategoryByCategoryId($category_id);
        return response()->json(['subcategories'=>$subcategories],200);
    }

    public function findCategoryBySubcategoryId(int $subcategory_id)
    {
        $category = $this->categoryService->findCategoryBySubcategoryId($subcategory_id);
        return response()->json(['category'=>$category],200);
    }
}
