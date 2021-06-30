(function () {
    //当前手柄序号
    var gamepadIndex = 0;
    var buttonFlags = [];
    var arrowFlags = []; //↑↗→↘↓↙←↖ 01234567 顺时针
    var keyMap = ['A', 'B', null, 'X', 'Y', null, 'L', 'R', 'ZL', 'ZR', '-', '+', null, null, null, 'Home'];
    var arrowMap = ['up', 'leftup', 'left', 'leftdown', 'down', 'rightdown', 'right', 'rightup'];
    window.addEventListener("gamepadconnected", function (e) {
        var gp = navigator.getGamepads()[e.gamepad.index];
        console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
            gp.index, gp.id,
            gp.buttons.length, gp.axes.length);
        gamepadIndex = e.gamepad.index;
        //循环监听
        loopMonitor();
    });

    function loopMonitor() {
        //必须每次都获取
        var gp = navigator.getGamepads()[gamepadIndex];
        if (gp) {
            for (var i = 0; i < gp.buttons.length; i++) {
                if (gp.buttons[i].value > 0) {
                    console.info(i)
                    if (!buttonFlags[i]) {
                        buttonFlags[i] = true;
                    }
                    //按下
                    var ev = new CustomEvent('gamepadKeyDownEvent', {
                        detail: {
                            num: i,
                            key: keyMap[i]
                        }
                    });
                    window.dispatchEvent(ev);
                } else {
                    if (buttonFlags[i]) {
                        //松开
                        var ev = new CustomEvent('gamepadKeyUpEvent', {
                            detail: {
                                num: i,
                                key: keyMap[i]
                            }
                        });
                        window.dispatchEvent(ev);
                        buttonFlags[i] = false;
                    }
                }
            }
            //摇杆最后一个是十字方向键
            var arrow = gp.axes[gp.axes.length - 1];
            if (arrow == -1) {
                console.info("↑");
                for (var i = 0; i < 8; i++) {
                    if (i == 0) {
                        arrowFlags[i] = true;
                    } else {
                        if (arrowFlags[i]) {
                            //松开
                            arrowFlags[i] = false;
                            var ev = new CustomEvent('gamepadAxisEndEvent', {
                                detail: {
                                    arrow: arrowMap[i]
                                }
                            });
                            window.dispatchEvent(ev);
                        }
                    }
                    arrowFlags[i] = (i == 0);
                }
                var ev = new CustomEvent('gamepadAxisEvent', {
                    detail: {
                        arrow: 'up'
                    }
                });
                window.dispatchEvent(ev);
            } else if (arrow < -4 / 7) {
                console.info("↗");
                for (var i = 0; i < 8; i++) {
                    if (i == 1) {
                        arrowFlags[i] = true;
                    } else {
                        if (arrowFlags[i]) {
                            //松开
                            arrowFlags[i] = false;
                            var ev = new CustomEvent('gamepadAxisEndEvent', {
                                detail: {
                                    arrow: arrowMap[i]
                                }
                            });
                            window.dispatchEvent(ev);
                        }
                    }
                }
                var ev = new CustomEvent('gamepadAxisEvent', {
                    detail: {
                        arrow: 'rightup'
                    }
                });
                window.dispatchEvent(ev);
            } else if (arrow < -2 / 7) {
                console.info("→")
                for (var i = 0; i < 8; i++) {
                    if (i == 2) {
                        arrowFlags[i] = true;
                    } else {
                        if (arrowFlags[i]) {
                            //松开
                            arrowFlags[i] = false;
                            var ev = new CustomEvent('gamepadAxisEndEvent', {
                                detail: {
                                    arrow: arrowMap[i]
                                }
                            });
                            window.dispatchEvent(ev);
                        }
                    }
                }
                var ev = new CustomEvent('gamepadAxisEvent', {
                    detail: {
                        arrow: 'right'
                    }
                });
                window.dispatchEvent(ev);
            } else if (arrow < 0) {
                console.info("↘")
                for (var i = 0; i < 8; i++) {
                    if (i == 3) {
                        arrowFlags[i] = true;
                    } else {
                        if (arrowFlags[i]) {
                            //松开
                            arrowFlags[i] = false;
                            var ev = new CustomEvent('gamepadAxisEndEvent', {
                                detail: {
                                    arrow: arrowMap[i]
                                }
                            });
                            window.dispatchEvent(ev);
                        }
                    }
                }
                var ev = new CustomEvent('gamepadAxisEvent', {
                    detail: {
                        arrow: 'rightdown'
                    }
                });
                window.dispatchEvent(ev);
            } else if (arrow < 2 / 7) {
                console.info("↓");
                for (var i = 0; i < 8; i++) {
                    if (i == 4) {
                        arrowFlags[i] = true;
                    } else {
                        if (arrowFlags[i]) {
                            //松开
                            arrowFlags[i] = false;
                            var ev = new CustomEvent('gamepadAxisEndEvent', {
                                detail: {
                                    arrow: arrowMap[i]
                                }
                            });
                            window.dispatchEvent(ev);
                        }
                    }
                }
                var ev = new CustomEvent('gamepadAxisEvent', {
                    detail: {
                        arrow: 'down'
                    }
                });
                window.dispatchEvent(ev);
            } else if (arrow < 4 / 7) {
                console.info("↙");
                for (var i = 0; i < 8; i++) {
                    if (i == 5) {
                        arrowFlags[i] = true;
                    } else {
                        if (arrowFlags[i]) {
                            //松开
                            arrowFlags[i] = false;
                            var ev = new CustomEvent('gamepadAxisEndEvent', {
                                detail: {
                                    arrow: arrowMap[i]
                                }
                            });
                            window.dispatchEvent(ev);
                        }
                    }
                }
                var ev = new CustomEvent('gamepadAxisEvent', {
                    detail: {
                        arrow: 'leftdown'
                    }
                });
                window.dispatchEvent(ev);
            } else if (arrow < 6 / 7) {
                console.info('←');
                for (var i = 0; i < 8; i++) {
                    if (i == 6) {
                        arrowFlags[i] = true;
                    } else {
                        if (arrowFlags[i]) {
                            //松开
                            arrowFlags[i] = false;
                            var ev = new CustomEvent('gamepadAxisEndEvent', {
                                detail: {
                                    arrow: arrowMap[i]
                                }
                            });
                            window.dispatchEvent(ev);
                        }
                    }
                }
                var ev = new CustomEvent('gamepadAxisEvent', {
                    detail: {
                        arrow: 'left'
                    }
                });
                window.dispatchEvent(ev);
            } else if (arrow == 1) {
                console.info('↖');
                for (var i = 0; i < 8; i++) {
                    if (i == 7) {
                        arrowFlags[i] = true;
                    } else {
                        if (arrowFlags[i]) {
                            //松开
                            arrowFlags[i] = false;
                            var ev = new CustomEvent('gamepadAxisEndEvent', {
                                detail: {
                                    arrow: arrowMap[i]
                                }
                            });
                            window.dispatchEvent(ev);
                        }
                    }
                }
                var ev = new CustomEvent('gamepadAxisEvent', {
                    detail: {
                        arrow: 'leftup'
                    }
                });
                window.dispatchEvent(ev);
            } else {
                //松开
                for (var i = 0; i < 8; i++) {
                    if (arrowFlags[i]) {
                        //松开
                        arrowFlags[i] = false;
                        var ev = new CustomEvent('gamepadAxisEndEvent', {
                            detail: {
                                arrow: arrowMap[i]
                            }
                        });
                        window.dispatchEvent(ev);
                    }
                }
            }
            //摇杆无需判断按一次还是多次
            if (gp.axes[0] > .5) {
                console.info('→');
                arrowFlags[2] = true;
                if (arrowFlags[6]) {
                    //松开
                    arrowFlags[6] = false;
                    var ev = new CustomEvent('gamepadAxisEndEvent', {
                        detail: {
                            arrow: arrowMap[6]
                        }
                    });
                    window.dispatchEvent(ev);
                }
                var keyDownEvent = new CustomEvent('gamepadAxisEvent', {
                    detail: {
                        arrow: 'right'
                    }
                });
                window.dispatchEvent(keyDownEvent);
            } else if (gp.axes[0] < -.5) {
                console.info('←');
                arrowFlags[6] = true;
                if (arrowFlags[2]) {
                    //松开
                    arrowFlags[2] = false;
                    var ev = new CustomEvent('gamepadAxisEndEvent', {
                        detail: {
                            arrow: arrowMap[2]
                        }
                    });
                    window.dispatchEvent(ev);
                }
                var ev = new CustomEvent('gamepadAxisEvent', {
                    detail: {
                        arrow: 'left'
                    }
                });
                window.dispatchEvent(ev);
            } else {
                if (arrowFlags[2]) {
                    //松开
                    arrowFlags[2] = false;
                    var ev = new CustomEvent('gamepadAxisEndEvent', {
                        detail: {
                            arrow: arrowMap[2]
                        }
                    });
                    window.dispatchEvent(ev);
                }
                if (arrowFlags[6]) {
                    //松开
                    arrowFlags[6] = false;
                    var ev = new CustomEvent('gamepadAxisEndEvent', {
                        detail: {
                            arrow: arrowMap[6]
                        }
                    });
                    window.dispatchEvent(ev);
                }
            }
            if (gp.axes[1] > .5) {
                console.info('↓');
                arrowFlags[4] = true;
                if (arrowFlags[0]) {
                    //松开
                    arrowFlags[0] = false;
                    var ev = new CustomEvent('gamepadAxisEndEvent', {
                        detail: {
                            arrow: arrowMap[0]
                        }
                    });
                    window.dispatchEvent(ev);
                }
                var ev = new CustomEvent('gamepadAxisEvent', {
                    detail: {
                        arrow: 'down'
                    }
                });
                window.dispatchEvent(ev);
            } else if (gp.axes[1] < -.5) {
                console.info('↑');
                arrowFlags[0] = true;
                if (arrowFlags[4]) {
                    //松开
                    arrowFlags[4] = false;
                    var ev = new CustomEvent('gamepadAxisEndEvent', {
                        detail: {
                            arrow: arrowMap[4]
                        }
                    });
                    window.dispatchEvent(ev);
                }
                var ev = new CustomEvent('gamepadAxisEvent', {
                    detail: {
                        arrow: 'up'
                    }
                });
                window.dispatchEvent(ev);
            } else {
                if (arrowFlags[0]) {
                    //松开
                    arrowFlags[0] = false;
                    var ev = new CustomEvent('gamepadAxisEndEvent', {
                        detail: {
                            arrow: arrowMap[0]
                        }
                    });
                    window.dispatchEvent(ev);
                }
                if (arrowFlags[4]) {
                    //松开
                    arrowFlags[4] = false;
                    var ev = new CustomEvent('gamepadAxisEndEvent', {
                        detail: {
                            arrow: arrowMap[4]
                        }
                    });
                    window.dispatchEvent(ev);
                }
            }
            //33毫秒检测一次
            setTimeout(function () {
                loopMonitor();
            }, 33);
        }
    }
})();

