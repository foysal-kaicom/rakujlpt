<?php

namespace App\Http\Controllers;

use App\Models\ReturnPolicy;
use Illuminate\Http\Request;
use App\Models\PrivacyPolicy;
use App\Models\TermsCondition;

class PagePolicyController extends Controller
{
        public function edit()
    {
        return view('page-policies.edit', [
            'privacy' => PrivacyPolicy::latest()->first(),
            'terms' => TermsCondition::latest()->first(),
            'return' => ReturnPolicy::latest()->first(),
        ]);
    }

    public function updatePrivacy(Request $request)
    {
        $request->validate([
            'content_en' => 'required|string',
            'content_bn' => 'required|string',
        ]);

        $policy = PrivacyPolicy::latest()->first();
        $policy->update([
            'content' => [
                'en' => $request->input('content_en'),
                'bn' => $request->input('content_bn'),
            ],
        ]);

        return redirect()->back()->with('success', 'Privacy Policy updated successfully.');
    }

    public function updateTerms(Request $request)
    {
        $request->validate([
            'content_en' => 'required|string',
            'content_bn' => 'required|string',
        ]);

        $policy = TermsCondition::latest()->first();
        $policy->update([
            'content' => [
                'en' => $request->input('content_en'),
                'bn' => $request->input('content_bn'),
            ],
        ]);

        return redirect()->back()->with('success', 'Terms & Conditions updated successfully.');
    }

    public function updateReturn(Request $request)
    {
        $request->validate([
            'content_en' => 'required|string',
            'content_bn' => 'required|string',
        ]);

        $policy = ReturnPolicy::latest()->first();
        $policy->update([
            'content' => [
                'en' => $request->input('content_en'),
                'bn' => $request->input('content_bn'),
            ],
        ]);

        return redirect()->back()->with('success', 'Return Policy updated successfully.');
    }
}
