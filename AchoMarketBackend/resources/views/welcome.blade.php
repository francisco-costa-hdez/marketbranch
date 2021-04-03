<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="{{route('store.product',['shop_id' => 1])}}" method="POST">
      @csrf
        <form style="margin-left: auto;margin-right: auto;width:30%;">
            <div class="form-group">
                <label for="nombre">Nombre *</label>
                <input type="text" name="name" id="nombre" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="nombre">Precio *</label>
                <input type="text" name="price" id="nombre" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="nombre">Descuento </label>
                <input type="text" name="discount" id="nombre" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="nombre">Stock *</label>
                <input type="text" name="stock" id="nombre" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="nombre">Disponibilidad *</label>
                <input type="text" name="availability" id="nombre" class="form-control" required>
              </div>
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Descripción *</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1"  name="description" rows="3"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlFile1">Seleccione imagen de producto</label>
                    <input type="file" name="images" class="form-control-file" id="exampleFormControlFile1">
                  </div>
                <button type="submit" class="btn btn-primary" style="margin-top:5%;">Enviar</button>
            </form>
    </form>
</body>
</html>