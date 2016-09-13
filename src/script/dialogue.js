var urls = [require('../sound/gen_button_down.wav'),
			require('../sound/gen_button_confirm.wav')]
//			require('../sound/gen_hover.wav')]

var avatar = require('../image/material/marlowe-avatar.png')

class Dialogue {
	static init(){
		var [down, confirm, hover] = urls.map(f => {
			var audio = document.createElement('audio')
			audio.src = f
			audio.preload = 'auto'
			return audio
		})
		this.dom = document.querySelector('div.dialogue')
		this.diaryDom = document.querySelector('div.diary')
		this.contentDom = this.dom.querySelector('.content')
		this.nameDom = this.dom.querySelector('.name')
		this.avatarDom = this.dom.querySelector('.avatar')
		this.buttonLayerDom = this.dom.querySelector('.button-layer')

		this.dom.addEventListener('mousedown', e => e.target.tagName == 'BUTTON' ? down.play() : null)
		this.dom.addEventListener('mouseup', e => e.target.tagName == 'BUTTON' ? confirm.play() : null)
		//this.dom.addEventListener('mouseover', e => e.target.tagName == 'BUTTON' ? hover.play() : null)
		this.data = []
		this.dom.addEventListener('click', e => {
			if(this.toContinue){
				this.buttons[0].callback()
			}
		})
	}

	static show(){
		this.dom.style.display = 'block'
	}

	static hide(){
		this.dom.style.display = 'none'
	}

	static showDiary(){
		this.diaryDom.style.display = 'block'
	}

	static hideDiary(){
		this.diaryDom.style.display = 'none'
	}

	static setButtons(array){
		this.buttons = array
		this.buttonLayerDom.innerHTML = ''
		array.map(x => {
			var button = document.createElement('button')
			button.innerText = x.text
			button.addEventListener('click', e => {
				e.stopPropagation()
				x.callback()
			})
			this.buttonLayerDom.appendChild(button)
		})
	}

	static setCanContinue(bool){
		if(bool){
			this.toContinue = true
			this.dom.classList.add('to-continue')
		} else {
			this.toContinue = false
			this.dom.classList.remove('to-continue')
		}
	}

	static setAvatar(url){
		if(url){
			this.avatarDom.style.display = 'block'
			this.avatarDom.src = url
		} else {
			this.avatarDom.style.display = 'none'
		}
	}

	static setName(name){
		if(name){
			this.nameDom.innerText = name
			this.contentDom.classList.remove('only-content')
		} else {
			this.nameDom.innerText = ''
			this.contentDom.classList.add('only-content')
		}
	}

	static setContent(content){
		if(content){
			this.contentDom.innerText = content
		} else {
			this.contentDom.innerText = ''
		}
	}
}

Dialogue.init()
Dialogue.show()
Dialogue.setContent("放在纤细的食指尖上的戏剧剧本\n墨水的味道\n随着埃文的风吹散开来。")
Dialogue.setCanContinue(true)
Dialogue.setButtons([{text: '继续', callback: function(){
	Dialogue.setAvatar(avatar)
	Dialogue.setName('马洛')
	Dialogue.setContent("我是马洛，现在我给你讲讲我的故事吧。")
	Dialogue.setCanContinue(false)
	Dialogue.setButtons([{text: '交谈', callback: function(){
		Dialogue.setContent("对于我知道哈利波菜的名字这件事情\n你一点都不用感到惊讶。\n除了你的名字\n我还知道很多关于你的事情")
		Dialogue.setCanContinue(true)
		Dialogue.setButtons([{text: '继续', callback: function(){
			Dialogue.setContent("还有哈利波菜\n没有记住的\n那些事实。")
			Dialogue.setButtons([{text: '继续', callback: function(){
				Dialogue.showDiary()
				Dialogue.setName('')
				Dialogue.setContent("(马洛 看着我。)")
				Dialogue.setCanContinue(false)
				Dialogue.setButtons([{text: '结束对话', callback: function(){
					Dialogue.setContent("马洛的故事结束了。")
					Dialogue.hideDiary()
					Dialogue.setAvatar('')
					Dialogue.setButtons([{text: '关闭对话窗口', callback: function(){
						Dialogue.hide()
					}}])
				}}])
			}}])
		}}])
	}}, {text: '交易', callback: (e => e)}])
}}])

export default Dialogue