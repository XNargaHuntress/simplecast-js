(function(k){
  k.keys = {
    'backspace':  8,  'pause'    :  19, '7'        :  55, 'd'        :  68,
    'tab'      :  9,  'caps'     :  20, '8'        :  59, 'e'        :  69,
    'enter'    :  13, 'esc'      :  27, '9'        :  60, 'f'        :  70,
    'shift'    :  16, 'pageUp'   :  33, 'a'        :  65, 'g'        :  71,
    'ctrl'     :  17, 'pageDown' :  34, 'h'        :  72, 'n'        :  78,
    'alt'      :  18, 'end'      :  35, 'i'        :  73, 'o'        :  79,
    'home'     :  36, 'delete'   :  46, 'j'        :  74, 'p'        :  80,
    'left'     :  37, '0'        :  48, 'k'        :  75, 'q'        :  81,
    'up'       :  38, '1'        :  49, 'l'        :  76, 'r'        :  82,
    'right'    :  39, '2'        :  50, 'm'        :  77, 's'        :  83,
    'down'     :  40, '3'        :  51, 't'        :  84, 'z'        :  90,
    'insert'   :  45, '4'        :  52, 'u'        :  85, 'winLeft'  :  91,
    '5'        :  53, 'b'        :  66, 'v'        :  86, 'winRight' :  92,
    '6'        :  54, 'c'        :  67, 'w'        :  87, 'select'   :  93,
    'x'        :  88, 'num0'     :  96, 'num7'     : 103, 'decimal'  : 110,
    'y'        :  89, 'num1'     :  97, 'divide'   : 111, 'f6'       : 117,
    'num2'     :  98, 'num8'     : 104, 'f1'       : 112, 'f7'       : 118,
    'num3'     :  99, 'num9'     : 105, 'f2'       : 113, 'f8'       : 119,
    'num4'     : 100, 'multiply' : 106, 'f3'       : 114, 'f9'       : 120,
    'num5'     : 101, 'add'      : 107, 'f4'       : 115, 'f10'      : 121,
    'num6'     : 102, 'subtract' : 109, 'f5'       : 116, 'f11'      : 122,
    'f12'      : 123, '-'        : 189, ';'        : 186, '`'        : 192,
    'numLock'  : 144, '.'        : 190, '='        : 187, '['        : 219,
    'scrlLock' : 145, '/'        : 191, ','        : 188, '\\'       : 220,
    ']'        : 221, '\''       : 222
  };
  
  k._pressed = [];

  window.onkeydown = function(e){
    k._pressed[e.keyCode] = true;
  };
  
  window.onkeyup = function(e){
    k._pressed[e.keyCode] = false;
  };
  
  k.isKeyPressed = function(key){
    return this._pressed[this.keys[key]];
  };
})(window.keyboard || (window.keyboard = {}));
