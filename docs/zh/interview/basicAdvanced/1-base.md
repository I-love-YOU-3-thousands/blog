---
#在首页文章标题 不设置默认为#一级标题
title: 前端面试知识汇总-基础篇
#首页卡片列表里的描述信息,不设置默认取文章内容的前100个字符
# description: 主要介绍前端基础知识
#是否隐藏文章在首页的封面
#hiddenCover: true
#文章在首页列表里的封面
cover: https://img0.baidu.com/it/u=3812381548,2078022002&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1062
#文章是否在首页列表里
hidden: true
#文章的作者信息
author: Safety
#是否展示文章的预计阅读时间
readingTime: true
# 是否开启评论功能
comment: true

#文章发布时间,不设置会取git最后修改时间
#date: 2024-09-22
#文章标签
tag:
  - 前端
tags:
  - 面经
categories:
  - 基础知识
#文章右侧显示目录层级
outline: [2, 3]

#在首页展示的精选文章,值越大越靠前
sticky: 99
#在首页置顶展示的文章,值越小越靠前
top: 1
#推荐文章顺序,越小越靠前
recommend: 1
#文章是否发布,用来设置文章是否出现在首页和侧边栏里
#publish: false #等价于 hidden: true, recommend:false

buttonAfterArticle:
  openTitle: 投'币'支持
  closeTitle: 下次一定
  content: '<img src="https://img.cdn.sugarat.top/mdImg/MTY0Nzc1NTYyOTE5Mw==647755629193">'
  icon: aliPay
  # size: small
  # expand: true
---

# 基础篇

## 一、HTML、HTTP、WEB 综合问题

### 1.对 HTML 语义化的理解

- 语义化是指根据内容的结构化(内容语义化),选择合适的标签(代码语义化),通俗来讲就是用正确的标签做正确的事情。
- 语义化的优点如下:
- 对机器友好,带有语义的文字表现力丰富,更适合搜索引擎的爬虫爬取有效信息,有利于 SEO,除此之外,语义类还支持读屏软件,根据文章可以自动生成目录;
- 对开发者友好,使用语义类标签增强了可读性,结构更加清晰,开发者能清晰的看出网页的结构,便于团队的开发与维护。
- 常见的语义化标签:

```html
<header></header>
头部
<nav></nav>
导航栏
<section></section>
定义文档中的节,区块(有语义化的div)
<main></main>
主要内容
<article></article>
独立的内容
<aside></aside>
侧边栏
<footer></footer>
底部
```

### 2.DOCTYPE(⽂档类型) 的作⽤

- DOCTYPE 是 HTML5 中一种标准通用标记语言的文档类型声明,目的是告诉浏览器(解析器)应该以什么样(html 或 xhtml)的文档类型定义来解析文档,不同的渲染模式会影响浏览器对 CSS 代码甚至 JavaScript 脚本的解析。他必须声明在 HTML 文档的第一行。
- 浏览器渲染页面的两种模式(可通过 document.compaMode 获取,比如,语雀官网文档类型是 CSS1Compat):
- CSS1Compat:标准模式(Strickmode),默认模式,浏览器使用 W3C 的标准解析渲染页面。在标准模式中,浏览器以其支持的最高标准呈现页面。
- BackCompat:怪异模式(QuirksMode),混杂模式,浏览器使用自己的怪异模式解析渲染页面。在怪异模式中,页面以一种比较宽松的向后兼容的方式显示。

### 3.script 标签中 defer 和 async 的区别

- 如果没有 defer 或者 async 属性,浏览器会立即加载并执行相应的脚本。立即指的是在渲染该 script 标签之下的文档元素之前,它不会等待后续加载的文档元素,读取到就会开始加载和执行,这样就阻塞了后续文档的加载。
- defer：使用 defer 时,加载后续文档元素的过程和 script.js 的加载并行进行(异步),但是 script.js 的执行要在所有元素解析完成之后,DOMContentLoaded 事件触发之前完成(并不是加载完成就立即执行)。
- async：使用 async 时,加载和渲染后续文档元素的过程将和 script.js 的加载与执行并行进行(异步),即在不影响后续文档元素渲染的情况下,加载 js,加载完成后立即执行.
- 同时使用 async 和 defer 时,如果浏览器支持 async 则按 async 解析;如果不支持,则按 defer 解析.
- 主要区别在于它们的执行顺序和时机。defer 适合于需要确保页面加载完成后才执行的脚本,以减少因页面未完全加载而导致的错误;而 async 则更适合于不需要等待页面完整加载即可运行的第三方脚本,提供了更高的灵活性,但可能伴随着一定的执行时机的不确定性。

