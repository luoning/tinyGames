[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/luoning/tinyGames/blob/master/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)]()

**Base on ES6**

### How to Play

**Run with**

```javascript
node Rclass.js
```

**That's all!**

### What will happen?? 

```javascript

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

```
