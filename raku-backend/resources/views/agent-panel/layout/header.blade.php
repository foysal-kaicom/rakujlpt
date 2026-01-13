<header class=" bg-white border-b border-slate-200 shadow-sm">
    <div class="flex items-center justify-between px-4 py-3">
        <!-- Left Section -->
        <div class="flex gap-3 items-center">
            <!-- Hamburger Menu Button -->
            <button id="sidebarToggle" 
                    class="hamburg group p-2.5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                     class="w-5 h-5 text-indigo-600 group-hover:text-indigo-700 transition-colors">
                    <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
                </svg>
            </button>
            
            <!-- Optional: App Name (uncomment if needed) -->
            {{-- <div class="hidden md:block">
                <h1 class="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {{ env('APP_NAME') }}
                </h1>
            </div> --}}
        </div>

        <!-- Right Section -->
        <div class="flex gap-4 items-center">
            <!-- User Info Badge -->
            <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-slate-200 shadow-sm">
                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span class="text-sm font-semibold text-slate-700">{{ auth()->user()->name }}</span>
            </div>

            <!-- User Profile Dropdown -->
            <div class="dropdown">
                <!-- Profile Image with Ring -->
                <div class="relative group cursor-pointer">
                    <img 
                        @if(auth()->guard('agent')->user()->photo == null) 
                            src="{{ asset('user-logo.png') }}" 
                        @else
                            src="{{ auth()->guard('agent')->user()->photo }}" 
                        @endif
                        alt="User Profile" 
                        class="w-10 h-10 rounded-full object-cover border-2 border-white ring-2 ring-indigo-200 group-hover:ring-indigo-400 transition-all duration-300 shadow-md dropdown-toggle"
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                        style="cursor: pointer;">
                    
                    <!-- Online Status Indicator -->
                    <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white pointer-events-none"></div>
                </div>

                <!-- Dropdown Menu -->
                <ul class="dropdown-menu dropdown-menu-end py-2" style="min-width: 200px;">
                    <!-- User Info Header -->
                    <li class="px-4 py-2 border-b border-slate-100">
                        {{-- <p class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Account</p> --}}
                        <p class="text-sm font-bold text-slate-800 mt-1">{{ auth()->user()->name }}</p>
                    </li>
                    
                    <!-- Profile Link -->
                    {{-- <li>
                        <a class="dropdown-item flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200" 
                           href="{{ route('users.profile') }}">
                            <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600">
                                <i class="fas fa-user text-sm"></i>
                            </div>
                            <span class="font-medium">Profile</span>
                        </a>
                    </li> --}}
                    
                    <li>
                        <hr class="dropdown-divider my-2 border-slate-200">
                    </li>
                    
                    <!-- Logout Link -->
                    <li>
                        <a class="dropdown-item flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-all duration-200" 
                           href="{{ route('agent.logout') }}">
                            <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 text-red-600">
                                <i class="fas fa-sign-out-alt text-sm"></i>
                            </div>
                            <span class="font-medium">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</header>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Profile Dropdown Toggle
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
        
        // Prevent dropdown from closing when clicking inside
        dropdownMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});
</script>

<style>
/* Dropdown Menu Styles */
.dropdown-menu {
    display: none;
    position: absolute;
    right: 0;
    top: 100%;
    margin-top: 0.5rem;
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border: 1px solid #e2e8f0;
    z-index: 1000;
}

.dropdown-menu.show {
    display: block;
}

.dropdown-item {
    display: flex;
    align-items: center;
    padding: 0.625rem 1rem;
    text-decoration: none;
    color: #334155;
    transition: all 0.2s;
}

.dropdown-item:hover {
    background-color: #eef2ff;
    color: #4f46e5;
}

.dropdown-item.text-danger:hover {
    background-color: #fef2f2;
    color: #dc2626;
}
</style>