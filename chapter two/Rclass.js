

Array.prototype.in_array=function(e){
　　var r=new RegExp(','+e+',');  
　　return (r.test(','+this.join(this.S)+','));  
};

class Sprite {
    constructor(name) {
        this.name = name;
        this.status = 0
        Sprite.prototype.Count += 1
    }
    del(){
    	this.status = 2;
    	spriteCount -= 1;
  	} 
    displaySprite(){
    	console.log("名称 : ", this.name,"状态 : ", this.status)
    }

}

Sprite.prototype.Count = 0

Sprite.prototype.displaySpriteCount = function(){
      console.log(Sprite.prototype.Count , 'Sprites is created...');
  }

class God extends Sprite {
    constructor(name='天帝') {
        super(name); // 记得用super调用父类的构造方法!
        this.package='';
    }
    given(x=10){
      var  givenNum=parseInt(Math.random(1)*x)+1
     // console.log(god.givenNum)
      return givenNum   
    }
    creatSence(x='神话世界'){
      var plant = new _Scene(x)
      console.log('起初神降临,于是',this.name,'创造了',plant.name)
      return plant
    }
    creatMap(x='tinyMap',y=this.creatSence()){
      var map = new _Map(x,y)
      console.log('由于神需要有一片沃土滋养万物，于是创造了',map.name)
      return map
    }
    gvUrName(){
        if (this.given(5)>1){
          var  name=nameListsAll[0][this.given(nameListsAll[0].length-1)]+nameListsAll[1][this.given(nameListsAll[1].length-1)]
            }else{
          var name=nameListsAll[0][this.given(nameListsAll[0].length-1)]+nameListsAll[1][this.given(nameListsAll[1].length-1)]+nameListsAll[1][this.given(nameListsAll[1].length-1)]
            }
        return name
    }

    gvItemName(p){  
         var name=setName[this.given(setName.length-1)]+setType[p][this.given(setType[p].length-1)]
          return name
    }

    creatUr(x=map.name){
      var user = new User(this.gvUrName(),1,[x,[this.given(500),this.given(500)]],5,5,5);
      console.log('由于神需要有一个人牧守世界，于是创造了',user.name)
      return user
    }

    creatMst(x=map.name){
      var mst = new Monster(this.gvUrName(),this.given(5),[x,[this.given(500),this.given(500)]]);
      console.log('由于神需要有一个人作为英雄的对手，于是创造了',mst.name)
      return mst
    }

    creatEq(type){
      var eq = new Eq(this.gvItemName(type),this.given(100),type)
      eq.owner=this.name
      this.package.push(eq)
      console.log(this.name,'找材料随手做了个',eq.name)
      return eq
    }

}

var god = new God()

class _Scene extends Sprite {
    constructor(name='Earth') {
        super(name); 
        this.light=1
    }

}

class _Map extends _Scene {
    constructor(name='tinyMap',S,type=1) {
        super(name); 
        this.Scene=S;
        this.type=1
    }

}

class User extends God {

    constructor(name,lv,lc=['',['','']],ab,db,hb) {
        super(name); 
        img:'img/avator/Robot.img';
		    this.lv = lv; 
      	this.hp=(hb+lv)*10
      	this.attack=ab+lv
      	this.defence=hb+lv
      	this.totalExp=0
      	this.fcapacity =this.hp+this.attack+this.defence
      	this.position = {'0':'','1':'','2':''}
        this.exp=0
        this.package=[]
      	this.killList=[]
        this.location=lc
      	User.prototype.Count += 1
    }

    moveTo (x=this.location[0],y,z) {
		  this.location=[x,[y,z]]
      console.log(this.name,'移动到了',x,'坐标',y,',',z,'的位置！')
    }

    hello(x) {
        alert('你好, ' + x.name + '!');
    }

