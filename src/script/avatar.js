
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

class Avatar {
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
		this.drawAnimation('base')
		this.drawAnimation('normal')
	}

	setNictationInterval(){

	}

	setMood(){

	}

	drawFrame(frame){
		return doWithDelay(e => frame.clips.map(c => this.drawClip(c)), frame.duration * 1000)
	}

	drawAnimation(name){
		var animation = this.animations.find(x => x.name == name)
		animation.background.map(c => this.drawClip(c))
		this.drawing = true
		if(animation.frames.length > 0){
			animation.frames.reduce((s,i) =>{
				return s.then(this.drawFrame.bind(this, i))
			}, new Promise(r => r()))
		}
	}

	drawClip(index){
		var clip = this.clips[index]
		this.context.drawImage(this.image, clip.x1, clip.y1, clip.x2-clip.x1+1, clip.y2-clip.y1+1, clip.originX, clip.originY, clip.x2-clip.x1+1, clip.y2-clip.y1+1)
	}
}

export default Avatar