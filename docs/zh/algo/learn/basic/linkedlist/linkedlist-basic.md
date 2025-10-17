---
sort: 1
sideName: 链表基本原理
title: 链表基本原理
---
# 链表（链式存储）基本原理

刷过力扣的读者肯定对单链表非常熟悉，力扣上的单链表节点定义如下：
``` javascript
class ListNode {
    constructor(val) {
        this.val = val
        this.next = null
    }
}
```
这仅仅是一个最简单的单链表节点，方便力扣出算法题考你。在实际编程语言中，我们使用的链表节点会稍微复杂一点，类似这样：
``` javascript
var Node = function(prev,element,next) {
    this.val = element
    this.next = next
    this.prev = prev
}
```

主要区别有两个：

1、编程语言标准库一版都会提供泛型，即你可以指定`val`字段为任意类型，而力扣的单链表节点的`val`字段只有int类型。

2、编程语言标准库一般使用的都是双链表而非单链表。单链表节点只有一个`next`指针，指向下一个节点；而双链表节点有两个指针，`prev`指向前一个节点，`next` 指向下一个节点。

有了`prev`前驱指针，链表支持双向遍历，但由于要多维护一个指针，增删查改时会稍微复杂一些，后面带大家实现双链表时会具体介绍

## 为什么需要链表

前面介绍了[数组的底层原理](../dynamic-array/array-basic.md),说白了就是一块连续的内存空间，有了这块内存空间的首地址，就能直接通过索引计算出任意位置的元素地址。

链表不一样，一条链表并不需要一整块连续的内存空间存储元素。链表的元素可以分散在内存空间的天涯海角，通过每个节点上的`next,prev`指针，将零散的内存块串联起来形成一个链式结构。

这样做的好处很明显，首先就是可以提高内存的利用效率，链表的节点不需要挨在一起，给点内存 new 出来一个节点就能用，操作系统会觉得这娃好养活。

另外一个好处，它的节点要用的时候就能接上，不用的时候拆掉就行了，从来不需要考虑扩缩容和数据搬移的问题，理论上讲，链表是没有容量限制的（除非把所有内存都占满，这不太可能）。

当然，不可能只有好处没有局限性。数组最大的优势是支持通过索引快速访问元素，而链表就不支持。

这个不难理解吧，因为元素并不是紧挨着的，所以如果你想要访问第3个链表元素，你就只能从头结点开始往顺着`next`指针往后找，直到找到第3个节点才行。

上面是对链表这种数据结构的基本介绍，接下来结合代码实现单/双链表的几个基本操作。

## 单链表的基本操作

我先写一个工具函数，用于创建一条单链表，方便后面的讲解：
``` javascript
var ListNode = function(x) {
    thi.val = x;
    this.next = null;
}

// 输入一个数组，转换为一条单链表
var createLinkedList = function(arr) {
    if(arr == null || arr.length == 0) {
        return null
    }
    var head = new ListNode(arr[0])
    var cur = head
    for(var i = 1; i < arr.length; i++) {
        cur.next = new ListNode(arr[i]);
        cur = cur.next
    }
    return head
}
```
### 查/改
::: tip 单链表的遍历/查找/修改
:::
比方说，我想访问单链表的每一个节点，并打印其值，可以这样写：
``` javascript
// 创建一条单链表
let head = createLinkedList([1,2,3,4,5])

// 遍历单链表
for(let p = head; p != null; p = p.next) {
    console.log(p.val)
}
```
类似的，如果是要通过索引访问或修改链表中的某个节点，也只能用for循环从头结点开始往后找，直到找到索引对应的节点，然后进行访问或修改。

### 增
::: tip 在单链表头部插入新元素
:::

我们会持有单链表的头结点，所以只需要将插入的节点接到头结点之前，并将新插入的节点作为头结点即可。
``` javascript
// 创建一条单链表
var head = createLinkedList([1,2,3,4,5])

// 在单链表头部插入一个新节点 0 
var newNode = new ListNode(0)
newNode.next = head
head = newNode

// 现在链表变成了 0 -> 1 -> 2 -> 3 -> 4 -> 5
```
::: tip 在单链表尾部插入新元素
:::
直接看代码
``` javascript
// 创建一条单链表
var head = createLinkedList([1,2,3,4,5])

// 在单链表尾部插入一个新节点 6
var newNode = new ListNode(6)
var cur = head

while(cur.next != null) {
    cur = cur.next
}
// 现在 cur就是链表的最后一个节点了

cur.next = newNode

// 现在链表变成了 1 -> 2 -> 3 -> 4 -> 5 -> 6
```
当然，如果我们持有对链表尾节点的引用，那么在尾部插入新节点的操作就会变得非常简单，不用每次从头去遍历了。这个优化会在后面具体实现双链表时介绍。

