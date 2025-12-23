<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReviewResource;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\JsonResponse;

class ReviewController extends Controller
{

    public function submitReview(Request $request)
    {
        // Validate incoming data
        try {
            // Validate
            $validator = Validator::make($request->all(), [
                'exam_id'               => 'required|exists:exams,id',
                'body'                  => 'required|string',
                'rating'                => 'required|integer|min:1|max:5',
            ]);

            // If validation fails → return custom error response
            if ($validator->fails()) {
                return $this->responseWithError(
                    "Validation failed",
                    $validator->errors(),
                    422
                );
            }

            $validated = $validator->validated();
            $validated['candidate_id'] = auth('candidate')->user()->id;
            $validated['reviewer_name'] = auth('candidate')->user()->full_name;

            // Create review
            $review = Review::updateOrCreate(
                [
                    'exam_id'     => $validated['exam_id'],
                    'candidate_id' => auth('candidate')->id(),
                ],
                [
                    'body'                  => $validated['body'],
                    'rating'                => $validated['rating'],
                    'reviewer_name'         => auth('candidate')->user()->full_name,
                ]
            );

            return $this->responseWithSuccess(
                ReviewResource::make($review),
                "Review created successfully",
                201
            );
        } catch (\Exception $e) {
            // Catch unexpected errors
            return $this->responseWithError(
                "Something went wrong",
                ['error' => $e->getMessage()],
                500
            );
        }
    }
}
