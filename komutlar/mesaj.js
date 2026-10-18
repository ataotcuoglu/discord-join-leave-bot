const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const veri = require('../araclar/veri');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mesaj')
    .setDescription('giris ya da cikis mesajini ayarla')
    .addStringOption((o) =>
      o
        .setName('tip')
        .setDescription('giris mi cikis mi')
        .setRequired(true)
        .addChoices({ name: 'giris', value: 'giris' }, { name: 'cikis', value: 'cikis' }),
    )
    .addStringOption((o) =>
      o
        .setName('mesaj')
        .setDescription('yeni mesaj - {uye} {uyeadi} {etiket} {sunucu} {uyesayisi} kullanabilirsin')
        .setRequired(true)
        .setMaxLength(2000),
    ),

  async calistir(interaction) {
    const tip = interaction.options.getString('tip');
    const mesaj = interaction.options.getString('mesaj');
    veri.ayarKaydet(interaction.guildId, tip, 'mesaj', mesaj);

    await interaction.reply({
      content: `${tip} mesaji kaydedildi:\n>>> ${mesaj}`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
