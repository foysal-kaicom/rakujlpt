<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\NewsResource;
use App\Models\BusinessSetting;
use App\Models\Faq;
use App\Models\News;
use App\Models\Partner;
use App\Models\Review;

class CMSController extends Controller
{
    public function getFaqList()
    {
        $faqs = Faq::select('id','question','answer')->where('status', 1)->orderBy('position')->get();
        return $this->responseWithSuccess($faqs, 'All FAQ');
    }

    public function getNewsList()
    {
        $news=News::where('status','published')->orderBy('published_at', 'desc')->get();
        return $this->responseWithSuccess(NewsResource::collection($news),'All published');
    }

    public function viewSingleNews($slug)
    {
        $news=News::where('slug', $slug)->first();
        return $this->responseWithSuccess(NewsResource::make($news),'Single News View.');
    }

    public function getReviewList(){
        $reviews = Review::where('status', 1)->get();
        return $this->responseWithSuccess($reviews, 'All reviews fetched.');
    }

    public function getPartnerList(){
        $reviews = Partner::where('status', 1)->get();
        return $this->responseWithSuccess($reviews, 'All partners fetched.');
    }

}