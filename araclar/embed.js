const { EmbedBuilder } = require('discord.js');


function degiskenleriUygula(metin, uye) {
  if (!metin) return metin;
  const kullanici = uye.user ?? uye; 
  const sunucu = uye.guild;
  return metin
    .replaceAll('{uye}', `<@${kullanici.id}>`)
    .replaceAll('{uyeadi}', kullanici.username ?? 'bilinmiyor')
    .replaceAll('{etiket}', kullanici.tag ?? kullanici.username ?? 'bilinmiyor')
    .replaceAll('{sunucu}', sunucu?.name ?? '')
    .replaceAll('{uyesayisi}', String(sunucu?.memberCount ?? ''));
}


function renkUygula(embed, renk) {
  try {
    embed.setColor(renk || '#5865F2');
  } catch {
    embed.setColor('#5865F2');
  }
}

function embedOlustur(ayar, uye) {
  const kullanici = uye.user ?? uye;
  const sunucu = uye.guild;
  const embed = new EmbedBuilder()
    .setDescription(degiskenleriUygula(ayar.mesaj, uye) || '​')
    .setTimestamp();

  renkUygula(embed, ayar.renk);

  const baslik = degiskenleriUygula(ayar.baslik, uye);
  if (baslik) embed.setTitle(baslik);
  if (ayar.gorsel) embed.setImage(ayar.gorsel);

  
  if (typeof kullanici.displayAvatarURL === 'function') {
    embed.setThumbnail(kullanici.displayAvatarURL({ size: 256 }));
  }

  
  if (sunucu) {

    embed.setFooter({ text: sunucu.name, iconURL: sunucu.iconURL() ?? undefined });

  }

  return embed;
}

module.exports = { embedOlustur, degiskenleriUygula };
