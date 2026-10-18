const { SlashCommandBuilder, MessageFlags, EmbedBuilder } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder().setName('yardim').setDescription('komutlari listele'),

  async calistir(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('komutlar')
      .setColor('#5865F2')
      .setDescription('sunucuya giren/cikan uyeler icin otomatik mesaj atan bot')
      .addFields(
        {
          name: 'ayarlar',
          value: [
            '/kanal - mesajin gidecegi kanali sec (once bunu yap)',
            '/mesaj - giris/cikis mesajini yaz',
            '/baslik - embed basligini degistir',
            '/gorsel - resim/gif ekle veya kaldir',
            '/renk - embed rengini degistir',
            '/aktif - sistemi ac/kapat',
          ].join('\n'),
        },
        {
          name: 'diger',
          value: ['/test - onizleme goster', '/ayarlar - mevcut ayarlari gor', '/sifirla - ayarlari sifirla'].join('\n'),
        },
        {
          name: 'degiskenler',
          value: '{uye} {uyeadi} {etiket} {sunucu} {uyesayisi}',
        },
      );

    await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
  },
};
