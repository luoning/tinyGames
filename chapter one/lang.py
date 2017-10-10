start='\n 你的世界是真实的，而在这里还有一个秘密的院子，或许她也存在于你的脑海里。秘密园地的地图已经展现在你的面前了，选择数字探索这无尽的长路吧\n'


monster="陌生人"
your="你的"
Status="当前状态："
play="准备先做些什么呢？\n（i-个人资料/p-包裹/m-地图/eq-装备/kl-胜绩/??-神秘指令） \n"
playAgain="我要去这里: "
changeOneToPlay="我要换一条路: "
findDoor='这是一个传送点，你需要通过么？'
findBackup='这里有一间客栈，终于能歇息一下了'
findJoke='去街巷碰碰运气，不知道会遇到什么'
passDoorOrNot="1:通过传送阵/2:等等再走: "
findNoting='没找到这地方'
findOutRange='什么鬼，海里的路么？'
findRecluse='一旁的大树下有个人很神秘'
findWall='在街上逛街逛了一整天，没发现什么特别的事情。'
justLive='你差不多挂了，还在这瞎折腾，换个地方碰运气吧！'
luckyRun="还好我跑得快，姿势优美是逃跑的诀窍。看，这不跑出来了！！"
combatOrNot="1:试试斤两/2：赶紧离开: "
findMonster='这里有个'+monster+'，看起来不是善茬。\n旁边有人喊到：“那是我们这十里八乡很强的一个人哦！”\n他过来了！！！'
unkown='      '
hp="生命"
attack="攻击"
defence="防御"
add="增加了："
attackSuccess="击中对手"
missFail="受到伤害"
win="胜利"
wantCombat="这个家伙我要把他打败"
needCombat="我都准备离开了，只能上了"
showMap="\n地图打开了"
someOne='擂  台'
NotEnter=['街  巷','树  林','山  丘','沙  漠','山  洞']
rest=['客  栈','酒  馆','农  庄','城  寨','驿  站']
joke='奇  遇'
anothoerWay='传送点'
mapShadow=" "
isVisited='这里你已经来过了'
unVisitable='请选择已经访问的附近区域'
delItemNo='请选择需要删除的道具序号：'
showItemNo='请选择需要查询详情的道具序号：'
eqItemNo='请选择需要装备道具序号：'
packageCmd='s-道具详情/d-删除道具/e-装备道具：'
combatWait='\n-----经过艰苦的战斗-----\n'


def packageInsert(x):
	print('瞧 \033[1;31;40m%s\033[0m 飞进了包裹，赶紧检查一下看看'%x)

def end(x):
	print('<The END><你在时空隧道最终闯到了第'+str(x)+'层>\n') 
	print("墙不能乱撞，路不能乱走，话不能乱说，字不能乱敲So 大侠重新来过\n")

def monsterIntroduce(x):
	print(monster+"自称",'\033[1;31;40m'+x+'\033[0m')

def enterGk(x,y):
	print("一阵光影恍惚，你来到了 \033[1;31;40m%s\033[0m 这里是 \033[1;31;40m%s\033[0m 统治的世界，探索吧发现这里的秘密！"%(x,y))

def showKlevel(klevel):
	print(showMap+' '*9+'<你正在时空隧道的第'+str(klevel)+'层>') 

