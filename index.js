require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const {
  Client,
  Collection,
  GatewayIntentBits,
  Events,
  MessageFlags,
} = require('discord.js');

const { embedOlustur } = require('./araclar/embed');
const veri = require('./araclar/veri');


const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});


client.komutlar = new Collection();
const komutKlasoru = path.join(__dirname, 'komutlar');
for (const dosya of fs.readdirSync(komutKlasoru).filter((f) => f.endsWith('.js'))) {
  const komut = require(path.join(komutKlasoru, dosya));
  if (komut?.data && komut?.calistir) {
    client.komutlar.set(komut.data.name, komut);
  } else {
    console.warn(`"${dosya}" duzgun degil (data/calistir yok), atladim`);
  }
}


const acikKomutlar = ['yardim'];

client.once(Events.ClientReady, (c) => {
  console.log(`bot acildi: ${c.user.tag} - ${client.komutlar.size} komut yuklu`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const komut = client.komutlar.get(interaction.commandName);
  if (!komut) return;

 
  if (!acikKomutlar.includes(interaction.commandName)) {
    const rolId = process.env.YETKILI_ROL;
    const yetkili =
      rolId && interaction.inGuild() && interaction.member?.roles?.cache?.has(rolId);
    if (!yetkili) {
      await interaction
        .reply({ content: 'izinsiz erisim', flags: MessageFlags.Ephemeral })
        .catch(() => {});
      return;
    }
  }

  try {
    await komut.calistir(interaction);
  } catch (e) {
    console.error(`/${interaction.commandName} hata verdi:`, e);
    const cevap = { content: 'bir seyler ters gitti', flags: MessageFlags.Ephemeral };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(cevap).catch(() => {});
    } else {
      await interaction.reply(cevap).catch(() => {});
    }
  }
});


client.on(Events.GuildMemberAdd, (uye) => {
  const ayar = veri.guildAyari(uye.guild.id, 'giris');
  if (!ayar.aktif || !ayar.kanal) return;

  const kanal = uye.guild.channels.cache.get(ayar.kanal);
  if (!kanal?.isTextBased()) return;

  kanal
    .send({ embeds: [embedOlustur(ayar, uye)] })
    .catch((e) => console.error('giris mesaji gitmedi:', e?.message));
});


client.on(Events.GuildMemberRemove, (uye) => {
  const ayar = veri.guildAyari(uye.guild.id, 'cikis');
  if (!ayar.aktif || !ayar.kanal) return;

  const kanal = uye.guild.channels.cache.get(ayar.kanal);
  if (!kanal?.isTextBased()) return;

  kanal
    .send({ embeds: [embedOlustur(ayar, uye)] })
    .catch((e) => console.error('cikis mesaji gitmedi:', e?.message));
});

if (!process.env.TOKEN) {
  console.error('.env icinde TOKEN yok, once .env dosyasini olustur');
  process.exit(1);
}

client.login(process.env.TOKEN);
