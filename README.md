Compass-
========

This is a compass made with the HTML5 canvas and JavaScript. You can see a live demo at [http://codepen.io/JoshuaCarroll/pen/dXVoVV](http://codepen.io/JoshuaCarroll/pen/dXVoVV).

#### Contributing

Contributions to this project can be made by using the script and providing feedback or by assisting in the programming and submitting pull requests. In either case, please read the [contributing page](https://github.com/JoshuaCarroll/Raspberry-Pi-Weather-Station-Dashboard/blob/master/CONTRIBUTING.md) for instructions.

----------

# Usage

1. Clone the repo or otherwise copy the compass.js file into your web site.

2. Add a reference to the script in your HTML.

    `<script src="compass.js"></script>`

3. In the body of your HTML document, add a canvas object with an ID.

    `<canvas id="canvasCompass" width="200" height="200"></canvas>`

4. Add a script to instantiate a Compass object, and give it a default value.

``` javascript
    <script>
        var compass = new Compass("canvasCompass");
        compass.set(1);
    </script>
```

5. Call animateCompass to change the value of the compass at any time.
 
    `compass.animate(95);`
