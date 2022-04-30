import { Duplex } from 'stream';

function* gen(max: number) {
    for (let i = 0; i < max; i++) {
        yield `seq ${i}`;
    }
}


const g5 = gen(5);

const d = new Duplex({
    write(this, chunk, encoding, callback) {
        setTimeout(() => {
            console.log(`${chunk}`);
            // 写入完成时，调用`callback()`方法通知流传入下一个数据
            callback()
        }, 1000);
    },

    read(this) {
        setTimeout(() => {
            const v = g5.next();
            if (v.done) {
                this.push(null);
            } else {
                this.push(v.value);
            }
        }, 1000);
    }
})

d.on('data', (data) => {
    console.log(`${data}`);
});

d.on('end', () => {
    console.log('end');
});

d.on('finish', () => {
    console.log('finish');
})

d.write('a');
d.write('b');
d.write('c');

d.end();
