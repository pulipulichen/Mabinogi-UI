import Media from './media'
import Diary from './diary'

class Dialogue {
	constructor(div){
		this.sounds = Media.sounds
		div.innerHTML = (`
			<div class="dialogue" style="display:none">
				<img class="avatar">
				<div class="name"></div>
				<div class="content only-content"></div>
				<div class="button-layer"></div>
			</div>
		`)
		this.dom = div.querySelector('.dialogue')
		this.contentDom = this.dom.querySelector('.content')
		this.nameDom = this.dom.querySelector('.name')
		this.avatarDom = this.dom.querySelector('.avatar')
		this.buttonLayerDom = this.dom.querySelector('.button-layer')

		this.dom.addEventListener('mousedown', e => e.target.tagName == 'BUTTON' ? this.sounds.buttonDown.play() : null)
		this.dom.addEventListener('mouseup', e => e.target.tagName == 'BUTTON' ? this.sounds.buttonConfirm.play() : null)
		this.dom.addEventListener('mouseover', e => e.target.tagName == 'BUTTON' ? this.sounds.buttonHover.play() : null)
		//this.dom.addEventListener('mouseout', e => e.target.tagName == 'BUTTON' ? this.sounds.buttonCancel.play() : null)

		this.data = []
		this.dom.addEventListener('click', e => {
			if(this.toContinue){
				this.buttons[0].callback(e)
			}
		})
	}

	show(){
		this.dom.style.display = 'block'
		this.sounds.windowOpen.play()
	}

	hide(){
		this.dom.style.display = 'none'
		this.sounds.windowClose.play()
	}

	showDiary(){
		this.diary.show()
	}

	hideDiary(){
		this.diary.hide()
	}

	setDiary(diary){
		this.diary = diary
	}

	setButtons(array){
		this.buttons = array
		this.buttonLayerDom.innerHTML = ''
		array.map(x => {
			var button = document.createElement('button')
			button.innerText = x.text
			button.addEventListener('click', e => {
				e.stopPropagation()
				x.callback(e)
			})
			this.buttonLayerDom.appendChild(button)
		})
	}

	setCanContinue(bool){
		if(bool){
			this.toContinue = true
			this.dom.classList.add('to-continue')
		} else {
			this.toContinue = false
			this.dom.classList.remove('to-continue')
		}
	}

	setAvatar(url){
		if(url){
			this.avatarDom.style.display = 'block'
			this.avatarDom.src = url
		} else {
			this.avatarDom.style.display = 'none'
		}
	}

	setName(name){
		if(name){
			this.nameDom.innerText = name
			this.contentDom.classList.remove('only-content')
		} else {
			this.nameDom.innerText = ''
			this.contentDom.classList.add('only-content')
		}
	}

	setContent(content){
		if(content){
			cancelAnimationFrame(this.requestedAnimationId)
			this.contentDom.innerText = ''
			var printText = function(){
				if(content){
					this.contentDom.innerText += content.slice(0, 2)
					content = content.slice(2)
					this.requestedAnimationId = requestAnimationFrame(printText)
				}
			}.bind(this)
			this.requestedAnimationId = requestAnimationFrame(printText)
		} else {
			this.contentDom.innerText = ''
		}
	}
}

export default Dialogue