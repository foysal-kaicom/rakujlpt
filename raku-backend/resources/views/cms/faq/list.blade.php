@extends('master')

@section('contents')

<section class="w-100 bg-white rounded overflow-hidden">

  <div class="d-flex justify-content-between align-items-center mb-4 border-b pb-3">
    <h1 class="h3">FAQ List</h1>

    <div class="flex gap-5 items-center">
      <form action="{{ route('faq.list') }}" method="GET" class="">
        <select class="flex items-center gap-2 px-8 py-2.5 rounded-lg text-sm font-medium bg-green-500 text-white hover:bg-green-600 shadow-md transition focus:outline-none cursor-pointer" name="status" onchange="this.form.submit()">
          <option value="1" {{ request('status') == '1' ? 'selected' : '' }}>Only Active</option>
          <option value="0" {{ request('status') == '0' ? 'selected' : '' }}>All</option>
        </select>
      </form>
      @hasPermission('faq.create')
      <a href="{{ route('faq.create') }}" class="bg-indigo-500 text-white px-8 py-2 rounded-lg hover:bg-indigo-600 duration-300">
        <i class="fas fa-plus"></i> Create New FAQ
      </a>
      @endHasPermission
    </div>

  </div>


  <!-- Table -->
  <div class="">
    <table class="w-full border">
      <colgroup>
        <col class="w-[70px]"> <!-- ID -->
        <col class="w-[50%]"> <!-- Question -->
        <col > <!-- Position -->
        <col > <!-- Status -->
        <col > <!-- Action -->
      </colgroup>

      <thead class="bg-indigo-300">
        <tr class="text-sm">
          <th class="text-uppercase px-4 py-3">ID</th>
          <th class="hidden sm:table-cell text-uppercase px-4 py-3">Question</th>
          <th class="text-uppercase px-4 py-3">Position</th>
          <th class="hidden md:table-cell text-uppercase px-4 py-3">Status</th>
          <th class="hidden md:table-cell text-uppercase px-4 py-3">Action</th>
        </tr>
      </thead>

      <tbody>
        @foreach($faqs as $faq)
        <tr class="border-b text-sm">
          <td class="px-4 py-3">{{ $faq->id }}</td>

          <!-- Truncated question so long text doesn't expand the column -->
          <td class="hidden sm:table-cell px-4 py-3">
            <span class="truncate-1" title="{{ $faq->question }}">
              {{ $faq->question }}
            </span>
          </td>

          <td class="px-4 py-3">{{ $faq->position }}</td>

          <td class="hidden md:table-cell px-4 py-3">
            @hasPermission('faq.toggleStatus')
            <form action="{{ route('faq.toggleStatus', $faq->id) }}" method="POST" class="d-flex justify-content-start align-items-center m-0">
              @csrf
              <div class="form-check form-switch toggle-switch-lg m-0">
                <input
                  type="checkbox"
                  class="form-check-input toggle-switch"
                  id="faqToggle{{ $faq->id }}"
                  onchange="if(confirm('Are you sure you want to {{ $faq->status ? 'disable' : 'enable' }} this faq?')) { this.form.submit(); } else { this.checked = !this.checked; }"
                  {{ $faq->status ? 'checked' : '' }}>
              </div>
            </form>
            @endHasPermission
          </td>

          <td class="hidden md:flex items-center gap-1.5 px-4 py-3">
            @hasPermission('faq.edit')
            <a href="{{ route('faq.edit', $faq->id) }}" class="hover-effect">
              <span class="px-3 py-2 rounded-lg text-xs font-medium bg-sky-500 text-white hover:bg-sky-600 shadow-md transition">Edit</span>
            </a>
            @endHasPermission
            @hasPermission('faq.delete')
            <form action="{{ route('faq.delete', $faq->id) }}" class="d-inline-block m-0" method="POST">
              @csrf
              @method('DELETE')
              <button type="submit" class="px-3 py-2 rounded-lg text-xs font-medium bg-red-400 text-white hover:bg-red-500 shadow-md transition"
                onclick="return confirm('Are you sure you want to delete this FAQ?')">Delete</button>
            </form>
            @endHasPermission
          </td>
        </tr>
        @endforeach
      </tbody>
    </table>
  </div>

</section>

<style>
  .table-fixed {
    table-layout: fixed;
  }

  .truncate-1 {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .toggle-switch-lg .form-check-input {
    width: 3rem;
    height: 1.5rem;
    cursor: pointer;
  }

  .form-check-input:checked {
    background-color: #28a745;
    border-color: #28a745;
  }

  .form-check-input:not(:checked) {
    background-color: #ffffff;
    border-color: #a6a6a6;
  }

  .form-check-input:focus {
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, .25);
  }
</style>

@endsection