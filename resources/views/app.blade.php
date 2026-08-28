<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name', 'School SIS') }}</title>
    <style>
        #app-splash {
            position: fixed;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #FFFFFF;
        }
        #app-splash__spinner {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 3px solid #FBE9E7;
            border-top-color: #FF5722;
            animation: app-splash-spin 0.8s linear infinite;
        }
        @keyframes app-splash-spin {
            to { transform: rotate(360deg); }
        }
    </style>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <div id="app">
        <div id="app-splash">
            <div id="app-splash__spinner"></div>
        </div>
    </div>
</body>
</html>
