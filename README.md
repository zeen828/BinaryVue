# 二元期權

## 版本
2021-06-11 測試版

## 專案
### 安裝
```bash
npm install
```

### 運作
```bash
npm run serve
npm run serve-dev
npm run serve-pro
```

### 打包
```bash
npm run build
npm run build-dev
npm run build-pro
```

### Lints and fixes files
```bash
npm run lint
```

## 專案函式
### 多國語系i18n
```bash
npm install -save vue-i18n
```

## 專案樣式
### RWD樣式Bootstrap 4
```bash
npm install -save bootstrap jquery popper.js
```

### Icons[Vue-Awesome](https://github.com/Justineo/vue-awesome#vue-awesome) for [Icon](https://fontawesome.com/)
```bash
npm install -save vue-awesome
```

### 圖表[Vue-ECharts](https://github.com/ecomfe/vue-echarts)
```bash
npm i -D @vue/composition-api
npm install echarts vue-echarts
```

## 規劃
1. App.vue
    1. 透過URL做登入行為(token)
    http://127.0.0.1:8080/?token=123465
    2. 把幾一些不常更新的資料回存到Vuex
2. Index.vue
    1. 取得不需要經常性更新資料(會員資料，二元商品資料)
    2. 取得需要連動資料(投注規則)
    3. 監聽選擇`連動資料`更新
3. components
    1. 各元件自己處理

## 寶塔布署紀錄
1. 網站配置文件增加(路由404問題)
```bash
    #vue-router Nginx配置
    location / {
        try_files $uri $uri/ @router;
        index index.html;
    }
    location @router {
        rewrite ^.*$ /index.html last;
    }
```
