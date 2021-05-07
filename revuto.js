const fetch = require('node-fetch');
var randomize = require('randomatic');
var random = require('random-name');
const cheerio = require('cheerio');
const readline = require("readline-sync");

const functionRegist = (reff, first, last, email) => new Promise((resolve, reject) => {
    const bodys = {
        "firstName":first,"lastName":last,"email":email,"inviteToken":reff
     } 
   
       fetch('https://revuto.com/api/v1/auth/register', { 
        method: 'POST', 
        body: JSON.stringify(bodys),
        headers: {
            'Host': 'revuto.com',
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
            'Content-Type': 'application/json;charset=UTF-8',
            'Origin': 'https://revuto.com',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9,id;q=0.8,zh;q=0.7,ko;q=0.6,ja;q=0.5,zh-CN;q=0.4'
        }
       })
       .then(res => res.json())
       .then(result => {
           resolve(result);
       })
       .catch(err => reject(err))
   });

const functionGetLink = (nickname, domain) =>
   new Promise((resolve, reject) => {
       fetch(`https://generator.email/`, {
           method: "get",
           headers: {
               'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
               'accept-encoding': 'gzip, deflate, br',
               'accept-language': 'en-US,en;q=0.9',
               'cookie': `_ga=GA1.2.1434039633.1579610017; _gid=GA1.2.374838364.1579610017; _gat=1; surl=${domain}%2F${nickname}`,
               'sec-fetch-mode': 'navigate',
               'sec-fetch-site': 'same-origin',
               'upgrade-insecure-requests': 1,
               'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36'
           }
       })
       .then(res => res.text())
            .then(text => {
                const $ = cheerio.load(text);
                const src = $("#email-table > div.e7m.row.list-group-item > div.e7m.col-md-12.ma1 > div.e7m.mess_bodiyy > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > a").attr('href')
                resolve(src);
            })
            .catch(err => reject(err));
});

const functionSetPassword = (idChange) => new Promise((resolve, reject) => {
    const bodys = {
        "token":idChange,"password":"Berak321#"
     } 
   
       fetch('https://revuto.com/api/v1/auth/set-password', { 
        method: 'POST', 
        body: JSON.stringify(bodys),
        headers: {
            'Host': 'revuto.com',
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
            'Content-Type': 'application/json;charset=UTF-8',
            'Origin': 'https://revuto.com',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9,id;q=0.8,zh;q=0.7,ko;q=0.6,ja;q=0.5,zh-CN;q=0.4'
        }
       })
       .then(res => res.json())
       .then(result => {
           resolve(result);
       })
       .catch(err => reject(err))
   });

(async () => {
    const reff = readline.question('[?] Reff code: ')
    const jml = readline.question('[?] Jumlah reff: ')
    console.log("")
    for(var i = 0; i < jml; i++){
        try {
            const first = random.first()
            const last = random.last()
            const rand = randomize('0', 5)
            const domain = `gddao.com`
            const email = `${first}${rand}@${domain}`.toLocaleLowerCase()
            console.log(`[+] Email: ${email}`)
            const regist = await functionRegist(reff, first, last, email)
            if(regist.hasOwnProperty('id')){
                console.log('[+] Berhasil mengirim link')
                do {
                    var getLink = await functionGetLink(`${first}${rand}`, domain)
                    console.log('[!] Mencoba mendapatkan link..')
                } while (getLink == undefined)
                const idChange = getLink.split('/')[4]
                const changePwd = await functionSetPassword(idChange)
                if(changePwd.hasOwnProperty('token')){
                    console.log('[+] Set password sukses\n')
                } else {
                    console.log(`[!] Failed set password !\n`)
                }
            } else {
                console.log('[!] Gagal mengirim link !\n')
            }
        } catch (e) {
            console.log(e)
        }
    }
})()
