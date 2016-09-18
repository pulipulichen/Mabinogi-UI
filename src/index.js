require('./style/style.scss')
require('file?name=[name].[ext]!./index.html')
import MabinogiUI from './script/mabinogi-ui'

var {Dialogue, Media, Diary} = MabinogiUI
var avatar = require('./image/material/marlowe-avatar.png')

var diary = new Diary(document.querySelector('#diary'))
diary.setLabelNames(['基础', '中级', '高级', '备忘录'])

window.Diary = diary
diary.setContent([
	[
		{keyword: '交谈', description: '说说私人的故事吧。', callback: (e => console.log(e))},
		{keyword: '附近的消息', description: '打听一下这附近的谣传或其他人物的故事吧。', callback: (e => e)},
		{keyword: '关于技能', description: '可以了解到获得技能的方法及修炼方法。', callback: (e => e)},
		{keyword: '关于兼职', description: '可以获得金币或食物的工作的对话。运气好的话就可以做这些工作了。', callback: (e => e)},
		{keyword: '学习和修炼', description: '在学校学习时与老师的对话。', callback: (e => e)}
	],
	[
		{keyword: '杂货店', description: '出售一些日常生活所必需的物品。询问杂货店的位置。'},
		{keyword: '治疗所', description: '获得村落里治疗所的相关信息。'}
	]
])

var dialogue = new Dialogue(document.querySelector('#dialogue'))
dialogue.setDiary(diary)
dialogue.show()
dialogue.setContent("放在纤细的食指尖上的戏剧剧本\n墨水的味道\n随着埃文的风吹散开来。")
dialogue.setCanContinue(true)
dialogue.setButtons([{text: '继续', callback: function(){
	dialogue.setAvatar(avatar)
	dialogue.setName('马洛')
	dialogue.setContent("我是马洛，现在我给你讲讲我的故事吧。")
	dialogue.setCanContinue(false)
	dialogue.setButtons([{text: '交谈', callback: function(){
		dialogue.setContent("对于我知道哈利波菜的名字这件事情\n你一点都不用感到惊讶。\n除了你的名字\n我还知道很多关于你的事情")
		dialogue.setCanContinue(true)
		dialogue.setButtons([{text: '继续', callback: function(){
			dialogue.setContent("还有哈利波菜\n没有记住的\n那些事实。")
			dialogue.setButtons([{text: '继续', callback: function(){
				dialogue.showDiary()
				dialogue.setName('')
				dialogue.setContent("(马洛 看着我。)")
				dialogue.setCanContinue(false)
				dialogue.setButtons([{text: '结束对话', callback: function(){
					dialogue.setContent("马洛的故事结束了。")
					dialogue.hideDiary()
					dialogue.setAvatar('')
					dialogue.setButtons([{text: '关闭对话窗口', callback: function(){
						dialogue.hide()
					}}])
				}}])
			}}])
		}}])
	}}, {text: '交易', callback: (e => e)}])
}}])