    fight(x) {
      //console.log(this.location,x.location);
      if (toString(this.location)==toString(x.location)){
        console.log(this.name,'战胜了宿命的对手',x.name)
        var expAdd = x.expGet
        this.totalExp +=  expAdd     
        console.log(this.name,'获得了exp ' +expAdd + '!');
        this.killListSet(x.name)
        // console.log(x.maybeGet['package'])
        if (x.package.length>=1){
                var packageAddID =god.given(x.package.length)-1
                var packageAdd = x.package[packageAddID]         
                console.log(this.name,'获得了 ' + packageAdd.name + '!');                
                this.exp +=expAdd
                this.package.push(packageAdd)
                x.package.splice(packageAddID,1)
                packageAdd.owner=this.name
              }else{
                console.log(x.name,'的包裹空空如也!');
            }
          }else{
                console.log(this.name,'正在寻找 ' +x.name + '!');
          }
    }


    pickUp(x){
      this.package.push(x)
      x.owner=this.name
      x.status=0
    }

    thowOut(x){
      this.package.splice(x,1)
    }

    eqItemInPackage(n){
      var x=this.package[n]  
      if (x.status==0){    
            if(this.position[x.p]==''){
                  if(x.status==0){
                        this.position[x.p] = x
                        this.position[x.p].owner=this.name
                        this.position[x.p].status=1
                        console.log(this.name,'成功装备了'+this.position[x.p].name)
                        this.package.splice(n,1)
                      }else{
                        console.log('这件装备已经在身上了，换一件吧')
                      }
                    }else{
                      console.log('您已经装备了',this.position[x.p].name,'需要脱下来么?')
                      }
                  }else{
                    console.log('您包裹里空空如也')
                  }
    }
    eqItem(x){
      if(this.position[x.p]==''){
            if(x.status==0){
                  this.position[x.p] = x
                  x.owner=this.name
                  x.status=1
                  console.log(this.name,'成功装备了'+x.name)
                }else{
                  console.log('这件装备已经在身上了，换一件吧')
                }
              }else{
                console.log('您已经装备了',this.position[x.p].name,'需要脱下来么?')
                }
    }
    uneqItem(p){
      if(this.position[p]!=''){
            this.position[p].status=0
            console.log(this.position[p].name,'已经解除装备')
            this.pickUp(this.position[p])    
            this.position[p]=''
          }else{            
            console.log('这里并没有装备')
          }
    }

    killListSet(x){
      if (this.killList.in_array(x)){
            console.log('你又战胜了一次',x)
          }else{
            console.log('你的战绩增加了一个',x)
            this.killList.push(x)
          }
    }

    findMst(x){
      this.moveTo(x.location[0],x.location[1][0],x.location[1][1])
      console.log(this.name,'找到了宿命之敌',x.name)
    }

    displayUSER(){
      console.log('')
      console.log('=个人资料=')
      console.log('------------------------')
      console.log("姓名 : ", this.name,  ", 战力: ", this.fcapacity)
      console.log("生命: ", this.hp,  ", 攻击: ", this.attack,  ", 防御: ", this.defence)      
      console.log("装备:",this.position[0].name,this.position[1].name,this.position[2].name)
      console.log("包裹:")
      for (var i in this.package){console.log(this.package[i].name)}
      console.log("总经验:",this.totalExp,"等级:",this.lv)
      console.log('')
   }
}

User.prototype.Count = 0

User.prototype.displaySpriteCount = function(){
      console.log(User.prototype.Count + 'Sprites is created...');
  }


class Monster extends God{
   // '所有妖魔鬼怪的基类'
 
   constructor(name,lv,lc=['',['','']],){
      super(name)
      this.lv = lv
      this.hp=parseInt(this.lv*150/((lv+5)*god.given(2)))
      this.attack=parseInt((lv)*god.given(2))+1
      this.defence=parseInt((lv)*god.given(2))+1      
      this.fcapacity =this.hp+this.attack+this.defence
      this.expGet=parseInt(this.fcapacity/10)
      this.package=[]
      this.location=lc
      Monster.prototype.Count += 1
  	}
 
