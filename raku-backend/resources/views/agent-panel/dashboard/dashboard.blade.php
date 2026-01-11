@extends('agent-panel.layout.agent_master')

@section('contents')
    <div class="space-y-6">
        <!-- Header Section -->
        <section class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
                <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
                    Welcome Agent - {{ auth()->guard('agent')->user()->name }}!
                </h1>
                {{-- <p class="text-gray-600 mt-1">Track site details</p> --}}
            </div>
        </section>

       
    </div>
@endsection
