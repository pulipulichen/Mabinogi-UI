
function doWithDelay(func, delay){
	return new Promise(function(resolve, reject){
		var init

		function first(timestamp){
			func()
			init = timestamp
			console.log(timestamp)
			requestAnimationFrame(second)
		}

		function second(timestamp){
			console.log(timestamp)
			if(timestamp - init > delay){
				resolve()
			} else {
				requestAnimationFrame(second)
			}
		}

		requestAnimationFrame(first)
	})
}

class Portrait {
	constructor(dom){
		this.dom = dom
		var canvas = document.createElement('canvas')
		this.dom.appendChild(canvas)
		canvas.width = 512
		canvas.height = 512
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

	setNictationInterval(){

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

	drawFrame(frame){
		return doWithDelay(e => frame.clips.map(c => this.drawClip(c)), frame.duration * 1000)
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
		this.context.drawImage(this.image, clip.x1, clip.y1, clip.x2-clip.x1+1, clip.y2-clip.y1+1, clip.originX, clip.originY, clip.x2-clip.x1+1, clip.y2-clip.y1+1)
	}
}

export default Portrait