### 4.行内元素有哪些?块级元素有哪些?空(void)元素有哪些?

- 行内元素:`a`,`b`,`span`,`img`,`input`,`select`,`strong`,不可以设置宽高,不独占一行
- 块级元素:`div`,`ul`,`ol`,`li`,`dl`,`dt`,`dd`,`h1`,`h2`,`h3`,`h4`,`h5`,`h6`,`p`
- 空元素,即没有内容的 HTML 元素,没有闭合标签
- 常见的有:`br`、`hr`、`img`、`input`、`link`、`meta`
- 少见的有:`area`、`base`、`col`、`colgroup`、`command`、`embed`、`keygen`、`param`、`source`、`track`、`wbr`

### 5.浏览器是怎么对 HTML5 的离线储存资源进行管理和加载的?

- 在线情况下,浏览器发现 html 头部有 manifest 属性,它会请求 manifest 文件,如果是第一次我访问 app,浏览器会根据 manifest 文件的内容下载相应的资源并且进行离线存储.如果已经访问过 app 并且资源已经离线存储了,那么浏览器就会使用离线的资源加载页面,然后浏览器会比较新的 manifest 文件与旧的 manifest 文件,如果文件没有发生改变,就不做任何操作,如果文件改变了,就会重新下载文件中的资源并进行离线存储。
- 离线情况下,浏览器直接使用离线存储的资源。

### 6.Canvas 和 SVG 的区别

- SVG:可缩放矢量图形(Scalable Vector Graphics)是基于可扩展标记语言 XML 描述的 2D 图形的语言,SVG 基于 XML 就意味着 SVG DOM 中的每个元素都是可用的,可以为某个元素添加 Javascript 事件处理器.在 SVG 中,每个被绘制的图形均被视为对象.如果 SVG 对象的属性发生变化,那么浏览器能够自动重现图形.
- SVG 特点:不依赖分辨率,支持事件处理器,最适合带有大型渲染区域的应用程序(如谷歌地图),复杂度高会减慢渲染速度,不适合游戏应用
- Canvas:Canvas 是画布,通过 Javascript 来绘制 2D 图形,是逐像素进行渲染.其位置发生改变,就会重新进行绘制.
- Canvas 特点:依赖分辨率.不支持事件处理器.弱的文本渲染能力.能够以.png 或.jpg 格式保存结果图像.最适合图像密集型的游戏,其中的许多对象会被频繁重绘.
- 矢量图:也被称为面向对象的图像或绘图图像,在数学上定义为一系列由线连接的点.矢量文件中的图形元素称为对象,每个对象都是一个自成一体的实体,它具有颜色、形状、轮廓、大小和屏幕位置等属性.

### 7.HTML5 的 drag API

- HTML5 新增了拖放 API(Drag 和 Drop),拖放是一种常见的特性,即抓取对象后拖到另一个位置。
- dragstart:事件主体是被拖放元素,在开始拖放被拖放元素时触发.
- drag:事件主体是被拖放元素,在正在拖放被拖放元素时触发.
- dragenter:事件主体是目标元素,在被拖放元素进入某元素时触发.
- dragover:事件主体是目标元素,在被拖放在某元素内移动时触发.
- ddragleave:事件主体是目标元素,在被拖放元素移出目标元素时触发.
- drop:事件主体是目标元素,在目标元素完全接收被拖放元素时触发.
- dragend:事件主体是被拖放元素,在整个拖放操作结束时触发.

### 8.前端需要注意哪些 SEO

- 合理的 title、description、keywords:搜索对这三个的权重逐个减小,title 值强调重点即可,重要关键词出现不要超过两次,而且要靠前,不同页面的 title 要有所不同;description 把页面内容高度概括,长度合适,不可过分堆砌关键词,不同页面 description 有所不同;keywords 列举出重要关键词即可
- 语义化的 HTML 代码,符合 W3C 规范:语义化代码让搜索引擎容易理解网页
- 重要内容 HTML 代码放在最前:搜索引擎抓取 HTML 顺序是从上到下的,有的搜索引擎对抓取长度有限制,保证重要内容一定会被抓取
- 重要内容不要用 js 输出,爬虫不会执行 js 获取内容
- 少用 iframe:搜索引擎不会抓取 iframe 中的内容
- 非装饰性图片必须加 alt
- 提高网站速度:网站速度是搜索引擎排序的一个重要指标

