<?php

namespace App\Services\Repositories;

use App\Models\ClientUser;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReviewRepository
{

    private $review;

    public function __construct(Review $review)
    {
        $this->review = $review;
    }

    public function getAllProductReviews(int $product_id)
    {
        return Product::find($product_id)->reviews;
    }

    public function getAllUserReviews(int $user_id)
    {
        return ClientUser::find($user_id)->reviews;
    }

    public function createReview(Request $data)
    {
        if (auth()->user()) {
            if (auth()->user()->tokenCan('client_user')) {
                $this->review->create([
                    'rating' => $data->rating,
                    'comment' => $data->comment,
                    'client_user_id' => auth()->user()->id,
                    'product_id' => $data->product_id
                ]);
                return response()->json(['message' => 'Review creada correctamente']);
            }
        }
        return response()->json(['message' => 'Inicia sesión para poder dejar una review']);
    }


    public function updateReview(int $review_id, array $data)
    {
        $found = ClientUser::find(auth()->user()->id)->reviews->find($review_id);
        if (auth()->user() && $found) 
        {
            $this->review->find($review_id)->update([
                'rating' => $data['rating'],
                'comment' => $data['comment']
            ]);
            return response()->json(['message' => 'Review modificada correctamente']);
        }
        return response()->json(['message' => 'Inicia sesión para poder modificar la review']);
    }

    public function deleteReview(int $review_id)
    {
        $found = ClientUser::find(auth()->user()->id)->reviews->find($review_id);

        if (auth()->user() && $found) 
        {
            $this->review->destroy($review_id);
            return response()->json(['message' => 'Review eliminada correctamente']);
        }
        return response()->json(['message' => 'Inicia sesión para poder eliminar la review']);
        
    }
}