 
import random
import sys

def godGiven(x):
	godGivenNum=random.randint(1,x)
	return godGivenNum


class sprite:
   spriteCount = 0
   def __init__(self, name):
      self.name = name
      self.status = 0
      sprite.spriteCount += 1

   def __del__(self):
      self.status = 2
      sprite.spriteCount -= 1
   
   def displaySpriteCount(self):
      print ("Total sprite %d" % sprite.spriteCount)
 
   def displaySprite(self):
      print ("名称 : ", self.name,"状态 : ", self.status)
      print ('')


class USER(sprite):
   '所有角色的基类'
   USERCount = 0
 
   def __init__(self, name,lv,ab,db,hb):
      sprite.__init__(self,name)
      self.lv = lv   
      self.hp=(hb+lv)*10
      self.attack=ab+lv
      self.defence=hb+lv
      self.totalExp=0
      self.fcapacity =self.hp+self.attack+self.defence
      self.position = {'0':'','1':'','2':''}
      self.killList=[]

      USER.USERCount += 1
   
   def displayUSERCount(self):
      print ("Total USER %d" % USER.USERCount)

   def eqWeapon(self,x,p):
      self.position[p] = x

   def killListSet(self,x):
      self.killList.append(x)

 
   def displayUSER(self):
      print ('')
      print ('=个人资料=')
      print ('-'*20)
      print ("姓名 : ", self.name,  ", 战力: ", self.fcapacity)
      print ("生命: ", self.hp,  ", 攻击: ", self.attack,  ", 防御: ", self.defence)
      print ("总经验:",self.totalExp,"等级:",self.lv)
      print ('')


class monster(sprite):
   '所有妖魔鬼怪的基类'
   monsterCount = 0
 
   def __init__(self, name,lv):
      sprite.__init__(self,name)
      self.lv = lv
      self.hp=int(self.lv*150/((lv+5)*godGiven(2)))
      self.attack=int((lv)*godGiven(2))+1
      self.defence=int((lv)*godGiven(2))+1      
      self.fcapacity =self.hp+self.attack+self.defence
      self.expGet=int(self.fcapacity/10)
      # self.fcapacity =lv*1000*godGiven(3)
      # self.hp=int(self.fcapacity/((lv+5)*godGiven(2)))
      # self.attack=int((lv)*godGiven(2)/10)
      # self.defence=int((lv)*godGiven(2)/10)
      monster.monsterCount += 1
   
   def displayMonsterCount(self):
      print ("Total monster %d" % monster.monsterCount)
 
   def displaymonster(self):
      print ("姓名 : ", self.name,  ", 战力: ", self.fcapacity)
      print ("生命: ", self.hp,  ", 攻击: ", self.attack,  ", 防御: ", self.defence)
      print ('')


class item(sprite):
   '所有道具的基类'
   itemCount = 0
 
   def __init__(self, name):
      sprite.__init__(self,name)
      self.status = 0
      self.owner = 0
      item.itemCount += 1

   def __del__(self):
      self.status = 2
      item.itemCount -= 1
   
   def displayItemCount(self):
      print ("Total item %d" % item.itemCount)
 
   def displayItem(self):
      print ("名称 : ", self.name,"状态 : ", self.status)
      print ("所有者: ",self.owner)
      print ('')



class weapon(item):
   '所有武器的基类'
   weaponCount = 0
 
   def __init__(self, name,lv):
      item.__init__(self,name)
      self.lv = lv
      self.fcapacityAdd =lv*(100+godGiven(5))+godGiven(50)
      self.hpAdd=int(self.fcapacityAdd/((lv+5)*godGiven(2)))
      self.attackAdd=int((lv)*godGiven(2)/10)
      self.defenceAdd=int((lv)*godGiven(2)/10)
      # self.fcapacityAdd =lv*1000*godGiven(3)
      # self.hpAdd=int(self.fcapacityAdd/((lv+5)*godGiven(2)))
      # self.attackAdd=int((lv)*godGiven(2)/10)
      # self.defenceAdd=int((lv)*godGiven(2)/10)
      weapon.weaponCount += 1
   
   def displayWeaponCount(self):
      print ("Total weapon %d" % weapon.weaponCount)
 
   def displayWeapon(self):
      print ("武器名称 : ", self.name,  ", Lv: ", self.lv,"战力: ", self.fcapacityAdd)
      print ("生命加强: ", self.hpAdd,  ", 攻击: ", self.attackAdd,  ", 防御: ", self.defenceAdd)
      print ("所有者: ",self.owner)
      print ('')
