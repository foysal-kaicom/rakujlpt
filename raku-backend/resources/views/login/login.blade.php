<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <title>JPTBD Login</title>
    <link rel="stylesheet" href="http://cdn.bootcss.com/toastr.js/latest/css/toastr.min.css">
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
      }

      /* Animated background elements */
      body::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
        background-size: 50px 50px;
        animation: moveBackground 20s linear infinite;
      }

      @keyframes moveBackground {
        0% {
          transform: translate(0, 0);
        }
        100% {
          transform: translate(50px, 50px);
        }
      }

      .decorative-circle {
        position: absolute;
        border-radius: 50%;
        opacity: 0.1;
      }

      .circle-1 {
        width: 300px;
        height: 300px;
        background: white;
        top: -100px;
        right: -100px;
        animation: float 6s ease-in-out infinite;
      }

      .circle-2 {
        width: 200px;
        height: 200px;
        background: white;
        bottom: -50px;
        left: -50px;
        animation: float 8s ease-in-out infinite reverse;
      }

      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-20px);
        }
      }

      .login-container {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 480px;
        margin: 20px;
      }

      .login-card {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 24px;
        padding: 48px 40px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.2);
        animation: slideUp 0.6s ease-out;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .logo-container {
        text-align: center;
        margin-bottom: 32px;
      }

      .logo-container img {
        max-width: 200px;
        height: auto;
        margin-bottom: 16px;
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
      }

      .welcome-text {
        text-align: center;
        margin-bottom: 32px;
      }

      .welcome-text h2 {
        font-size: 28px;
        font-weight: 700;
        color: #1a202c;
        margin-bottom: 8px;
      }

      .welcome-text p {
        color: #718096;
        font-size: 15px;
      }

      .form-label {
        font-weight: 600;
        color: #2d3748;
        margin-bottom: 8px;
        font-size: 14px;
      }

      .input-group {
        position: relative;
        margin-bottom: 24px;
      }

      .input-group-text {
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        background: transparent;
        border: none;
        z-index: 10;
        color: #a0aec0;
        transition: color 0.3s ease;
      }

      .toggle-password {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        background: transparent;
        border: none;
        cursor: pointer;
        z-index: 10;
        color: #a0aec0;
        transition: color 0.3s ease;
        padding: 0;
      }

      .toggle-password:hover {
        color: #667eea;
      }

      .form-control {
        padding: 14px 16px 14px 52px;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        font-size: 15px;
        transition: all 0.3s ease;
        background: #f7fafc;
      }

      .form-control:focus {
        background: white;
        border-color: #667eea;
        box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        outline: none;
      }

      .form-control:focus + .input-group-text,
      .input-group:focus-within .input-group-text {
        color: #667eea;
      }

      .form-control.is-invalid {
        border-color: #fc8181;
        background-color: #fff5f5;
      }

      .invalid-feedback {
        font-size: 13px;
        margin-top: 6px;
        color: #e53e3e;
      }

      .btn-login {
        width: 100%;
        padding: 14px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        border-radius: 12px;
        color: white;
        font-weight: 600;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);
        margin-bottom: 20px;
      }

      .btn-login:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
      }

      .btn-login:active {
        transform: translateY(0);
      }

      .forgot-password {
        text-align: center;
        margin-top: 16px;
      }

      .forgot-password a {
        color: #667eea;
        text-decoration: none;
        font-weight: 500;
        font-size: 14px;
        transition: color 0.3s ease;
      }

      .forgot-password a:hover {
        color: #764ba2;
        text-decoration: underline;
      }

      .divider {
        display: flex;
        align-items: center;
        text-align: center;
        margin: 24px 0;
      }

      .divider::before,
      .divider::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid #e2e8f0;
      }

      .divider span {
        padding: 0 16px;
        color: #a0aec0;
        font-size: 13px;
      }

      /* Responsive */
      @media (max-width: 576px) {
        .login-card {
          padding: 32px 24px;
        }

        .welcome-text h2 {
          font-size: 24px;
        }
      }
    </style>
  </head>
  <body>
    <!-- Decorative Elements -->
    <div class="decorative-circle circle-1"></div>
    <div class="decorative-circle circle-2"></div>

    <div class="login-container">
      <div class="login-card">
        <div class="logo-container">

          <img src="{{ $settings->logo }}" alt="{{ $settings->business_name }} Logo" />
        </div>

        <div class="welcome-text">
          <h2>Welcome Back!</h2>
          <p>Sign in to continue to your account</p>
        </div>

        <form action="{{ route('doLogin') }}" method="post">
          @csrf
          
          <div class="mb-3">
            <label for="email" class="form-label">Email Address</label>
            <div class="input-group">
              <span class="input-group-text">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
                </svg>
              </span>
              <input
                type="email"
                class="form-control @error('email') is-invalid @enderror"
                id="email"
                name="email"
                placeholder="Enter your email"
                value="{{ old('email') }}"
              />
            </div>
            @error('email')
              <div class="invalid-feedback d-block">{{ $message }}</div>
            @enderror
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <div class="input-group">
              <span class="input-group-text">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M6 8V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6ZM19 10H5V20H19V10ZM11 15.7324C10.4022 15.3866 10 14.7403 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14C14 14.7403 13.5978 15.3866 13 15.7324V18H11V15.7324ZM8 8H16V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8Z"></path>
                </svg>
              </span>
              <input
                type="password"
                class="form-control @error('password') is-invalid @enderror"
                style="border-top-right-radius: 8px; border-bottom-right-radius: 8px;"
                id="password"
                name="password"
                placeholder="Enter your password"
              />
              <button type="button" class="toggle-password" onclick="togglePassword()">
                <svg id="eye-open" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12 21C6.60756 21 2.12163 17.1202 1.18109 12C2.12163 6.87976 6.60756 3 12 3ZM12 19C16.2359 19 19.8603 16.0537 20.7777 12C19.8603 7.94633 16.2359 5 12 5C7.7641 5 4.13975 7.94633 3.22229 12C4.13975 16.0537 7.7641 19 12 19ZM12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12C16.5 14.4853 14.4853 16.5 12 16.5ZM12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5C10.6193 9.5 9.5 10.6193 9.5 12C9.5 13.3807 10.6193 14.5 12 14.5Z"></path>
                </svg>
                <svg id="eye-closed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="display: none;">
                  <path d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.503 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z"></path>
                </svg>
              </button>
            </div>
            @error('password')
              <div class="invalid-feedback d-block">{{ $message }}</div>
            @enderror
          </div>

          <button type="submit" class="btn-login">Sign In</button>

          {{-- <div class="forgot-password">
            <a href="/forgot-password">Forgot your password?</a>
          </div> --}}
        </form>
      </div>
    </div>

    <script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
    <script src="http://cdn.bootcss.com/toastr.js/latest/js/toastr.min.js"></script>

    <script>
      function togglePassword() {
        const passwordInput = document.getElementById('password');
        const eyeOpen = document.getElementById('eye-open');
        const eyeClosed = document.getElementById('eye-closed');
        
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          eyeOpen.style.display = 'none';
          eyeClosed.style.display = 'block';
        } else {
          passwordInput.type = 'password';
          eyeOpen.style.display = 'block';
          eyeClosed.style.display = 'none';
        }
      }
    </script>

    <!-- Display Toastr notifications -->
    @if (session('success'))
      <script>
        toastr.success("{{ session('success') }}");
      </script>
    @elseif (session('error'))
      <script>
        toastr.error("{{ session('error') }}");
      </script>
    @endif
  </body>
</html>