import * as  https from 'https' ;
import * as querystring from 'querystring'
import * as md5 from 'md5'

import {appid, appSecret } from '../private_data'
import { type } from 'os';

export const translate = (q:string)=>{
  let from = 'en'
  let to = 'zh'
  if(!/[a-zA-Z]/.test(q[0])){
    from = 'zh'
    to = 'en'
  }
  let salt:number = Math.random()
  const sign = md5(appid+q+salt+appSecret)
  const query:string  = querystring.stringify({
    q,
    from,
    to,
    appid,
    salt, // 随机数
    sign, // 密钥
  })
  const options = {
    hostname: 'fanyi-api.baidu.com',
    port: 443,
    path: '/api/trans/vip/translate?' + query,
    method: 'GET'
  };
  const request = https.request(options, (response) => {
    const chunks = []
    response.on('data', (chunk) => {
      chunks.push(chunk)
    });
    response.on('end', () => {
      type BaiduResult = {
        from:string;
        to:string;
        trans_result:{
          src:string;
          dst:string;
        }[];
        error_code?:string;
        error_msg?:string;
      }
      const data:BaiduResult = JSON.parse(Buffer.concat(chunks).toString())
      if (data.error_code){
        console.log(data.error_code+':','太难了我翻译不出来呀！！！')
        process.exit(2)
      }else{
        console.log(data.trans_result[0])
        process.exit(0)
      }
    });
  });
  request.on('error', (e) => {
    console.error(e);
  });
  request.end();
}