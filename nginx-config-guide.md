# Nginx配置指南：安全提供/root目录下的文件下载

## 方案一：使用alias指令为多个文件配置（推荐）

直接暴露/root目录存在安全风险，建议使用alias指令将特定URL映射到/root目录下的具体文件：

```nginx
server {
    listen 80;
    server_name your_server_ip;
    root /var/www/download-center;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 安全地提供/root目录下的多个文件下载
    location /download/123.zip {
        alias /root/123.zip;
        add_header Content-Disposition "attachment; filename=123.zip";
    }

    location /download/aa.txt {
        alias /root/aa.txt;
        add_header Content-Disposition "attachment; filename=aa.txt";
    }

    # 可以继续添加更多文件
    # location /download/another-file.ext {
    #     alias /root/another-file.ext;
    #     add_header Content-Disposition "attachment; filename=another-file.ext";
    # }
    
    # 可选：限制访问IP
    # allow 192.168.1.0/24;
    # deny all;
}
```

## 方案二：使用正则表达式匹配文件名（更灵活）

如果需要提供多个文件下载，可以使用正则表达式来简化配置：

```nginx
server {
    listen 80;
    server_name your_server_ip;
    root /var/www/download-center;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 使用正则表达式匹配下载文件
    location ~ ^/download/(123\.zip|aa\.txt|another-file\.ext)$ {
        alias /root/$1;
        add_header Content-Disposition "attachment; filename=$1";
        # 可选：限制访问IP
        # allow 192.168.1.0/24;
        # deny all;
    }
}
```

## 方案三：复制文件到安全目录

如果您希望更安全，可以将文件复制到Nginx的根目录下：

```bash
# 创建下载目录
mkdir -p /var/www/download-center/download

# 复制多个文件并设置权限
sudo cp /root/123.zip /root/aa.txt /var/www/download-center/download/
sudo chown www-data:www-data /var/www/download-center/download/*
sudo chmod 644 /var/www/download-center/download/*
```

然后使用简化的Nginx配置：

```nginx
server {
    listen 80;
    server_name your_server_ip;
    root /var/www/download-center;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 为下载目录添加下载头
    location /download/ {
        add_header Content-Disposition "attachment; filename=$1";
    }
}
```

## 配置说明

1. **alias vs root**：
   - `alias` 指令会替换location中的路径部分
   - `root` 指令会将location路径附加到root路径之后

2. **Content-Disposition头**：
   - 确保浏览器将文件作为下载而不是直接打开

3. **安全建议**：
   - 不要直接暴露/root目录
   - 考虑添加访问控制（IP限制、认证等）
   - 定期检查文件权限

## 重启Nginx

修改配置后，需要重启Nginx使配置生效：

```bash
sudo systemctl restart nginx
# 或
sudo service nginx restart
```

## 前端配置

前端app.tsx已更新，添加了123.zip的下载链接，指向`/download/123.zip`路径。

## 测试下载

配置完成后，访问您的网站，点击"123.zip"的下载按钮即可下载文件。