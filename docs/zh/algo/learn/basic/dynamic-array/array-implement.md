---
sort: 2
sideName: 动态数组代码实现
title: 动态数组代码实现
---

# 动态数组代码实现
::: tip 前置知识
阅读本文前，你需要先学习 [数组基本原理](./array-basic.md)
:::
## 几个关键点
下面会直接给出一个简单的动态数组代码实现，包含了基本的增删查改功能。这里先给出几个关键点，等会看代码的时候可以着重注意一下。
### 关键点一：自动扩缩容
在上一章[数组基础](./array-basic.md)中只提到了数组添加元素时可能需要扩容，并没有提到缩容。

在实际使用动态数组时，缩量也是重要的优化手段。比方说一个动态数组开辟了能够存储1000个元素的连续内存空间，但是实际只存了10个元素，那就有990个空间是空闲的。为了避免资源浪费，我们其实可以适当缩小存储空间，这就是缩容。

我们这里就实现一个简单的扩缩容的策略：

- 当数组元素个数达到底层静态数组的容量上限时，扩容为原来的2倍；
- 当数组元素个数缩减到底层静态数组的容量的1/4时，所容为原来的1/2。

### 关键点二：索引越界的检查
下面的代码中，有两个检查越界的方法，分别是`checkElementIndex`和`checkPositionIndex`，你可以看到它俩的区别仅仅在于`index < size`和`index <= size`。

为什么`checkPositionIndex`可以允许`index == size`？因为这个`checkPositionIndex`是专门用来处理在数组中插入元素的情况。

比方说有这样一个nums数组，对于每个元素来说，合法的索引一定是`index < size`:
``` java
nums = [5, 6, 7, 8]
index   0  1  2  3
```
但如果是要在数组中插入新元素，那么新元素可能的插入位置并不是元素的索引，而是索引之间的空隙：
``` java
nums = [ | 5 | 6 | 7 | 8 | ]
index    0   1   2   3   4
```
这些空隙都是合法的插入位置，所以说`index == size`也是合法的。这就是`checkPositionIndex`和`checkElementIndex`的区别。

### 关键点三：删除元素谨防内存泄漏

单从算法的角度，其实并不需要关心被删掉的元素应该如何处理，但是具体到代码实现，我们需要注意可能出现的内存泄露。

在我给出的代码实现中，删除元素时，我都会把被删除的元素置为 `null`，以Java为例：
``` java
// 删
public E removeLast() {
    E deletedVal = data[size - 1];
    // 删除最后一个元素
    // 必须给最后一个元素置为null，否则会内存泄漏
    data[size - 1] = null;
    size--;
    return deletedVal;
}
```
Java 的垃圾回收机制是基于 图算法 的可达性分析，如果一个对象再也无法被访问到，那么这个对象占用的内存才会被释放；否则，垃圾回收器会认为这个对象还在使用中，就不会释放这个对象占用的内存。

如果你不执行`data[size - 1] = null`这行代码，那么`data[size - 1]`这个引用就会一直存在，你可以通过`data[size - 1]`访问这个对象，所以这个对象被认为是可达的，它的内存就一直不会被释放，进而造成内存泄漏。

其他带垃圾回收功能的语言应该也是类似的，你可以具体了解下所使用的编程语言的垃圾回收机制，这是写出无bug代码的基本要求。

### 其他细节优化
下面的代码当然不会是一个很完善的实现，会有不少可以进一步优化的点。比方说，我是用for循环复制数组数据的，实际上这种方式复制的效率比较差，大部分编程语言会提供更高效的数组复制方法，比如Java的`System.arraycopy`方法。

不过它再怎么优化，本质上也是要搬移数据，时间复杂度都是O(n)。本文的重点在于让你理解数组增删查改API的基本实现思路以及时间复杂度，如果对这些细节感兴趣，可以找到编程语言标准库的源码深入研究。

::: tip 如何验证你的实现？
可以借助力扣第707题[设计链表]来验证自己的实现是否正确。虽然这道题是关于链表的，但是它其实也不知道你底层到底是不是用链表来实现的。主要是借用它的测试用例，来验证你的增删查改功能是否正确。
:::

