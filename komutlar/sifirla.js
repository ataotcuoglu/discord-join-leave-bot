const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const veri = require('../araclar/veri');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sifirla')
    .setDescription('ayarlari varsayilana dondur')
    .addStringOption((o) =>
      o
        .setName('tip')
        .setDescription('neyi sifirlayalim')
        .setRequired(true)
        .addChoices(
          { name: 'giris', value: 'giris' },
          { name: 'cikis', value: 'cikis' },
          { name: 'hepsi', value: 'hepsi' },
        ),
    ),

  async calistir(interaction) {
    const tip = interaction.options.getString('tip');

    if (tip === 'hepsi') {
      veri.sifirla(interaction.guildId, null);
      return interaction.reply({
        content: 'tum ayarlar sifirlandi',
        flags: MessageFlags.Ephemeral,
      });
    }

    veri.sifirla(interaction.guildId, tip);
    await interaction.reply({
      content: `${tip} ayarlari sifirlandi`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
