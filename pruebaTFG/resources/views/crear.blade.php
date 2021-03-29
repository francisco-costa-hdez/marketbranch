<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="{{route('usuario.crear')}}" method="POST">
        @csrf
        <input type="text" name="nombre" placeholder="nombre">
        <input type="text" name="apellidos" placeholder="apellidos">
        <input type="number" name="movil" placeholder="teléfono">
        <input type="email" name="email" placeholder="email">
        <input type="password" name="password" placeholder="contraseña">
        <input type="submit" value="enviar">
    </form>
</body>
</html>