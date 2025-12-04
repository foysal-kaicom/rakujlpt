<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>New Message</title>
</head>
<body>
    <h2>New Message from {{ $data['first_name'] }} {{ $data['last_name'] }}</h2>

    <p><strong>Email:</strong> {{ $data['email'] }}</p>

    <p><strong>Message:</strong></p>
    <p>{{ $data['body'] }}</p>
</body>
</html>
