const puppeteer = require('puppeteer')
const connectDB = require('./connectDB')
const exportData = require('./exportData')

const URL = 'https://www.eurosystems-motorgeraete.de/geraete/'

// selectors for navigation to target pages
const ITEM_CLASSNAME = '.machinery-item'
const LINK_CLASSNAME = '.raquo'

// selectors of target data to get
const CATEGORY_SELECTOR = 'h1'
const NAME_SELECTOR = 'h2'
const PRICE_XPATH = '//*[@id="btn-group-2"]/span/span[1]'

async function run (url) {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto(url)

    // sleep for 1 second
    await new Promise(r => setTimeout(r, 1000))

    let links_list = []
    const items = await page.$$(ITEM_CLASSNAME)
    for (let item of items) {
        const links = await item.$$(LINK_CLASSNAME)
        for (let link of links) {
            links_list.push(await (await link.getProperty('href')).jsonValue())
        }
    }
    
    let counter = 1
    for (let link of links_list) {
        console.log(`Iteration: ${counter}`)
        await page.goto(link)

        // sleep for 1 second
        await new Promise(r => setTimeout(r, 1000))

        // getting target data
        const category = await page.$eval(CATEGORY_SELECTOR, el => el.textContent)
        const name = await page.$eval(NAME_SELECTOR, el => el.textContent)
        const [element] = await page.$x(PRICE_XPATH)
        const price = await(await element.getProperty('textContent')).jsonValue()

        const obj = {
            category: category,
            name: name,
            price: price,
            timestamp: Math.floor(Date.now() / 1000)
        }

        // export data to MongoDB 
        exportData(obj)
        counter ++
    }
}

connectDB() // mongoDB connection
run(URL) // start