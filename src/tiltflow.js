export default class TiltFlow {
	constructor(el, settings = {}) {
		if(!(el instanceof Node)) {
			throw ("Can't initialize TiltFlow because " + el + " is not a Node.");
		}

		this.windowWidth = null;
		this.windowHeight = null;
		this.updateBind = this.update.bind(this);
		this.el = el;
		this.settings = this.extendSettings(settings);
		this.addEventListeners();
	}

	addEventListeners() {
		this.onMouseMoveBind = this.onMouseMove.bind(this);
		this.onResizeBind = this.onResize.bind(this);

		window.addEventListener("mousemove", this.onMouseMoveBind);
		window.addEventListener("resize", this.onResizeBind);
		window.addEventListener("load", this.onResizeBind);
	}

	onMouseMove(event) {
		this.event = event;
		this.update();
	}

	onResize(event){
		this.updateClient();
	}

	updateClient() {
		this.windowWidth = window.innerWidth;
		this.windowHeight = window.innerHeight;
	}

	update() {
		let moveAmount = this.settings.move,
			duration = this.settings.duration,
			cursorX = this.event.pageX,
    		cursorY = this.event.pageY,
    		moveX = (cursorX - ((this.windowWidth) / 2 )) * -moveAmount,
			moveY = (cursorY - ((this.windowHeight) / 2)) * -moveAmount,			
			rotationX = moveY*-this.settings["rotation-x"],
			rotationY = moveX*-this.settings["rotation-y"];

		TweenMax.to(
			this.el, 
			duration, {
				x: moveX,
				y: moveY,				
				rotationX: rotationX,
				rotationY: rotationY
			}
		);
	}

	extendSettings(settings) {
		let defaultSettings = {
			duration: 1.175,
			move: 0.032,
			"rotation-x": 0.036,
			"rotation-y": 0.036
		};

		let newSettings = {};

		for (var property in defaultSettings) {
			if (property in settings) {
				newSettings[property] = settings[property];
			} else if (this.el.hasAttribute("data-tf-" + property)) {
				let attribute = this.el.getAttribute("data-tf-" + property);
				try {
					newSettings[property] = JSON.parse(attribute);
				} catch (e) {
					newSettings[property] = attribute;
				}

			} else {
				newSettings[property] = defaultSettings[property];
			}
		}

		return newSettings;
	}

	static init(els, settings){
		if (els instanceof Node) {
	      els = [els];
	    }

	    if (els instanceof NodeList) {
	      els = [].slice.call(els);
	    }

	    if (!(els instanceof Array)) {
	      return;
	    }

	    els.forEach((el) => {
	    	if (!("tiltFlow" in el)) {
	    		el.tiltFlow = new TiltFlow(el, settings);
	    	}
	    });
	}
}

window.TiltFlow = TiltFlow;
TiltFlow.init(document.querySelectorAll("[data-tf]"));