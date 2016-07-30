@include('widgets.head')

<body>
<div class="container">
    @yield('content')
</div>

<script src="/js/vendor.js"></script>
@stack('scripts')
</body>

@include('widgets.footer')
