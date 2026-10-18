const { SlashCommandBuilder, MessageFlags, ChannelType } = require('discord.js');
const veri = require('../araclar/veri');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kanal')
    .setDescription('mesajlarin gonderilecegi kanali sec')
    .addStringOption((o) =>
      o
        .setName('tip')
        .setDescription('giris mi cikis mi')
        .setRequired(true)
        .addChoices({ name: 'giris', value: 'giris' }, { name: 'cikis', value: 'cikis' }),
    )
    .addChannelOption((o) =>
      o
        .setName('kanal')
        .setDescription('mesajlarin atilacagi metin kanali')
        .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
        .setRequired(true),
    ),

  async calistir(interaction) {
    const tip = interaction.options.getString('tip');
    const kanal = interaction.options.getChannel('kanal');
    veri.ayarKaydet(interaction.guildId, tip, 'kanal', kanal.id);

    await interaction.reply({
      content: `${tip} mesajlari artik ${kanal} kanalina gidecek`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
