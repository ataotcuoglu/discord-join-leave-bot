const fs = require('node:fs');
const path = require('node:path');


const klasor = path.join(__dirname, '..', 'data');
const dosya = path.join(klasor, 'ayarlar.json');


function varsayilan() {
  return {
    giris: {
      kanal: null,
      mesaj: 'aramiza hos geldin {uye}, artik {uyesayisi} kisiyiz',
      baslik: 'yeni uye',
      gorsel: null,
      renk: '#57F287',
      aktif: true,
    },
    cikis: {
      kanal: null,
      mesaj: '{etiket} aramizdan ayrildi, gorusuruz',
      baslik: 'gule gule',
      gorsel: null,
      renk: '#ED4245',
      aktif: true,
    },
  };
}

function oku() {
  try {
    if (!fs.existsSync(dosya)) return {};
    return JSON.parse(fs.readFileSync(dosya, 'utf8') || '{}');
  } catch {
    return {}; 
  }
}

function yaz(veri) {
  if (!fs.existsSync(klasor)) fs.mkdirSync(klasor, { recursive: true });
  fs.writeFileSync(dosya, JSON.stringify(veri, null, 2), 'utf8');
}


function guildVerisi(id) {
  const hepsi = oku();
  if (!hepsi[id]) {
    hepsi[id] = varsayilan();
    yaz(hepsi);
  }
  return hepsi[id];
}

function guildAyari(id, tip) {
  return guildVerisi(id)[tip];
}


function ayarKaydet(id, tip, anahtar, deger) {
  const hepsi = oku();
  if (!hepsi[id]) hepsi[id] = varsayilan();
  hepsi[id][tip][anahtar] = deger;
  yaz(hepsi);
  return hepsi[id][tip];
}


function sifirla(id, tip) {
  const hepsi = oku();
  const temiz = varsayilan();
  if (!hepsi[id]) hepsi[id] = temiz;
  if (tip) hepsi[id][tip] = temiz[tip];
  else hepsi[id] = temiz;
  yaz(hepsi);
  return hepsi[id];
}

module.exports = { varsayilan, guildVerisi, guildAyari, ayarKaydet, sifirla };
