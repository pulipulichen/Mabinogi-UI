
class Portrait {
	constructor(dom){
		this.dom = dom
		var canvas = document.createElement('canvas')
		this.dom.appendChild(canvas)
		canvas.width = 768
		canvas.height = 768
		this.context = canvas.getContext('2d')
	}

	setImage(image){
		this.image = image
	}

	setPortraitData(portraitData){
		this.portraitData = portraitData
		this.clips = portraitData.clips
		this.animations = portraitData.animations
	}

	get nictationInterval(){
		return Math.ceil(Math.random() * 500) + 4500
	}

	startNictation(){
		setInterval(_ => {
			this.drawAnimation('normal')
			this.drawAnimation('base')
		}, this.nictationInterval)
	}

	drawAnimation(name){
		var animation = this.animations.find(x => x.name == name)
		animation.background.map(c => this.drawClip(c))
		if(animation.frames.length > 0){
			var generators = animation.frames.map(f => _ => {
				f.clips.map(c => this.drawClip(c))
				return this.delayPromise(f.duration)
			})
			this.runPromiseSequence(generators)
		}
	}

	delayPromise(n){
		var ms = n * 1000;
		return new Promise(function(resolve, reject){
			setInterval(function(){
				resolve()
			}, ms)
		})
	}

	runPromiseSequence(generators){
		generators.reduce((s, i) => s.then(_ => i()), new Promise(resolve => resolve()))
	}

	drawClip(index){
		var clip = this.clips[index]
		this.context.drawImage(this.image, clip.x1, clip.y1, clip.x2-clip.x1+1, clip.y2-clip.y1+1, clip.originX+64, clip.originY+128, clip.x2-clip.x1+1, clip.y2-clip.y1+1)
	}

	show(){
		this.dom.style.display = 'block'
	}

	hide(){
		this.dom.style.display = 'none'
	}
}

export default Portrait