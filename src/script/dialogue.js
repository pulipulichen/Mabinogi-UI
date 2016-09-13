var urls = [require('../sound/gen_button_down.wav'),
			require('../sound/gen_button_confirm.wav'),
			require('../sound/gen_hover.wav')]

class Dialogue {
	static init(){
		var [down, confirm, hover] = urls.map(f => {
			var audio = document.createElement('audio')
			audio.src = f
			audio.preload = 'auto'
			return audio
		})
		this.dom = document.querySelector('div.dialogue')
		this.dom.addEventListener('mousedown', e => e.target.tagName == 'BUTTON' ? down.play() : null)
		this.dom.addEventListener('mouseup', e => e.target.tagName == 'BUTTON' ? confirm.play() : null)
		this.dom.addEventListener('mouseover', e => e.target.tagName == 'BUTTON' ? hover.play() : null)
		this.data = []
	}

	static show(){
		this.dom.style.display = 'block'
	}

	static hide(){
		this.dom.style.display = 'none'
	}

	static push(data){
		this.data.push(data)
	}

	static unshift(data){
		this.data.unshift(data)
	}

	static next(){

	}
}

Dialogue.init()
Dialogue.show()

export default Dialogue