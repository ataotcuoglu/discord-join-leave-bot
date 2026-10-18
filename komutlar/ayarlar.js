const { SlashCommandBuilder, MessageFlags, EmbedBuilder } = require('discord.js');
const veri = require('../araclar/veri');

function ozet(ayar) {
  return [
    `durum: ${ayar.aktif ? 'acik' : 'kapali'}`,
    `kanal: ${ayar.kanal ? `<#${ayar.kanal}>` : 'secilmedi'}`,
    `baslik: ${ayar.baslik || '-'}`,
    `mesaj: ${ayar.mesaj || '-'}`,
    `renk: ${ayar.renk}`,
    `gorsel: ${ayar.gorsel ? `[link](${ayar.gorsel})` : 'yok'}`,
  ].join('\n');
}

module.exports = {
  data: new SlashCommandBuilder().setName('ayarlar').setDescription('mevcut ayarlari goster'),

  async calistir(interaction) {
    const v = veri.guildVerisi(interaction.guildId);

    const embed = new EmbedBuilder()
      .setTitle('ayarlar')
      .setColor('#5865F2')
      .addFields(
        { name: 'giris', value: ozet(v.giris) },
        { name: 'cikis', value: ozet(v.cikis) },
      );

    await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
  },
};
