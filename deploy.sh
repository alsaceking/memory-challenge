# 当发生错误时中止脚本
set -e

# 构建
npm run build

# cd 到构建输出的目录下
cd dist

# 部署到自定义域域名
# echo 'www.example.com' > CNAME

git init
git checkout -b main
git add -A
git commit -m 'deploy'

# 如果你要部署在 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages.io/<REPO>

git push -f git@github.com:alsaceking/memory-challenge.git main:gh-pages

git push -f git@gitee.com:alsaceking/memory-challenge.git main:gh-pages

cd -