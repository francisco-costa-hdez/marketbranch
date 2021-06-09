<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
    <style>
        header{
            font-weight: bold;
            font-size: x-large;
            background-color: rgb(56, 56, 56);
            -webkit-text-fill-color: rgb(255, 255, 255);
            -webkit-text-stroke: 1px rgb(255, 196, 0);
        }
        h1{
            margin: auto;
            text-align: center;
            font-size: 150%;
        }
        body{
            background-color: rgb(231, 231, 231);
        }
    </style>
</head>
<header><img src="../../img/ach-yellow.png" alt="achomarket-logo" width="10%">ACHOMARKET</header>
<body>
    <h1>Le damos la bienvenida a AchoMarket</h1>
    <br>
    <p>Buenas {{ $name }}, nos alegra tenerte por aquí, para activar tu cuenta haz click en el siguiente enlace:</p>
    <a href="{{ url('/register-2/verification/' . $confirmation_code) }}">Confirmar dirección de correo electrónico</a>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
<br><br>
</body>
    <footer>
        <p>Atentamente el equipo de AchoMarket</p>
    </footer>
</html>