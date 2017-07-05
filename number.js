
!function () {
    function func(val, bl) {
        var xiao = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
            da = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'],
            danwei = ['', '十', '百', '千', '万', '', '', '', '亿'],
            danwei1 = ['', '拾', '佰', '仟', '萬', '', '', '', '亿'],
            val1 = [],
            val2 = [],
            end = 0;

        if (typeof val === 'number') {
            val = val + '';
            end = '';
            danwei.splice(0, 1);
            danwei1.splice(0, 1);
            if (bl) {
                for (var i = 0; i < val.length; i++) {
                    if ((val.length - i - 2) % 4 >= 0) {
                        end += (da[val[i]] + danwei1[(val.length - i - 2) % 4]);
                    } else {
                        end += da[val[i]]
                    }
                }
            } else {
                for (var i = 0; i < val.length; i++) {
                    if ((val.length - i - 2) % 4 >= 0) {
                        end += (xiao[val[i]] + danwei[(val.length - i - 2) % 4]);
                    } else {
                        end += xiao[val[i]]
                    }
                }
            }
            if ((end[0] === '一' || end[0] === '壹') && (end[1] === '十' || end[1] === '拾')) {
                end = end.slice(1)
            }
            if (end[end.length - 1] === '〇' || end[end.length - 1] === '零') {
                end = end.slice(0, -1);
            }
            if (val.length > 12) {
                if (bl) {
                    end = end.replace('萬', '亿');
                    end = end.replace('萬', '亿');
                    end = end.replace('亿', '萬');
                } else {
                    end = end.replace('万', '亿');
                    end = end.replace('万', '亿');
                    end = end.replace('亿', '万');
                }
            } else if (val.length > 8) {
                end = end.replace('万', '亿');
                end = end.replace('萬', '亿');
            }
            for (var i = 0; i < danwei.length; i++) {
                if (danwei[i] === '') {
                    danwei.splice(i, 1);
                    i--;
                }
            }
            for (var i = 0; i < danwei1.length; i++) {
                if (danwei1[i] === '') {
                    danwei1.splice(i, 1);
                    i--;
                }
            }
            for (var i = 0; i < end.length; i++) {
                if (!bl && end[i] === '〇') {
                    if (danwei.indexOf(end[i - 1]) < danwei.indexOf(end[i + 1])) {
                        end = end.slice(0, i) + end.slice(i + 1);
                    } else if (danwei.indexOf(end[i - 1]) > danwei.indexOf(end[i + 1])) {
                        end = end.slice(0, i) + end.slice(i + 2);
                        i--;
                    }
                } else if (end[i] === '零') {
                    if (danwei1.indexOf(end[i - 1]) < danwei1.indexOf(end[i + 1])) {
                        end = end.slice(0, i) + end.slice(i + 1);
                    } else if (danwei1.indexOf(end[i - 1]) > danwei1.indexOf(end[i + 1])) {
                        end = end.slice(0, i) + end.slice(i + 2);
                        i--;
                    }
                }
            }
            for (var i = 0; i < end.length; i++) {
                if (!bl && (danwei.indexOf(end[i - 1]) > (danwei.indexOf(end[i + 1]) + 1)) && danwei.indexOf(end[i + 1]) > -1) {
                    end = end.slice(0, i) + '〇' + end.slice(i);
                } else if ((danwei1.indexOf(end[i - 1]) > (danwei1.indexOf(end[i + 1]) + 1)) && danwei1.indexOf(end[i + 1]) > -1) {
                    end = end.slice(0, i) + '零' + end.slice(i);
                }
            }
            return end;
        } else {
            val = val.replace(/\s/g,'');
            function num(a) {
                val1 = [];
                val2 = [];
                end = 0;
                var por = '';
                if (a[0] === '十' || a[0] === '拾') {
                    a = '一' + a;
                } else if (a[0] === '负') {
                    a.slice(1);
                    por = '-';
                } 
                for (var i = 0; i < a.length; i++) {
                    if (xiao.indexOf(a[i]) > -1 && a[i] != '〇') {
                        val1.push(xiao.indexOf(a[i]))
                    } else if (da.indexOf(a[i]) > -1 && a[i] != '零') {
                        val1.push(da.indexOf(a[i]))
                    } else if (danwei.indexOf(a[i]) > -1) {
                        if (danwei.indexOf(a[i - 1]) > -1) {
                            val2[val2.length - 1] = (val2[val2.length - 1] * ('1' + function (ind) {
                                var z = '';
                                for (var ii = 0; ii < ind; ii++) {
                                    z += '0';
                                }
                                return z;
                            } (danwei.indexOf(a[i])) - 0))
                        } else {
                            val2.push('1' + function (ind) {
                                var z = ''
                                for (var ii = 0; ii < ind; ii++) {
                                    z += '0';
                                }
                                return z;
                            } (danwei.indexOf(a[i])) - 0)
                        }
                    } else if (danwei1.indexOf(a[i]) > -1) {
                        if (danwei1.indexOf(a[i - 1]) > -1) {
                            val2[val2.length - 1] = (val2[val2.length - 1] * ('1' + function (ind) {
                                var z = '';
                                for (var ii = 0; ii < ind; ii++) {
                                    z += '0';
                                }
                                return z;
                            } (danwei1.indexOf(a[i])) - 0))
                        } else {
                            val2.push('1' + function (ind) {
                                var z = ''
                                for (var ii = 0; ii < ind; ii++) {
                                    z += '0';
                                }
                                return z;
                            } (danwei1.indexOf(a[i])) - 0)
                        }
                    }

                }
                if (val2.length < val1.length) {
                    if (a[a.length - 2] != '零' && a[a.length - 2] != '〇') {
                        val2.push(val2[val2.length - 1] / 10);
                    } else {
                        val2.push(1);
                    }
                }
                for (var i = 0; i < val1.length; i++) {
                    if (val2[i] < val2[i - 1]) {
                        end += (val1[i] * val2[i])
                    } else {
                        end = (end + val1[i]) * val2[i]
                    }
                }
                return por + end;
            }
            var oper = {
                '+': '+',
                '加': '+',
                '-': '-',
                '减': '-',
                '*': '*',
                '乘': '*',
                '除以': '/',
                '除': '/',
                '/': '/',
                '(': '(',
                ')': ')',
                '{': '{',
                '}': '}',
                '[': '[',
                ']': ']',
                '>':'>',
                '<':'<',
                '%':'%',
                '乘以':'*',
                '大于':'>',
                '小于':'<',
                '等于':'=='
            },
                t = false;
            function operator(a) {
                t = false;
                if (typeof a === 'string' && (a.indexOf('除') > -1) && (a.indexOf('除以') === -1)) {
                    return operator(a.slice(a.indexOf('除') + 1)) + '/' + operator(a.slice(0, a.indexOf('除')));
                } else if (typeof a === 'string'){
                    for (var k in oper) {
                        var i = a.indexOf(k);
                            if (i > 0) {
                                if (i != 0 && i != a.length - 1) {
                                    return num(a.slice(0, i)) + oper[k] + operator(a.slice(i + k.length));
                                } else if (i != a.length - k.length) {
                                    return oper[k] + operator(a.slice(i + k.length));
                                } else if (i != 0) {
                                    return num(a.slice(0, i)) + oper[k];
                                }
                            } else {
                                t = true;
                            }
                    }
                    if (t) {
                        return num(a);
                    }
                }
            }
            return eval(operator(val));
        }
    }

    console.log(func('一万零三十三'));
    console.log(func('一万三'));
    console.log(func('拾伍亿零贰佰萬零贰佰'));
    console.log(func('拾'));
    console.log(func(5090000034, true));
    console.log(func(5090000034));
    console.log(func('( 三万零三十三-七百五) 乘 三百三十 '));
    console.log(func('负三万零三十三 - 七百五 乘 三百三十 '));
    console.log(func('三万零三十三 - 七百五 乘以 三百三十 '));
    console.log(func('二十除十'));
    console.log(func('二十除以十'));
    console.log(func('贰拾>十'));
    console.log(func('贰拾大于十'));
} ()




