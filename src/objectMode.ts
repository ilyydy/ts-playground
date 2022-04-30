import { Duplex } from 'stream';

function* gen(max: number) {
    for (let i = 0; i < max; i++) {
        yield { seq: i };
    }
}


const g5 = gen(5);

const d = new Duplex({
    objectMode: true,
    write(this, chunk, encoding, callback) {
        console.log(chunk);
        setTimeout(() => {
            // 写入完成时，调用`callback()`方法通知流传入下一个数据
            callback()
        }, 1000);
    },

    read(this) {
        const v = g5.next();
        if (v.done) {
            this.push(null);
        } else {
            setTimeout(() => {
                this.push(v.value);
            }, 1000);
        }
    }
})

d.on('data', (data) => {
    console.log(data);
});

d.on('end', () => {
    console.log('end');
});

d.on('finish', () => {
    console.log('finish');
})

d.write({ a: 1 });
d.write({ b: 2 });
d.write({ c: 3 });

d.end();
