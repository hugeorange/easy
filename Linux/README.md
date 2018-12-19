# Linux 学习

## 文件与目录管理
- touch 创建一个文件
- mkdir 创建一个文件夹
- rmdir 删除一个空目录
- cp 复制文件或目录  cp [-adfilprsu] 来源档(source) 目标档(destination)
- mv (移动文件与目录，或修改名称)  mv [-fiu] source destination

## Linux 文件内容查看
- cat  由第一行开始显示文件内容
- nl   显示的时候，顺道输出行号！
- more 一页一页的显示文件内容
- less 与 more 类似，但是比 more 更好的是，他可以往前翻页！
- head 只看头几行
- tail 只看尾巴几行  ***  `tail [-n number] 文件 `
    * -n ：后面接数字，代表显示几行的意思
    * -f ：表示持续侦测后面所接的档名，要等到按下[ctrl]-c才会结束tail的侦测

## Linux 用户和用户组管理
> Linux系统是一个多用户多任务的分时操作系统，任何一个要使用系统资源的用户，都必须首先向系统管理员申请一个账号，然后以这个账号的身份进入系统。每个用户账号都拥有一个惟一的用户名和各自的口令。用户在登录时键入正确的用户名和口令后，就能够进入系统和自己的主目录。
- 实现用户账号的管理，要完成的工作主要有如下几个方面：
    * 用户账号的添加、删除与修改。
    * 用户口令的管理。
    * 用户组的管理。
## Linux 磁盘股管理
> Linux磁盘管理好坏直接关系到整个系统的性能问题。
- Linux磁盘管理常用三个命令为df、du和fdisk。
    * df：列出文件系统的整体磁盘使用量  `df [-ahikHTm] [目录或文件名]`
    * du：检查磁盘空间使用量
    * fdisk：用于磁盘分区

## Linux Vi/Vim
> Vim是从 vi 发展出来的一个文本编辑器。代码补完、编译及错误跳转等方便编程的功能特别丰富，在程序员中被广泛使用。

- vi/vim 的使用
    * 命令模式（Command mode）
    * 输入模式（Insert mode） `i 切换到输入模式，以输入字符`
    * 底线命令模式（Last line mode）` ESC -> shift + :  切换到底线命令模式，以在最底一行输入命令`
      * q 退出文件
      * w 保存文件
      * ！ 强制  ` :wq! 则为强制储存后离开`

## linux yum 命令
> yum（ Yellow dog Updater, Modified）是一个在Fedora和RedHat以及SUSE中的Shell前端软件包管理器。 基於RPM包管理，能够从指定的服务器自动下载RPM包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软体包，无须繁琐地一次次下载、安装。 yum提供了查找、安装、删除某一个、一组甚至全部软件包的命令，而且命令简洁而又好记。

- `yum [options] [command] [package ...]`
    * options：可选，选项包括-h（帮助），-y（当安装过程提示选择全部为"yes"），-q（不显示安装的过程）等等。
    * command：要进行的操作。
    * package操作的对象。

# shell
> Shell 是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁。Shell 既是一种命令语言，又是一种程序设计语言。 Shell 是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务

> bash（全称 Bourne Again Shell）: LinuxOS 默认的，它是 Bourne Shell 的扩展。 与 Bourne Shell 完全兼容，并且在 Bourne Shell 的基础上增加了很多特性。可以提供命令补全，命令编辑和命令历史等功能。它还包含了很多 C Shell 和 Korn Shell 中的优点，有灵活和强大的编辑接口，同时又很友好的用户界面。

> 脚本其实就是短小的、用来让计算机自动化完成一系列工作的程序，这类程序可以用文本编辑器修改，不需要编译，通常是解释运行的。
```
#!/bin/bash
echo "hello world first shell"

运行方法：
# chmod +x ./test.sh  #使脚本具有执行权限； 
# ./test.sh  #执行脚本
# 注意，一定要写成 ./test.sh，而不是 test.sh，运行其它二进制的程序也一样，直接写 test.sh，linux 系统会去 PATH 里寻找有没有叫 test.sh 的，
# 而只有 /bin, /sbin, /usr/bin，/usr/sbin 等在 PATH 里，你的当前目录通常不在 PATH 里，所以写成 test.sh 是会找不到命令的，要用 ./test.sh 告诉系统说，就在当前目录找。
```

### shell 与 shell 脚本的区别
> shell 是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务。Ken Thompson 的 sh 是第一种 Unix Shell，Windows Explorer 是一个典型的图形界面 Shell。
shell 脚本（shell script），是一种为 shell 编写的脚本程序。业界所说的 shell 通常都是指 shell 脚本，但读者朋友要知道，shell 和 shell script 是两个不同的概念。由于习惯的原因，简洁起见，本文出现的 "shell编程" 都是指 shell 脚本编程，不是指开发 shell 自身（如Windows Explorer扩展开发）。

### shell 变量
### shell 传递参数
### shell 数组
### shell 基本运算符
### shell echo 命令
### shell printf 命令
### shell 流程控制
### shell 函数
### shell 输入输出重定向
### shell 文件包含

## linux 
- [常用命令](http://www.runoob.com/linux/linux-command-manual.html)