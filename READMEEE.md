为用户提供详细的部署步骤，包括本地构建、服务器配置、文件上传和测试访问的完整流程。# 详细部署步骤

以下是将项目部署到Linux服务器并通过浏览器访问的完整步骤：

## 前提条件

- 本地已安装Node.js和npm
- 服务器已安装Linux操作系统（如Ubuntu）
- 服务器已配置好SSH访问
- 服务器有公网IP地址

## 步骤1：本地构建项目

1. 打开终端，进入项目根目录：
   ```bash
   git clone https://www.github.com/starxsky/ghm.git
   cd ~/ghm
   ```

2. 安装依赖（如果尚未安装）：
   ```bash
   npm install
   ```

3. 构建项目：
   ```bash
   npm run build
   ```

   构建完成后，会生成一个 `dist` 目录，包含所有可部署的静态文件。

## 步骤2：连接到服务器

1. 使用SSH连接到服务器：
   ```bash
   ssh username@server_ip
   ```
   - `username` 是您的服务器用户名
   - `server_ip` 是您的服务器公网IP地址

2. 输入密码，成功登录服务器。

## 步骤3：安装Nginx Web服务器

1. 更新服务器软件包：
   ```bash
   sudo apt update
   ```

2. 安装Nginx：
   ```bash
   sudo apt install nginx
   ```

3. 启动Nginx服务：
   ```bash
   sudo systemctl start nginx
   ```

4. 设置Nginx开机自启：
   ```bash
   sudo systemctl enable nginx
   ```

5. 验证Nginx是否正常运行：
   ```bash
   sudo systemctl status nginx
   ```
   您应该看到"active (running)"的状态。

## 步骤4：创建Web根目录

1. 创建一个目录用于存放项目文件：
   ```bash
   sudo mkdir -p /var/www/download-center
   ```

2. 设置目录权限：
   ```bash
   sudo chown -R $USER:$USER /var/www/download-center
   sudo chmod -R 755 /var/www/download-center
   ```

## 步骤5：上传构建文件到服务器

1. 在本地终端（不要在SSH会话中）执行以下命令，将构建文件上传到服务器：
   ```bash
   scp -r ～/ghm/dist/* username@server_ip:/var/www/download-center/
   ```

   这会将 `dist` 目录中的所有文件上传到服务器的 `/var/www/download-center/` 目录。

## 步骤6：配置Nginx

1. 创建Nginx配置文件：
   ```bash
   sudo vim /etc/nginx/sites-available/download-center
   ```

2. 在编辑器中输入以下内容（使用服务器的实际IP地址替换 `your_server_ip`）：
   ```nginx
   server {
       listen 80;
       server_name your_server_ip;
       root /var/www/download-center;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

3. 保存并退出编辑器（按 `Ctrl+X`，然后按 `Y`，最后按 `Enter`）。

4. 启用配置文件：
   ```bash
   sudo ln -s /etc/nginx/sites-available/download-center /etc/nginx/sites-enabled/
   ```

5. 测试Nginx配置是否正确：
   ```bash
   sudo nginx -t
   ```
   您应该看到"test is successful"的消息。

6. 重启Nginx服务以应用配置：
   ```bash
   sudo systemctl restart nginx
   ```

## 步骤7：配置防火墙

1. 允许HTTP流量通过防火墙：
   ```bash
   sudo ufw allow 'Nginx HTTP'
   ```

2. 验证防火墙规则：
   ```bash
   sudo ufw status
   ```
   您应该看到Nginx HTTP已允许。

## 步骤8：通过浏览器访问网站

1. 打开浏览器，在地址栏中输入您的服务器IP地址：
   ```
   http://your_server_ip
   ```

2. 您应该能够看到"资源下载中心"的页面，包含资源列表和下载功能。

## 故障排除

### 问题1：无法访问网站，显示404错误

- 检查Nginx配置文件中的根目录路径是否正确
- 检查上传的文件是否完整
- 重启Nginx服务：`sudo systemctl restart nginx`

### 问题2：无法访问网站，显示连接超时

- 检查服务器防火墙是否允许80端口
- 检查服务器是否有公网IP地址
- 检查服务器是否可以通过SSH正常访问

### 问题3：下载功能不工作

- 确保资源的URL是可访问的
- 检查服务器是否配置了正确的跨域策略（如果资源存储在其他服务器）

## 后续维护

### 更新项目

1. 在本地修改代码
2. 重新构建项目：`npm run build`
3. 上传新的构建文件到服务器
4. 重启Nginx服务（如果需要）

### 查看Nginx日志

- 访问日志：`sudo cat /var/log/nginx/access.log`
- 错误日志：`sudo cat /var/log/nginx/error.log`

希望这些详细步骤能帮助您成功部署项目！如果遇到任何问题，请随时提问。
