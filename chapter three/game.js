
class Sprite {
    constructor(name) {
        this.name = name;
		this.coins = 0;
		this.latest=0 //0,初始 1，同合作 2独胜 -2 独负 -1同负
	}
}

class rep extends Sprite {
	constructor(name) {
        super(name); // 记得用super调用父类的构造方法!
        this.deal = 1
    }
    mkdeal(){
    	if (this.latest==0){
    		this.deal = 1
    	}else if(this.latest==-1){
    		this.deal = -1
    	}else if(this.latest==1){
    		this.deal = 1
    	}else if(this.latest==2){
    		this.deal = 1
    	}else if(this.latest==-2){
    		this.deal = -1
    	}
    	console.log(this.name ,'上次结果',this.latest,'本次决定',this.deal)
    }
}

class maybeRep extends Sprite {
	constructor(name,fail) {
        super(name); // 记得用super调用父类的构造方法!
        this.deal = 1
        this.fail = fail
    }
    mkdeal(){
    	this.random=Math.random()
    	if (this.random>=this.fail){
	    	if (this.latest==0){
	    		this.deal = 1
	    	}else if(this.latest==-1){
	    		this.deal = -1
	    	}else if(this.latest==1){
	    		this.deal = 1
	    	}else if(this.latest==2){
	    		this.deal = 1
	    	}else if(this.latest==-2){
	    		this.deal = -1
	    	}	
    	}else{
    		console.log(this.random,'Make a mistake')
    		if (this.latest==0){
	    		this.deal = -1
	    	}else if(this.latest==-1){
	    		this.deal = 1
	    	}else if(this.latest==1){
	    		this.deal = -1
	    	}else if(this.latest==2){
	    		this.deal = -1
	    	}else if(this.latest==-2){
	    		this.deal = 1
	    	}
    	}
    	console.log(this.name ,'上次结果',this.latest,'本次决定',this.deal)
    }
}

class ref extends Sprite {
	constructor(name) {
        super(name); // 记得用super调用父类的构造方法!
        this.deal = -1
    }
    mkdeal(){
    	if (this.latest==0){
    		this.deal = -1
    	}else if(this.latest==-1){
    		this.deal = -1
    	}else if(this.latest==1){
    		this.deal = -1
    	}else if(this.latest==2){
    		this.deal = -1
    	}else if(this.latest==-2){
    		this.deal = -1
    	}
    	console.log(this.name,'上次结果',this.latest,'本次决定',this.deal)
    }
}

class red extends Sprite {
	constructor(name) {
        super(name); // 记得用super调用父类的构造方法!
    }
    mkdeal(){
    	if (this.latest==0){
    		this.deal = 1
    	}else if(this.latest==-1){
    		this.deal = 1
    	}else if(this.latest==1){
    		this.deal = 1
    	}else if(this.latest==2){
    		this.deal = 1
    	}else if(this.latest==-2){
    		this.deal = 1
    	}

    	console.log(this.name,'上次结果',this.latest,'本次决定',this.deal)
    }
}

class black extends Sprite {
	constructor(name) {
        super(name); // 记得用super调用父类的构造方法!
        this.motion = 0
    }
    mkdeal(){
    	if(this.motion==0){    		
    		if(this.latest == -1 ){
	    		this.deal = -1
	    		this.motion==-1
		    	}else if(this.latest == -2 ){
		    		this.deal = -1
		    		this.motion==-1
		    	}else{
		    		this.deal = 1
		    	}
    		
    	}else if(this.motion==-1){
    		this.deal = -1
		    }   

    	console.log(this.name,'上次结果',this.latest,'本次决定',this.deal) 	
    }
}

class ljh extends Sprite {
	constructor(name) {
        super(name); // 记得用super调用父类的构造方法!
        this.time = 0
        this.motiontrylist = [1,-1,1,1]
        this.motion=0
    }
    mkdeal(){    	
    	if (this.time<=this.motiontrylist.length-1){
    		this.deal = this.motiontrylist[this.time]
    		if (this.latest<=-1){
    			this.motion=1
    		}else{
    			this.motion=0
    		}
    	}else{
    		if (this.motion==1){
    			if (this.latest==-1){
    				this.deal = -1
		    	}else if(this.latest==1){
		    		this.deal = 1
		    	}else if(this.latest==2){
		    		this.deal = 1
		    	}else if(this.latest==-2){
		    		this.deal = -1
		    	}
    		}else if(this.motion==0){
    			if (this.latest==1){
    				this.deal = -1
		    	}else if(this.latest==-1){
		    		this.motion =1
		    		this.deal = -1
		    	}else if(this.latest==-2){
		    		this.motion =1
		    		this.deal = 1
		    	}else if(this.latest==2){
		    		this.deal = -1
		    	}
    		}
    	}
    	this.time += 1
    	console.log(this.name,'上次结果',this.latest,'本次决定',this.deal)
    }
}


function game(x,y){
		x.mkdeal()
		//console.log(x.deal)
		y.mkdeal()
		//console.log(y.deal)
		if (x.deal==1 & y.deal==-1){
			x.coins += -1
			y.coins += 3
			x.latest = 2
			y.latest =-2
			console.log(x.coins,y.coins)
		}else if(x.deal==-1 & y.deal==1){
			x.coins += 3
			y.coins += -1
			x.latest = 2
			y.latest =-2
			console.log(x.coins,y.coins)
		}else if(x.deal==1 & y.deal==1){
			x.coins += 2
			y.coins += 2
			x.latest = 1
			y.latest = 1
			console.log(x.coins,y.coins)
		}else if(x.deal==-1 & y.deal==-1){
			x.coins += 0
			y.coins += 0
			x.latest =-1
			y.latest =-1
			console.log(x.coins,y.coins)
		}else{

		}
	}

function gametest(k,p,n){
	for (var i = n - 1; i >= 0; i--) {
		game(k,p)
	}
}


//  CASE 
var x =new rep('你说我做不会错')
var y =new ref('永远不合作')
var z =new red('小红帽爱狼外婆')
var b =new black('你不要黑我')
var l =new ljh('老江湖')
var m =new maybeRep('错误宝宝',0.05)

gametest(m,x,10)
gametest(l,x,10)

console.log(x.coins,y.coins,z.coins,b.coins,l.coins,m.coins)
// Example above


