import { Linking } from "react-native";
import SaveFile from "../utils/SaveFile";

const YouTube = async (query) => {
  const formdata = new FormData();
  formdata.append("query", query);
  formdata.append("vt", "downloader");
  try {

    const res = await fetch('https://tomp3.cc/api/ajax/search', {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    });
    const data = await res.json();

    if (data.p === 'search') {
      let list = data.items.map(item => {
        return {
          id: `https://youtu.be/${item.v}`,
          image: `https://i.ytimg.com/vi/${item.v}/hqdefault.jpg`,
          title: item.t,
          uri: `youtu.be/${item.v}`
        }
      })
      return { status: true, message: 'Operación correcta', type: 'search', list }
    }

    let image = `https://i.ytimg.com/vi/${data.vid}/hqdefault.jpg`
    let author = data.a
    let description = data.title
    let link = `youtu.be/${data.vid}`
    let formats = Object.keys(data.links).map(format => {
      return {
        value: format,
        label: `Formato: ${format.toUpperCase()}`
      }
    })
    let links = {}
    formats.forEach(format => {
      for (const key in data.links[format.value]) {
        let link = data.links[format.value][key]
        const ext = format.value
        links[ext] = (links[ext] ?? [])
        links[ext].push({
          value: link.k,
          label: `${link.q} ${link.size ? `[${link.size}]` : ""}`.trim(),
          callback: async () => {
            const formdata = new FormData();
            formdata.append("vid", data.vid);
            formdata.append("k", link.k);
            let res = await fetch('https://tomp3.cc/api/ajax/convert', {
              method: 'POST',
              redirect: 'follow',
              body: formdata
            })
            let dataURI = await res.json()
            let mediaLink = dataURI.dlink

            // El archivo intenta guardarse, si falla abre el link
            try {
              const filename = `sode_youtube_${Date.now()}.${ext}`
              await SaveFile.byURI(mediaLink, filename)
              return { status: true, message: 'Operación correcta' }
            } catch (error) {
              console.trace(error)
              // Linking.openURL(mediaLink)
              //   .catch((error) => {
              //     console.error('Error al abrir el enlace:', error);
              //   });
              return { status: false, message: error.message, link: mediaLink }
            }
          }
        })
      }
    })
    let related = data.related[0].contents.map(item => {
      return {
        id: `https://youtu.be/${item.vid}`,
        image: `https://i.ytimg.com/vi/${item.vid}/hqdefault.jpg`,
        title: item.title,
        uri: `youtu.be/${item.vid}`
      }
    })

    return { status: true, message: 'Operación correcta', type: 'download', media: { image, author, description, link, formats, links }, related }
  } catch (error) {
    return { status: false, message: `YouTube Error: Error al obtener datos del video. ${error.message}`, related: [] }
  }
}

export default YouTube