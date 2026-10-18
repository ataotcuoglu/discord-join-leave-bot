const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const veri = require('../araclar/veri');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('baslik')
    .setDescription('giris/cikis mesajinin basligini degistir')
    .addStringOption((o) =>
      o
        .setName('tip')
        .setDescription('giris mi cikis mi')
        .setRequired(true)
        .addChoices({ name: 'giris', value: 'giris' }, { name: 'cikis', value: 'cikis' }),
    )
    .addStringOption((o) =>
      o
        .setName('baslik')
        .setDescription('yeni baslik (burada da {sunucu} {uyeadi} gibi degiskenler calisir)')
        .setRequired(true)
        .setMaxLength(256),
    ),

  async calistir(interaction) {
    const tip = interaction.options.getString('tip');
    const baslik = interaction.options.getString('baslik');
    veri.ayarKaydet(interaction.guildId, tip, 'baslik', baslik);

    await interaction.reply({
      content: `${tip} basligi degistirildi: ${baslik}`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
