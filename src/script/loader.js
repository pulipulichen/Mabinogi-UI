
class Loader {
	static images = {}
	static portraitDatas = {}

	static load(params){
		var promises = []
		Object.keys(params.image).map(k => {
			promises.push(this.loadImage(k, params.image[k]))
		})

		Object.keys(params.portraitData).map(k => {
			promises.push(this.loadPortraitData(k, params.portraitData[k]))
		})

		return Promise.all(
			promises
		)
	}


	static loadImage(name, url){
		return new Promise((resolve, reject) => {
			if(this.images[name]){
				resolve()
			} else {
				var image = new Image()
				image.src = url
				image.onload = _ => {
					this.images[name] = image
					resolve()
				}
			}
		})
	}

	static loadPortraitData(name, url){
		return new Promise((resolve, reject) => {
			if(this.portraitDatas[name]){
				resolve()
			} else {
				var req = new XMLHttpRequest()
				req.open('get', url)
				req.onload = e => {
					var parser = new DOMParser()
					var xmldoc = parser.parseFromString(e.target.responseText, 'text/xml')
					var data = this.decodePortraitData(xmldoc)
					this.portraitDatas[name] = data
					resolve()
				}
				req.send()
			}
		})
	}

	static decodePortraitData(xmldoc){
		var clips = Array.from(xmldoc.querySelectorAll('clipInformation')).map(x => {
			var [x1, y1, x2, y2, originX, originY] = ['x1', 'y1', 'x2', 'y2', 'originX', 'originY'].map(n => x.getAttribute(n)).map(n => parseInt(n))
			return {x1, y1, x2, y2, originX, originY}
		})
		var animations = Array.from(xmldoc.querySelectorAll('animation')).map(x => {
			return {
				name: x.getAttribute('name'),
				background: Array.from(x.querySelector('background').querySelectorAll('clip')).map(n => parseInt(n.getAttribute('value'))),
				frames: Array.from(x.querySelectorAll('frame')).map(f => {
					return {
						duration: parseFloat(f.getAttribute('duration')),
						clips: Array.from(f.querySelectorAll('clip')).map(n => parseInt(n.getAttribute('value')))
					}
				})
			}
		})
		return {clips, animations}
	}
}

export default Loader