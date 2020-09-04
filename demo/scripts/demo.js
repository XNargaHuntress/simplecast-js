var floorTex = new RAY.Texture({
  src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAACdSURBVFhH7ZRhCsAgCEZdBws6WUcLutiGUT8WEYZaG/ggyl899KsrxnhDJecM3vta7aldPR/DBEzgWwIppfI02sJam5dACKG807aw1oY1AomOsQQkOnY+hNwWcsD7HLeFHPC+8yOoOwmJ1PcsCUikvmfrCEYd3Cow6uC/QqiBCagKUP4NVQHKv2EZmApQZshlKkCZIRfLgKjAemYAHmLijk6MR2EpAAAAAElFTkSuQmCC',
  width: 32,
  height: 32
});

var wallTex = new RAY.Texture({
  src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB7SURBVEhL7ZO7DcAgDAU9AWtkk6zl4VIxFbF5USQa3PiliHxC/lBwWAgxLg528hjDBZasz43GIkinBCElCClByFeC3qagt/ylB64+BQTqkUMWAQ8XTB8FDMHnJCOqaokXXQCwBRLrEoBN/QMBeosgvfYJ3p4Rn//MQuQG1ALiK7E1lxkAAAAASUVORK5CYII=',
  width: 32,
  height: 32
});

var ceilTex = new RAY.Texture({
  src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB8SURBVEhL7ZOxDcAgDARJwhzsQc9eeDB6j5U4sasECySU7q96Ti+54cPZo9ZqaQ6vL/4govAhxphSsscEXl/8bvE3cGBI/0BrzdIcXl/8Jj+plGLiQSwz55xf3sPrq8cOhuDAEOxAwQ5WwA4Ury8eO1CwgxWwA8Hr3575Ahog2+AXJdDbAAAAAElFTkSuQmCC',
  width: 32,
  height: 32
});

var map = new RAY.Map({
  width: 32,
  height: 32,
  light: 3,
  walls: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
          1,0,0,0,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,
          1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,
          1,0,0,0,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,
          1,1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0,0,0,1,1,1,1,0,0,1,0,0,1,0,1,
          1,1,0,1,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,1,1,1,0,0,0,0,0,1,0,1,
          1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,1,
          1,0,1,1,1,0,0,1,1,0,0,1,1,0,0,1,0,0,0,0,0,1,0,1,1,1,1,0,0,0,0,1,
          1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,1,0,0,1,1,1,
          1,1,0,1,1,0,0,0,1,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,1,
          1,1,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0,0,0,1,
          1,1,1,0,0,0,0,1,1,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,1,
          1,0,0,0,0,0,0,1,0,0,0,0,1,1,1,0,0,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,
          1,0,0,1,1,1,1,1,0,1,1,0,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,
          1,0,0,1,0,0,1,0,0,1,1,0,1,1,0,1,0,0,1,0,1,1,1,1,1,1,1,0,0,0,1,1,
          1,0,0,0,0,0,1,0,0,1,1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,1,
          1,0,0,1,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,
          1,0,1,1,1,1,1,0,0,1,1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,
          1,0,0,0,1,0,0,0,0,1,1,0,1,1,0,1,0,0,1,0,1,1,1,1,1,1,0,0,0,0,0,1,
          1,0,0,0,0,0,1,0,0,1,1,0,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,0,0,1,
          1,0,0,0,1,1,1,1,1,1,1,0,1,1,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,1,
          1,1,0,1,1,1,1,0,0,0,0,0,1,1,1,1,0,0,1,1,0,0,0,1,0,1,1,0,0,0,1,1,
          1,0,0,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,0,0,0,1,0,1,1,0,0,0,1,1,
          1,0,0,0,1,0,0,0,0,0,1,0,1,0,0,1,1,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,
          1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,1,
          1,0,1,1,1,0,0,0,0,0,1,0,1,0,0,1,1,0,0,1,1,1,1,1,0,0,0,1,0,0,0,1,
          1,0,0,0,1,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,1,
          1,0,0,0,1,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0,1,1,0,1,1,0,1,
          1,0,0,0,1,1,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,
          1,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,1,
          1,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,1,1,1,
          1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  
  floor:  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
           0,1,1,1,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,
           0,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,0,
           0,1,1,1,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,
           0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,1,1,0,0,0,0,1,1,0,1,1,0,1,0,
           0,0,1,0,0,1,1,1,0,1,1,0,1,1,1,0,1,1,1,1,1,0,0,0,1,1,1,1,1,0,1,0,
           0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,0,
           0,1,0,0,0,1,1,0,0,1,1,0,0,1,1,0,1,1,1,1,1,0,1,0,0,0,0,1,1,1,1,0,
           0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,0,0,1,1,1,1,0,1,1,0,0,0,
           0,0,1,0,0,1,1,1,0,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,0,
           0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,0,
           0,0,0,1,1,1,1,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,0,
           0,1,1,1,1,1,1,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,
           0,1,1,0,0,0,0,0,1,0,0,1,0,0,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,0,
           0,1,1,0,1,1,0,1,1,0,0,1,0,0,1,0,1,1,0,1,0,0,0,0,0,0,0,1,1,1,0,0,
           0,1,1,1,1,1,0,1,1,0,0,1,0,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,0,1,1,0,
           0,1,1,0,1,1,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,
           0,1,0,0,0,0,0,1,1,0,0,1,0,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,
           0,1,1,1,0,1,1,1,1,0,0,1,0,0,1,0,1,1,0,1,0,0,0,0,0,0,1,1,1,1,1,0,
           0,1,1,1,1,1,0,1,1,0,0,1,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,0,1,1,0,
           0,1,1,1,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,0,
           0,0,1,0,0,0,0,1,1,1,1,1,0,0,0,0,1,1,0,0,1,1,1,0,1,0,0,1,1,1,0,0,
           0,1,1,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,0,1,0,0,1,1,1,0,0,
           0,1,1,1,0,1,1,1,1,1,0,1,0,1,1,0,0,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,
           0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,0,0,
           0,1,0,0,0,1,1,1,1,1,0,1,0,1,1,0,0,1,1,0,0,0,0,0,1,1,1,0,1,1,1,0,
           0,1,1,1,0,1,1,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,0,
           0,1,1,1,0,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,0,0,1,1,1,0,0,1,0,0,1,0,
           0,1,1,1,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,0,
           0,1,1,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,1,1,1,0,
           0,1,1,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1,0,0,0,
           0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  
  ceiling:  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
             0,1,1,1,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,
             0,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,0,
             0,1,1,1,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,
             0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,1,1,0,0,0,0,1,1,0,1,1,0,1,0,
             0,0,1,0,0,1,1,1,0,1,1,0,1,1,1,0,1,1,1,1,1,0,0,0,1,1,1,1,1,0,1,0,
             0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,0,
             0,1,0,0,0,1,1,0,0,1,1,0,0,1,1,0,1,1,1,1,1,0,1,0,0,0,0,1,1,1,1,0,
             0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,0,0,1,1,1,1,0,1,1,0,0,0,
             0,0,1,0,0,1,1,1,0,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,0,
             0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,0,
             0,0,0,1,1,1,1,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,0,
             0,1,1,1,1,1,1,0,1,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,
             0,1,1,0,0,0,0,0,1,0,0,1,0,0,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,0,
             0,1,1,0,1,1,0,1,1,0,0,1,0,0,1,0,1,1,0,1,0,0,0,0,0,0,0,1,1,1,0,0,
             0,1,1,1,1,1,0,1,1,0,0,1,0,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,0,1,1,0,
             0,1,1,0,1,1,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,
             0,1,0,0,0,0,0,1,1,0,0,1,0,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,
             0,1,1,1,0,1,1,1,1,0,0,1,0,0,1,0,1,1,0,1,0,0,0,0,0,0,1,1,1,1,1,0,
             0,1,1,1,1,1,0,1,1,0,0,1,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,0,1,1,0,
             0,1,1,1,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,0,
             0,0,1,0,0,0,0,1,1,1,1,1,0,0,0,0,1,1,0,0,1,1,1,0,1,0,0,1,1,1,0,0,
             0,1,1,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,0,1,0,0,1,1,1,0,0,
             0,1,1,1,0,1,1,1,1,1,0,1,0,1,1,0,0,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,
             0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,0,0,
             0,1,0,0,0,1,1,1,1,1,0,1,0,1,1,0,0,1,1,0,0,0,0,0,1,1,1,0,1,1,1,0,
             0,1,1,1,0,1,1,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,0,
             0,1,1,1,0,1,1,1,1,1,0,0,0,1,1,1,1,1,0,0,0,0,1,1,1,0,0,1,0,0,1,0,
             0,1,1,1,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,0,
             0,1,1,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,1,1,1,0,
             0,1,1,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1,0,0,0,
             0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  wallTextures: [wallTex],
  floorTextures: [floorTex],
  ceilingTextures: [ceilTex]
});