### 9. `<img>` 的 `title` 和 `alt` 有什么区别

- 通常当鼠标滑动到元素上时显示
- `alt`是`<img>`的特有属性,是图片内容的等价描述,用于图片无法加载时显示、读屏器阅读图片.可提高图片可访问性,除了纯装饰图片外都必须设置有意义的值,搜索引擎会重点分析.

### 10.HTTP 的几种请求方法用途

- `get`方法:发送一个请求来取得服务器上的某一资源
- `post`方法:向 URL 指定的资源提交数据或附加新的数据
- `put`方法:跟 post 方法很像,也是像服务器提交数据,但是 put 指定了资源在服务器上的位置,而 post 没有
- `head`方法:只请求页面的首部
- `delete`方法:删除服务器上的某资源
- `options`方法:用于获取当前 URL 所支持的方法.如果请求成功,会有一个 Allow 头包含类似'get,post'这样的信息
- `trace`方法:用于激发一个远程的,应用层的请求消息回路
- `connect`方法:把请求连接转换到透明的 TCP/IP 通道

### 11.从浏览器地址栏输入 url 到显示页面的步骤

**简略版**

- 浏览器根据请求的`URL`交给`DNS`域名解析,找到真实 ip,像服务器发起请求;
- 服务器交给后台处理完成后返回数据,浏览器接收文件(`HTML、JS、CSS、图像`等);
- 浏览器对加载的资源(`HTML、JS、CSS`)等进行语法解析,建立相应的内部数据结构(如`HTML`的`DOM`);
- 载入解析到的资源文件,渲染页面,完成

**详细版**

1. 浏览器地址输入`url`后,浏览器查看`缓存`,如果请求资源在缓存中并且新鲜,跳转到转码步骤
   1. 资源未缓存,发起新请求
   2. 如果缓存存在,校验是否过期,如果未过期直接提供给客户端,否则与服务器进行验证.
   3. 校验过期通常有两个 HTTP 头进行控制`Expires`和`Cache-Control`:
      - HTTP1.0 提供 Expires,值为一个绝对时间表示缓存新鲜日期
      * HTTP1.1 增加了 Cache-Control:max-age=,值为以秒为单位的最大新鲜时间
2. 浏览器`解析url`获取协议,主机,端口,path
3. 浏览器`组装一个HTTP请求报文`
4. 浏览器`获取主机ip地址`， 过程如下：
   1. 浏览器缓存
   2. 本机缓存
   3. hosts 文件
   4. 路由器缓存
   5. ISP DNS 缓存
   6. DNS 递归查询(可能存在负载均衡导致每次 IP 不一样)
5. `打开一个socket与目标IP地址,端口建立TCP连接`,三次握手如下:
   1. 客户端发送一个 TCP 的`SYN=1,Seq=X`的包到服务器端口
   2. 服务器返回`SYN=1,ACK=X+1,Seq=Y`的响应包
   3. 客户端发送`ACK=Y+1,Seq=Z`
6. TCP 连接建立后`发送HTTP请求`
7. 服务器接受请求并解析,将请求转发到服务程序,如虚拟主机使用 HTTP 的 Host 头部判断请求的服务程序
8. 服务器检查`HTTP请求头是否包含缓存验证信息`如果验证缓存新鲜,返回 304 等对应状态码
9. 处理程序读取完整请求并准备 HTTP 响应,可能需要查询数据库等操作
10. 服务器将`响应报文通过TCP连接发送回浏览器`
11. 浏览器接收 HTTP 响应,然后根据情况选择`关闭TCP连接或者保留重用,关闭TCP连接的四次握手如下`:
    1. 主动方发送`Fin=1,Ack=Z,Seq=X`报文
    2. 被动方发送`ACK=X+1,Seq=Z`报文
    3. 被动⽅发送`Fin=1， ACK=X， Seq=Y`报⽂
    4. 主动⽅发送`ACK=Y， Seq=X`报⽂
