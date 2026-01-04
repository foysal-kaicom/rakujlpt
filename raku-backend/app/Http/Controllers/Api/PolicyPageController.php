<?php

namespace App\Http\Controllers\Api;

use App\Models\ReturnPolicy;
use Illuminate\Http\Request;
use App\Models\PrivacyPolicy;
use App\Models\TermsCondition;
use App\Http\Controllers\Controller;

class PolicyPageController extends Controller
{
    public function show(Request $request)
    {
        $request->validate([
            'type' => 'required|in:privacy,terms,return_policy',
            'lang' => 'nullable|string', // optional, default app locale
        ]);

        $type = $request->input('type');
        $lang = $request->input('lang', app()->getLocale());

        $modelMap = [
            'privacy' => PrivacyPolicy::class,
            'terms' => TermsCondition::class,
            'return_policy' => ReturnPolicy::class,
        ];

        $model = $modelMap[$type];

        $policy = $model::latest()->first();

        if (!$policy) {
            return response()->json([
                'status' => false,
                'message' => 'Content not found'
            ], 404);
        }

        // return localized content
        $content = $policy->content[$lang] ?? $policy->content[app()->getLocale()] ?? '';

        return response()->json([
            'status' => true,
            'type' => $type,
            'content' => $content,
        ]);
    }
}
