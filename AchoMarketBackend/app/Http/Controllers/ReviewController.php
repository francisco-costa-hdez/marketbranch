<?php

namespace App\Http\Controllers;

use App\Services\ReviewService;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    protected $reviewService;

    public function __construct(ReviewService $rs)
    {
        $this->reviewService = $rs;
    }

    public function getAllProductReviews(int $product_id)
    {
        $reviews = $this->reviewService->getAllProductReviews($product_id);
        return response()->json(['reviews'=> $reviews],200);
    }

    public function getAllUserReviews(int $user_id)
    {
        $reviews = $this->reviewService->getAllUserReviews($user_id);
        return response()->json(['reviews'=> $reviews],200);
    }

    public function createReview(Request $request)
    {
        return $this->reviewService->createReview($request);
    }

    public function updateReview(int $review_id, Request $request)
    {
        return $this->reviewService->updateReview($review_id, $request->all());
    }

    public function deleteReview(int $review_id)
    {
        return $this->reviewService->deleteReview($review_id);
    }
}
