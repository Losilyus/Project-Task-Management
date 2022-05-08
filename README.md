# Project-Task-Management

<div align="center">

[![NPM version](https://img.shields.io/npm/v/fastify.svg?style=flat)](https://www.npmjs.com/package/fastify)
</div>


### Kullanılan Freamework ve Kütüphaneler;
- Fastify
- Nodemailer
- PrismaJS
---
### Kullanılan Veritabanları:
- Microsoft SQL Server
- Redis
---

### Demo:
Bu reponun bir klonu sunucuda demo halinde çalışıyor. Postman üzerinden bu çalışan repoya istek atabilirsiniz Postman public workspace [linki](https://postman.com/lively-resonance-888420/workspace/project-task-management)

### Kurulum
- Microsoft SQL Server
- Redis

```bash
$ yarn install
```

```bash
$ npm install
```

Uygulama başlatılırken .env bilgilerini girmeniz gerekir.

```dotenv
sqlserver://<ipAdress>:<PORT>;database=<DB_NAME>;user=<USER>;password=<PASSWORD>;trustServerCertificate=true
```
Buradaki bilgileri veri tabanınıza göre girdikten sonra PrismaJS ile migration yapmamız gerekir.

```bash
$ yarn prisma migrate dev
```

```bash
$ npx prisma migrate dev
```
PrismaJS isimli ORM kullandığım için `schema.prisma` dosyasına göre tablo oluşturma işlemlerini kendisi yapar.

`.env` dosyasında mail servisi bilgilerini girmeniz gereklidir. Google mail bilgilerini girerken Google hesabınızda `Daha Az Güvenli Uygulamalara İzin Ver` seçeneğini aktif etmeniz gereklidir.

Ardından projeyi ayağa kaldırmak için bu komutlar ile başlatmamız yeterlidir.

```bash
$ yarn start
```
```bash
$ npm start 
```
---
### API Route Şeması
Hazır API şeması için `Insomnia` ve `Postman` uygulamalarının export dosyalarını kullanarak şemayı import edebilir ve 
kullanmaya başlıyabilirsiniz.

### API
[Api dökümantasyonuna ulaşmak için tıklayınız.](https://documenter.getpostman.com/view/20866292/UyxdLUwK)

#### Auth

- `GET` /api/auth/profile/
- `POST` /api/auth/register/
- `POST` /api/auth/login/
- `POST` /api/auth/verify/
- `POST` /api/auth/forgot/
- `POST` /api/auth/forgot_change?token=`TOKEN_KEY` /

#### Task

- `POST` /api/task/
- `PUT` /api/task?id=`<Number>`
- `DEL` /api/task?id=`<Number>`
- `GET` /api/task?name=`<String>`
- `GET` /api/tasks?interval=`<DAILY, WEEKLY, MONTHLY>`&priority=`<URGENT, HIGH, MEDIUM, LOW>`
