@extends('master')

@section('contents')

{{-- Success Message --}}
@if(session('success'))
    <div class="alert alert-success alert-dismissible fade show mt-3" role="alert">
        {{ session('success') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
@endif

{{-- Error Message --}}
@if(session('error'))
    <div class="alert alert-danger alert-dismissible fade show mt-3" role="alert">
        {{ session('error') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
@endif

<section class="w-100 bg-white rounded overflow-hidden">

    {{-- Header --}}
    <div class="p-2 px-4 d-flex justify-content-between align-items-center"
         style="background-color: hsla(197, 66%, 81%, 0.879); color:#04070a">
        <h3 class="text-md m-0">Coin Rules</h3>

        {{-- Optional create button (if needed later) --}}
        {{--
        @hasPermission('coin-rules.create')
        <a href="{{ route('business-settings.coin-rules.create') }}"
           class="btn btn-primary btn-sm">
            <i class="fa-solid fa-plus"></i> Add Rule
        </a>
        @endHasPermission
        --}}
    </div>

    {{-- Table --}}
    <div class="table-responsive">
        <table class="table table-striped table-hover align-middle mb-0">
            <thead class="table-light">
                <tr>
                    {{-- <th class="text-uppercase text-secondary small">#</th> --}}
                    <th class="text-uppercase text-secondary small">Title</th>
                    <th class="text-uppercase text-secondary small">Action</th>
                    <th class="text-uppercase text-secondary small">Type</th>
                    <th class="text-uppercase text-secondary small">Points</th>
                    <th class="text-uppercase text-secondary small">Status</th>
                    <th class="text-uppercase text-secondary small text-center">Action</th>
                </tr>
            </thead>

            <tbody>
                @forelse($coinRules as $rule)
                    <tr>
                        {{-- <td>{{ $loop->iteration }}</td> --}}

                        <td>{{ $rule->title }}</td>
                        <td>[{{ $rule->action }}]</td>
                        <td>{{ ucfirst($rule->type) }}</td>
                        <td>{{ (int)$rule->points_min }}</td>
                        <td>
                            <span class="badge {{ $rule->status ? 'bg-success' : 'bg-danger' }}">
                                {{ $rule->status ? 'Active' : 'Inactive' }}
                            </span>
                        </td>
                        <td class="text-center">
                            @hasPermission('coin-rules.edit')
                            <a href="{{ route('business-settings.coin-rules.edit', $rule->id) }}"
                               class="btn btn-sm btn-primary px-3">
                                Edit
                            </a>
                            @endHasPermission
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="text-center text-muted py-4">
                            No coin rules found.
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</section>

@endsection
