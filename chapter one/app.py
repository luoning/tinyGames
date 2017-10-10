import random
import sys
import gameset
import lang
from Rclass import item,weapon,monster,USER as item,weapon,monster,USER

tb=gameset.totalBricksNumber
ln=gameset.lineNumeber
openkset=gameset.openkset
hb=gameset.hb
ab=gameset.ab
db=gameset.db
guankaName=gameset.guankaName
guankaBoss=gameset.guankaBoss
# monsterList=gameset.monsterList
isDark=gameset.isDark
doorIsOpen=gameset.doorIsOpen
debug=gameset.debug
goEverywhere=gameset.goEverywhere
diffLevel=gameset.diffLevel
nameListsAll=gameset.nameListsAll

package=gameset.package
	
klevel=0

def visitable(x):
	bvisitable[x]=1
	if (x+1)%ln!=1:
		bvisitable[x-1]=1
	if (x+1)%ln!=0:
		bvisitable[x+1]=1
	if x > ln-1:
		bvisitable[x-ln]=1
	if x < tb-ln:
		bvisitable[x+ln]=1	
	# print(bvisitable[x])

def gamereset():
	global mapDict,monstersSet,bvisited,bvisitable
	bricks_set=list(range(tb))
	bricks=list(range(tb))
	openk=list(range(tb))	
	cldoor=godGiven(tb-1)
	bvisited=list('0'*tb)
	bvisitable=list('0'*tb)
	visitable(random.randint(0,tb-1))
	# visitable(0)
	for brick in bricks_set:	
		bricks[brick]=random.random()
		bricks[cldoor]=99
		if bricks[brick] <= openkset:
			openk[brick]=lang.someOne
		elif bricks[brick] <= 2*openkset:
			openk[brick]=lang.NotEnter[godGiven(len(lang.NotEnter))-1]
		elif bricks[brick] <= 3*openkset:
			openk[brick]=lang.rest[godGiven(len(lang.rest))-1]
		elif bricks[brick] <= 4*openkset:
			openk[brick]=lang.rest[godGiven(len(lang.rest))-1]
		elif bricks[brick] == 99:
			openk[brick]=lang.anothoerWay
		else:
			openk[brick]=lang.joke				
	bricksCondition=zip(bricks_set,openk)
	mapDict=dict((bricks_set,openk) for bricks_set,openk in bricksCondition)
	# monstersSet=monstersSet(5)
	return mapDict

def godGiven(x):
	godGivenNum=random.randint(1,x)
	return godGivenNum

def showMapOpend():
	n  = len(mapDict)
	lnl =int(n/ln)
	lang.showKlevel(klevel)
	k=0	
	for n in mapDict:		
		if k < lnl:
			kl=0
			print('-'+'-'*10*ln+'\n|'+(lang.mapShadow*9+'|')*ln)
			print("|",end="")
			for nlnl in range(ln):						
				if kl<ln:	
					showMapNoteLine(ln*k+kl)						
					kl=kl+1				
			k=k+1
			print('\n|'+(lang.mapShadow*9+'|')*ln)
	print('-'+'-'*10*ln)


def showMapNoteLine(x):
	if int(x)<10:
		x1=' '+str(x)
	else:
		x1=int(x)
	if int(x1) <= tb:
		if mapDict[x]==lang.anothoerWay and doorIsOpen==1:
			print(x1,"\033[1;37;42m"+mapDict[x]+"\033[0m",end="|")
		elif bvisited[int(x1)]==1 :
			print(x1,"\033[1;34;44m"+mapDict[x]+"\033[0m",end="|")
		elif bvisitable[int(x1)]==1 :
			print(x1,mapDict[x],end="|")
		elif int(isDark)==1:
			print(x1,lang.unkown,end="|")		
		else:
			print(x1,mapDict[x],end="|")

