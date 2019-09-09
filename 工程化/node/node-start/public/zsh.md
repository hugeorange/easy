## zsh 命令行工具（安装使用），错误异常处理，vi 基本使用步骤

> 简介：等我搞熟了，再来补全原理，作用，目前仅仅只是会使用，并不知其他

1. 安装
  - 下载一个 .oh-my-zsh 配置（推荐有）
  - ` git clone git://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh`

2. 创建新配置

- NOTE: 如果你已经有一个 .zshrc 文件，那么备份一下吧
- `cp ~/.zshrc ~/.zshrc.orig`
- `cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc`

3. 把 zsh 设置成默认的 shell:
- `chsh -s /bin/zsh`

4. 重启 zsh (打开一个新的 terminal 窗口)

> zsh 和 bash 互相切换
1. 切换到 bash  `chsh -s /bin/bash`
2. 切换到 zsh   `chsh -s /bin/zsh`

>  利用 zsh 打开 sublime 编辑器(这样可以在sb编辑器内查看隐藏文件了，不必在 vim 上看了)，只需在最后加上 这两句 （mac环境下）

`export ZSH=$HOME/.zsh`
`alias subl='/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl --new-window $@'`

> 异常情况 
- 当碰到 vi 打开某个文件时出现  以下警告时：

  `E325: ATTENTION  `
  `Found a swap file by the name ".zsh.md.swp"  `
  * 原因是：原因是在此次vi或vim操作前有过一次使用vi或vim 操作.zsh.md.swp文件时出现了异常中断，所以在当前目录下产生了一个.zsh.md.swp文件，这个文件使用ls命令查看不能发现，使用`ls -a`命令查看可以知道 .zsh.md.swp是一个隐藏文件。

  * 如果不想出现该提示，把文件删除即可  `rm .zsh.md.swp
`

> vim 使用技巧（vim还是一窍不通，没有认真去学习，等有空认真学习一下，先总结两个必备命令）
- vi 文件名 即可进入文件 

- vi 分为 三种模式 `命令模式` `编辑模式` 
 * 命令模式：可以完成对文件的操作命令
 * 编辑模式：可以完成文件的编辑功能
 * 默认情况下，打开 vi 编辑器自动进入 命令模式， 按 `i` 进入 编辑模式，按 `esc` 进入命令模式
 * 常用命令：
    - :wq  命令模式下，执行存盘退出操作
    - :w!  命令模式下，执行强制存盘操作
    - :q   命令模式下，执行退出 vi 操作
    - :q!  命令模式下，执行强制退出 vi 操作
