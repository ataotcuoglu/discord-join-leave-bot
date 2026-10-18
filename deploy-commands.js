require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes } = require('discord.js');



if (!process.env.TOKEN || !process.env.CLIENT_ID) {
  console.error('.env icinde TOKEN ve CLIENT_ID dolu olmali');
  process.exit(1);
}

const komutlar = [];
const klasor = path.join(__dirname, 'komutlar');
for (const dosya of fs.readdirSync(klasor).filter((f) => f.endsWith('.js'))) {
  const komut = require(path.join(klasor, dosya));
  if (komut?.data) komutlar.push(komut.data.toJSON());
}

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
  try {
    console.log(`${komutlar.length} komut kaydediliyor...`);

    if (process.env.GUILD_ID) {
    
      await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: komutlar },
      );
      console.log('tamam, komutlar sunucuya geldi (aninda)');
    } else {
     
      await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: komutlar });
      console.log('tamam, global kaydedildi (yayilmasi ~1 saat surebilir)');
    }
  } catch (e) {
    console.error('kayit sirasinda hata:', e);
  }
})();
