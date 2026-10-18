const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const veri = require('../araclar/veri');


function renkDuzelt(girdi) {
  let r = girdi.trim();
  if (!r.startsWith('#')) r = '#' + r;
  return /^#[0-9a-fA-F]{6}$/.test(r) ? r.toUpperCase() : null;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('renk')
    .setDescription('embed rengini degistir (hex kod)')
    .addStringOption((o) =>
      o
        .setName('tip')
        .setDescription('giris mi cikis mi')
        .setRequired(true)
        .addChoices({ name: 'giris', value: 'giris' }, { name: 'cikis', value: 'cikis' }),
    )
    .addStringOption((o) =>
      o
        .setName('renk')
        .setDescription('ornek: #57F287 yesil, #ED4245 kirmizi, #5865F2 mavi')
        .setRequired(true),
    ),

  async calistir(interaction) {
    const tip = interaction.options.getString('tip');
    const renk = renkDuzelt(interaction.options.getString('renk'));

    if (!renk) {
      return interaction.reply({
        content: 'gecersiz renk, hex kod yazmalisin ornek: #57F287',
        flags: MessageFlags.Ephemeral,
      });
    }

    veri.ayarKaydet(interaction.guildId, tip, 'renk', renk);
    await interaction.reply({
      content: `${tip} rengi artik ${renk}`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
