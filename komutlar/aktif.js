const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const veri = require('../araclar/veri');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('aktif')
    .setDescription('giris/cikis mesajlarini ac veya kapat')
    .addStringOption((o) =>
      o
        .setName('tip')
        .setDescription('giris mi cikis mi')
        .setRequired(true)
        .addChoices({ name: 'giris', value: 'giris' }, { name: 'cikis', value: 'cikis' }),
    )
    .addBooleanOption((o) =>
      o.setName('durum').setDescription('acik olsun mu').setRequired(true),
    ),

  async calistir(interaction) {
    const tip = interaction.options.getString('tip');
    const durum = interaction.options.getBoolean('durum');
    veri.ayarKaydet(interaction.guildId, tip, 'aktif', durum);

    await interaction.reply({
      content: `${tip} mesajlari ${durum ? 'acildi' : 'kapatildi'}`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
