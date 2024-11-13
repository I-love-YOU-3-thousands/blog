---
sort: 3
sideName: 场景再现
title: 场景再现
---

# 场景面试攻略

## 1.前端如何实现截图

:::: details 前端实现截图需要使用 HTML5 的 Canvas 和相关 API,具体步骤如下

1.首先在页面中创建一个 Canvas 元素,并设置宽高和样式

2.使用 Canvas API 在 Canvas 上绘制需要截图的内容,比如页面的某个区域、某个元素、图片等

3.调用 Canvas API 中的 toDataURL()方法将 Canvas 转化为 base64 编码的图片数据

4.将 base64 编码的图片数据传递给后端进行处理或者直接在前端进行显示
::: details 以下是一个简单的例子,实现了对 DOM 下的截图

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <title>截图⽰例</title>
    <style>
      p {
        color: red;
        width: 200px;
      }

      img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
      }

      h1 {
        color: #ff4040;
        border: 2px solid #ccc;
        width: 200px;
      }
    </style>
  </head>

  <body>
    <div id="content">
      <header>
        <p>这是⼀个简单的截图⽰例。</p>
      </header>
      <main>
        <img
          src="https://inews.gtimg.com/om_bt/Os3eJ8u3SgB3Kd-zrRRhgfR5hUvdwcVPKUTNO6O7sZfUwAA/641"
          mode="scaleToFill"
        />
      </main>
      <footer></footer>
    </div>

    <button onclick="dom2base64(document.getElementById('content'))">
      DOM -> Canvas
    </button>
    <script>
      // 获取所有子元素,需要绘制DOM到Canvas上
      const DFSDomTraversal = (root) => {
        if (!root) return;
        const arr = [],
          queue = [root];
        let node = queue.shift();
        while (node) {
          arr.push(node);
          if (node.children.length) {
            for (let i = node.children.length - 1; i >= 0; i--) {
              queue.unshift(node.children[i]);
            }
          }
          node = queue.shift();
        }
        return arr;
      };

      // 复制样式
      // 所有要复制的元素都要写在这里
      const CSSRules = ["color", "border", "width", "height", "border-radius"];

      const copyStyles = (element) => {
        const styles = getComputedStyle(element);

        CSSRules.forEach((rule) => {
          element.style.setProperty(rule, styles.getPropertyValue(rule));
        });

        // 复制标签本身已有的样式
        // const computedStyles = getComputedStyle(element);
        // for (let i = 0; i < computedStyles.length; i++) {
        //     const rule = computedStyles[i]
        //     if (!CSSRules.includes(rule)) {
        //         element.style.setProperty(rule, computedStyles.getPropertyValue(rule));
        //     }
        //     // element.style.setProperty(rule, computedStyles.getPropertyValue(rule))
        // }
      };

      // 处理图像资源
      const img2base64 = (element) => {
        return new Promise((resolve, reject) => {
          const img = new Image();

          // 处理Canvas受污染情况
          img.crossOrigin = "anonymous";
          img.onerror = reject;
          img.onload = function () {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = this.naturalWidth;
            canvas.height = this.naturalHeight;
            ctx.drawImage(this, 0, 0);
            console.log(canvas.toDataURL(), "xxxxx");

            resolve(canvas.toDataURL());
          };
          img.src = element.src;
        });
      };

      // 序列化DOM
      // let XHTML = new XMLSerializer().serializeToString(root)
      // const SVGDomElement = `<svg xmlns = "http://www.w3.org/2000/svg" height="${height}" width="${width}"> <foreignObject height="100%" width="100%">${XHTML}</foreignObject> </svg>`

      // 最终完整步骤如下
      const dom2base64 = async (root, dpr = window.devicePixelRatio) => {
        DFSDomTraversal(root).forEach(copyStyles);

        const imgElements = [...root.querySelectorAll("img")];

        const base64Result = await Promise.all(imgElements.map(img2base64));

        const width = root.offsetWidth;
        const height = root.offsetHeight;
        let XHTML = new XMLSerializer().serializeToString(root);

        imgElements.forEach((element, index) => {
          XHTML = XHTML.replace(element.src, base64Result[index]);
        });

        const SVGDomElement = `<svg xmlns="http://www.w3.org/2000/svg" height="${height}" width="${width}"> <foreignObject height="100%" width="100%">${XHTML}</foreignObject> </svg>`;

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // canvas.width = width;
        // canvas.height = height;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const img = new Image();

        img.onload = function () {
          ctx.scale(dpr, dpr);
          ctx.drawImage(this, 0, 0);

          document.body.appendChild(canvas);
        };

        img.src = `data:image/svg+xml,${SVGDomElement}`;
      };
    </script>
  </body>
