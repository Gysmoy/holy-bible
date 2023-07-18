import { load } from "cheerio";

const Tiktok = async (url) => {
    const formdata = new FormData();
    formdata.append("url", url);

    const options = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    let res = await fetch('https://tikcd.com/en/video/info', options)
    let data = await res.text()

    let $ = load(data)
    let body = $('body')

    const image = body.find('.avatar').attr('src')
    const author = body.find('h2').text().trim()
    const description = body.find('.description').text().trim()
    const link = url.replace('https://', '')
    const formats = [
        {
            value: 'mp4',
            label: 'Video'
        },
        {
            value: 'mp3',
            label: 'Audio'
        }
    ]
    const links = { mp4: [], mp3: [] }
    body.find('.tiktok-downloader-button-container').children().each(function () {
        let child = $(this).find('a')
        let link = child.attr('href')
        let label = child.text().trim()
        if (link.includes('/download/')) {
            links.mp4.push({ link, label })
        } else if (link.includes('/music/')) {
            links.mp3.push({ link, label })
        }
    })

    return { image, author, description, link, formats, links, related: [] }
}

export default Tiktok