const puppeteer = require ('puppeteer')
const fs = require ('fs')

const PRODUTO_ID = '3155250349793'

const URL = `https://br.openfoodfacts.org/produto/${PRODUTO_ID}/creme-chantilly-president`;

(async () => {
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(URL, {waitUntil: 'networkidle2'});

  await page.screenshot({path: './print.jpeg', fullPage: true});

  

  let data = await page.evaluate(()=>{

    let produto = document.querySelector('.title-1').innerText;
    let nutricao = document.querySelector('.attr_text').innerText;
    let ambiental = document.querySelector('.grade_d_title').innerHTML;

    return {
      produto,
      nutricao,
      ambiental
    }
  })

  console.log(data)

  fs.writeFile('informacaoProduto.json', JSON.stringify(data, null, 2), err => {
    if(err) throw new Error ('something went wrong')

    console.log('well done!')
  })

  await browser.close();
}) ()