::: tip 在单链表中间插入新元素
:::
这个操作稍微有点复杂，我们还是要先找到要插入位置的前驱节点，然后操作前驱节点把新节点插入进去：
``` javascript
// 创建一条单链表
var head = createLinkedList([1,2,3,4,5])

// 在第3个节点后面插入一个新节点 66
// 先要找到前驱节点，即第3个节点
var p = head
for(var i = 0; i < 2; i++) {
    p = p.next
}
// 此时 p指向第3个节点
// 组装新节点的后驱指针
var newNode = new ListNode(66)
newNode.next = p.next;

// 插入新节点
p.next = newNode
// 现在链表变成了 1 -> 2 -> 3 -> 66 -> 4 -> 5
```
### 删
::: tip 在单链表中删除一个节点
:::
删除一个节点，首先要找到要被删除节点的前驱节点，然后把这个前驱节点的`next`指针指向被删除节点的下一个节点。这样就能把被删除节点从链表中摘除了。
``` javascript
// 创建一条单链表
var head = createLinkedList([1,2,3,4,5])

// 删除第4个节点，要操作前驱节点
var p = head;
for(var i = 0; i < 2; i++) {
    p = p.next
}
// 此时 p指向第3个节点,即要删除节点的前驱节点
// 操作 p 把第4个节点删除
p.next = p.next.next
// 现在链表变成了 1 -> 2 -> 3 -> 4
```
::: tip 在单链表尾部删除元素
:::
这个操作比较简单，找到倒数第二个节点，然后把它的`next` 指针置为null就行了：
``` javascript
// 创建一条单链表
var head = createLinkedList([1,2,3,4,5])

// 删除尾节点
var p = head
// 找到倒数第二个节点
while(p.next.next != null) {
    p = p.next
}
// 现在 p指向倒数第二个节点
// 把尾节点从链表中摘除
p.next = null
// 现在链表变成了 1 -> 2 -> 3 -> 4
```
::: tip 在单链表头部删除元素
:::
这个操作比较简单，直接把`head`移动到下一个节点就行了，直接看代码
``` javascript
// 创建一条单链表
var head = createLinkedList([1,2,3,4,5])

let oldHead = head
// 删除头节点
head = head.next
// 现在链表变成了 2 -> 3 -> 4 -> 5

// 把旧的节点链接断开，这个操作不是必须的
oldHead.next = null
```
不过可能有读者疑惑，之前那个旧的头结点`1`的next指针仍然指向着节点`2`，这样会不会造成内存泄漏？

不会的，这个节点`1`指向其他的节点是没关系的，只要保证没有其他引用指向这个节点`1`，它就能被垃圾回收器回收掉。

当然，如果你非要显式把节点`1`的next指针置为null，这是个很好的习惯，在其他场景中可能可以避免指针错乱的潜在问题。

::: warning 是不是觉得复杂？
链表的增删查改操作确实比数组复杂。这是因为链表的节点不是紧挨着的，所以要增删一个节点，必须先找到它的前驱和后驱节点进行协同，然后才能通过指针操作把它插入或删除。

上面给出的代码还仅仅是最简单的例子，你会发现在头部、尾部、中间增删元素的代码都不一样。如果要实现一个真正可用的链表，你还要考虑很多边界情况，比如链表可能为空、前后驱节点可能为空等，这些情况都得保证不会出错。

而且，上面只是介绍了 单链表 ，而我们下一章要实现的是 双链表 ，双链表要同时维护前驱和后驱指针，指针操作会更复杂一些。

是不是已经不敢想了？不要怕，其实没你想的那么难，几个原因：

1、其实搞来搞去就那几个操作，等会儿带你动手实现链表API的时候，你亲自写一写，就会了。

2、最重要的，我们会使用 虚拟头节点 技巧，把头、尾、中部的操作统一起来，同时还能避免处理头尾指针为空情况的边界情况。

虚拟节点技巧在[单链表经典算法技巧]()中也会经常运用，这里仅仅简单提一下，具体实现会在后面讲到。
:::


## 双链表的基本操作
我先写一个工具函数，用于创建一条双链表，方便后面的讲解：
``` javascript
function DoublyListNode(x) {
    this.val = x;
    this.next = this.prev =null;
}

var createDoublyLinkedList = function(arr) {
    if(arr === null || arr.length === 0) {
        return null
    }

    var head = new DoublyListNode(arr[0])
    var cur = head;

    // for 循环迭代创建双链表
    for(var i = 1; i<arr.length;i++) {
        var newNode = new DoublyListNode(arr[i])
        cur.next = newNode
        newNode.prev = cur
        cur = newNode
    }
    return head;
}
```
### 查/改
::: tip 双链表的遍历/查找/修改
:::
对于双链表的遍历和查找，我们可以从头节点或尾节点开始，根据需要向前或向后遍历：
``` javascript
// 创建一条双链表
var head = createDoublyLinkedList([1,2,3,4,5])
var tail = null

// 从头节点向后遍历双链表
for (var p = head; p !== null; p = p.next) {
    console.log(p.val)
    tail = p;
}

// 从尾节点向前遍历双链表
for (var p = tail; p !== null; p = p.prev) {
    console.log(p.val)
}
```
访问或修改节点时，可以根据索引是靠近头部还是尾部，选择合适的方向遍历，这样可以一定程度上提高效率。

