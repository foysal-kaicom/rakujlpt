<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

function checkAdminPermission($permission)
{
    $user = Auth::user();

    if (!$user || !$user->roles) {
        return false;
    }

    if($user->roles->slug === "super-admin"){
        return true;
    }
    
    return $user->roles->permissions->contains('slug', $permission);
}

function sanitizePhoneNumber(?string $number): ?string
{
    if (empty($number)) {
        return null;
    }

    // 1) Remove any non-digit characters
    $n = preg_replace('/\D+/', '', $number);

    // 2) Normalize common prefixes:
    // If starts with "00880" (some people use 00-prefix), remove leading "00" -> becomes "880..."
    if (strpos($n, '00880') === 0) {
        $n = substr($n, 2); // remove the leading '00'
    }

    // If starts with '+' was removed by preg_replace, so nothing to do for '+880'
    // Now handle different plausible lengths and prefixes:

    // Case A: already in desired international format: 880 + 10 digits => length 13
    if (strlen($n) === 13 && substr($n, 0, 3) === '880') {
        // Additional check: after '880' the next digit should be '1' (mobile)
        if (substr($n, 3, 1) === '1') {
            return $n;
        }
        return null;
    }

    // Case B: local format with leading zero: 0XXXXXXXXXX (11 digits) -> convert to 880 + substr(1)
    // Example: 01616626211 (11 digits) -> '880' . '1616626211' => 13 digits
    if (strlen($n) === 11 && substr($n, 0, 1) === '0') {
        $converted = '880' . substr($n, 1); // remove leading 0 and prepend 880
        return (substr($converted, 3, 1) === '1') ? $converted : null;
    }

    // Case C: number without leading zero but 10 digits (starts with '1'): e.g. 1712345678
    // -> assume missing leading zero and add 880
    if (strlen($n) === 10 && substr($n, 0, 1) === '1') {
        $converted = '880' . $n; // makes 13 digits
        return $converted;
    }

    // Anything else is invalid (too short/long or wrong prefix)
    return null;
}

function sanitizeName(string $name): string
{
    // Step 1: Try to transliterate "fancy" unicode characters to ASCII
    // but only if they are stylized variants (e.g., 𝙏 → T)
    $normalized = Normalizer::normalize($name, Normalizer::FORM_KD);
    $normalized = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $normalized);

    // Step 2: Replace the transliterated text back into UTF-8
    $name = mb_convert_encoding($normalized, 'UTF-8', 'ASCII');

    // Step 3: Remove unwanted characters — keep only letters, dots, and spaces
    $name = preg_replace('/[^\p{L}.\s]/u', '', $name);

    // Step 4: Normalize spaces and dots
    $name = preg_replace('/\s+/', ' ', $name);
    $name = preg_replace('/\.+/', '.', $name);
    $name = preg_replace('/\s*\.\s*/', '. ', $name);

    // Step 5: Normalize casing for multilingual names
    $name = mb_convert_case(trim($name), MB_CASE_TITLE, "UTF-8");

    return $name;
}

function sanitizeEmail(?string $email): ?string
{
    if (empty($email)) {
        return null;
    }

    $email = strtolower(trim($email));
    $email = preg_replace('/\s+/', '', $email);
    $email = str_replace([',', ';'], '.', $email);
    $email = rtrim($email, ".,;");
    $email = preg_replace('/\.{2,}/', '.', $email);

    if (substr_count($email, '@') > 1) {
        $parts = explode('@', $email);
        $email = array_shift($parts) . '@' . implode('', $parts);
    }

    return filter_var($email, FILTER_SANITIZE_EMAIL);
}


