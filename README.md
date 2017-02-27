# TiltFlow

When you just want to add that cool tilty flowy effect to your website.

## Getting started
`npm install rellax --save` or just download and insert `tiltflow.min.js`

```html
<body>
	<div class="your-element" data-tf></div>

	<script src="tiltflow.min.js"></script>
	<script>
		var yourElement = document.querySelector('your-element');
		var yourCoolElement = new TiltFlow(yourElement);
	</script>
</body>
```

## Options
```js
{
    duration: 1.175,
	move: 0.032,
	"rotation-x": 0.036,
	"rotation-y": 0.036
}
```

## To do
- Add comments(!);
- Make it dependency-free;
- Perspective option.