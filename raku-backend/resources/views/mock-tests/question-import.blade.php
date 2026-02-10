@extends('master')

@section('contents')
<div class="px-10">
    <h3 class="text-xl font-semibold p-[12px] rounded-t-lg text-black bg-indigo-300">
        Import Questions via CSV
    </h3>

    <div class="p-8 rounded-b-lg bg-white border space-y-6">

        <a href="{{ route('mock-tests.question-import-sample') }}"
            class="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-semibold hover:opacity-90">
            Download Sample CSV
        </a>
     

        <form action="{{ route('mock-tests.question-import') }}" method="post" enctype="multipart/form-data">
            @csrf

            <div class="space-y-2">
                <label class="block font-semibold">Upload CSV</label>
                <input type="file" name="csv" accept=".csv,text/csv"
                       class="bg-white drop-shadow-md text-sm border rounded px-3 py-2 w-full" required>
                @error('csv')
                    <p class="text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="flex justify-center pt-4">
                <button class="px-8 py-2 rounded-md bg-indigo-500 text-white font-semibold hover:opacity-90 duration-300 w-[250px]">
                    Import CSV
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