const Fruit = cc.Class({
    name: 'FruitItem',
    properties: {
        id: 0,
        iconSF: cc.SpriteFrame
    }
});

const JuiceItem = cc.Class({
    name: 'JuiceItem',
    properties: {
        particle: cc.SpriteFrame,
        circle: cc.SpriteFrame,
        slash: cc.SpriteFrame,
    }
});

cc.Class({
    extends: cc.Component,

    properties: {
        fruits: {
            default: [],
            type: Fruit
        },

        juices: {
            default: [],
            type: JuiceItem
        },

        // 动态生成 找到批量处理预置元素的方案
        fruitPrefab: {
            default: null,
            type: cc.Prefab
        },

        juicePrefab: {
            default: null,
            type: cc.Prefab
        },

        // todo 可以实现一个audioManager
        boomAudio: {
            default: null,
            type: cc.AudioClip
        },
        knockAudio: {
            default: null,
            type: cc.AudioClip
        },
        waterAudio: {
            default: null,
            type: cc.AudioClip
        },
        scoreLabel: {
            default: null,
            type: cc.Label
        },
        fingerBtn: {
            default: null,
            type: cc.Button
        }
    },

    onLoad() {
        this.initPhysics()

        this.isCreating = false
        this.fruitCount = 0
        this.score = 0
        this.useFinger = false

        // 监听点击事件 todo 是否能够注册全局事件
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)

        //注册键盘事件
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.initOneFruit()

    },
    start() {
        this.fingerBtn.node.on(cc.Node.EventType.TOUCH_START, this.onFingerTouch, this)
    },

    // 开启物理引擎和碰撞检测
    initPhysics() {
        // 物理引擎
        const instance = cc.director.getPhysicsManager()
        instance.enabled = true
        // instance.debugDrawFlags = 4
        instance.gravity = cc.v2(0, -960);

        // 碰撞检测
        const collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true

        // 设置四周的碰撞区域
        let width = this.node.width;
        let height = this.node.height;

        let node = new cc.Node();

        let body = node.addComponent(cc.RigidBody);
        body.type = cc.RigidBodyType.Static;

        const _addBound = (node, x, y, width, height) => {
            let collider = node.addComponent(cc.PhysicsBoxCollider);
            collider.offset.x = x;
            collider.offset.y = y;
            collider.size.width = width;
            collider.size.height = height;
        }

        _addBound(node, 0, -height / 2, width, 1);
        _addBound(node, 0, height / 2, width, 1);
        _addBound(node, -width / 2, 0, 1, height);
        _addBound(node, width / 2, 0, 1, height);

        node.parent = this.node;
    },

    initOneFruit(id = 1) {
        this.fruitCount++
        this.currentFruit = this.createFruitOnPos(0, 400, id)
    },
    onKeyDown(event) {
        const distance = 10
        const fruit = this.currentFruit
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                var action =cc.moveBy(0.3, cc.v2(-distance, 0)).easing(cc.easeCubicActionIn());
                fruit.runAction(action)
                break;
            case cc.macro.KEY.right:
                var action = cc.moveBy(0.3, cc.v2(distance, 0)).easing(cc.easeCubicActionIn());
                fruit.runAction(action)
                break;
            case cc.macro.KEY.space:
                if (this.isCreating) return
                this.isCreating = true
                var action = cc.callFunc(() => {
                    // 开启物理效果
                    this.startFruitPhysics(fruit)

                    // 1s后重新生成一个
                    this.scheduleOnce(() => {
                        const nextId = this.getNextFruitId()
                        this.initOneFruit(nextId)
                        this.isCreating = false
                    }, 1)
                })
                fruit.runAction(action)
                break;
        }
    },
    // 监听屏幕点击
    onTouchStart(e) {
        if (this.isCreating) return
        this.isCreating = true
        const {width, height} = this.node


        const fruit = this.currentFruit

        const pos = e.getLocation()
        let {x, y} = pos
        x = x - width / 2
        y = y - height / 2

        const action = cc.sequence(cc.moveBy(0.3, cc.v2(x, 0)).easing(cc.easeCubicActionIn()), cc.callFunc(() => {
            // 开启物理效果
            this.startFruitPhysics(fruit)

            // 1s后重新生成一个
            this.scheduleOnce(() => {
                const nextId = this.getNextFruitId()
                this.initOneFruit(nextId)
                this.isCreating = false
            }, 1)
        }))

        fruit.runAction(action)
    },
    onFingerTouch() {
        console.log('onFingerTouch')
        this.useFinger = true
    },
    // 获取下一个水果的id
    getNextFruitId() {
        if (this.fruitCount < 3) {
            return 1
        } else if (this.fruitCount === 3) {
            return 2
        } else {
            // 随机返回前5个
            return Math.floor(Math.random() * 5) + 1
        }
    },
    // 创建一个水果
    createOneFruit(num) {
        let fruit = cc.instantiate(this.fruitPrefab);
        const config = this.fruits[num - 1]

        fruit.getComponent('Fruit').init({
            id: config.id,
            iconSF: config.iconSF
        });

        fruit.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static
        fruit.getComponent(cc.PhysicsCircleCollider).radius = 0

        this.node.addChild(fruit);
        fruit.scale = 0.6

        // 有Fruit组件传入
        fruit.on('sameContact', this.onSameFruitContact.bind(this))
        fruit.on(cc.Node.EventType.TOUCH_START, (e) => {
            // 选择道具时直接消除对应水果
            if (this.useFinger && fruit !== this.currentFruit) {
                const {x, y, width} = fruit
                this.createFruitJuice(config.id, cc.v2({x, y}), width)
                e.stopPropagation()
                this.useFinger = false
                fruit.removeFromParent(true)

            }
        })

        return fruit
    },

    startFruitPhysics(fruit) {
        fruit.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic
        const physicsCircleCollider = fruit.getComponent(cc.PhysicsCircleCollider)
        physicsCircleCollider.radius = fruit.height / 2
        physicsCircleCollider.apply()
    },

    // 在指定位置生成水果
    createFruitOnPos(x, y, type = 1) {
        const fruit = this.createOneFruit(type)
        fruit.setPosition(cc.v2(x, y));
        return fruit
    },
    // 两个水果碰撞
    onSameFruitContact({self, other}) {
        other.node.off('sameContact') // 两个node都会触发，todo 看看有没有其他方法只展示一次的

        const id = other.getComponent('Fruit').id
        // todo 可以使用对象池回收
        self.node.removeFromParent(true)
        other.node.removeFromParent(true)

        const {x, y} = other.node

        this.createFruitJuice(id, cc.v2({x, y}), other.node.width)

        this.addScore(id)

        const nextId = id + 1
        if (nextId <= 11) {
            const newFruit = this.createFruitOnPos(x, y, nextId)

            this.startFruitPhysics(newFruit)

            // 展示动画 todo 动画效果需要调整
            newFruit.scale = 0
            cc.tween(newFruit).to(.5, {
                scale: 0.6
            }, {
                easing: "backOut"
            }).start()
        } else {
            // todo 合成两个西瓜
            console.log(' todo 合成两个西瓜 还没有实现哦~ ')
        }
    },

    // 合并时的动画效果
    createFruitJuice(id, pos, n) {
        // 播放合并的声音
        cc.audioEngine.play(this.boomAudio, false, 1);
        cc.audioEngine.play(this.waterAudio, false, 1);

        // 展示动画
        let juice = cc.instantiate(this.juicePrefab);
        this.node.addChild(juice);

        const config = this.juices[id - 1]
        const instance = juice.getComponent('Juice')
        instance.init(config)
        instance.showJuice(pos, n)
    },
    // 添加得分分数
    addScore(fruitId) {
        this.score += fruitId * 2
        // todo 处理分数tween动画
        this.scoreLabel.string = this.score
    }
});