var camera = new RAY.Camera({
  position: {x: 2.5, y: 2.5},
  range: 20
});

var renderer = new RAY.Renderer({
  width: 160,
  height: 90,
  textureSmoothing: false
});

var controls = {
  left:  function(){ return keyboard.isKeyPressed('a') || keyboard.isKeyPressed('left'); },
  right: function(){ return keyboard.isKeyPressed('d') || keyboard.isKeyPressed('right'); },
  up:    function(){ return keyboard.isKeyPressed('w') || keyboard.isKeyPressed('up'); },
  down:  function(){ return keyboard.isKeyPressed('s') || keyboard.isKeyPressed('down'); }
};

var player = {
  size: 0.2,
  speed: 3,
  __walk: function(cam, dist, map){
    var dx = Math.cos(cam.direction) * dist;
    var dy = Math.sin(cam.direction) * dist;
    
    if (map.Get(cam.position.x + dx + Math.sign(dx) * this.size, cam.position.y) <= 0)
      cam.position.x += dx;
    if (map.Get(cam.position.x, cam.position.y + Math.sign(dy) * this.size + dy) <= 0)
      cam.position.y += dy;
  },
  update: function(cam, ctrls, map, t){
    if (ctrls.left()) cam.Rotate(-Math.PI * t);
    if (ctrls.right()) cam.Rotate(Math.PI * t);
    if (ctrls.up()) this.__walk(cam, this.speed * t, map);
    if (ctrls.down()) this.__walk(cam, -this.speed * t, map);
  }
};

// Rendering and Update
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

var lastT = 0;
var lastDelta = 0;
function update(t){
  var delta = (t - lastT) / 1000;
  lastT = t;
  
  // Player
  player.update(camera, controls, map, delta);
  
  renderer.Render(camera, map);
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(renderer.domElement, 0, 0, renderer.width, renderer.height, 0, 0, canvas.width, canvas.height);
  
  lastDelta = delta;
  
  requestAnimationFrame(update);
}
requestAnimationFrame(update);