def checkCommand(n):
	global isDark,doorIsOpen,debug,goEverywhere,User
	if n.isdigit():
		n = int(n)	
	elif n=='i':
		refresh()
		User.displayUSER()
		choiceBrick(lang.play,mapDict)
	elif n=='p':
		showPackage()
		choiceBrick(lang.play,mapDict)
	elif n=='m':
		showMapOpend()		 
		choiceBrick(lang.play,mapDict)
	elif n=='kl':
		print('你击败了',User.killList)	 		 
		choiceBrick(lang.play,mapDict)
	elif n=='eq':
		print('您已经装备了',weapons[User.position['0']].name)	 
		choiceBrick(lang.play,mapDict)
	elif n=='openDebug' or n=='od':
		debug=1 		 
		choiceBrick(lang.play,mapDict)
	elif debug == 1:
		if n=='beLight' or n=='bl':
			isDark=0
			showMapOpend()		 
			choiceBrick(lang.play,mapDict)
		elif n=='beDark' or n=='bd':
			isDark=1
			showMapOpend()		 
			choiceBrick(lang.play,mapDict)
		elif n=='openTheDoor' or n=='otd':
			doorIsOpen=1	 
			showMapOpend()	
			choiceBrick(lang.play,mapDict)
		elif n=='clDebug' or n=='cd':
			debug=0	 
			showMapOpend()
			choiceBrick(lang.play,mapDict)
		elif n=='goEverywhere' or n=='gew':
			goEverywhere=1
			showMapOpend()
			choiceBrick(lang.play,mapDict)
		else:
 			choiceBrick(lang.play,mapDict)
	else:
		choiceBrick(lang.play,mapDict)
	return n

def packageCmd():
	if len(package)>0:
		x = input(lang.packageCmd)
		if x.isdigit():
			if int(x)<=len(package):
				x = int(x)
				weapons[package[x-1]].displayWeapon()
				packageCmd()
			else:
				packageCmd()
		elif x=='d':
			y = input(lang.delItemNo)
			if y.isdigit():
				y = int(y)-1
				print(y,package[y],len(weapons),len(package),weapons[package[y]].name)
				weapons[package[y]].__del__()	
				del package[y]
				packageCmd()
			else:
				y = input(lang.delItemNo)
				packageCmd()
		elif x=='s':
			y = input(lang.showItemNo)
			if y.isdigit():
				y = int(y)-1
				weapons[package[y]].displayWeapon()
				packageCmd()
			else:
				y = input(lang.showItemNo)
				packageCmd()
		elif x=='e':
			y = input(lang.eqItemNo)
			if y.isdigit():
				y = int(y)-1
				if weapons[package[y]].status==0 and User.position['0']=='':
					User.eqWeapon(package[y],'0')
					User.hp=User.hp+weapons[User.position['0']].hpAdd
					User.attack=User.attack+weapons[User.position['0']].attackAdd
					User.defence=User.defence+weapons[User.position['0']].defenceAdd
					weapons[package[y]].status=1
					print('您装备了',weapons[User.position['0']].name)
				elif weapons[package[y]].status==1:
					print('您已经装备了',weapons[User.position['0']].name)
				else:
					print('您已经装备了',weapons[User.position['0']].name,'需要换成',weapons[package[y]].name,'么')
					z=input('1-yes/2-no')
					if z.isdigit():
						if int(z)==1:
							User.hp=User.hp-weapons[User.position['0']].hpAdd
							User.attack=User.attack-weapons[User.position['0']].attackAdd
							User.defence=User.attack-weapons[User.position['0']].defenceAdd
							weapons[User.position['0']].status=0
							User.eqWeapon(package[y],'0')
							User.hp=User.hp+weapons[User.position['0']].hpAdd
							User.attack=User.attack+weapons[User.position['0']].attackAdd
							User.defence=User.defence+weapons[User.position['0']].defenceAdd	
							weapons[package[y]].status=1	
							print('您装备了',weapons[User.position['0']].name)					
						else:
							print('取消了')
					else:
						packageCmd()
				packageCmd()
			else:
				y = input(lang.showItemNo)
				packageCmd()
	else:
		choiceBrick(lang.play,mapDict)

def choiceBrick(input_x,mapDict):	
	# showMapOpend()
	if input_x=='':
		pass
	else:
		n = input(input_x)
		n = checkCommand(n)		
		if int(n) <= tb:
			if bvisitable[int(n)]==1 or goEverywhere==1 :
				visitable(n)
				if bvisited[n]==1:
					print(lang.isVisited)
					choiceBrick(lang.play,mapDict)
				else:		
					bvisited[n]=1
					#print(bvisited)	
					if n >= tb :
						print (lang.findNoting)
						choiceBrick(lang.playAgain,mapDict)
					elif n < 0 :
						print (lang.findOutRange)
						choiceBrick(lang.playAgain,mapDict)
					elif mapDict[n] in lang.NotEnter:
						findWall()			
					elif mapDict[n]==lang.someOne:
						findSomeOne()			
					elif mapDict[n] in lang.rest:			
						rest()			
					elif mapDict[n]==lang.joke:				
						joke()		
					elif mapDict[n]==lang.anothoerWay:
						findDoor(n)
					else:
						fightFail()
			else:
				print(lang.unVisitable)
				choiceBrick(lang.playAgain,mapDict)
		else:
			choiceBrick(lang.playAgain,mapDict)
		

