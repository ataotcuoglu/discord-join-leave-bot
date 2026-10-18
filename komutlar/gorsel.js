const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const veri = require('../araclar/veri');


function urlMi(s) {
  try {
    const u = new URL(s);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gorsel')
    .setDescription('mesaja resim/gif ekle ya da kaldir')
    .addStringOption((o) =>
      o
        .setName('tip')
        .setDescription('giris mi cikis mi')
        .setRequired(true)
        .addChoices({ name: 'giris', value: 'giris' }, { name: 'cikis', value: 'cikis' }),
    )
    .addStringOption((o) =>
      o
        .setName('link')
        .setDescription('resim/gif linki, bos birakirsan mevcut gorseli kaldirir')
        .setRequired(false),
    ),

  async calistir(interaction) {
    const tip = interaction.options.getString('tip');
    const link = interaction.options.getString('link');

    
    if (!link) {
      veri.ayarKaydet(interaction.guildId, tip, 'gorsel', null);
      return interaction.reply({
        content: `${tip} gorseli kaldirildi`,
        flags: MessageFlags.Ephemeral,
      });
    }

    if (!urlMi(link)) {
      return interaction.reply({
        content: 'bu gecerli bir link degil, http:// ya da https:// ile baslamali',
        flags: MessageFlags.Ephemeral,
      });
    }

    veri.ayarKaydet(interaction.guildId, tip, 'gorsel', link);
    await interaction.reply({
      content: `${tip} gorseli guncellendi\n${link}`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
