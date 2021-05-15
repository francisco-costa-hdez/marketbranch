<?php

namespace App\Services;

use App\Services\Repositories\ReviewRepository;
use Illuminate\Http\Request;

class ReviewService 
{
    protected $reviewRepository;

    public function __construct(ReviewRepository $rr)
    {
        $this->reviewRepository = $rr;
    }

    public function getAllProductReviews(int $product_id)
    {
        return $this->reviewRepository->getAllProductReviews($product_id);
    }

    public function getAllUserReviews(int $user_id)
    {
        return $this->reviewRepository->getAllUserReviews($user_id);
    }

    public function createReview(Request $data)
    {
        return $this->reviewRepository->createReview($data);
    }

    public function updateReview(int $review_id,array $data)
    {
        return $this->reviewRepository->updateReview($review_id,$data);
    }

    public function deleteReview(int $review_id)
    {
        return $this->reviewRepository->deleteReview($review_id);
    }
}