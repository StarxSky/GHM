# 资源下载中心

一个用于下载后端云服务器资源的前端网站。
## 更详细的教程看[这里](https://github.com/StarxSky/GHM/blob/main/READMEEE.md)
## 更新网站的信息？[Look here!!](https://github.com/StarxSky/GHM/blob/main/UPDATE.md)
## 技术栈

- React 19
- TypeScript
- Vite
- CSS3

## 功能特性

- 资源列表展示（文件名、大小、类型）
- 一键下载功能
- 响应式设计，适配不同屏幕尺寸
- 现代化UI设计，带有动画效果
- 支持部署到云端服务器

## 项目结构

```
.
├── dist/            # 构建输出目录
├── public/          # 静态资源
├── src/             # 源代码
│   ├── assets/      # 资源文件
│   ├── App.css      # 主样式文件
│   ├── App.tsx      # 主应用组件
│   ├── index.css    # 全局样式
│   └── main.tsx     # 入口文件
├── .gitignore       # Git忽略文件
├── package.json     # 项目配置
├── tsconfig.json    # TypeScript配置
└── vite.config.ts   # Vite配置
```

## 本地开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

项目将在 http://localhost:5173/ 启动

### 构建项目

```bash
npm run build
```

构建后的文件将输出到 `dist` 目录

### 预览构建结果

```bash
npm run preview
```

## 部署到服务器

### 1. 构建项目

在本地执行构建命令：

```bash
npm run build
```

### 2. 上传构建文件到服务器

将 `dist` 目录中的所有文件上传到服务器的Web根目录，例如：

- 使用FTP/SFTP工具上传
- 或使用命令行工具（如scp）：

```bash
scp -r dist/* username@server_ip:/path/to/web/root
```

### 3. 配置Web服务器

#### 使用Nginx

1. 安装Nginx（如果尚未安装）：

```bash
sudo apt update
sudo apt install nginx
```

2. 创建Nginx配置文件：

```bash
sudo nano /etc/nginx/sites-available/download-center
```

3. 添加以下配置：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/web/root;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

4. 启用配置：

```bash
sudo ln -s /etc/nginx/sites-available/download-center /etc/nginx/sites-enabled/
```

5. 测试Nginx配置：

```bash
sudo nginx -t
```

6. 重启Nginx：

```bash
sudo systemctl restart nginx
```

#### 使用Apache

1. 安装Apache（如果尚未安装）：

```bash
sudo apt update
sudo apt install apache2
```

2. 创建Apache配置文件：

```bash
sudo nano /etc/apache2/sites-available/download-center.conf
```

3. 添加以下配置：

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /path/to/web/root

    <Directory /path/to/web/root>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

4. 启用配置和mod_rewrite：

```bash
sudo a2ensite download-center.conf
sudo a2enmod rewrite
```

5. 重启Apache：

```bash
sudo systemctl restart apache2
```

### 4. 访问网站

部署完成后，您可以通过服务器的IP地址或域名访问网站：

```
http://your-server-ip/
或
http://your-domain.com/
```

## 自定义配置

### 修改资源列表

在 `src/App.tsx` 文件中修改 `resources` 数组，添加或删除资源：

```typescript
const [resources] = useState<Resource[]>([
  {
    id: '1',
    name: 'example-document.pdf',
    size: '2.5 MB',
    type: 'PDF',
    url: 'https://example.com/example-document.pdf'
  },
  // 添加更多资源...
])
```

### 修改样式

在 `src/App.css` 文件中修改样式，自定义网站外观：

- 更改颜色方案
- 调整布局
- 修改动画效果

## 故障排除

### 404错误

如果访问页面时出现404错误，请确保：

1. 构建文件已正确上传到服务器
2. Web服务器配置中的根目录路径正确
3. 已配置正确的URL重写规则（用于单页应用）

### 下载功能不工作

确保资源的URL是可访问的，并且服务器配置允许跨域下载（如果资源存储在其他服务器）。

## 联系信息

如有问题或建议，请联系项目维护者。
