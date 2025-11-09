@extends('master')

@section('contents')

<style>
    .toggle-switch-lg .form-check-input { width: 3rem; height: 1.5rem; cursor: pointer; }
    .form-check-input:checked { background-color: #28a745; border-color: #28a745; }
    .form-check-input:not(:checked) { background-color: #ffffff; border-color: #777272; }
    .form-check-input:focus { box-shadow: 0 0 0 0.2rem rgba(40,167,69,.25); }
    .avatar { width: 64px; height: 40px; border-radius: 6px; object-fit: contain; background:#fff; border:1px solid #e5e7eb; }
    .truncate-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; max-width:480px; }
</style>

<section class="w-100 bg-white rounded overflow-hidden">

    <!-- Header -->
    <div class="py-4 px-4 d-flex justify-content-between align-items-center bg-indigo-300"
         style="color:#04070a">
        <h3 class="text-md m-0">Partners</h3>
    </div>

    <!-- Create Section -->
    <div class="p-3">
        <div class="card shadow border-0">
            <div class="card-header bg-light">
                <strong>Add Partner</strong>
            </div>
            <div class="card-body">
                <form action="{{ route('partner.store') }}" method="POST" enctype="multipart/form-data" class="p-2">
                    @csrf
                    <div class="row g-4">
                        <!-- Logo -->
                        <div class="col-md-3 text-center">
                            <div class="position-relative border rounded bg-light d-flex align-items-center justify-content-center shadow-sm" style="height:160px;">
                                <img id="logoPreview" src="{{ asset('imagePH.png') }}" alt="Logo" class="w-100 h-100 object-fit-contain rounded" />
                                <button type="button" id="removeLogo" class="btn btn-sm btn-light border shadow-sm position-absolute top-0 end-0 rounded-circle">×</button>
                            </div>
                            <input type="file" accept="image/*" id="logoInput" name="logo" class="d-none" />
                            <label for="logoInput" class="btn btn-outline-primary mt-3 w-100 rounded-pill d-flex align-items-center justify-content-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                    <path d="M2.9918 21C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918ZM20 15V5H4V19L14 9L20 15Z"></path>
                                </svg>
                                Choose Logo
                            </label>
                            @error('logo') <div class="text-danger small">{{ $message }}</div> @enderror
                        </div>

                        <!-- Fields -->
                        <div class="col-md-9">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">Name</label>
                                    <input type="text" name="name" value="{{ old('name') }}" class="form-control form-control-lg shadow-sm rounded-2" placeholder="Partner name" />
                                    @error('name') <div class="text-danger small">{{ $message }}</div> @enderror
                                </div>

                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">Status</label>
                                    <select name="status" class="form-select form-select-lg shadow-sm rounded-2">
                                        <option value="active" {{ old('status','active')==='active'?'selected':'' }}>Active</option>
                                        <option value="inactive" {{ old('status')==='inactive'?'selected':'' }}>Inactive</option>
                                    </select>
                                    @error('status') <div class="text-danger small">{{ $message }}</div> @enderror
                                </div>

                                <div class="col-md-12">
                                    <label class="form-label fw-semibold">Info</label>
                                    <textarea name="info" rows="4" class="form-control shadow-sm rounded-2" placeholder="Short info about the partner">{{ old('info') }}</textarea>
                                    @error('info') <div class="text-danger small">{{ $message }}</div> @enderror
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pt-4 d-flex justify-content-end">
                        <button type="submit" class="btn btn-success rounded-pill px-4">Save Partner</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- List Section -->
    <div class="table-responsive">
        <table class="table table-striped table-hover align-middle">
            <thead class="table-light">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th class="d-none d-lg-table-cell">Info</th>
                    <th class="d-none d-md-table-cell">Logo</th>
                    <th>Status</th>
                    <th class="d-none d-md-table-cell">Created</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                @forelse($partners as $partner)
                <tr>
                    <td>{{ $partner->id }}</td>
                    <td class="fw-semibold">{{ $partner->name }}</td>
                    <td class="d-none d-lg-table-cell text-muted">
                        <div class="truncate-2">{{ \Illuminate\Support\Str::limit($partner->info, 140) }}</div>
                    </td>
                    <td class="d-none d-md-table-cell">
                        @if($partner->logo)
                            <img class="avatar" src="{{ asset('storage/'.$partner->logo) }}" alt="logo">
                        @else
                            <img class="avatar" src="{{ asset('imagePH.png') }}" alt="placeholder">
                        @endif
                    </td>
                    <td>
                        <form action="{{ route('partner.toggleStatus', $partner->id) }}" method="POST" class="d-inline-block">
                            @csrf
                            <div class="form-check form-switch toggle-switch-lg">
                                <input type="checkbox" class="form-check-input"
                                    onchange="if(confirm('Are you sure you want to {{ $partner->status === true ? 'deactivate' : 'activate' }} this partner?')) { this.form.submit(); } else { this.checked = !this.checked; }"
                                    {{ $partner->status == true ? 'checked' : '' }}>
                            </div>
                        </form>
                    </td>
                    <td class="d-none d-md-table-cell">{{ $partner->created_at?->format('d M Y') }}</td>
                    <td>
                        <div class="d-flex gap-2">
                            <a href="{{ route('partner.edit', $partner->id) }}" class="badge p-2 bg-success text-white" style="width:70px">Edit</a>
                            <form action="{{ route('partner.destroy', $partner->id) }}" method="POST" onsubmit="return confirm('Delete this partner?')">
                                @csrf
                                @method('DELETE')
                                <button class="badge p-2 bg-danger text-white border-0" style="width:70px">Delete</button>
                            </form>
                        </div>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="7" class="text-center text-muted py-4">No partners found.</td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    @if(method_exists($partners, 'links'))
    <div class="px-4 pb-3">
        {{ $partners->links() }}
    </div>
    @endif
</section>

<script>
document.getElementById('logoInput')?.addEventListener('change', e => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = ev => document.getElementById('logoPreview').src = ev.target.result;
    r.readAsDataURL(f);
});
document.getElementById('removeLogo')?.addEventListener('click', () => {
    document.getElementById('logoPreview').src = "{{ asset('imagePH.png') }}";
    document.getElementById('logoInput').value = "";
});
</script>

@endsection
