# join bot

discord sunucusuna biri girince hos geldin, cikinca gorusuruz mesaji atan basit bir bot.
mesajlar embed olarak gider, hepsi slash komutlariyla ayarlanir. komutlari sadece .env de
belirledigin rol kullanabilir, baskasi denerse "izinsiz erisim" der.

## komutlar

- `/kanal` - mesajin gidecegi kanali sec (once bunu yap)
- `/mesaj` - giris/cikis mesajini yaz
- `/baslik` - embed basligini degistir
- `/gorsel` - resim/gif ekle ya da kaldir
- `/renk` - embed rengini degistir
- `/aktif` - sistemi ac/kapat
- `/test` - onizleme goster
- `/ayarlar` - mevcut ayarlari goster
- `/sifirla` - ayarlari sifirla
- `/yardim` - komut listesi

mesajda kullanabilecegin degiskenler: `{uye}` `{uyeadi}` `{etiket}` `{sunucu}` `{uyesayisi}`

## kurulum

once `.env` dosyasini olustur ve doldur:

```
TOKEN=bot_tokenin
CLIENT_ID=application_id
YETKILI_ROL=komutlari_kullanacak_rolun_idsi
GUILD_ID=test_sunucunun_idsi   (opsiyonel, bos birakirsan global olur)
```

sonra sirayla calistir:

```bash
npm install
npm run deploy   # komutlari discorda kaydeder (bir kez, yeni komut ekleyince tekrar)
npm start
```

> not: developer portaldan "server members intent" i acmayi unutma, yoksa giris/cikis calismaz.

## notlar

- ayarlar `data/ayarlar.json` de tutulur, her sunucu ayri kaydedilir (silersen varsayilana doner).
- discord.js v14 ve node 18+ ile calisir.