   displayMonster(){
   	  console.log('')
      console.log('=角色资料=')
      console.log('------------------------')
      console.log("姓名 : ", this.name,  ", 战力: ", this.fcapacity)
      console.log("生命: ", this.hp,  ", 攻击: ", this.attack,  ", 防御: ", this.defence)
      console.log('')
  }
}

Monster.prototype.Count = 0

Monster.prototype.displaySpriteCount = function(){
      console.log(Monster.prototype.Count + 'Sprites is created...');
  }

class Item extends Sprite{
   // '所有道具的基类'
 
   constructor(name){
      super(name)
      this.status = 0
      this.owner = 0
      Item.prototype.Count += 1
    }

   del(){
         this.status = 2
         itemCount -= 1
      }
 
   displayItem(){
   	     console.log('')
         console.log('=道具信息=')
         console.log('------------------------')
         console.log("名称 : ", this.name,"状态 : ", this.status)
         console.log("所有者: ",this.owner)
         console.log('')
      }
}

Item.prototype.Count = 0

Item.prototype.displaySpriteCount = function(){
      console.log(Item.prototype.Count + 'items is created...');
  }

class Eq extends Item{
   // '所有武器的基类'
 
   constructor(name,lv,type){
      super(name)
      this.lv = lv
      this.p=type
      this.fcapacityAdd =lv*(100+god.given(5))+god.given(50)
      this.hpAdd=parseInt(this.fcapacityAdd/((lv+5)*god.given(2)))
      this.attackAdd=parseInt((lv)*god.given(2)/10)
      this.defenceAdd=parseInt((lv)*god.given(2)/10)      
      Eq.prototype.Count += 1
     }
 
   displayWeapon(){
        console.log('')
         console.log('=武器资料=')
         console.log('------------------------')
         console.log("武器名称 : ", this.name,  ", Lv: ", this.lv,"战力: ", this.fcapacityAdd)
         console.log("生命加强: ", this.hpAdd,  ", 攻击: ", this.attackAdd,  ", 防御: ", this.defenceAdd)
         console.log("所有者: ",this.owner)
         console.log('')
     }
}

Eq.prototype.Count = 0

Eq.prototype.displaySpriteCount = function(){
      console.log(Eq.prototype.Count + 'weapons is created...');
  }


