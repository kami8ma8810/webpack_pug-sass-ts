const env = require('./env.js') //環境変数
const url = '/'
const dev_url = env.BASE_DIR
const local_url = env.BASE_DIR

const site_name = 'サイトタイトル'
const og_locale = 'jp_JP'
const og_type = 'website'
// const ogimg = url + 'img/ogp.png'
const twitter_card = 'summary_large_image'
const twitter_site = '@'

const title = {
  pagelist: site_name,
  home: site_name,
  about: 'xxxx' + ' | ' + site_name,
}
const description = {
  pagelist: '',
  home: '',
  about: '',
}
const keywords = {
  pagelist: '',
  home: '',
  about: '',
}
const ogimg = {
  pagelist: url + 'img/ogp.png',
  home: url + 'img/ogp.png',
  about: url + 'img/ogp.png',
}

let path
if (env.PATH_TYPE === 'root') {
  path = {
    pagelist: local_url,
    home: local_url,
    about: local_url,
  }
} else if (env.PATH_TYPE === 'relative') {
  path = {
    pagelist: './',
    home: './',
    about: '../',
  }
}

const favicon = url + 'img/favicon.ico'

module.exports = {
  pages: [
    {
      name: 'pagelist',
      url: url + 'pagelist.html',
      dev_url: dev_url + 'pagelist.html',
      local_url: local_url + 'pagelist.html',
      title: '画面一覧',
      page_title: '画面一覧',
      path: '',
      level: 0,
      description: '',
      keywords: '',
      favicon: favicon,
      og: {
        title: '',
        description: '',
        image: '',
        type: og_type,
        locale: '',
        siteName: '',
        url: '',
      },
      twitter: {
        title: '',
        description: '',
        image: '',
        card: '',
        site: '',
        url: '',
        text: '',
      },
      dev_state: '',
    },
    {
      name: 'home',
      url: url,
      dev_url: dev_url,
      local_url: local_url,
      title: title['home'],
      page_title: 'トップページ',
      path: path['home'],
      level: 1,
      description: description['home'],
      keywords: keywords['home'],
      favicon: favicon,
      og: {
        title: title['home'],
        description: description['home'],
        image: ogimg['home'],
        type: og_type,
        locale: og_locale,
        siteName: site_name,
        url: url,
      },
      twitter: {
        title: title['home'],
        description: description['home'],
        image: ogimg['home'],
        card: twitter_card,
        site: twitter_site,
        url: url,
        text: '',
      },
      dev_state: '',
    },
    {
      name: 'about',
      url: url + 'about/',
      dev_url: dev_url + 'about/',
      local_url: local_url + 'about/',
      title: title['about'],
      page_title: 'xxxページ',
      path: path['about'],
      level: 1,
      description: description['about'],
      keywords: keywords['about'],
      favicon: favicon,
      og: {
        title: title['about'],
        description: description['about'],
        image: ogimg['about'],
        type: og_type,
        locale: og_locale,
        siteName: site_name,
        url: url + 'about/',
      },
      twitter: {
        title: title['about'],
        description: description['about'],
        image: ogimg['about'],
        card: twitter_card,
        site: twitter_site,
        url: url + 'about/',
        text: '',
      },
      dev_state: '',
    },
  ],
  paths: {
    img: local_url + 'img/',
    css: local_url + 'css/',
    js: local_url + 'js/',
    font: local_url + 'font/',
    movie: local_url + 'movie/',
  },
  links: {
    twitter: '',
  },
}
