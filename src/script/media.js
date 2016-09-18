var soundUrls = {
	buttonDown: require('../sound/gen_button_down.wav'),
	buttonConfirm: require('../sound/gen_button_confirm.wav'),
	buttonHover: require('../sound/gen_hover.wav'),
	buttonCancel: require('../sound/gen_button_cancel.wav'),
	windowOpen: require('../sound/gen_window_open.wav'),
	windowClose: require('../sound/gen_window_closed.wav'),
	nextPage: require('../sound/book_ltor.ogg'),
	prevPage: require('../sound/book_rtol.ogg'),
	flipLeft: require('../sound/book_rtol_end.ogg'),
	flipRight: require('../sound/book_ltor_end.ogg')
}


class Media {
	static init(){
		this.sounds = {}
		Object.keys(soundUrls).map(k => {
			var audio = document.createElement('audio')
			audio.src = soundUrls[k]
			audio.preload = 'auto'
			this.sounds[k] = audio
		})
	}
}

Media.init()
export default Media