def findDoor(n):
	print('') 
	print(lang.findDoor)
	print('') 
	x = input(lang.passDoorOrNot) 
	if x=="1":
		play()
	else:
		bvisited[n]=0
		choiceBrick(lang.changeOneToPlay,mapDict)

def fightFail():
	lang.end(klevel)
	print('你累计击败了'+str(len(User.killList))+'人\n他们是：',User.killList)		
	rePlay()
	print('') 

def findWall():
	godGivenNum=godGiven(2)
	if godGivenNum==1:
		print('') 
		print(lang.findWall)
		print('') 
		choiceBrick(lang.playAgain,mapDict)		
	else:
		print('') 
		findSomeOne()
		print('') 

def findSomeOne():
	godGivenNum=godGiven(3)
	if godGivenNum==1:
		print('') 
		print(lang.findMonster) 
		print('') 		
		combatChoice()
	elif godGivenNum==2:
		print('') 
		print(lang.findRecluse) 
		print('') 		
		combatChoice()
	else:
		print('') 
		print(lang.findMonster) 
		print('') 		
		combatChoice()

def rePlay():
	global klevel,package,User
	klevel=0
	package=[]
	# User.displayUSER()
	User=USER(User.name,1,hb,ab,db)
	# User.displayUSER()
	play()
	
def play():
	global klevel
	fgk()	
	if klevel==0:	
		firstTimePlay()
	else:		
		klevel=klevel+1
	mapDict=gamereset()
	lang.enterGk(guankaNameset,guankaBossSet)
	showMapOpend()
	choiceBrick(lang.play,mapDict)
	return klevel

def firstTimePlay():
	global klevel,User
	klevel=klevel+1	
	print(lang.start) 
	weaponsSet(20)

def monsterSet():
	global monster1,kDiff
	kDiff=(klevel+1)*diffLevel
	maxt=len(monsterListSet)-1
	t=random.randint(0,maxt)
	monsterNameset=monsterListSet[t]
	monster1 = monster(monsterNameset, kDiff)
	# monster1.displaymonster()
	# print(kDiff)
	lang.monsterIntroduce(monster1.name)

def monstersSet(n):
	global monsters
	monsters = {i:2*i for i in range(n)}
	for idMonster in monsters:
		maxt=len(monsterListSet)-1
		t=random.randint(0,maxt)
		monsterNameset=monsterListSet[t]
		monsters[idMonster] = monster(monsterNameset, kDiff)
		# monsters[idMonster].displaymonster()
	# monsters[n-1].displayCount()

def rest():
	global User
	print('') 
	print(lang.findBackup) 
	print('') 	
	addhp=godGiven(100)
	User.hp=User.hp+addhp
	print(lang.your+lang.hp+lang.add,addhp)
	print(lang.your+lang.hp,User.hp)
	print("")
	choiceBrick(lang.changeOneToPlay,mapDict)

def joke():
	global User
	print('') 
	print(lang.findJoke) 
	print('') 
	fj=godGiven(4)
	if fj==4:
		addatt=godGiven(100)
		User.attack=User.attack+addatt
		print(lang.your+lang.attack+lang.add,addatt)
		print(lang.your+lang.attack,User.attack)		
		print("")
	elif fj==2:
		adddf=godGiven(100)
		User.defence=User.defence+adddf
		print(lang.your+lang.defence+lang.add,adddf)
		print(lang.your+lang.defence,User.defence)	
		print("")
	elif fj==3:
		addhp=godGiven(100)
		User.hp=User.hp+addhp
		print(lang.your+lang.hp+lang.add,addhp)
		print(lang.your+lang.hp,User.hp)
		print("")
	elif fj==1:
		addobj=godGiven(len((weapons)))			
		insertPackage(addobj)
		print("")
	choiceBrick(lang.changeOneToPlay,mapDict)

def showPackage():
	k=0
	for i in package:
		k=k+1
		print('\n',k,weapons[i].name,' ','[',weapons[i].fcapacityAdd,']\n')
	packageCmd()