nameListsAll=[
['赵','钱','孙','李','周','吴','郑','王','冯','陈','褚','卫','蒋','沈','韩','杨','朱','秦','尤','许','何','吕',
'施','张','孔','曹','严','华','金','魏','陶','姜','戚','谢','邹','喻','柏','水','窦','章','云','苏','潘','葛','奚','范','彭',
'郎','鲁','韦','昌','马','苗','凤','花','方','俞','任','袁','柳','酆','鲍','史','唐','费','廉','岑','薛','雷','贺','倪','汤',
'滕','殷','罗','毕','郝','邬','安','常','乐','于','时','傅','皮','卞','齐','康','伍','余','元','卜','顾','孟','平','黄','和',
'穆','萧','尹','姚','邵','湛','汪','祁','毛','禹','狄','米','贝','明','臧','计','伏','成','戴','谈','宋','茅','庞','熊','纪',
'舒','屈','项','祝','董','梁','杜','阮','蓝','闵','席','季','麻','强','贾','路','娄','危','江','童','颜','郭','梅','盛','林',
'刁','钟','徐','邱','骆','高','夏','蔡','田','樊','胡','凌','霍','虞','万','支','柯','昝','管','卢','莫','经','房','裘','缪',
'干','解','应','宗','丁','宣','贲','邓','郁','单','杭','洪','包','诸','左','石','崔','吉','钮','龚','程','嵇','邢','滑','裴',
'陆','荣','翁','荀','羊','於','惠','甄','麴','家','封','芮','羿','储','靳','汲','邴','糜','松','井','段','富','巫','乌','焦',
'巴','弓','牧','隗','山','谷','车','侯','宓','蓬','全','郗','班','仰','秋','仲','伊','宫','宁','仇','栾','暴','甘','钭','厉',
'戎','祖','武','符','刘','景','詹','束','龙','叶','幸','司','韶','郜','黎','蓟','薄','印','宿','白','怀','蒲','邰','从','鄂',
'索','咸','籍','赖','卓','蔺','屠','蒙','池','乔','阴','郁','胥','能','苍','双','闻','莘','党','翟','谭','贡','劳','逄','姬',
'申','扶','堵','冉','宰','郦','雍','舄','璩','桑','桂','濮','牛','寿','通','边','扈','燕','冀','郏','浦','尚','农','温','别',
'庄','晏','柴','瞿','阎','充','慕','连','茹','习','宦','艾','鱼','容','向','古','易','慎','戈','廖','庾','终','暨','居','衡',
'步','都','耿','满','弘','匡','国','文','寇','广','禄','阙','东','殴','殳','沃','利','蔚','越','夔','隆','师','巩','厍','聂',
'晁','勾','敖','融','冷','訾','辛','阚','那','简','饶','空','曾','毋','沙','乜','养','鞠','须','丰','巢','关','蒯','相','查',
'後','荆','红','游','竺','权','逯','盖','益','桓','公','万俟','司马','上官','欧阳','夏侯','诸葛','闻人','东方','赫连','皇甫',
'尉迟','公羊','澹台','公冶','宗政','濮阳','淳于','单于','太叔','申屠','公孙','仲孙','轩辕','令狐','钟离','宇文','长孙','慕容',
'鲜于','闾丘','司徒','司空','亓官','司寇','仉','督','子车','颛孙','端木','巫马','公西','漆雕','乐正','壤驷','公良','拓跋','夹谷',
'宰父','谷梁','晋','楚','闫','法','汝','鄢','涂','钦','段干','百里','东郭','南门','呼延','归','海','羊舌','微生','岳','帅','缑',
'亢','况','后','有','琴','梁丘','左丘','东门','西门','商','牟','佘','佴','伯','赏','南宫','墨','哈','谯','笪','年','爱','阳','佟','第五','言','福'],
['彬','轩','含','蒲','乒','虚','行','亭','仑','蓝','影','韬','函','克','盛','衡','芝','晗','昊','诗','琦','至','涵','伦','时',
'映','志','菱','纶','士','永','致','嘉','旷','示','咏','智','安','轮','世','勇','中','昂','律','业','友','忠','敖','齐','轼',
'桓','林','言','群','书','有','宣','颁','略','伟','骢','州','清','宏','充','佑','洲','庭','马','濮','丹','乐','邦','迈','卫',
'平','乾','榜','宸','蔚','旲','东','宝','昴','树','材','纪','保','茂','泓','棋','竹','葆','浩','魏','妤','铸','劻','玫','晔',
'渝','壮','羚','阳','文','瑜','卓','掣','奎','船','与','萱','豹','梅','汶','旭','濯','驾','和','航','宇','孜','邶','望','武',
'羽','崊','霆','美','希','雨','淑','冰','蒙','才','凰','腾','备','密','溪','泰','子','辈','冕','帅','语','茜','蓓','淼','曦',
'玉','梓','弼','民','奇','禾','综','碧','洋','霞','连','祖','厚','晨','先','昱','选','昪','旻','虹','朔','济','彪','淏','贤',
'儋','冬','龄','馗','娴','钰','栋','飙','传','舷','御','端','澜','然','磊','裕','段','挺','名','春','誉','天','飚','明','灏',
'堂','碫','莱','鸣','双','渊','琳','坚','茗','一','元','倩','宾','村','宪','辉','铎','妍','铭','献','彭','思','策','谋','祥',
'序','伯','骞','牧','翔','启','恩','建','慕','向','沅','发','汗','穆','骁','溓','帆','健','恒','洪','媛','汉','键','威','晓',
'源','冀','勒','成','笑','远','弘','龙','仁','蕾','棠','凡','江','魁','伊','德','方','城','铿','顺','月','飞','萍','皓','朴',
'悦','学','骄','楠','啸','绪','强','鲛','妮','勰','跃','霖','劼','宁','兵','越','芬','杰','弩','淳','起','丰','洁','攀','心',
'云','风','柴','旁','昕','会','沣','婕','薇','欣','良','泊','同','沛','新','芸','川','悍','佩','依','颇','封','金','松','鸿',
'耘','峰','岩','日','竦','韵','勋','辰','朋','沂','坤','骥','晴','岚','怡','泽','锋','津','荣','信','增','澔','锦','容','立',
'波','乔','瑾','鹏','宜','登','凤','进','铖','达','承','豪','晋','榕','华','展','福','菁','韦','以','章','俯','彤','融','来',
'彰','恬','景','力','亿','涛','辅','炎','茹','义','梁','迅','璟','儒','瀚','浦','富','禅','采','艺','基','澉','颔','襦','星',
'钊','刚','庆','锐','议','昭','博','珑','斌','亦','照','纲','敬','瑞','佚','哲','合','靖','澎','励','喆','佳','驹','睿','易',
'绮','钢','聚','垒','奕','真','苓','万','尧','益','臻','阔','颜','若','淇','焘','聪','涓','飒','骅','沧','罡','娟','弛','朗',
'帝','高','军','森','兴','缜','歌','钧','砂','大','畅','弓','筠','山','谊','亮','功','丞','河','逸','稹','巩','全','善','意',
'舱','固','俊','超','溢','振','钦','隆','频','毅','朕','冠','翰','候','利','谦','部','彦','为','茵','震','谱','韩','劭','英',
'理','廷','昌','绍','琪','滔','家','骏','社','雄','镇','凌','珺','升','崇','征','光','竣','生','鹰','正','广','凯','圣','迎',
'诤','晷','铠','驰','寒','政','贵','康','胜','桦','琛','国','泉','晟','盈','殿','海','科','礼','代','之','卿','诚','耀','滢',
'吉','鑫','谚','亨','瀛','舜','延','可','维','逸'
]]