</html>
```

:::

::::

具体实现截图的方法还有很多,比如使用第三方库或者插件等。下面是两个常用的实现截图的方法以及原理:[点击进入](https://juejin.cn/post/7400319811358818340?searchId=20241101133042B8ECA0AB26CCD0028F23)

## 2.当 QPS 达到峰值时，该如何处理

:::: details 当 QPS 达到峰值时，可以从以下几个方面进行优化 1.数据库优化：数据库的优化包括优化 SQL 语句、使用索引、避免全表扫描、分表分库等措施，以提高数据库的读写性能。

2.缓存优化：缓存可以降低对数据库的访问频率，提高响应速度。可以使用 Redis、Memcached 等缓存技术，减轻服务器负载。

3.代码优化：优化代码可以提高代码的执行效率，减少不必要的开销。可以通过一些优化手段，如减少不必要的代码执行、避免循环嵌套、避免不必要的递归调用等来提高代码的性能。

4.负载均衡：负载均衡可以将请求分发到多个服务器上，减少单个服务器的负载，提高整个系统的性能和可用性。

5，异步处理：将一些计算量大、耗时长的操作异步处理，减少对主线程的阻塞，提高响应速度。

6.CDN 加速：使用 CDN 技术可以将静态资源缓存到 CDN 节点上，提高资源的加载速度，减少服务器的负载。

7.硬件升级：可以通过升级服务器硬件，增加带宽等方式来提高系统的处理能力。

::::

## 3.js 超过 Number 最大值的数怎么处理

在 javascript 中，超过 Number.MAX_VALUE（（2^1023 - 1）\* 2^971）的数值被认为是 Infinity（正无穷大），当处理该数值时：
:::: details 使用第三方库，如 big.js 或 bignumber.js。例如：使用 big.js 库来处理时

```js
const big = require("big.js");
const x = new big("9007199254740993");
const y = new big("100000000000000000");
const result = x.plus(y);
console.log(result.toString()); // 输出：100009007194925474093
```

这里创建了两个 big.js 对象 x 和 y，分别存储了超过 Number.MAX_VALUE 的数值，通过 plus 相加，得到正确结果。
::::

:::: details 不依赖外部库，处理如下：
可以使用 BinInt 类型来处理，它可以表示任意精度的整数。使用 BinInt 类型时，需要在数值后面加一个 n 后缀来表示 BigInt 类型。例如：

```js
const bigNum = 9007199254740993n; // 注意：数字后⾯添加了 'n' 后缀
```

注：BinInt 是 ECMAScript 2020 新增的特性，因此在某些浏览器中可能不被支持。
::::

## 4.使用同一个链接，如何实现 PC 打开是 web 应用、手机打开是一个 H5 应用

:::: details 可以通过根据请求来源（User-Agent）来判断访问设备类型，然后再服务器端进行适配。例如，可以在服务器端使用 Node.js 的 Express 框架，在路由中对不同的 User-Agent 进行判断，返回不同的页面或数据，具体实现可以参考以下步骤： 1.根据 User-Agent 判断访问设备的类型，例如判断是否为移动设备。可以使用第三方库如 ua-parser-js 进行 User-Agent 的解析。

2.如果是移动设备，可以返回一个 H5 页面或接口数据。

3.如果是 PC 设备，可以返回一个 web 应用页面或接口数据。

::::

## 5.如何保证用户的使用体验

:::: details 主要从以下几个方面思考问题：

1. 性能⽅向的思考

2. 用⼾线上问题反馈，线上 on call 的思考

3. ⽤⼾使⽤体验的思考，交互体验使⽤⽅向

4. 提升⽤⼾能效⽅向思考
   ::::

## 6.如何解决页面请求接口大规模并发问题

:::: details 不仅仅包含了接口并发，还有前端资源下载的请求并发。可以从以下几个方面来考虑如何解决：

1. 后端优化：对接口进行优化，采用缓存技术，对数据进行预处理，减少数据库操作等。使用集群技术，将请求分散到不同服务器上，提高并发量。另外可以使用反向代理、负载均衡等技术，分担服务器压力。

2. 做 BFF 聚合：把所有首屏需要依赖的接口，利用服务中间层聚合为一个接口

3. CDN 加速：使用 CDN 缓存技术可以有效减少服务器请求压力，提高网站访问速度。CDN 缓存可以将接口数据存储在缓存服务器中，减少对原始服务器的访问，加速数据传输速度。

4. 使用 WebSocket：使用 WebSocket 可以建立一个持久的连接，避免反复连接请求。WebSocket 可以实现双向通信，大幅降低服务器响应时间。

5. 使用 HTTP2 及其以上版本，使用多路复用。

6. 使用浏览器缓存技术：强缓存、协商缓存、离线缓存、Service Worker 缓存等方向。

7. 聚合一定量的静态资源：提取页面公用复用部分代码打包到一个文件、对图片进行雪碧图处理，多个图片只下载一个图片。

8. 采用微前端工程架构：只对当前访问页面的静态资源进行下载，而不是下载整站静态资源。

9. 使用服务端渲染技术：从服务端把页面首屏直接渲染好返回，就可以避免掉首屏需要的数据在做额外加载和执行。
   ::::

## 7.设计一套全站请求耗时统计工具

:::: details 从代码层面上统计全站所有请求的耗时方式主要有以下几种:

1. Performance API: Performance API 是浏览器提供的一组 API,可以用于测量网页性能。通过 Performance API,可以获取页面各个阶段的时间、资源加载时间等。其中,Performance Timing API 可以获取到每个资源的加载时间从而计算出所有请求的耗时。

2. XMLHttpRequest 的 load 事件: 在发送 XMLHttpRequest 请求时,可以为其添加 load 事件,在请求完成时执行回调函数,从而记录请求的耗时。

3. fetch 的 Performance API: 类似 XMLHttpRequest,fetch 也提供了 Performance API 获取请求耗时。

4. 自定义封装的请求函数:可以自己封装一个请求函数,在请求开始和结束时记录时间,从而计算请求耗时。

::::

:::: details 设计一套前端全站请求耗时统计工具,可以遵循以下步骤:

1. 实现一个性能监控模块,用于记录每个请求的开始时间和结束时间,并计算耗时。

2. 在应用入口处引入该模块,将每个请求的开始时间记录下来。

3. 在每个请求的响应拦截器中,记录响应结束时间,并计算请求耗时。

4. 将每个请求的耗时信息发送到服务端,以便进行进一步的统计和分析。

5. 在服务端实现数据存储和展示,可以使用图表等方式展示请求耗时情况。

6. 对于请求耗时较长的接口,可以进行优化和分析,如使用缓存、使用异步加载、优化查询语句等。

7. 在前端应用中可以提供开关,允许用户自主开启和关闭全站请求耗时统计功能。

::: details 以下是一个简单示例:

```js
// performance.jsconst
performance = {
  timings: {},
  config: { reportUrl: "/report" },
  init() {
    // 监听所有请求的开始时间
    window.addEventListener("fetchStart", (event) => {
      this.timings[event.detail.id] = { startTime: Date.now() };
    });
    // 监听所有请求的结束时间，并计算请求耗时
    window.addEventListener("fetchEnd", (event) => {
      const id = event.detail.id;
      if (this.timings[id]) {
        const timing = this.timings[id];
        timing.endTime = Date.now();
        timing.duration = timing.endTime - timing.startTime;
        // 将耗时信息发送到服务端
        const reportData = {
          url: event.detail.url,
          method: event.detail.method,
          duration: timing.duration,
        };
        this.report(reportData);
      }
    });
  },
  report(data) {
    // 将耗时信息发送到服务端
    const xhr = new XMLHttpRequest();
    xhr.open("POST", this.config.reportUrl);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
  },
};
export default performance;
```

在应用入口处引入该模块

```js
// main.js
import performance from "./performance";
peformance.init();
```

在每个请求的相应拦截器中触发 fetchEnd 事件:

```js
// fetch.js
import EventBus from "./EventBus";
const fetch = (url, options) => {
  const id = Math.random().toString(36).slice(2);
  const fetchStartEvent = new CustomEvent("fetchStart", {
    detail: {
      id,
      url,
      method: options.method || "GET",
    },
  });
  EventBus.dispatchEvent(fetchStartEvent);
  return window.fetch(url, options).then((response) => {
    const fetchEvent = new CustomEvent("fetchEnd", {
      detail: {
        id,
        url,
        method: options.method || "GET",
      },
    });
    EventBus.dispatchEvent(fetchEvent);
    return response;
  });
};
export default fetch;
```

在服务端实现数据存储和展示,可以使用图表等方式展示请求耗时
:::
::::

## 8.大文件上传

:::: details 大文件分片上传

如果太大的文件,比如一个视频 1G,2G 那么大,直接上传可能会出现链接超时的情况,而且也会超过服务端允许上传文件的大小限制,要解决这个问题可以将文件进行分片上传,每次只上传一部分.

Blob 表示原始数据,也就是二进制数据,同时提供了对数据截取的方法 slice,而 File 继承了 Blob 的功能,所以可以直接使用此方法对数据进行分片.

::: details 过程如下:
把大文件进行分段,发送到服务器携带一个标志,暂时用当前的时间戳,用于标识一个完整的文件

服务端保存各段文件

浏览器所有分片上传完成,发送给服务端一个合并文件的请求

服务端根据文件标识、类型、各分片顺序进行文件合并

合并完成后,删除分片文件

:::

::: details 客户端 JS 代码实现如下

```js
function submitUpload() {
  var chunkSize = 2 * 1024 * 1024; // 2MB
  var file = document.getElementById("f1").files[0];
  var chunks = []; // 保存分片数据
  token = +new Date(); //时间戳
  (name = file.name), (chunkCount = 0), (sendChunkCount = 0);
  // 拆分文件,像字符串一样
  if (file.size > chunkSize) {
    // 拆分文件
    var start = 0,
      end = 0;
    while (true) {
      end += chunkSize;
      var blob = file.slice(start, end);
      start += chunkSize;
      // 截取的数据为空 则结束
      if (!blob.size) {
        // 拆分结束
        break;
      }
      chunks.push(blob); //保存分段数据
    }
  } else {
    chunks.push(file.slice(0));
  }

  chunkCount = chunks.length; //分片的个数
  //没有做并发限制,较大文件导致并发过多,tcp链接被占光,需要做下并发控制,比如只有四个在请求在发送
  for (var i = 0; i < chunkCount; i++) {
    var fd = new FormData();
    fd.append("token", token);
    fd.append("f1", chunks[i]);
    fd.append("index", i);
    xhrSend(fd, function () {
      sendChunkCount += 1;
      if (sendChunkCount === chunkCount) {
        // 上传完成,发送合并请求
        var formD = new FormData();
        formD.append("type", "merge");
        formD.append("token", token);
        formD.append("chunkCount", chunkCount);
        formD.append("filename", name);
        xhrSend(formD);
      }
    });
  }
}