## 动态数组代码实现
::: code-group
``` javascript
class MyArrayList {
    constructor(ininCapacity) {
        // 真正存储数据的底层数组
        this.data = []
        // 记录当前元素个数
        this.size = 0
        // 默认初始容量
        this.INIT_CAP = 1

        // 初始化
        this.init(ininCapacity)
    }

    init(initCapacity) {
        const capacity = initCapacity || this.INIT_CAP
        this.data = new Array(capacity)
        this.size = 0
    }

    // 增
    addLast(e) {
        const cap = this.data.length
        // 看 data 数组容量够不够
        if(this.size === cap) {
            this.resize(2 * cap)
        }
        // 在尾部插入元素
        this.data[this.size] = e
        this.size++;
    }

    add(index, e) {
        // 检查索引越界
        this.checkPositionIndex(index)
        const cap = this.data.length
        // 看 data 数组容量够不够
        if(this.size === cap) {
            this.resize(2 * cap)
        }

        // 搬移数据 data[index..] -> data[index+1..]
        // 给新元素腾出位置
        for(let i = this.size - 1; i>=index; i--){
            this.data[i + 1] = this.data[i]
        }

        // 插入新元素
        this.data[index] = e
        this.size++
    }

    addFirst(e) {
        this.add(0, e)
    }

    // 删
    removeLast() {
        if(this.size === 0) {
            throw new Error('NoSuchElementException')
        }
        const cap = this.data.length
        // 可以缩容，节约空间
        if(this.size === Math.floor(cap / 4)) {
            this.resize(Math.floor(cap / 2))
        }

        const deletedVal = this.data[this.size - 1]
        // 删除最后一个元素
        // 必须给最后一个元素置为null，否则会内存泄漏
        this.data[this.size - 1] = null
        this.size--
        return deletedVal
    }

    remove(index) {
        // 检查索引越界
        this.checkElementIndex(index)

        const cap = this.data.length
        // 可以缩容，节约空间
        if(this.size === Math.floor(cap / 4)) {
            this.resize(Math.floor(cap / 2))
        }

        const deletedVal = this.data[index]

        // 搬移数据 data[index+1..] -> data[index..]
        for(let i = index + 1; i < this.size; i++) {
            this.data[i - 1] = this.data[i];
        }

        this.data[this.size - 1] =null
        this.size--
        return deletedVal

    }

    removeFirst() {
        return this.remove(0)
    }

    // 查
    get(index) {
        // 检查索引越界
        this.checkElementIndex(index)
        return this.data[index]
    }

    // 改
    set(index, element) {
        // 检查索引越界
        this.checkElementIndex(index);
        // 修改数据
        const oldVal = this.data[index]
        this.data[index] = element
        return oldVal
    }

    // 工具方法
    getSize() {
        return this.size
    }
    isEmpty() {
        return this.size === 0
    }

    // 将 data 的容量改为 newCap
    resize(newCap){
        const temp = new Array(newCap)
        for(let i = 0; i<this.size;i++){
            temp[i] = this.data[i]
        }
        this.data = temp
    }

    isElementIndex(index) {
        return index >= 0 && index < this.size;
    }

    isPositionIndex(index) {
        return index >= 0 && index <= this.size;
    }

    // 检查 index 索引位置是否可以存在元素
    checkElementIndex(index) {
        if(!this.isElementIndex(index)) {
            throw new Error('Index: ' + index + ', Size: ' + this.size)
        }
    }

    // 检查 index 索引位置是否可以添加元素
    checkPositionIndex(index) {
        if(!this.isPositionIndex(index)) {
            throw new Error('Index: ' + index + ', Size: ' + this.size)
        }
    }

    display(){
        console.log("size = " + this.size + " cap = " + this.data.length)
        console.log("data = " + this.data)
    }

}

// 初始容量设置为 3
const arr = new MyArrayList(3)

// 添加5个元素

for(let i = 0; i <= 5; i++) {
    arr.addLast(i)
}

arr.remove(3)
arr.add(1,9)
arr.addFirst(100)
const val = arr.removeLast()

// 100 1 9 2 3
for(let i = 0; i < arr.getSize(); i++) {
    console.log(arr.get(i))
}
```
:::
