const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const veri = require('../araclar/veri');
const { embedOlustur } = require('../araclar/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('mesajin nasil gorundugunu goster (sadece sana)')
    .addStringOption((o) =>
      o
        .setName('tip')
        .setDescription('giris mi cikis mi')
        .setRequired(true)
        .addChoices({ name: 'giris', value: 'giris' }, { name: 'cikis', value: 'cikis' }),
    ),

  async calistir(interaction) {
    const tip = interaction.options.getString('tip');
    const ayar = veri.guildAyari(interaction.guildId, tip);

    
    const embed = embedOlustur(ayar, interaction.member);
    const not = ayar.kanal ? '' : '\nnot: bu tip icin henuz kanal secilmemis, /kanal ile sec';

    await interaction.reply({
      content: `iste onizleme${not}`,
      embeds: [embed],
      flags: MessageFlags.Ephemeral,
    });
  },
};
