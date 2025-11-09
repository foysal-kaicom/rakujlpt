{{-- resources/views/partners/edit.blade.php --}}
@extends('master')

@section('contents')
<div class="card shadow-lg border-0 rounded-3">
    <div class="card-header py-3 rounded-top bg-indigo-300">
        <h3 class="fs-5 fw-semibold mb-0">Edit Partner</h3>
    </div>

    <form action="{{ route('partner.update', $partner->id) }}" method="POST" enctype="multipart/form-data" class="p-4">
        @csrf
        @method('PUT')

        <div class="row g-4">
            <div class="col-md-3 text-center">
                <div class="position-relative border rounded bg-light d-flex align-items-center justify-content-center shadow-sm" style="height:160px;">
                    <img id="logoPreview"
                         src="{{ $partner->logo ? asset($partner->logo) : asset('imagePH.png') }}"
                         class="w-100 h-100 object-fit-contain rounded" alt="Logo">
                    <button type="button" id="removeLogo" class="btn btn-sm btn-light border shadow-sm position-absolute top-0 end-0 rounded-circle">×</button>
                </div>
                <input type="file" accept="image/*" id="logoInput" name="logo" class="d-none" />
                <label for="logoInput" class="btn btn-outline-primary mt-3 w-100 rounded-pill">Change Logo</label>
                @error('logo') <div class="text-danger small">{{ $message }}</div> @enderror
            </div>

            <div class="col-md-9">
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Name</label>
                        <input type="text" name="name" value="{{ old('name', $partner->name) }}" class="form-control form-control-lg shadow-sm rounded-2">
                        @error('name') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-12">
                        <label class="form-label fw-semibold">Info</label>
                        <textarea name="info" rows="4" class="form-control shadow-sm rounded-2">{{ old('info', $partner->info) }}</textarea>
                        @error('info') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>
                </div>
            </div>
        </div>

        <div class="pt-4 d-flex justify-content-end">
            <button type="submit" class="btn btn-success rounded-pill px-4">Update Partner</button>
        </div>
    </form>
</div>

<script>
document.getElementById('logoInput')?.addEventListener('change', function(e){
    const f = e.target.files?.[0]; if(!f) return;
    const r = new FileReader();
    r.onload = ev => document.getElementById('logoPreview').src = ev.target.result;
    r.readAsDataURL(f);
});
document.getElementById('removeLogo')?.addEventListener('click', function(){
    document.getElementById('logoPreview').src = "{{ $partner->logo ? asset('storage/'.$partner->logo) : asset('imagePH.png') }}";
    document.getElementById('logoInput').value = "";
});
</script>
@endsection
