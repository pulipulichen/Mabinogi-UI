import Media from './media'

class Diary {
	constructor(div){
		div.innerHTML = (`
			<div class="diary" style="display:none">
				<div class="left-side"></div>
				<div class="right-side"></div>
				<div class="page-number"></div>
				<label class="label-1"></label>
				<label class="label-2"></label>
				<label class="label-3"></label>
				<label class="label-4"></label>
			</div>
		`)
		this.dom = div.querySelector('div.diary')
		this.pageNumberDom = this.dom.querySelector('.page-number')
		this.leftPageDom = this.dom.querySelector('.left-side')
		this.rightPageDom = this.dom.querySelector('.right-side')
		this.pages = []
		this.leftPageDom.addEventListener('click', this.prevPage.bind(this))
		this.rightPageDom.addEventListener('click', this.nextPage.bind(this))
		;[1,2,3,4].map(x => this.dom.querySelector(`.label-${x}`).addEventListener('click', function(e){
			var toPage = (this.sectionIndex[x-1] || this.sectionIndex[this.sectionIndex.length-1])
			if(toPage > this.currentPage){
				if(toPage - this.currentPage < 3){
					Media.sounds.nextPage.play()
				} else {
					Media.sounds.flipRight.play()
				}
			} else if(this.currentPage > toPage){
				if(this.currentPage - toPage < 3){
					Media.sounds.prevPage.play()
				} else {
					Media.sounds.flipLeft.play()
				}
			}
			Media.sounds.buttonDown.play()
			this.currentPage = toPage
			this.displayPage()
		}.bind(this)))
		this.dom.addEventListener('mousedown', e => e.target.className == 'keyword' ? Media.sounds.buttonDown.play() : null)
		this.dom.addEventListener('mouseup', e => e.target.className == 'keyword' ? Media.sounds.buttonConfirm.play() : null)
	}

	show(){
		this.dom.style.display = 'block'
	}

	hide(){
		this.dom.style.display = 'none'
	}

	setLabelNames(labels){
		if(labels.length != 4){
			alert('Label数量不足4个。')
			return;
		}
		this.labels = labels
		labels.map((e, i) => this.dom.querySelector(`.label-${i+1}`).innerText = e)
	}

	displayPage(){
		var rows = this.pages[this.currentPage-1]
		var [left, right] = [rows.slice(0, 13), rows.slice(13, 26)]
		this.leftPageDom.innerHTML = ''
		this.rightPageDom.innerHTML = ''
		left.map(x => {
			this.leftPageDom.appendChild(x)
			this.leftPageDom.appendChild(document.createElement('br'))
		})
		right.map(x => {
			this.rightPageDom.appendChild(x)
			this.rightPageDom.appendChild(document.createElement('br'))
		})
		this.pageNumberDom.innerText = `${this.currentPage}/${this.totalPage}`
	}

	nextPage(){
		if(this.currentPage < this.totalPage){
			this.currentPage += 1
			this.displayPage()
			Media.sounds.nextPage.play()
		}
	}

	prevPage(){
		if(this.currentPage > 1){
			this.currentPage -= 1
			this.displayPage()
			Media.sounds.prevPage.play()
		}
	}

	renderKeyword(keyword, callback){
		return this.sliceText(keyword).map(text => {
			var dom = document.createElement('span')
			dom.className = 'keyword'
			dom.innerText = text
			dom.addEventListener('click', e => {
				e.stopPropagation()
				callback(e)
			})
			return dom
		})
	}

	renderText(text){
		return this.sliceText(text).map(text => document.createTextNode(text))
	}

	renderSectionTitle(name){
		var dom = document.createElement('span')
		dom.className = 'title'
		dom.innerText = `**${name}**`
		return [
			document.createTextNode(''),
			dom,
			document.createTextNode(''),
		]
	}

	setContent(array){
		var sections = array.map((section, i) => {
			var title = this.renderSectionTitle(this.labels[i])
			var rows = section.map(r => {
				return this.renderKeyword(r.keyword, r.callback).concat(this.renderText(r.description)).concat(this.renderText(''))
			})
			return title.concat(...rows)
		})
		var sectionPages = sections.map(rows => this.rowsToPages(rows))
		this.sectionIndex = sectionPages.map((_, i, a) => a.slice(0, i).reduce((s, c) => s += c.length, 1))
		this.pages = [].concat.apply([], sectionPages)
		this.totalPage = this.pages.length
		this.currentPage = 1
		this.displayPage()
	}

	rowsToPages(rows){
		var pages = []
		for(var i=0; i<rows.length; i+=26){
			pages.push(rows.slice(i, i+26))
		}
		return pages
	}

	sliceText(text){
		text = text || ' '
		var rows = []
		for(var i=0; i<text.length; i+=11){
			rows.push(text.slice(i, i+11))
		}
		return rows
	}
}

export default Diary