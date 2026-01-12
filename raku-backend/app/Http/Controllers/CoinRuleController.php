<?php

namespace App\Http\Controllers;

use App\Models\CoinRule;
use Illuminate\Http\Request;

class CoinRuleController extends Controller
{
    public function index()
    {
        $coinRules = CoinRule::latest()->paginate(20);
        return view('coin-rules.index', compact('coinRules'));
    }

    public function edit(CoinRule $coinRule)
    {
        return view('coin-rules.edit', compact('coinRule'));
    }

    public function update(Request $request, CoinRule $coinRule)
    {
        $request->validate([
            'points_min' => 'required|numeric|min:0',
            'points_max' => 'nullable|numeric|min:0',
            'status'     => 'required|boolean',
        ]);

        $coinRule->update([
            'points_min' => $request->points_min,
            'points_max' => $request->points_max,
            'status'     => $request->status,
        ]);

        return redirect()
            ->route('business-settings.coin-rules.index')
            ->with('success', 'Coin rule updated successfully');
    }

    // public function update(Request $request, CoinRule $coinRule)
    // {
    //     $coinRule->update($request->only([
    //         'points_min',
    //         'points_max',
    //         'status'
    //     ]));

    //     return back()->with('success', 'Rule updated');
    // }
}
