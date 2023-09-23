#!/usr/bin/env sh
set -e


# 项目发布域名
web_url=https://wuxin0011.github.io/tampermonkey-script
# 项目git 地址
git_source=https://github.com/wuxin0011/tampermonkey-script
# 上传分支，如果是 master 请使用 main_branch=master

# 日志
path="$(pwd)"
log=$path/tampermonkey-script-build-publish-error.log

git_message="脚本发布🚀"


# 判断是否有输入消息参数
if [ -n "$1" ]
then
   git_message=$1
fi


log_check(){
    # 判断日志路径是否存在
    if [ -e  $path ]
    then
         echo "日志目录已存在，错误日志将输出到 $log"
    else 
        echo "生成日志目录"
        mkdir -p  $path 
    fi
}




copy_js_file(){
    echo "脚本复制中...."
    cp live-plugin/dist/live-plugin.js dist/live-plugin.js
    echo "live-plugin.js copy success 🚀...."
    cp barrage-keywords-stop/index.js dist/barrage-keywords-stop.js
    echo "barrage-keywords-stop.js copy success 🚀...."
    cp bilibili-tag-shield/dist/bilibili-tag-shield.js dist/bilibili-tag-shield.js
    echo "bilibili-tag-shield.js copy success 🚀...."
    echo "脚本复制完毕...."
}




# git 提交
exec_project(){
   git add -A  2>>$log
   git commit -m "$git_message" 2>>$log
   git push origin main 2>>$log
   echo "脚本发布成功! $git_source"
   echo "文档地址 $web_url"
}


log_check
copy_js_file
exec_project

