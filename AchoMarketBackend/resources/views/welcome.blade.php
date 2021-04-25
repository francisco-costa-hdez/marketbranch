<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="" method="POST" enctype="multipart/form-data">
      @csrf
        <form style="margin-left: auto;margin-right: auto;width:30%;">
          <input type="hidden" name="shop_id" value="1">
          <input type="hidden" name="subcategory_id" value="11">
          <input type="hidden" name="trademark_id" value="2">
            <div class="form-group">
                <label for="nombre">Nombre *</label>
                <input type="text" name="name" id="nombre" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="nombre">price *</label>
                <input type="text" name="price" id="nombre" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="nombre">discount </label>
                <input type="text" name="discount" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="nombre">stock </label>
                <input type="text" name="stock" id="nombre" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="nombre">availability </label>
                <input type="text" name="availability" id="nombre" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="nombre">description </label>
                <textarea name="description" cols="30" rows="10"></textarea>
              </div>
                  <div class="form-group">
                    <label for="exampleFormControlFile1">Seleccione imagen </label>
                    <input type="file" name="image" class="form-control-file">
                  </div>
                <button type="submit" class="btn btn-primary" style="margin-top:5%;">Enviar</button>
            </form>
    </form>
</body>
</html>