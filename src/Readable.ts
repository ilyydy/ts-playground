import { Readable } from 'stream';

function* gen(max: number) {
    for (let i = 0; i < max; i++) {
        yield `seq ${i}`;
    }
}

class MyStream extends Readable {
    constructor(private generator: Generator) {
        super();
    }

    // 子类需要实现该方法
    // 这是生产数据的逻辑
    _read() {
        setTimeout(() => {
            const v = this.generator.next();
            if (v.done) {
                // 数据源已枯竭，调用`push(null)`通知流
                this.push(null);
            } else {

                // 通过`push`方法将数据添加到流中
                this.push(v.value);
            }
        }, 1000);
    }
}

const s = new MyStream(gen(5));

// 监听`data`事件，一次获取一个数据
s.on('data', (data) => {
    console.log(`${data}`);
});

// 所有数据均已读完
s.on('end', () => {
    console.log('end');
});