function xhrSend(fd, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8100/", true);
  xhr.onreadystatechange = function () {
    console.log("state change", xhr.readyState);
    if (xhr.readyState == 4) {
      console.log(xhr.responseText);
      cb && cb();
    }
  };
  xhr.send(fd); //发送
}

// 绑定提交事件
document.getElementById("btn-submit").addEventListener("click", submitUpload);
```

:::

::: details 服务端 node 实现代码如下: 合并文件这里用的 stream pipe 实现,这样更节省内存,边读边写入,占用内存更小,效率更高

```js
// 二次处理文件,修改名称
app.use((ctx)=>{
    var body = ctx.request.body
    var files = ctx.request.files? ctx.request.files.f1 : [] //得到上传文件的数组
    var result = []
    var fileToken = ctx.request.body.token // 文件标识
    var fileIndex = ctx.request.body.index //文件顺序
    if(files &&　!Array.isArray(files)){
        // 单文件上传容错
        files = [files]
    }
    files && files.forEach(item=>{
         var path = item.path;
         var fname = item.name //原文件名称
         var nextPath = path.slice(0,path.lastIndexOf('/')+1) + fileIndex + '-'fileToken
         if(item.size>0 && path){
            // 得到扩展名
            var extArr = fname.split('.');
            var ext = extArr[extArr.length-1];
            var nextPath = path + '.' + ext //重命名文件
            fs.renameSync(path,nextPath);
            result.push(uploadHost + nextPath.slice(nextPath.lastIndexOf('/') + 1))
         }
    })

    if(body.type === 'merge'){
        // 合并分片文件
        var fileName = body.fileName, chunkCount = body.chunkCount, folder = path.resolve(__dirname,'../static/uploads') + '/';
        var writeStream = fs.createWriteStream(${folder}${fileName})
        var cindex = 0;
        // 合并文件
        function fnMergeFile(){
            var fname = ${folder}${cindex}-${fileToken};
            var readStream = fs.createReadStream(fname);
            readStream.pipe(writeStream,{end:false})
            readStream.on('end',function(){
                fs.unlink(fname,function(err){
                    if(err){
                        throw err
                    }
                })
                if(cindex + 1 < chunkCount){
                    cindex += 1
                    fnMergeFile()
                }
            })
        }

        fnMergeFile()
        ctx.body = 'merge ok 200'
    }
})
```

:::
::::

:::: details 大文件上传断点续传
上面实现了文件分片上传和最终的合并,现在要做的就是如何检测这些分片,不在重新上传即可.可以在本地进行保存已上传成功的分片,重新上传的时候使用 spark-md5 生成文件 hash,区分此文件是否已上传
::: details 方案一:保存在本地 indexDB/localStorage 等地方,推荐使用 localForage 这个库
客户端 JS 代码实现如下:

```js
// 获得本地缓存数据
function getUploadedFromStorage() {
  return JSON.parse(localforage.getItem("saveChunkKey") || "{}");
}

