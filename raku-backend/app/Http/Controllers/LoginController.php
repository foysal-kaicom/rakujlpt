<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login()
    {
        return view('login.login');
    }

    public function doLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {

            $user = Auth::user();

            if ($user->status == 'frozen') {
                Auth::logout();
                return redirect()->route('login')->with('error', 'Your account has been frozen.');
            }
            $user->update([
                'last_login' => now()
            ]);
            session()->flash('success', 'Login successful!');
            return redirect()->route('user.dashboard');
        }

        if (Auth::guard('agent')->attempt($credentials)) {

            $agent = Auth::guard('agent')->user();

            // Optional: Add frozen check for agents too if needed
            if ($agent->status == 0) {
                Auth::guard('agent')->logout();
                return redirect()->route('login')->with('error', 'Your agent account has been frozen.');
            }

            $agent->update(['last_login' => now()]);

            session()->flash('success', 'Agent Login successful!');
            return redirect()->route('agent.dashboard'); // Redirect to agent route
        }

        session()->flash('error', 'Invalid Credentials.');
        return redirect()->back();
    }

    public function logout()
    {
        Auth::logout();
        return redirect()->route('login')->with('success', 'You have been logged out.');
    }
}