12. 浏览器检查响应状态码:是否为 1XX,3XX,4XX,5XX,这些情况处理与 2XX 不同
13. 如果资源可缓存,`进行缓存`
14. 对响应进行`解码`(例如 gzip 压缩)
15. 根据资源类型决定如何处理(假设资源为 HTML 文档)
16. `解析HTML文档,构建DOM树,下载资源,构造CSSOM树,执行js脚本`,这些操作没有严格的先后顺序,以下分别解释:
17. `构建DOM树`:
    1. `Tokenizing`:根据 HTML 规范将字符流解析为标记
    2. `Lexing`:词法分析将标记转换为对象并定义属性和规则
    3. `DOM construction`:根据 HTML 标记关系将对象组成 DOM 树
18. 解析过程中遇到图片、样式表、JS 文件,启动下载
19. `构建CSSOM树`:
    1. `Tokenizing`:字符流转换为标记流
    2. `Node`:根据标记创建节点
    3. `CSSOM`:节点创建 CSSOM 树
20. 根据 DOM 树和 CSSOM 树构建渲染树:
    1. 从 DOM 树的根节点`遍历所有可见节点`,不可见节点包括:
       - `script,meta`这样本身不可见的标签.
       - 被 css 隐藏的节点,如`display:none`
    2. 对每一个可见节点,找到恰当的 CSSOM 规则并应用
    3. 发布可视节点内容和计算样式
21. js 解析如下:
    1. 浏览器创建 Document 对象并解析 HTML,将解析到的元素和文本节点添加都文档中,此时 document.readystate 为 loading
    2. HTML 解析器遇到没有 async 和 defer 的 script 时,将他们添加到文档中,然后执行行内或外部脚本.这些脚本会同步执行,并且在脚本下载和执行时解析器会暂停.这样就可以用 document.write()把文本插入到输入流中.同步脚本经常简单定义函数和注册事件处理程序,他们可以遍历和操作 script 和他们之前的文档内容
    3. 当解析器遇到设置了 async 属性的 script 时,开始下载脚本并继续解析文档.脚本会在它下载完成后尽快执行,但是解析器不会停下来等它下载.异步脚本禁止使用 document.write(),它们可以访问自己 script 和之前的文档元素
    4. 当文档完成解析后,document.readState 变成 interactive
    5. 所有 defer 脚本会按照在文档出现的顺序执行,延迟脚本能访问完整文档树,禁止使用 document.write()
    6. 浏览器在 Document 对象上触发 DOMContentLoaded 事件
    7. 此时文档完全解析完成,浏览器可能还在等待如图片等内容加载,等这些内容完成载入并且所有异步脚本完成载入和执行,document.readState 变为 complete,window 触发 load 事件
22. 显示页面(HTML 解析过程中会逐步显示页面)

**详细简版**

1. 从浏览器接收`url`到开启网络请求线程(这一部分可以展开浏览器的机制以及进程与线程之间的关系)
2. 开启网络线程到发出一个完整的`HTTP`请求(这一部分涉及到`dns查询,TCP/IP请求,五层因特网协议栈`等知识)
3. 从服务器接收到请求到对应后台接收到请求(这一部分可涉及到`负载均衡,安全拦截以及后台内部的处理`等等)
4. 后台和前台的`HTTP`交互,(这一部分包括`HTTP头部,响应码,报文结构,cookie`等知识,可以提下`静态资源的cookie优化,以及编码解码,如gzip压缩`等)
5. 单独拎出来的缓存问题,HTTP 的缓存(这部分包括`http缓存头部,Etag,catch-control`等)
6. 浏览器接收到 HTTP 数据包后的解析流程(`解析html`-词法分析然后`解析成dom树`,`解析css`生成`css规则树`,合并成`render`树,然后`layout`,`painting`渲染、复合图层的合成、GPU 绘制、外链资源的处理、`loaded`和`DomContentLoaded`等)
7. CSS 的可视化格式模型(元素的渲染规则,如包含块,控制框,`BFC`,`IFC`等概念)
8. JS 引擎解析过程(JS 的解释阶段,预处理阶段,执行阶段生成执行上下文,VO,作用域链、回收机制等等)
9. 其它(可以拓展不同的知识模块,如跨域,web 安全,hybrid 模式等等内容)

### 12.如何进行网站性能优化

**content 方面**

- 减少`HTTP`请求:`合并文件`,`css精灵`,`inline Image`
- 减少`DNS`查询:`DNS缓存`,将资源分布到恰当数量的主机名
- 减少 DOM 元素数量

**Server 方面**

