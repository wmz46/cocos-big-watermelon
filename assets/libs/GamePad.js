(function () {
    //当前手柄序号
    var gamepadIndex = 0;
    var buttonFlags = [];
    var arrowFlags = []; //↑↗→↘↓↙←↖ 01234567 顺时针
    var keyMap = ['A', 'B', 'X', 'Y', 'L', 'R', 'ZL', 'ZR', '-', '+', null, null, '↑','↓','←','→', 'Home'];
    var arrowMap = ['up', 'leftup', 'left', 'leftdown', 'down', 'rightdown', 'right', 'rightup'];
    var arrowKeyMap  = ['↑','↗','→','↘','↓','↙','←','↖']
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
                for (var i = 0; i < 8; i++) {
                    if (i == 0) {
                        arrowFlags[i] = true;
                    } else {
                        if (arrowFlags[i]) {
                            //松开
                            arrowFlags[i] = false;
                            var ev = new CustomEvent('gamepadAxisEndEvent', {
                                detail: {
                                    arrow: arrowMap[i],
                                    key:arrowKeyMap[i],
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
                for (var i = 0; i < 8; i++) {
                    if (i == 1) {
                        arrowFlags[i] = true;
                    } else {
                        if (arrowFlags[i]) {
                            //松开
                            arrowFlags[i] = false;
                            var ev = new CustomEvent('gamepadAxisEndEvent', {
                                detail: {
                                    arrow: arrowMap[i],
                                    key:arrowKeyMap[i],
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
                for (var i = 0; i < 8; i++) {
                    if (i == 2) {
                        arrowFlags[i] = true;
                    } else {
                        if (arrowFlags[i]) {
                            //松开
                            arrowFlags[i] = false;
                            var ev = new CustomEvent('gamepadAxisEndEvent', {
                                detail: {
                                    arrow: arrowMap[i],
                                    key:arrowKeyMap[i],
                                }
                            });
                            window.dispatchEvent(ev);
                        }
                    }
                }
                var ev = new CustomEvent('gamepadAxisEvent', {
                    detail: {
                        arrow: 'right',
                        key:'→'
                    }
                });
                window.dispatchEvent(ev);
            } else if (arrow < 0) {
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
                for (var i = 0; i < 8; i++) {
                    if (i == 4) {
                        arrowFlags[i] = true;
                    } else {
                        if (arrowFlags[i]) {
                            //松开
                            arrowFlags[i] = false;
                            var ev = new CustomEvent('gamepadAxisEndEvent', {
                                detail: {
                                    arrow: arrowMap[i],
                                    key:arrowKeyMap[i],
                                }
                            });
                            window.dispatchEvent(ev);
                        }
                    }
                }
                var ev = new CustomEvent('gamepadAxisEvent', {
                    detail: {
                        arrow: 'down',
                        key:'↓'
                    }
                });
                window.dispatchEvent(ev);
            } else if (arrow < 4 / 7) {
                for (var i = 0; i < 8; i++) {
                    if (i == 5) {
                        arrowFlags[i] = true;
                    } else {
                        if (arrowFlags[i]) {
                            //松开
                            arrowFlags[i] = false;
                            var ev = new CustomEvent('gamepadAxisEndEvent', {
                                detail: {
                                    arrow: arrowMap[i],
                                    key:arrowKeyMap[i],
                                }
                            });
                            window.dispatchEvent(ev);
                        }
                    }
                }
                var ev = new CustomEvent('gamepadAxisEvent', {
                    detail: {
                        arrow: 'leftdown',
                        key:'↙'
                    }
                });
                window.dispatchEvent(ev);
            } else if (arrow < 6 / 7) {
                for (var i = 0; i < 8; i++) {
                    if (i == 6) {
                        arrowFlags[i] = true;
                    } else {
                        if (arrowFlags[i]) {
                            //松开
                            arrowFlags[i] = false;
                            var ev = new CustomEvent('gamepadAxisEndEvent', {
                                detail: {
                                    arrow: arrowMap[i],
                                    key:arrowKeyMap[i],
                                }
                            });
                            window.dispatchEvent(ev);
                        }
                    }
                }
                var ev = new CustomEvent('gamepadAxisEvent', {
                    detail: {
                        arrow: 'left',
                        key:'←'
                    }
                });
                window.dispatchEvent(ev);
            } else if (arrow == 1) {
                for (var i = 0; i < 8; i++) {
                    if (i == 7) {
                        arrowFlags[i] = true;
                    } else {
                        if (arrowFlags[i]) {
                            //松开
                            arrowFlags[i] = false;
                            var ev = new CustomEvent('gamepadAxisEndEvent', {
                                detail: {
                                    arrow: arrowMap[i],
                                    key:arrowKeyMap[i],
                                }
                            });
                            window.dispatchEvent(ev);
                        }
                    }
                }
                var ev = new CustomEvent('gamepadAxisEvent', {
                    detail: {
                        arrow: 'leftup',
                        key:'↖'
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
                                arrow: arrowMap[i],
                                key:arrowKeyMap[i],
                            }
                        });
                        window.dispatchEvent(ev);
                    }
                }
            }
            //摇杆无需判断按一次还是多次
            if (gp.axes[0] > .5) {
                arrowFlags[2] = true;
                if (arrowFlags[6]) {
                    //松开
                    arrowFlags[6] = false;
                    var ev = new CustomEvent('gamepadAxisEndEvent', {
                        detail: {
                            arrow: arrowMap[6],
                            key:arrowKeyMap[6],
                        }
                    });
                    window.dispatchEvent(ev);
                }
                var keyDownEvent = new CustomEvent('gamepadAxisEvent', {
                    detail: {
                        arrow: 'right',
                        key:'→'
                    }
                });
                window.dispatchEvent(keyDownEvent);
            } else if (gp.axes[0] < -.5) {
                arrowFlags[6] = true;
                if (arrowFlags[2]) {
                    //松开
                    arrowFlags[2] = false;
                    var ev = new CustomEvent('gamepadAxisEndEvent', {
                        detail: {
                            arrow: arrowMap[2],
                            key:arrowKeyMap[2],
                        }
                    });
                    window.dispatchEvent(ev);
                }
                var ev = new CustomEvent('gamepadAxisEvent', {
                    detail: {
                        arrow: 'left',
                        key:'←'
                    }
                });
                window.dispatchEvent(ev);
            } else {
                if (arrowFlags[2]) {
                    //松开
                    arrowFlags[2] = false;
                    var ev = new CustomEvent('gamepadAxisEndEvent', {
                        detail: {
                            arrow: arrowMap[2],
                            key:arrowKeyMap[2],
                        }
                    });
                    window.dispatchEvent(ev);
                }
                if (arrowFlags[6]) {
                    //松开
                    arrowFlags[6] = false;
                    var ev = new CustomEvent('gamepadAxisEndEvent', {
                        detail: {
                            arrow: arrowMap[6],
                            key:arrowKeyMap[6],
                        }
                    });
                    window.dispatchEvent(ev);
                }
            }
            if (gp.axes[1] > .5) {
                arrowFlags[4] = true;
                if (arrowFlags[0]) {
                    //松开
                    arrowFlags[0] = false;
                    var ev = new CustomEvent('gamepadAxisEndEvent', {
                        detail: {
                            arrow: arrowMap[0],
                            key:arrowKeyMap[0],
                        }
                    });
                    window.dispatchEvent(ev);
                }
                var ev = new CustomEvent('gamepadAxisEvent', {
                    detail: {
                        arrow: 'down',
                        key:'↓'
                    }
                });
                window.dispatchEvent(ev);
            } else if (gp.axes[1] < -.5) {
                arrowFlags[0] = true;
                if (arrowFlags[4]) {
                    //松开
                    arrowFlags[4] = false;
                    var ev = new CustomEvent('gamepadAxisEndEvent', {
                        detail: {
                            arrow: arrowMap[4],
                            key:arrowKeyMap[4],
                        }
                    });
                    window.dispatchEvent(ev);
                }
                var ev = new CustomEvent('gamepadAxisEvent', {
                    detail: {
                        arrow: 'up',
                        key:'↑'
                    }
                });
                window.dispatchEvent(ev);
            } else {
                if (arrowFlags[0]) {
                    //松开
                    arrowFlags[0] = false;
                    var ev = new CustomEvent('gamepadAxisEndEvent', {
                        detail: {
                            arrow: arrowMap[0],
                            key:arrowKeyMap[0],
                        }
                    });
                    window.dispatchEvent(ev);
                }
                if (arrowFlags[4]) {
                    //松开
                    arrowFlags[4] = false;
                    var ev = new CustomEvent('gamepadAxisEndEvent', {
                        detail: {
                            arrow: arrowMap[4],
                            key:arrowKeyMap[4],
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