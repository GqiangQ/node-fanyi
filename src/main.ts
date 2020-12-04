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
  console.log(https)
}