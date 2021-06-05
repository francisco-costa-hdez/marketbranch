<?php

namespace App\Services\Repositories\Interfaces;

use Illuminate\Http\Request;

interface IReviewRepository
{
    public function getAllProductReviews(int $product_id);

    public function getAllUserReviews(int $user_id);

    public function createReview(Request $data);

    public function updateReview(int $review_id, array $data);

    public function deleteReview(int $review_id);
}