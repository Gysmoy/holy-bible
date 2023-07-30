import { load } from "cheerio";
import { Linking } from "react-native";
import SaveFile from "../utils/SaveFile";

const Tiktok = async (url) => {
  try {
    let res1 = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
      },
      redirect: 'follow'
    });
    if (res1.status == 404) {
      throw new Error('El video no está disponible')
    }
    let data1 = await res1.text()

    let html1 = load(data1)('body')

    if (html1.find('.tiktok-1afuipw-DivPhotoControl').html()) {
      throw new Error('La función de slides aún no está disponible')
    }

    let type = 'download'
    let image = html1.find('.tiktok-j6dmhd-ImgPoster').attr('src')
    let avatar = html1.find('.tiktok-1zpj2q-ImgAvatar').attr('src')
    let description = html1.find('.tiktok-j2a19r-SpanText').text().trim()
    let author = html1.find('.tiktok-1xccqfx-SpanNickName').text().trim()

    const formdata = new FormData();
    formdata.append("url", url);
    let res2 = await fetch('https://tikcd.com/en/video/info', {
      method: 'POST',
      body: formdata,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
      },
      redirect: 'follow'
    })
    let data2 = await res2.text()

    let $ = load(data2)
    let body = $('body')

    const link = url.replace('https://', '')
    const formats = [
      { value: 'mp4', label: 'Video' },
      { value: 'mp3', label: 'Audio' }
    ];
    const links = { mp4: [], mp3: [] }
    body.find('.tiktok-downloader-button-container').children().each(function () {
      let child = $(this).find('a')
      let link = child.attr('href')
      let label = child.text().trim()
      let ext = 'mp4'
      if (link.includes('/download/')) {
        ext = 'mp4'
      } else if (link.includes('/music/')) {
        ext = 'mp3'
      }
      let callback = async () => {
        // El archivo intenta guardarse, si falla abre el link
        try {
          const filename = `sode_tiktok_${Date.now()}.${ext}`
          await SaveFile.byURI(link, filename)
          return { status: true, message: 'Operación correcta' }
        } catch (error) {
          console.trace(error)
          // Linking.openURL(link)
          //   .catch((error) => {
          //     console.error('Error al abrir el enlace:', error);
          //   });
          return { status: false, message: error.message, link }
        }
      }
      if (link.includes('/download/')) {
        links.mp4.push({ link, label, callback })
      } else if (link.includes('/music/')) {
        links.mp3.push({ link, label, callback })
      }
    })

    if (description.includes('not available')) {
      throw new Error('Video no disponible')
    }

    return { status: true, message: 'Operación correcta', type, media: { image, avatar, author, description, link, formats, links }, related: [] }
  } catch (error) {
    return { status: false, message: `TikTok Error: Error al obtener datos del video. ${error.message}`, related: [] }
  }
}

export default Tiktok