- 使用`CDN`
- 配置`ETag`
- 对组件使用`Gzip压缩`

**Cookie 方面**

- 减小 cookie 大小

**css 方面**

- 将样式表放到页面底部
- 不使用 css 表达式
- 使用`<link>`不使用`@important`

**Javascript 方面**

- 将脚本放到页面底部
- 将 javascript 和 css 从外部引入
  - 压缩 javascript 和 css
  - 删除不需要的脚本
  - 减少 DOM 访问

**图片方面**

- 优化图片:根据实际颜色需要选择色深,压缩
- 优化 css 精灵
- 不在 HTML 中拉伸图片

### 13.HTTP 状态码及其含义

- `1XX`:信息状态码
  - `100 Continue`:继续,一般在发送 post 请求时,已发送了 http header 之后服务端将返回此信息,表示确认,之后发送具体参数信息
- `2XX`:成功状态码
  - `200 OK`:正常返回信息
  - `201 Created`:请求成功并且服务器创建了新的资源
  - `202 Accepted`:服务器已接受请求,但尚未处理
- `3XX`:重定向
  - `301 Moved Permanently`:请求的资源已被永久移动到新位置
  - `302 Found`:临时性重定向
  - `303 See Other`:临时性重定向,且总是使用 GET 请求新的 url
  - `304 Not Modified`:自从上次请求后,请求的网页未修改过
- `4XX`:客户端错误
  - `400 Bad Request`:服务器无法理解请求的格式,客户端不应当尝试再次使用相同的内容发起请求
  - `401 Unauthorized`:请求未授权
  - `403 Forbidden`:禁止访问
  - `404 Not Found`:找不到与 url 相匹配的资源
- `5XX`:服务器错误
  - `500 Internal Server Error`:最常见的服务器端错误
  - `503 Service Unavailable`:服务器端暂时无法处理请求(可能是过载或维护)

### 14.对浏览器内核的理解

- 主要分成两部分:渲染引擎(`layout engineer` 或 `Rendering Engine`)和 JS 引擎(`JavaScript Engine`)
- `渲染引擎`:负责取得网页的内容(`HTML`、`XML`、图像等等)、整理讯息(例如加入`CSS`等),以及计算网页的显示方式,然后会输出至显示器或打印机.浏览器的内核的不同对于网页的语法解释会有不同,所以渲染的效果也不相同.所有网页浏览器、电子邮件客户端以及其他需要编辑、显示网络内容的应用程序都需要内核
- `JS引擎`:解析和执行 javascript 来实现网页的动态效果

### 15.html5 有哪些新特性、移除了哪些元素

- HTML5 现在已经不是 SGML 的子集,主要是关于图像,位置,存储,多任务等功能的增加 -绘画 `canvas`
  - 用于媒介回放的 `video` 和 `audio`元素
  - 本地离线存储`localStorage`长期存储数据,浏览器关闭后数据不丢失
  - `sessionStorage`的数据在浏览器关闭后自动删除
  - 语义化更好的内容元素:比如`article`、`footer`、`header`、`nav`、`section`
  - 表单控件:`calendar`、`date`、`time`、`email`、`url`、`search`
  - 新的技术:`webworker`、`websocket`、`Geolocation`
- 移除的元素
  - 纯表现的元素:`basefont`、`big`、`center`、`font`、`s`、`strike`、`tt`、`u`
  - 对可用性产生负面影响的元素:`frame`、`frameset`、`noframes`
- 支持 html5 新标签
  - IE8/IE7/IE6 支持通过`document.createElement` 方法产生的标签
  - 可以利用这一特性让这些浏览器支持 HTML5 新标签
  - 浏览器支持新标签后,还需要添加标签默认的样式

### 16.HTML5 的离线储存怎么使用,工作原理是怎样的

- 在用户没有与因特网连接时,可以正常访问站点或应用,在用户与因特网连接时,更新用户机器上的缓存文件
- 原理:HTML5 的离线存储是基于一个新建的.appcache 文件的缓存机制(不是存储技术),通过这个文件上的解析清单离线存储资源,这些资源就会像 cookie 一样被存储了下来.之后当网络在处于离线状态下时,浏览器会通过被离线存储的数据进行页面展示
- 如何使用
  - 页面头部像下面一样加入一个`manifest`的属性
  - 在`cache.manifest`文件的编写离线存储的资源
  - 在离线状态下,操作`window.applicationCache`进行需求实现