### 增
::: tip 在双链表头部插入新元素
:::
在双链表头部插入元素，需要调整新节点和原头节点的指针：
``` javascript
// 创建一条双链表
var head = createDoublyLinkedList([1,2,3,4,5])
// 在双链表头部插入一个新节点 0
var newNode = new DoublyListNode(0)
// 新节点的 next 指向原头节点
newNode.next = head
// 原头节点的 prev 指向新节点
head.prev = newNode
// 头节点指向新节点
head = newNode
// 现在链表变成了 0 -> 1 -> 2 -> 3 -> 4 -> 5
```
::: tip 在双链表尾部插入新元素
:::
在双链表尾部插入元素，需要调整新节点和原尾节点的指针,如果我们持有尾节点的引用，这个操作会非常简单：
``` javascript
// 创建一条双链表
var head = createDoublyLinkedList([1,2,3,4,5])

var tail = head
// 先走到链表的最后一个节点
while(tail.next !== null) {
    tail = tail.next
}

// 在双链表尾部插入一个新节点 6
var newNode = new DoublyListNode(6)
// 原尾节点的 next 指向新节点
tail.next = newNode
// 新节点的 prev 指向原尾节点
newNode.prev = tail
// 尾节点指向新节点
tail = newNode
// 现在链表变成了 1 -> 2 -> 3 -> 4 -> 5 -> 6
```

::: tip 在双链表中间插入新元素
:::
在双链表的指定位置插入新元素，需要调整前驱节点河后继节点的指针
比如下面的例子，把元素66插入到索引3(第4个节点)的位置：
``` javascript
// 创建一条双链表
var head = createDoublyLinkedList([1,2,3,4,5])

// 想要插入到索引3（第4个节点）
// 需要操作索引2（第3个节点）的指针
var p = head
for(var i = 0; i<2;i++){
    p = p.next
}

// 组装新节点
var newNode = new DoublyListNode(66)
newNode.next = p.next
newNode.prev = p

// 原第3个节点的 next 指向新节点
p.next.prev = newNode
// 第3个节点的 next 指向新节点
p.next = newNode
// 现在链表变成了 1 -> 2 -> 3 -> 66 -> 4 -> 5
```
### 删
::: tip 在双链表中删除一个节点
:::
在双链表中删除节点时，需要调整前驱节点和后继节点的指针来摘除目标节点：
``` javascript
// 创建一条双链表
var head = createDoublyLinkedList([1,2,3,4,5])

// 删除第 4个节点
// 先找到第 3 个节点
var p = head
for(var i = 0; i<2;i++){
    p = p.next
}
// 现在 p 指向第 3 个节点，我们把它后面那个节点摘除出去
var toDelete = p.next

// 把toDelete从链表中摘除
p.next = toDelete.next
// 第4个节点的 next 的 prev 指向第3个节点
toDelete.next.prev = p

// 把 toDelete 的前后指针都置为null 是个好习惯 （可选）
toDelete.next = null
toDelete.prev = null
// 现在链表变成了 1 -> 2 -> 3 -> 5
```
::: tip 在双链表头部删除一个节点
:::
在双链表头部删除元素需要调整头节点的指针：
``` javascript
//  创建一条双链表

var head = createDoublyLinkedList([1,2,3,4,5])

// 删除头结点
var toDelete = head
head = head.next
head.prev = null

// 清理已删除节点的指针
toDelete.next = null

// 现在链表变成了 2 -> 3 -> 4 -> 5

```

::: tip 在双链表尾部删除一个节点
:::
在单链表中，由于缺乏前驱指针，所以删除尾节点时需要遍历到倒数第二个节点，操作它的next指针，才能把尾节点摘除出去。

但在双链表中，由于每个节点都存储了前驱节点的指针，所以我们可以直接操作尾节点，把它自己从链表中摘除：

``` javascript
// 创建一条双链表
var head = createDoublyLinkedList([1,2,3,4,5])

// 删除尾节点
var p = head;
// 找到尾节点
while(p.next !== null) {
    p = p.next
}
// 现在 p 指向尾节点
// 把尾节点从链表中摘除
p.prev.next = null
// 清理已删除节点的指针
p.prev = null
// 现在链表变成了 1 -> 2 -> 3 -> 4
```
## 接下来
下一篇文章中，我们分别用单链表和双链表实现一个拥有增删查改等基本操作的 `MyLinkedList`,并且会使用 虚拟头节点 技巧简化代码逻辑，避免处理头尾指针为空情况的边界情况。