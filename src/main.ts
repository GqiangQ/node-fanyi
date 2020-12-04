import * as  https from 'https' ;
import * as querystring from 'querystring'
import * as md5 from 'md5'

export const translate = (word)=>{
  const query:string  = querystring.stringify({
    q:word,
    from: 'en',
    to: 'zh',
    appid: '',
    salt:Math.random(),
    sing: md5('123'),
  })
  const options = {
    hostname: 'fanyi-api.baidu.com',
    port: 443,
    path: '/api/trans/vip/translate',
    method: 'GET'
  };
  const req = https.request(options, (res) => {
    console.log('状态码:', res.statusCode);
    console.log('请求头:', res.headers);
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });
  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
}