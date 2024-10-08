# sagara-msib-test

Backend Project-based Test

Deskripsi
Anda diminta untuk mengembangkan backend untuk sistem manajemen inventaris sebuah toko baju. Sistem ini harus dapat menangani pembaruan stok baju, penambahan baju baru, dan pencarian baju berdasarkan warna dan ukuran.

Spesifikasi (WAJIB)

- Sistem harus dapat menangani operasi CRUD untuk baju.
- Setiap baju memiliki atribut warna, ukuran, harga, dan stok.
- Sistem harus dapat mencari baju berdasarkan warna dan ukuran.
- Sistem harus dapat menambahkan stok baju.
- Sistem harus dapat mengurangi stok baju.
- Sistem harus dapat menampilkan semua baju yang tersedia.

Spesifikasi (Optional, mendapat nilai tambahan jika dikerjakan)

- Sistem dapat menampilkan semua baju yang stoknya habis.
- Sistem dapat menampilkan semua baju yang stoknya kurang dari 5.

Tech Stack
Dibebaskan untuk menggunakan tech stack apapun yang menurut Anda cocok untuk menyelesaikan tugas ini. Recommended stack: Node.js, Express.js, MongoDB or Go, Gin/Echo, Gorm, PostgreSQL.

Key points

- Penerapan SOLID Principles menjadi nilai plus.
- Penerapan unit testing menjadi nilai plus.
- Penerapan Depedency Injection menjadi nilai plus.

Deliverables
Silakan fork repository ini dan submit link repository hasil pengerjaan Anda ke https://bit.ly/study-case-backend-developer-msib

## How to run this project

1. Create Database & Run Migration

```
npx sequelize db:create
```

```
npx sequelize db:migrate
```

2. Register Default User and Admin

3. Create Database name "express_db" in MySQL

4. Run Seeder for Permissions

```
npx sequelize db:seed:all
```

5. Run Project

```
npm run start
```

6. Test the API
   To test the API you can import the Test Sagara.postman_collection.json to the Postman, so you can check the full documentation
