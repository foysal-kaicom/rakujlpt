@extends('master')

@section('contents')
<div class="container mx-auto py-10">
    <h1 class="text-2xl font-bold mb-6">Manage Policies</h1>

    @if(session('success'))
        <div class="bg-green-100 text-green-800 p-3 rounded mb-4">
            {{ session('success') }}
        </div>
    @endif

    {{-- Privacy Policy --}}
    <div class="mb-8 p-6 border rounded">
        <h2 class="text-xl font-semibold mb-4">Privacy Policy</h2>
        <form action="{{ route('business-settings.updatePrivacy') }}" method="POST">
            @csrf
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-4">
                        <label class="block mb-1">English</label>
                        <div class="questionInput">
                            <textarea id="content" name="content_en" class="tinymce"> {{ old('content_en', $privacy->content['en'] ?? '') }} </textarea>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-4">
                        <label class="block mb-1">Bangla</label>
                        <div class="questionInput">
                            <textarea id="content" name="content_bn" class="tinymce"> {{ old('content_bn', $privacy->content['bn'] ?? '') }} </textarea>
                        </div>
                    </div>
                </div>
            </div>
            <button class="btn btn-primary">Update Privacy Policy</button>
        </form>
    </div>

    {{-- Terms & Conditions --}}
    <div class="mb-8 p-6 border rounded">
        <h2 class="text-xl font-semibold mb-4">Terms & Conditions</h2>
        <form action="{{ route('business-settings.updateTerms') }}" method="POST">
            @csrf
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-4">
                        <label class="block mb-1">English</label>
                        <div class="questionInput">
                            <textarea id="content" name="content_en" class="tinymce"> {{ old('content_en', $terms->content['en'] ?? '') }} </textarea>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-4">
                        <label class="block mb-1">Bangla</label>
                        <div class="questionInput">
                            <textarea id="content" name="content_bn" class="tinymce"> {{ old('content_bn', $terms->content['bn'] ?? '') }} </textarea>
                        </div>
                    </div>
                </div>
            </div>
            
            <button class="btn btn-primary">Update Terms & Conditions</button>
        </form>
    </div>

    {{-- Return Policy --}}
    <div class="mb-8 p-6 border rounded">
        <h2 class="text-xl font-semibold mb-4">Return Policy</h2>
        <form action="{{ route('business-settings.updateReturn') }}" method="POST">
            @csrf
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-4">
                        <label class="block mb-1">English</label>
                        <div class="questionInput">
                            <textarea id="content" name="content_en" class="tinymce"> {{ old('content_en', $return->content['en'] ?? '') }} </textarea>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-4">
                        <label class="block mb-1">Bangla</label>
                        <div class="questionInput">
                            <textarea id="content" name="content_bn" class="tinymce"> {{ old('content_bn', $return->content['bn'] ?? '') }} </textarea>
                        </div>
                    </div>
                </div>
            </div>
            
            
            <button class="btn btn-primary">Update Return Policy</button>
        </form>
    </div>
</div>

<script>
    document.addEventListener("DOMContentLoaded", function () {

        // TinyMCE show/hide helpers
        function hideTinyMCE() {
            if (window.tinymce) {
                const editor = tinymce.get("content");
                if (editor) editor.hide();
            }
        }

        function showTinyMCE() {
            if (window.tinymce) {
                const editor = tinymce.get("content");
                if (editor) editor.show();
            }
        }
    });
</script>
@endsection