def insertPackage(x):	
	weapons[x-1].owner=User.name
	# weapons[x-1].displayItem()
	package.append(x-1)
	lang.packageInsert(str(weapons[x-1].name))

def showResult():	
	global User
	print(monster1.name,lang.hp,monster1.hp,lang.attack,monster1.attack,lang.defence,monster1.defence,'\n-----') 
	print(lang.Status,lang.hp,User.hp,lang.attack,User.attack,lang.defence,User.defence)

def fgk():
	global  guankaNameset,guankaBossSet,monsterListSet,weaponListSet,User
	maxgk=len(guankaName)-1
	gkt=godGiven(maxgk)
	guankaNameset=guankaName[gkt]
	guankaBossSet=guankaBoss[gkt]
	# monsterListSet=monsterList[gkt]
	monsterListSet=nameset(50)
	weaponListSet=gameset.itemsList
	return guankaNameset,guankaBossSet,monsterListSet,weaponListSet

def nameset(x):
	namelist=list(range(x))
	for i in namelist:
		if godGiven(5)>1:
			namelist[i]=nameListsAll[0][godGiven(len(nameListsAll[0])-1)]+nameListsAll[1][godGiven(len(nameListsAll[1])-1)]
		else:
			namelist[i]=nameListsAll[0][godGiven(len(nameListsAll[0])-1)]+nameListsAll[1][godGiven(len(nameListsAll[1])-1)]+nameListsAll[1][godGiven(len(nameListsAll[1])-1)]
	# print(namelist)
	return namelist

def combat():
	global User,monster1
	attackSuccessTime=0
	missFailTime=0
	while User.hp>0 and monster1.hp>0:
		ff=godGiven(2)			
		if ff==1:
			attackSuccessTime=attackSuccessTime+1	
			monster1.hp=monster1.hp-User.attack			
		else:
			if monster1.attack>User.defence:
				missFailTime=missFailTime+1
				User.hp=User.hp-monster1.attack				
			else:
				User.hp=User.hp-1
				missFailTime=missFailTime+1
	else:
		print(lang.combatWait)
		print(lang.attackSuccess,attackSuccessTime)
		print(lang.missFail,missFailTime)
		print(lang.combatWait)
		showResult()		
		if User.hp>0:
			print(lang.win,lang.your+lang.hp,User.hp)
			print('GET:exp',monster1.expGet)		
			expAdd(monster1.expGet)
			User.killListSet(monster1.name)	
			if godGiven(100)>=50:
				insertPackage(godGiven(len((weapons))))
				choiceBrick(lang.changeOneToPlay,mapDict)
			else:
				choiceBrick(lang.changeOneToPlay,mapDict)
		elif monster1.hp>0:			
			fightFail()
	return User.hp

def expAdd(x):
	global User
	User.totalExp=User.totalExp+x
	levelUp()

def levelUp():
	global User,hb,ab,db
	if User.totalExp>10:
		User.lv=2
	elif User.totalExp>100:
		User.lv=3
	elif User.totalExp>500:
		User.lv=4
	elif User.totalExp>1000:
		User.lv=5
	elif User.totalExp>2000:
		User.lv=6
	elif User.totalExp>3500:
		User.lv=7
	elif User.totalExp>5000:
		User.lv=8
	elif User.totalExp>8000:
		User.lv=9
	User.attack=ab+User.lv
	User.defence=hb+User.lv
	refresh()

def refresh():
	global User
	User.fcapacity =User.hp+User.attack+User.defence


def combatChoice():	
	monsterSet()
	showResult()
	x=input(lang.combatOrNot)
	if x=="1":
		print(lang.wantCombat)
		combat()
	else:
		fa=godGiven(2)	
		if fa==1:
			print(lang.needCombat)
			combat()
		else:
			print(lang.luckyRun)
			choiceBrick(lang.changeOneToPlay,mapDict)


def weaponsSet(n):
	global weapons
	weapons = {i:2*i for i in range(n)}
	for idWeapon in weapons:
		maxt=len(weaponListSet)-1
		t=random.randint(0,maxt)
		weaponNameset=weaponListSet[t]
		weapons[idWeapon] = weapon(weaponNameset, godGiven(100))
		# weapons[idWeapon].displayWeapon()
		# weapons[idWeapon].displayItem()
	# weapons[n-1].displayItemCount()	
	# weapons[n-1].displayWeaponCount()	
	# weapons[n-1].displaySpriteCount()

User=USER(nameset(1)[0],1,hb,ab,db)

play()

# nameListsAllset(50)

