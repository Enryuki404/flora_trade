# Deploy FloraTrade via Git

## Opsi A — Vercel via GitHub (Paling Mudah, Gratis, Auto HTTPS)

### 1. Push ke GitHub
```bash
# di C:\website-imp-ext
git init
git add .
git commit -m "feat: FloraTrade Nusantara - flora export import landing"

# buat repo kosong di github.com/new (jangan centang README)
git remote add origin https://github.com/USERNAME/floratrade-nusantara.git
git branch -M main
git push -u origin main
```

### 2. Hubungkan ke Vercel
1. Buka https://vercel.com → Login dengan GitHub → Add New Project → Import `floratrade-nusantara`
2. Vercel auto-detect Next.js:
   - Build Command: `npm run build`
   - Output: Next.js
   - Install: `npm install`
3. Klik Deploy → dapat URL permanen `https://floratrade-nusantara.vercel.app`
4. Setiap `git push` berikutnya auto-deploy (CI/CD).
5. Custom domain: Vercel → Settings → Domains → add `floratrade.id` → ikuti DNS.

> Sudah ada `next.config.ts` dengan `outputFileTracingRoot` fix untuk Windows.

---

## Opsi B — VPS Apache via Git (kalau hosting cuma support Git)

Arsitektur: `git push` ke bare repo di VPS → `post-receive` hook checkout ke `/var/www/floratrade` → build & restart.

### Di VPS (Ubuntu/Debian + Apache)
```bash
# 1. Install Node & PM2
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm i -g pm2

# 2. Buat bare repo
sudo mkdir -p /opt/git/floratrade.git && cd /opt/git/floratrade.git
sudo git init --bare

# 3. Buat hook deploy
sudo nano hooks/post-receive
```
Isi `hooks/post-receive`:
```bash
#!/bin/bash
TARGET=/var/www/floratrade
GIT_DIR=/opt/git/floratrade.git

echo "Deploying FloraTrade..."
git --work-tree=$TARGET --git-dir=$GIT_DIR checkout -f main

cd $TARGET
npm ci --production=false
npm run build
pm2 restart floratrade || pm2 start npm --name floratrade -- run start -- --port 3000
echo "Done"
```
```bash
sudo chmod +x hooks/post-receive
sudo mkdir -p /var/www/floratrade
sudo chown -R $USER:$USER /opt/git/floratrade.git /var/www/floratrade
```

### Apache Reverse Proxy (`/etc/apache2/sites-available/floratrade.conf`)
```apache
<VirtualHost *:80>
  ServerName floratrade.id
  ServerAlias www.floratrade.id

  ProxyPreserveHost On
  ProxyPass / http://127.0.0.1:3000/
  ProxyPassReverse / http://127.0.0.1:3000/

  ErrorLog ${APACHE_LOG_DIR}/floratrade-error.log
  CustomLog ${APACHE_LOG_DIR}/floratrade-access.log combined
</VirtualHost>
```
```bash
sudo a2enmod proxy proxy_http rewrite headers
sudo a2ensite floratrade
sudo systemctl restart apache2
# HTTPS gratis:
sudo apt install certbot python3-certbot-apache -y
sudo certbot --apache -d floratrade.id -d www.floratrade.id
```

### Di Laptop (Windows, sekali saja)
```bash
# jika belum ada remote VPS, ganti USERNAME & IP
git remote add vps ssh://user@VPS_IP/opt/git/floratrade.git
git push vps main
# cek log di VPS: pm2 logs floratrade
```

### Update selanjutnya
```bash
git add .
git commit -m "update landing"
git push origin main   # → auto deploy Vercel
git push vps main      # → deploy ke VPS Apache
```

---

## File penting sudah disiapkan
- `apache-floratrade.conf` → untuk XAMPP/VPS Apache
- `next.config.ts` → sudah fix Watchpack Windows
- Tunnel sementara online: https://0f890129ad1200.lhr.life (SSH, ganti tiap restart)

Butuh aku bantu `git init` + push ke GitHub kamu sekarang? Kasih URL repo kosongnya bro.
