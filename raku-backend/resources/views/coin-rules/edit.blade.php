@extends('master')

@section('contents')

<div class="bg-white rounded shadow-sm">

    <form action="{{ route('business-settings.coin-rules.update', $coinRule->id) }}" method="POST">
        @csrf
        @method('PUT')

        <div class="p-3 bg-indigo-400 rounded-top">
            <h3 class="fs-5 text-white">Edit Coin Rule</h3>
        </div>

        <div class="p-4 row g-4">
            <div class="col-md-6">
                <label class="form-label">Title</label>
                <input type="text" class="form-control" value="{{ $coinRule->title }}" disabled>
            </div>

            <div class="col-md-6">
                <label class="form-label">Action</label>
                <input type="text" class="form-control" value="{{ $coinRule->action }}" disabled>
            </div>

            <div class="col-md-6">
                <label class="form-label">Type</label>
                <input type="text" class="form-control" value="{{ ucfirst($coinRule->type) }}" disabled>
            </div>

            <div class="col-md-6">
                <label class="form-label">Frequency</label>
                <input type="text" class="form-control" value="{{ $coinRule->frequency }}" disabled>
            </div>

            <div class="col-md-6">
                <label class="form-label">Status</label>
                <select name="status" class="form-control">
                    <option value="1" {{ $coinRule->status ? 'selected' : '' }}>Active</option>
                    <option value="0" {{ !$coinRule->status ? 'selected' : '' }}>Inactive</option>
                </select>
            </div>

            <div class="col-md-6">
                <label class="form-label">Points</label>
                <input type="number" step="0.01" name="points_min"
                       value="{{ old('points_min', (int)$coinRule->points_min) }}"
                       class="form-control">
                @error('points_min')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div>

            {{-- <div class="col-md-6">
                <label class="form-label">Maximum Points</label>
                <input type="number" step="0.01" name="points_max"
                       value="{{ old('points_max', $coinRule->points_max) }}"
                       class="form-control">
                @error('points_max')
                    <div class="text-danger">{{ $message }}</div>
                @enderror
            </div> --}}

            <div class="d-flex justify-content-end mt-4">
                <button type="submit" class="btn btn-primary w-25">
                    Save Changes
                </button>
            </div>

        </div>
    </form>

</div>

@endsection