setName=['吴','点苍','燕羽','炎月','大','短','流星','七星','方','长','丈八','截头','铁','铜','钢','古','破','双','日月','龙','蘸金','开山','丈多点','八十几斤']
setType=[['钩','剑','刀','斧','钺','叉','鞭','矛','戟','笔','锤','棒'],['甲','衣'],['盔','帽','巾']]




map=god.creatMap('地球')

xiaoming = god.creatUr()

weapon1 = xiaoming.creatEq(0)
xiaoming.eqItemInPackage(0)

defset1 = xiaoming.creatEq(1)
xiaoming.eqItemInPackage(0)

headset1 = xiaoming.creatEq(2)
xiaoming.eqItemInPackage(0)

monster1 = god.creatMst()
defset2 = monster1.creatEq(1)

xiaoming.findMst(monster1)
defset3 = monster1.creatEq(1)
xiaoming.fight(monster1)
xiaoming.fight(monster1)

monster2 = god.creatMst()
xiaoming.findMst(monster2)
xiaoming.fight(monster2)

monster3 = god.creatMst()
defset4 = monster3.creatEq(1)
xiaoming.findMst(monster3)
xiaoming.fight(monster3)
defset5 = monster3.creatEq(1)
defset6 = monster3.creatEq(1)
xiaoming.findMst(monster3)
xiaoming.fight(monster3)
xiaoming.fight(monster3)

xiaoming.eqItemInPackage(0)
xiaoming.uneqItem(1)
xiaoming.eqItemInPackage(0)

xiaoming.displayUSER()
xiaoming