/************************************* */

!function () {
    function func(val, bl) {
        var xiao = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
            da = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'],
            danwei = ['', '十', '百', '千', '万', '', '', '', '亿'],
            danwei1 = ['', '拾', '佰', '仟', '萬', '', '', '', '亿'],
            val1 = [],
            val2 = [],
            end = 0;

        if (typeof val === 'number') {
            val = val + '';
            end = '';
            danwei.splice(0, 1);
            danwei1.splice(0, 1);
            if (bl) {
                for (var i = 0; i < val.length; i++) {
                    if ((val.length - i - 2) % 4 >= 0) {
                        end += (da[val[i]] + danwei1[(val.length - i - 2) % 4]);
                    } else {
                        end += da[val[i]]
                    }
                }
            } else {
                for (var i = 0; i < val.length; i++) {
                    if ((val.length - i - 2) % 4 >= 0) {
                        end += (xiao[val[i]] + danwei[(val.length - i - 2) % 4]);
                    } else {
                        end += xiao[val[i]]
                    }
                }
            }
            if ((end[0] === '一' || end[0] === '壹') && (end[1] === '十' || end[1] === '拾')) {
                end = end.slice(1)
            }
            if (end[end.length - 1] === '〇' || end[end.length - 1] === '零') {
                end = end.slice(0, -1);
            }
            if (val.length > 12) {
                if (bl) {
                    end = end.replace('萬', '亿');
                    end = end.replace('萬', '亿');
                    end = end.replace('亿', '萬');
                } else {
                    end = end.replace('万', '亿');
                    end = end.replace('万', '亿');
                    end = end.replace('亿', '万');
                }
            } else if (val.length > 8) {
                end = end.replace('万', '亿');
                end = end.replace('萬', '亿');
            }
            for (var i = 0; i < danwei.length; i++) {
                if (danwei[i] === '') {
                    danwei.splice(i, 1);
                    i--;
                }
            }
            for (var i = 0; i < danwei1.length; i++) {
                if (danwei1[i] === '') {
                    danwei1.splice(i, 1);
                    i--;
                }
            }
            for (var i = 0; i < end.length; i++) {
                if (!bl && end[i] === '〇') {
                    if (danwei.indexOf(end[i - 1]) < danwei.indexOf(end[i + 1])) {
                        end = end.slice(0, i) + end.slice(i + 1);
                    } else if (danwei.indexOf(end[i - 1]) > danwei.indexOf(end[i + 1])) {
                        end = end.slice(0, i) + end.slice(i + 2);
                        i--;
                    }
                } else if (end[i] === '零') {
                    if (danwei1.indexOf(end[i - 1]) < danwei1.indexOf(end[i + 1])) {
                        end = end.slice(0, i) + end.slice(i + 1);
                    } else if (danwei1.indexOf(end[i - 1]) > danwei1.indexOf(end[i + 1])) {
                        end = end.slice(0, i) + end.slice(i + 2);
                        i--;
                    }
                }
            }
            for (var i = 0; i < end.length; i++) {
                if (!bl && (danwei.indexOf(end[i - 1]) > (danwei.indexOf(end[i + 1]) + 1)) && danwei.indexOf(end[i + 1]) > -1) {
                    end = end.slice(0, i) + '〇' + end.slice(i);
                } else if ((danwei1.indexOf(end[i - 1]) > (danwei1.indexOf(end[i + 1]) + 1)) && danwei1.indexOf(end[i + 1]) > -1) {
                    end = end.slice(0, i) + '零' + end.slice(i);
                }
            }
            return end;
        } else {
            val = val.replace(/\s/g,'');
            function num(a) {
                if((a.length === 1) && xiao){
                    return a;
                }
                val1 = [];
                val2 = [];
                end = 0;
                var por = '';
                if (a[0] === '十' || a[0] === '拾') {
                    a = '一' + a;
                } else if (a[0] === '负') {
                    a.slice(1);
                    por = '-';
                } 
                for (var i = 0; i < a.length; i++) {
                    if (xiao.indexOf(a[i]) > -1 && a[i] != '〇') {
                        val1.push(xiao.indexOf(a[i]))
                    } else if (da.indexOf(a[i]) > -1 && a[i] != '零') {
                        val1.push(da.indexOf(a[i]))
                    } else if (danwei.indexOf(a[i]) > -1) {
                        if (danwei.indexOf(a[i - 1]) > -1) {
                            val2[val2.length - 1] = (val2[val2.length - 1] * ('1' + function (ind) {
                                var z = '';
                                for (var ii = 0; ii < ind; ii++) {
                                    z += '0';
                                }
                                return z;
                            } (danwei.indexOf(a[i])) - 0))
                        } else {
                            val2.push('1' + function (ind) {
                                var z = ''
                                for (var ii = 0; ii < ind; ii++) {
                                    z += '0';
                                }
                                return z;
                            } (danwei.indexOf(a[i])) - 0)
                        }
                    } else if (danwei1.indexOf(a[i]) > -1) {
                        if (danwei1.indexOf(a[i - 1]) > -1) {
                            val2[val2.length - 1] = (val2[val2.length - 1] * ('1' + function (ind) {
                                var z = '';
                                for (var ii = 0; ii < ind; ii++) {
                                    z += '0';
                                }
                                return z;
                            } (danwei1.indexOf(a[i])) - 0))
                        } else {
                            val2.push('1' + function (ind) {
                                var z = ''
                                for (var ii = 0; ii < ind; ii++) {
                                    z += '0';
                                }
                                return z;
                            } (danwei1.indexOf(a[i])) - 0)
                        }
                    }

                }
                if (val2.length < val1.length) {
                    if (a[a.length - 2] != '零' && a[a.length - 2] != '〇') {
                        val2.push(val2[val2.length - 1] / 10);
                    } else {
                        val2.push(1);
                    }
                }
                for (var i = 0; i < val1.length; i++) {
                    if (val2[i] < val2[i - 1]) {
                        end += (val1[i] * val2[i])
                    } else {
                        end = (end + val1[i]) * val2[i]
                    }
                }
                return por + end;
            }
            var oper = {
                '+': '+',
                '加': '+',
                '-': '-',
                '减': '-',
                '*': '*',
                '乘': '*',
                '除以': '/',
                '除': '/',
                '/': '/',
                '(': '(',
                ')': ')',
                '{': '{',
                '}': '}',
                '[': '[',
                ']': ']',
                '>':'>',
                '<':'<',
                '%':'%',
                '乘以':'*',
                '大于':'>',
                '小于':'<',
                '等于':'=='
            },
            reverse = {
                '分之':'/'
            },
            t = false;
            function operator(a) {
                t = false;
                if (typeof a === 'string' && (a.indexOf('除') > -1) && (a.indexOf('除以') === -1)) {
                    return operator(a.slice(a.indexOf('除') + 1)) + '/' + operator(a.slice(0, a.indexOf('除')));
                } else if (typeof a === 'string'){
                    for (var k in oper) {
                        var i = a.indexOf(k);
                        if (i > 0) {
                            if (i != a.length - 1) {
                                return num(a.slice(0, i)) + oper[k] + operator(a.slice(i + k.length));
                            } else if (i != a.length - k.length) {
                                return oper[k] + operator(a.slice(i + k.length));
                            } else if (i != 0) {
                                return num(a.slice(0, i)) + oper[k];
                            }
                        } else {
                            t = true;
                        }
                    }
                    for (var kk in reverse) {
                        var i = a.indexOf(kk);
                        if (i > 0) {
                            return operator(a.slice(i + kk.length)) + reverse[kk] + num(a.slice(0, i)) ;
                        } else {
                            t = true;
                        }
                    }
                    if (t) {
                        return num(a);
                    }
                }
            }
            return eval(operator(val));
        }
    }

    console.log(func('一万零三十三'));
    console.log(func('一万三'));
    console.log(func('拾伍亿零贰佰萬零贰佰'));
    console.log(func('拾'));
    console.log(func(5090000034, true));
    console.log(func(5090000034));
    console.log(func('( 三万零三十三-七百五) 乘 三百三十 '));
    console.log(func('负三万零三十三 - 七百五 乘 三百三十 '));
    console.log(func('三万零三十三 - 七百五 乘以 三百三十 '));
    console.log(func('二十除十'));
    console.log(func('二十除以十'));
    console.log(func('贰拾>十'));
    console.log(func('贰拾大于十'));
    console.log(func('拾分之一'));
    console.log(func('十'));

} ();

'啊就是大佛ias解放军的说法l;d;gjsl;dgf'