// 写入缓存
function setUploadedToStorage(index) {
  var obj = getUploadedFromStorage();
  obj[index] = true;
  localforage.setItem(saveChunkKey, JSON.stringify(obj));
}

// 分段对比
var uoloadedInfo = getUploadedFromStorage(); //获得已上传的 分段信息
for (var i = 0; i < chunkCount; i++) {
  console.log("index", i, uploadedInfo[i] ? "已上传过" : "未上传");
  if (uploadedInfo[i]) {
    // 对比分段
    sendChunkCount = i + 1; //记录已上传的索引 continue 如果已上传则跳过
  }
  var fd = new FormData(); // 构造FormData对象
  fd, append("token", token);
  fd.append("f1", chunks[i]);
  fd,
    append(
      "index",
      i
    )(function (index) {
      xhrSend(fd, function () {
        sendChunkCount += 1; //将成功信息保存到本地
        setUploadedToStorage(index);
        if (sendChunkCount === chunkCount) {
          console.log("上传完成，发送合并请求");
          var formD = new FormData();
          formD.append("type", "merge");
          formD.append("token", token);
          formD.append("chunkCount", chunkCount);
          formD.append("filename", name);
          xhrSend(formD);
        }
      });
    })(i);
}
```

:::

::: details 方案二:服务端用于保存分片坐标信息,返回给前端
需要服务端添加一个接口只是服务端需要增加一个接口.基于上面一个例子进行改进,服务端已保存了部分片段,客户端上传前需要从服务端获取已上传的分片信息,本地对比每个分片的 hash 值,跳过已上传的部分,只传未上传的分片.
::::

## 9.H5 如何解决移动端适配问题

移动端适配问题是指如何让网页在不同的移动设备上显示效果相同.下面是一些常见的 H5 移动端适配方案:

1. 使用 viewport 标签

通过设置 viewport 标签的 meta 属性,来控制页面的缩放比例和宽度,以适配不同的设备.例如:

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0" />
```

