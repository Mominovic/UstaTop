# UstaTop — MVP website (frontend demo)

UstaTop uchun birinchi bosqichdagi moslashuvchan va interaktiv bosh sahifa.

## Ishga tushirishning eng oson yo‘li

1. `UstaTop_Website` papkasini kompyuteringizga yuklab oling va ZIP fayldan chiqaring.
2. `index.html` faylini ikki marta bosib brauzerda oching.

Hech qanday paket yoki kutubxona o‘rnatish shart emas.

## Ubuntu terminal orqali ishga tushirish (ixtiyoriy)

```bash
cd UstaTop_Website
python3 -m http.server 8000
```
Brauzerda https://mominovic.github.io/UstaTop/ manzilini oching. To‘xtatish uchun terminalda `Ctrl + C` bosing.

## Hozir ishlaydigan qismlar
- Xizmatlar katalogi, qidiruv va kategoriya filtrlari
- Buyurtma, mutaxassis, tashkilot, do‘kon va kirish oynalari
- Demo so‘rov yuborish shakllari
- Mobil menyu va responsive dizayn
- Materiallar xarajati, tashkilotlar va AI yo‘l xaritasi bo‘limlari

## Hali ulanmagan qismlar
Bu versiya frontend demo. Ma’lumotlar serverga saqlanmaydi; real akkauntlar, buyurtmalar, chat, fayl yuklash, to‘lov, SMS tasdiqlash va reytinglar uchun backend kerak.

## Keyingi ishlab chiqish bosqichlari
1. Backend API va PostgreSQL bazasi
2. Ro‘yxatdan o‘tish, SMS tasdiqlash va foydalanuvchi rollari
3. Mutaxassis profili, portfolio va hujjat tekshiruvi
4. Buyurtmalar, chat, statuslar va mijoz tasdig‘i
5. Materiallar do‘konlari va ochiq xarajatlar hisobi
6. Buyurtmadan keyingi haqiqiy reyting
7. Admin va tashkilotlar kabineti
8. AI diagnostika, tavsiya va pullik 3D loyihalash

## Modal oynani tuzatish

Modal oynaning boshlang‘ich holatda ko‘rinib qolishiga CSS `display:grid` qoidasi sabab bo‘lgan edi. `styles.css` fayliga `.modal-backdrop[hidden]{display:none!important}` qoidasi qo‘shildi. Endi sahifa ochilganda modal yashirin turadi; tegishli tugma bosilganda ochiladi va `X` yoki `Esc` bilan yopiladi.

Tavsiya etilgan ishga tushirish usuli (Ubuntu):

```bash
cd UstaTop_Website
python3 -m http.server 8000
```

Brauzerda `http://localhost:8000` manzilini oching.

## Mutaxassisni ro‘yxatdan o‘tkazish — yangilangan oqim
- Xizmatlar katalogiga `Yordam` kategoriyasi qo‘shildi.
- Mutaxassis shaklida `Boshqa` tanlansa, qo‘shimcha mutaxassislik maydoni ochiladi.
- Mutaxassis ma’lumotlarining birinchi bosqichidan keyin alohida shaxsni tasdiqlash oynasi ochiladi: JShShIR (14 raqam), pasport seriyasi (2 harf) va pasport raqami (7 raqam).
- Maydonlarga format tekshiruvi va ma’lumotlarni qayta ishlashga rozilik kiritildi.
- Bu hali frontend demo: JShShIR va pasport ma’lumotlari serverga yuborilmaydi va saqlanmaydi. Sinov paytida haqiqiy hujjat ma’lumotlarini kiritmang.

Haqiqiy ishga tushirishdan oldin shaxsiy ma’lumotlar bilan ishlash uchun HTTPS, backend tekshiruvi, uzatishda va saqlashda shifrlash, qat’iy rol/ruxsat nazorati, saqlash muddatlari va maxfiylik siyosatini joriy etish zarur. Imkon bo‘lsa, hujjat raqamlarini platformada saqlash o‘rniga qonuniy vakolatli identifikatsiya provayderi orqali tekshirish arxitekturasini ko‘rib chiqing.
