# simplecast-js
Javascript Raycast Renderer

A "simple" javascript based Raycast engine in the vein of Wolfenstein 3D.

**Features**
* Grid-based
* Renders Walls, Floors and Ceilings

**To-Do**
* Object rendering
* Performance Enhancements
  * Implement raycasting using asm.js
  * Implement raycasting on the GPU
* Clean up codebase

**Usage**

To use, simply include a reference to the simplecast.js file. For an example, look at the included demo.

**Issues**

Peformance. Performance, performance, performance.

Currently, rendering floors and ceilings can cause the FPS to take a severe hit (there are spots in the demo that drop down to 15 fps on my test machine). This is because, unlike the raycasting for the walls, each pixel below and above the walls has to be tested, image coordinates calculated, and then drawn individually. Provided work continues on this project, I hope to alleviate this by either utilizing asm.js (so at least FireFox would work well), or implementing the raycasting and rendering over on the GPU using WebGL.

Older "versions" can be viewed on Codepen.io [here](http://codepen.io/xgundam05/pen/vcBbL) and [here](http://codepen.io/xgundam05/pen/ogvRej).