其中 width = device-width 表示设置 viewport 的宽度为设备宽度,initial-scale=1.0 表示初始缩放比例为 1

2. 使用 CSS3 的媒体查询

通过 CSS3 的媒体查询,根据不同的设备宽度设置不同的样式,以适配不同的设备.例如:

```css
arduinoCopy code@media screen and (max-width: 640px) {
  /* 样式 */
}
```

其中 max-width 表示最大宽度,当前屏幕宽度小于等于 640px 时,应用这些样式

3. 使用 rem 单位

通过将 px 转化为 rem 单位,根据不同的设备字体大小设置不同的样式,以适配不同的设备.例如:

```css
html {
  font-size: 16px;
}
@media screen and (max-width: 640px) {
  html {
    font-size: 14px;
  }
}
div {
  width: 10rem;
}
```

其中 font-size:16px 表示将网页的基准字体大小设置为 16px,font-size:14px 表示在屏幕宽度小于等于 640 px 时将基准字体大小设置为 14px,div 元素的 width:10rem 表示该元素的宽度为 10 个基准字体大小

4. 使用 flexible 布局方案

通过使用 flexible 布局方案,将 px 转化为 rem 单位,并且动态计算根节点的字体大小,以适配不同的设备.例如使用 lib-flexible 库

```html
<script src="https://cdn.bootcdn.net/ajax/libs/lib-flexible/0.3.4/flexible.js"></script>

import 'lib-flexible/flexible.js'
```

其中 flexible.js 会在页面加载时动态计算根节点的字体大小,并将 px 转化为 rem 单位.在样式中可以直接使用 px 单位,例如:

```css
div {
  width: 100px;
  height: 100px;
}
```

这个 div 元素的大小会根据设备屏幕的宽度进行适配


## 10. 站点一键换肤的实现方式有哪些?

:::: details 网站一键换肤的实现方式有以下几种
1. 使用CSS变量:通过定义一些变量来控制颜色、字体等,然后在切换主题时动态修改这些变量的值.

2. 使用class切换:在HTML的根元素上添加不同的class名称,每个class名称对应不同的主题样式,在切换主题时切换根元素的class名称即可.

3. 使用javascript切换:使用javascript动态修改页面的样式,如修改元素的背景颜色、字体颜色等.

4. 使用Less/Sass等预处理器:通过预处理器提供的变量、函数等功能来实现主题切换.