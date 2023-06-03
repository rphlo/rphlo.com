
function scaleImage(img, ratio) {
    var canvas =  document.createElement('canvas')
    canvas.width = Math.floor(img.width*ratio)
    canvas.height = Math.floor(img.height*ratio)
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, Math.floor(img.width*ratio), Math.floor(img.height*ratio));
    return canvas;
  }
  function onImage(img, filename) {
      var modified = false;
      var maxsize = document.getElementById('maxsize').value;
      var dir = 'height'
      if (img.width > img.height) {
          dir = 'width'
      }
      if (img[dir] > maxsize) {
          modified = true
          img = scaleImage(img, maxsize / img[dir])
      }
      if (!modified) {
          alert('Image is already correct dimension')
          return
      }
      var ext = filename.split('.').pop();
      filename = filename.slice(0, filename.length - ext.length) + 'jpg';
      img.toBlob(function(blob) {
          saveAs(blob, filename);
      }, 'image/jpeg', '0.8');
  }
  
  document.getElementById('form').onsubmit = function(ev) {
      ev.preventDefault();
      var file = document.getElementById('file').files[0];
      var img = new Image;
      img.onload = function() {
          onImage(img, file.name)
      }
      img.src = URL.createObjectURL(file);
  };