```javascript
CACHE MANIFEST
##v0.11
CACHE:
js/app.js
css/style.css
NETWORK:
resourse/logo.png
FALLBACK:
/offline.html
```

### 17.描述一下 cookies,sessionStorage 和 localStorage 的区别

- `cookie`是网站为了标识用户身份而储存在用户本地终端上的数据(通常需要加密)
- cookie 数据始终在同源的 http 请求中携带,会在浏览器和服务器间来回传递
- `sessionStorage`和`localStorage`不会自动把数据发给服务器,仅在本地保存
- 存储大小: -`cookie`数据大小不能超过 4K -`sessionStorage`和`localStorage`虽然也有存储大小的限制,但比`cookie`大得多,可以达到 5M 或更大
- 有效时间 -`localStorage`存储持久数据,浏览器关闭后数据不丢失除非主动删除数据 -`sessionStorage`数据在当前浏览器窗口关闭后自动删除 -`cookie`设置的`cookie`过期时间之前一直有效,即使窗口或浏览器关闭

### 18.iframe 有哪些缺点

- `iframe`会阻塞主页面的`onload`事件
- 搜索引擎的检索程序无法解读这种页面,不利于 SEO
- `iframe`和主页面共享连接池,而浏览器对相同域的连接有限制,所以会影响页面的并行加载
- 使用`iframe`之前需要考虑上面的缺点.如果需要使用 iframe,最好是通过`javascript`动态给`iframe`添加`src`属性值,可以绕开上面问题

### 19.WEB 标准以及 W3C 标准是什么

- 标签闭合,标签小写,不乱嵌套,使用外链 css 和 js,结构行为表现的分离

### 20.xhtml 和 html 的区别

- 功能上:`XHTML`可兼容各大浏览器、手机以及`PDA`,并且浏览器也能够快速正确的编译网页
- 书写上:`XHTML`元素必须被正确的嵌套,闭合,区分大小写,文档必须拥有根元素

### 21.html 全局属性(global attribute)有哪些

- `class`:为元素设置类标识
- `data-xx`:为元素增加自定义属性
- `draggable`:设置元素是否可拖拽
- `id`:元素 id,文档内唯一
- `lang`:元素内容的语言
- `style`:行内 css 样式
- `title`:元素相关的建议信息

### 22.网页验证码是干嘛的?是为了解决什么安全问题

- 区分用户是计算机还是人的公共全自动程序,可以防止恶意破解密码、刷票、论坛灌水
- 有效防止黑客对某一个特定注册用户用特定程序暴力破解方式进行不断的登陆尝试

### 23.viewport

```javascript
<meta
  name="viewport"
  content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
/>
// width    设置viewport宽度，为一个正整数，或字符串‘device-width’
// device-width  设备宽度
// height   设置viewport高度，一般设置了宽度，会自动解析出高度，可以不用设置
// initial-scale    默认缩放比例（初始缩放比例），为一个数字，可以带小数
// minimum-scale    允许用户最小缩放比例，为一个数字，可以带小数
// maximum-scale    允许用户最大缩放比例，为一个数字，可以带小数
// user-scalable    是否允许手动缩放
```

```javascript
let age;
age = 12;
//更新变量
age = 24;

//输出变量值
document.write(age);
```

##### 变量初始化

```javascript
//声明并初始化变量值
let age = 24;
//声明多个变量并初始化
let gender = "male",
  userName = "igloo";
```

### 变量命名规则与规范

规则：必须遵守，不遵守会报错
规范：建议，不遵守不会报错，但不符合业内通识

##### 命名规则

- 不能用关键字
- 下划线、字母、数字、<kbd>$</kbd>组成，且数字不能开头
- 字母<b>严格区分大小写</b>，如 Age 和 age 是不同变量

##### 命名规范

- 起名字要有意义
- 遵守驼峰命名法，建议小驼峰命名

### 声明变量规范

::: warning 使用 let 而非 var 声明变量
var 声明有如下弊端

- 可以先使用在声明（不合理）
- 声明过的变量可重复声明（不合理）
- 缺少块级作用域

:::

## 二、CSS 相关

### 1.css sprite 是什么,有什么优缺点

CSS Sprite（CSS 精灵）是一种将多个小图片合并到一张大图中的技术。通过在页面中引用这张大图，并设置合适的 background-position 和尺寸，可以显示出所需的小图标或背景图案。
