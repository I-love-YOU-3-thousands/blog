---
sort: 2
sideName: 链表代码实现
title: 链表代码实现
---
# 链表代码实现
本文讲解的例题：[力扣707.设计链表](https://leetcode.cn/problems/design-linked-list/description/)

::: tip 前置知识
阅读本文前，需要先学习：[链表基本原理](linkedlist-basic.md)
:::

## 几个关键点
下面我会分别用双链表和单链给出一个简单的`MyLinkedList`代码实现，包含了基本的增删查改功能。这里给出几个关键点，等会看代码的时候可以着重注意一下。

### 关键点一、同时持有头尾节点的引用
力扣做题时，一般题目给我们传入的就是单链表的头指针，但是在实际开发中，用到的都是双链表，而双链表一般会同时持有头尾节点的引用。

因为在软件开发中，在容器尾部添加元素是个非常高频的操作，双链表持有尾部节点的引用，就可以在O（1）的时间复杂度内完成尾部添加元素的操作。

对于单链表来说，持有尾部节点的引用也有优化效果。比如你要在单链表尾部添加元素，如果没有尾部节点的引用，你就需要遍历整个链表找到尾部节点，时间复杂度是O(n)。如果有尾部节点的引用，就可以在O（1）的时间复杂度内完成尾部添加元素的操作。

细心的读者可能会说，即便如此，如果删除一次单链表的尾结点，那么之前尾结点的引用就失效了，还是需要遍历一遍链表找到尾结点。

是的，但你再仔细想想，删除单链表尾结点的时候，是不是也得遍历到倒数第二个节点（尾节点的前驱），才能通过指针操作把尾结点删掉？那么这个时候，你不就可以顺便把尾结点的引用给更新了吗？

### 关键点二、虚拟头尾节点
在上一篇文章[链表基本原理](linkedlist-basic.md)中，我们提到了虚拟头尾节点的概念。虚拟头尾节点是指在链表的头部和尾部各添加一个节点，这两个节点不存储任何数据，只是为了方便操作而添加的。原理很简单，就是在创建双链表时就创建一个虚拟头节点和一个虚拟尾节点，无论双链表是否为空，这两个节点都存在。这样就不会出现空指针的问题，可以避免很多边界情况的处理。

举例来说，假设虚拟头尾节点分别是`dummyHead`和`dummyTail`,那么一条空的双链表长这样:
``` text
dummyHead <-> dummyTail
```
如果你添加`1,2,3`几个元素，那么链表长这样：
``` text
dummyHead <-> 1 <-> 2 <-> 3 <-> dummyTail
```
你以前要把在头部插入元素、在尾部插入元素和中间插入元素几种情况分开讨论，现在有了头尾虚拟节点，无论链表是否为空，都只需要考虑在中间插入元素的情况就可以了，这样代码会简洁很多。

当然，虚拟头节点会多占用一点内存空间，但是比起给你解决的麻烦，这点空间消耗是划算的。

对于单链表，虚拟头节点有一定的简化作用，但虚拟尾节点没有太大作用。
::: tip 虚拟节点是内部实现，对外不可见
虚拟节点是你内部实现数据结构的技巧，对外是不可兼得。比如按照索引获取元素的`get(index)`方法，都是从真实节点开始计算索引，而不是从虚拟节点开始计算。
:::

### 关键点三、内存泄漏？

在前文[动态数组实现](array-implement.md)中，提到了删除元素时，要注意内存泄露的问题。那么在链表中，删除元素会不会也有内存泄露的问题呢？

尤其是这样的写法，你觉得有没有问题呢？

``` java
// 假设单链表头节点  head = 1 -> 2 -> 3 -> 4 -> 5
// 删除单链表头节点
head = head.next
// 此时 head = 2 -> 3 -> 4 -> 5
```
细心的读者可能认为这样写会有内存泄漏的问题，因为原理啊的那个头节点`1`的`next`指针没有断开，依然指向着节点 `2`

但实际上这样写是OK的，因为Java的垃圾回收的判断机制是看这个对象是否被别人引用，而并不会care这个对象是否还饮用者别人。

那个节点`1`的`next`指针确实还指向着节点`2`，但是并没有别的指针引用节点`1`了，所以节点`1`最终会被垃圾回收器回收释放。所以说这个场景和数组中删除元素的场景是不一样的，你可以在仔细思考一下。

不过呢，删除节点时，最好还是把被删除节点的指针都置为null,这是个好习惯，不会有什么代价，还可能避免一些潜在的问题。所以在下面的实现中，无论是否有必要，都会把被删除节点上的指针置为null。
::: tip 如何验证实现呢？
可以借助力扣707题[设计链表](https://leetcode.cn/problems/design-linked-list/description/)来验证自己的实现是否正确。注意707题要求的增删查改API名字和本文给出的不一样，需要修改一下才能通过。
:::

## 双链表代码实现

::: code-group
``` javascript
class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class MyLinkedList {
    // 虚拟头尾节点
    constructor() {
        this.head = new Node(null)
        this.tail = new Node(null)
        this.head.next = this.tail
        this.tail.prev = this.head
        this.size = 0
    }

    // 增
    addLast(e) {
        const x = new Node(e)
        const temp = this.tail.prev
        temp.next = x
        x.prev = temp
        // temp <-> x

        x.next = this.tail
        this.tail.prev = x
        // temp <-> x <-> tail
        this.size++
    }

    addFirst(e) {
        const x = new Node(e)
        const temp = this,head.next;
        // head <-> temp
        temp.prev = x
        x.next = temp

        this.head.next = x;
        x.prev = this.head
        // head <-> x <-> temp
        this.size++
    }

    add(index,element) {
        this.checkPositionIndex(index);
        if(index === this.size) {
            this.addLast(element)
            return
        }

        // 找到index对应的Node
        const p = this.getNode(index)
        const temp = p.prev;
        // temp <-> p

        // 新要插入的Node
        const x = new Node(element);

        p.prev = x
        temp.next = x

        x.prev = temp;
        x.next = p;

        // temp <-> x <-> p
        this.size++
    }

    // 删
    removeFirst() {
        if(this.size < 1) {
            throw new Error('No elements to remove')
        }
        // 虚拟节点的存在是我们不用考虑空指针的问题
        const x = this.head.next
        const temp = x.next
        // head <-> x <-> temp
        this.head.next = temp
        temp.prev = this.head

        //  head <-> temp

        this.size--
        return x.val
    }

    removeLast() {
        if(this.size < 1) {
            throw new Error('No elements to remove')
        }
        const x = this.tail.prev
        const temp = x.prev
        // temp <-> x <-> tail

        this.tail.prev = temp
        temp.next = this.tail

        // temp <-> tail
        this.size--
        return x.val
    }

    remove(index) {
        this.checkElementIndex(index)
        // 找到 index 对应的 Node
        const x = this.getNode(index)
        const prev = x.prev
        const next = x.next
        // prev <-> x <-> next
        prev.next = next
        next.prev = prev

        this.size--
        return x.val
    }

    // 查
    get(index) {
        this.checkElementIndex(index);
        // 找到 index 对应的 Node
        const p = this.getNode(index)

        return p.val
    }

    getFirst() {
        if(this.size < 1) {
            throw new Error('No elements in the list')
        }
        return this.head.next.val
    }

    getLast() {
        if(this.size < 1) {
            throw new Error('No elements in the list')
        }

        return this.tail.prev.val
    }

    // 改
    set(index,val) {
        this.checkElementIndex(index)
        // 找到 index 对应的 Node
        const p = this.getNode(index)

        const oldVal = p.val
        p.val = val
        return oldVal
    }

    // 其他工具函数
    size() {
        return this.size
    }

    isEmpty(){
        return this.size === 0
    }

    getNode(index) {
        this.checkElementIndex(index)
        let p = this.head.next;
        // TODO:可以优化，通过index判断从head还是tail开始遍历
        for(let i = 0; i < index; i++) {
            p = p.next
        }
        return p;
    }

    isElementIndex(index) {
        return index >= 0 && index < this.size
    }

    isPositionIndex(index) {
        return index >= 0 && index <= this.size
    }

    // 检查 index 索引位置是否可以存在元素
    checkElementIndex(index) {
        if(!this.isElementIndex(index)) {
            throw new Error(`Index: ${index},size: ${this.size}`)
        }
    }

    // 检查 index 索引位置是否可以添加元素
    checkPositionIndex(index) {
        if(!this.isPositionIndex(index)) {
            throw new Error(`Index: ${index}, size: ${this.size}`)
        }
    }

    display() {
        console.log("size = " + this.size)
        let p = this.head.next
        let str = ''
        while (p !== this.tail) {
            str += `${p.val} <-> `
            p = p.next
        }
        console.log(str + "null\n")
    }
}

const list = new MyLinkedList()
list.addLast(1)
list.addLast(2)
list.addLast(3)
list.addFirst(0)
list.add(2,100)

list.display()
// size = 5
// 0 <-> 1 <-> 100 <-> 2 <-> 3 <-> null
```
:::

## 单链表代码实现
::: code-group
``` javascript
// 节点类
class Node {
    constructor(val) {
        this.val = val
        this.next = null
    }
}

class MyLinkedList2 {
    constructor(){
        this,head = new Node(null)
        this.tail = this,head
        this.size = 0
    }

    addFirst(e) {
        const newNode = new Node(e)
        newNode.next = this.head.next
        this.head.next = newNode
        if(this.size === 0) {
            this.tail = newNode
        }
        this.size++
    }

    addLast(e) {
        const newNode = new Node(e)
        this.tail.next = newNode
        this.tail = newNode
        this.size++
    }

    add(index,element) {
        this.checkPositionIndex(index);
        if(index === this.size) {
            this.addLast(element)
            return
        }

        let prev = this.head
        for(let i = 0;i<index;i++) {
            prev = prev.next
        }
        const newNode = new Node(element)
        newNode.next = prev.next
        prev.next = newNode
        this.size++
    }
    removeFirst() {
        if(this.isEmpty()) {
            throw new Error('NoSuchElementException')
        }
        const first = this.head.next
        this.head.next = first.next
        if(this.size === 1) {
            this.tail = this.head
        }
        this.size--
        return first.val
    }

    removeLast() {
        if(this.isEmpty()){
            throw new Error('NoSuchElementException')
        }

        let prev = this.head
        while (prev.next !== this.tail) {
            prev = prev.next
        }
        const val = this.tail.val
        prev.next = null
        this.tail = prev
        this.size--
        return val
    }

    remove(index) {
        this.checkElementIndex(index)
        let prev = this.head
        for(let i = 0; i < index; i++) {
            prev = prev.next
        }

        const nodeToRemove = prev.next;
        prev.next = nodeToRemove.next
        // 删除的是最后一个元素
        if(index === this.size - 1) {
            this.tail = prev
        }
        this.size--
        return nodeToRemove.val
    }

    // 查

    getFirst() {
        if(this.isEmpty()){
            throw new Error('NoSuchElementException')
        }
        return this.head.next.val
    }

    getLast() {
        if(this.isEmpty()) {
            throw new Error('NoSuchElementException')
        }
        return this.tail.val
    }

    get(index) {
        this.checkElementIndex(index)
        const p = this.getNode(index)
        return p.val
    }


    // 改

    set(index,element) {
        this.checkElementIndex(index)
        const p = this.getNode(index)

        const oldVal = p.val
        p.val = element
        return oldVal
    }

    // 其他工具函数

    size() {
        return this.size
    }

    isEmpty() {
        return this.size === 0
    }

    isElementIndex(index) {
        return index >= 0 && index < this.size
    }

    isPositionIndex(index) {
        return index >= 0 && index <= this.size
    }

    // 检查 index 索引位置是否可以存在元素
    checkElementIndex(index) {
        if(!this.isElementIndex(index)) {
            throw new Error(`Index: ${index},Size:${this.size}`)
        }
    }

    // 检查index索引位置是否可以添加元素
    checkPositionIndex(index) {
        if(!this.isPositionIndex(index)) {
            throw new Error(`Index: ${index},Size:${this.size}`)
        }
    }

    // 返回 index 对应的 Node
    // 注意：请保证传入的 index 是合法的
    getNode(index) {
        let p = this.head.next
        for(let i = 0;i<index;i++) {
            p = p.next
        }
        return p
    }
}


// 示例使用
const list = new MyLinkedList2()
list.addFirst(1)
list.addFirst(2)
list.addLast(3)
list.addLast(4)
list.add(2, 5)

console.log(list.removeFirst())   // 2
console.log(list.removeLast())    // 4
console.log(list.remove(1))       // 5

console.log(list.getFirst())      // 1
console.log(list.getLast())       // 3
console.log(list.get(1))          // 3
```
:::