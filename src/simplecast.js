(function(r){
  // Javascript Raycast Engine
  // @author: Laerin Anderson
  // @date:   05/11/2015
  
  // Constant references
  var CIRCLE = Math.PI * 2;
  
  // DEFINITIONS
  // =================
  
  // Raycast Texture
  // TODO: switch to the ability to use atlases
  var texture = function(options){
    this.width = 0;
    this.height = 0;
    this.img = undefined;
    
    if (options){
      for (var prop in options)
        if (this.hasOwnProperty(prop))
          this[prop] = options[prop];
      
      if(options.hasOwnProperty('src')){
        this.img = new Image();
        this.img.src = options.src;
      }
    }
  };
  
  // Raycast Camera
  var camera = function(options){
    this.fov = Math.PI * 0.4;
    this.range = 14;
    this.lightRange = 5;
    this.position = { x: 0, y: 0 };
    this.direction = Math.PI * 0.5;
    
    if (options){
      for (var prop in options)
        if (this.hasOwnProperty(prop))
          this[prop] = options[prop];
    }
    
    this.fovComp = Math.PI / 2 - this.fov;
    this.floorDelt = Math.sin(this.fovComp);
    
    this.__id = Date.now();
  };
  
  // Raycast Map
  var map = function(options){
    this.walls = [];
    this.floor = [];
    this.ceiling = [];
    this.skybox = undefined;
    this.light = 1;
    this.width = 0;
    this.height = 0;
    this.outdoors = false;
    this.wallTextures = [];
    this.floorTextures = [];
    this.ceilingTextures = [];
    this.wallHeight = 1;
    
    if (options){
      for (var prop in options)
        if (this.hasOwnProperty(prop))
          this[prop] = options[prop];
    }
  };
  
  // Raycast Renderer
  var renderer = function(options){
    this.width = 640;
    this.height = 360;
    this.resolution = 320;
    this.textureSmoothing = false;
    this.clearColor = 'black';
    
    if (options){
      for (var prop in options)
        if (this.hasOwnProperty(prop))
          this[prop] = options[prop];
    }
    
    this.domElement = document.createElement('canvas');
    this.domElement.width = this.width;
    this.domElement.height = this.height;
    
    this.ctx = this.domElement.getContext('2d');
    
    if (this.resolution > this.width)
      this.resolution = this.width;
    
    this.spacing = this.width / this.resolution;
    
    this.__invResolution = 1 / this.resolution;
    this.__halfResolution = this.resolution * 0.5;
    
    // Caches to speed up floorcasting computation
    this.__floorLookup = [];
    this.__columnLookup = [];
    
    this.__lastCameraId = NaN;
    
    this.__floorLookup[0] = Infinity;
    for (var i = 1; i < this.height / 2; i++){
      this.__floorLookup[i] = this.height / (2 * (i + this.height / 2) - this.height);
    }
    
    this.ctx.imageSmoothingEnabled = this.textureSmoothing;
  };
  
  // IMPLEMENTATION
  // =====================
  
  // Raycast Camera
  camera.prototype = {
    Rotate: function(angle){
      this.direction = (this.direction + angle + CIRCLE) % CIRCLE;
    }
  };
  
  // Raycast Map
  map.prototype = {
    Get: function(x, y, layer){
      x = x | 0;
      y = y | 0;
      
      if (x < 0 || x >= this.width || y < 0 || y >= this.height) return -1;
      
      return layer ? this[layer][y * this.width + x] : this.walls[y * this.width + x];
    },
    
    Raycast: function(point, angle, range, fullRange, layer){
      if (!layer) layer = 'walls';
      
      var cells = [];
      var sin = Math.sin(angle);
      var cos = Math.cos(angle);
      
      var stepX, stepY, nextStep;
      nextStep = {x: point.x, y: point.y, cell: 0, distance: 0};
      
      do{
        cells.push(nextStep);
        
        if (!fullRange && nextStep.cell > 0)
          break;
        
        stepX = this.__step(sin, cos, nextStep.x, nextStep.y);
        stepY = this.__step(cos, sin, nextStep.y, nextStep.x, true);
        
        nextStep = stepX.length2 < stepY.length2
          ? this.__inspect(stepX, 1, 0, nextStep.distance, stepX.y, cos, sin, layer)
          : this.__inspect(stepY, 0, 1, nextStep.distance, stepY.x, cos, sin, layer);
        
      } while (nextStep.distance <= range);
      
      return cells;
    },
    
    __step: function(rise, run, x, y, inverted){
      if (run === 0) return { length2: Infinity };
      
      var dx = run > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
      var dy = dx * rise / run;
      
      return {
        x: inverted ? y + dy : x + dx,
        y: inverted ? x + dx : y + dy,
        length2: dx * dx + dy * dy
      };
    },
    
    __inspect: function(step, shiftX, shiftY, distance, offset, cos, sin, layer){
      var dx = cos < 0 ? shiftX : 0;
      var dy = sin < 0 ? shiftY : 0;
      var index = (((step.y - dy) | 0) * this.width) + ((step.x - dx) | 0);
      step.cell = (index < 0 || index >= this[layer].length) ? -1 : this[layer][index];
      step.distance = distance + Math.sqrt(step.length2);
      
      if (this.outdoors){
        if (shiftX)
          step.shading = cos < 0 ? 2 : 0;
        else
          step.shading = sin < 0 ? 2 : 1;
      }
      else
        step.shading = 0;
      
      step.offset = offset - (offset | 0);
      return step;
    }
  };
  
  // Raycast Renderer
  renderer.prototype = {
    __init: function(camera){
      for (var i = 0; i < this.resolution; i++){
        this.__columnLookup[i] = Math.sin(Math.abs(i - this.__halfResolution) * this.__invResolution * camera.fovComp);
      }
    },
  
    __project: function(height, angle, distance, eyeHeight){
      var z = distance * Math.cos(angle);
      var wallHeight = this.height * height / z;
      var bottom = this.height * 0.5 * (1 + height / z);
      return {
        top: bottom - wallHeight,
        height: wallHeight
      };
    },
    
    __drawSky: function(camera, map){
      if (map.skybox && map.skybox.img){
        var width = this.width * (CIRCLE / camera.fov);
        var left = -width * camera.direction / CIRCLE;
        
        this.ctx.save();
        this.ctx.drawImage(map.skybox.img, left, 0, width, this.height);
        
        if (left < width - this.width)
          this.ctx.drawImage(map.skybox.img, left + width, 0, width, this.height);
        
        if (map.light > 0){
          this.ctx.fillStyle = '#ffffff';
          this.ctx.globalAlpha = map.light * 0.1;
          this.ctx.fillRect(0, this.height * 0.5, this.width, this.height * 0.5);
        }
        
        this.ctx.restore();
      }
    },
    
    __drawColumn: function(column, ray, angle, camera, map){
      var left = Math.floor(column * this.spacing);
      var width = Math.ceil(this.spacing);
      var hit = -1;
      
      while (++hit < ray.length && ray[hit].cell <= 0);
      
      var wallTex, floorTex, ceilTex;
      var wallTexX = 0;
      var pixDist = 0;
      var pixDistPrev = -1;
      var floorX = 0;
      var floorY = 0;
      var floorXFrac = 0;
      var floorYFrac = 0;
      var floorTexIndex = -1;
      var floorTexId = -1;
      var ceilTexId = -1;
      var weight = 0;
      var floorId = 0;
      
      this.ctx.fillStyle = '#000000';
      
      if (hit < ray.length){
        // TODO: Handle Transparency
        var step = ray[hit];
        wallTex = map.wallTextures[step.cell - 1];
        wallTexX = (wallTex.width * step.offset) | 0;
        var wall = this.__project(map.wallHeight, angle, step.distance);
        
        // Draw the Floor and Ceiling
        if (map.floor.length > 0 || map.ceiling.length > 0){
          for (var i = (wall.top + wall.height) | 0; i < this.height; i++){
            floorTexId = -1;
            cielTexId = -1;
            floorId = i - ((this.height * 0.5) | 0);
            
            if (pixDistPrev == -1){
              if (floorId == 0) pixDistPrev = 0;
              else pixDistPrev = map.wallHeight * this.__floorLookup[floorId - 1] + this.__columnLookup[column];
            }
            
            pixDist = map.wallHeight * this.__floorLookup[floorId] + this.__columnLookup[column];
            weight = pixDist / step.distance;
            
            floorX = camera.position.x + weight * (step.x - camera.position.x);
            floorY = camera.position.y + weight * (step.y - camera.position.y);
            floorXFrac = floorX - (floorX | 0);
            floorYFrac = floorY - (floorY | 0);
            
            floorTexIndex = (floorY | 0) * map.width + (floorX | 0);
            floorTexId = map.floor[floorTexIndex];
            ceilTexId = map.ceiling[floorTexIndex];
            
            if (pixDist <= camera.lightRange + 0.01){
              this.ctx.globalAlpha = 1;
              
              if (map.floor.length > 0 && map.floorTextures.length > 0){
                if (floorTexId > 0){
                  floorTex = map.floorTextures[floorTexId - 1];
                  this.ctx.drawImage(floorTex.img, floorXFrac * floorTex.width, floorYFrac * floorTex.height, 1, 1, left, i, width, 1);
                }
              }
              
              if (map.ceiling.length > 0 && map.ceilingTextures.length > 0){
                if (ceilTexId > 0){
                  ceilTex = map.ceilingTextures[floorTexId - 1];
                  this.ctx.drawImage(ceilTex.img, floorXFrac * ceilTex.width, floorYFrac * ceilTex.height, 1, 1, left, this.height - i - 1, width, 1);
                }
              }
            }
            
            this.ctx.globalAlpha = Math.max((pixDistPrev - (pixDist === Infinity ? 0 : pixDist)) * camera.__invLightRange * (1 + camera.__invLightRange), 0);
            if (ceilTexId > 0)
              this.ctx.fillRect(left, this.height - i - 1, width, i - (this.height - i - 1));
            else
              this.ctx.fillRect(left, i, width, 1);
            
            pixDistPrev = pixDist;
          }
        }
        
        this.ctx.globalAlpha = 1;
        this.ctx.drawImage(wallTex.img, wallTexX, 0, 1, wallTex.height, left, wall.top, width, wall.height);
        
        this.ctx.globalAlpha = Math.max((step.distance + step.shading) * camera.__invLightRange, 0);
        this.textureSmoothing
          ? this.ctx.fillRect(left, wall.top, width, wall.height)
          : this.ctx.fillRect(left | 0, wall.top | 0, width, wall.height + 1);
      }
    },
    
    __drawColumns: function(camera, map){
      this.ctx.save();
      for (var col = 0; col < this.resolution; col++){
        var angle = camera.fov * (col * this.__invResolution - 0.5);
        var ray = map.Raycast(camera.position, camera.direction + angle, camera.range);
        this.__drawColumn(col, ray, angle, camera, map);
      }
      this.ctx.restore();
    },
    
    Render: function(camera, map){
      if (camera.__id != this.__lastCameraId){
        this.__init(camera);
        this.__lastCameraId = camera.__id;
      }
      
      camera.__invLightRange = 1 / camera.lightRange;
      
      if (this.clearColor === undefined || this.clearColor == 'clear' || this.clearColor == 'transparent')
        this.ctx.clearRect(0, 0, this.width, this.height);
      else {
        this.ctx.fillStyle = this.clearColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
      }
      
      this.__drawSky(camera, map);
      if (map.wallTextures.length > 0 || map.floorTextures.length > 0 || map.ceilingTextures.length > 0)
        this.__drawColumns(camera, map);
    }
  };
  
  // EXPORTS
  // ===============
  r.CIRCLE = CIRCLE;
  r.Texture = texture;
  r.Map = map;
  r.Camera = camera;
  r.Renderer = renderer;

})(window.RAY || (window.RAY = {}));
