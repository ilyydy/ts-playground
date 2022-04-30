import { Writable } from 'stream';

function* gen(max: number) {
    for (let i = 0; i < max; i++) {
        yield `seq ${i}`;
    }
}

const w = new Writable({
    write(this, chunk, encoding, callback) {
        setTimeout(() => {
            console.log(`${chunk}`);
            // 写入完成时，调用`callback()`方法通知流传入下一个数据
            callback()
        }, 1000);
    }
});

w.on('finish', () => {
    console.log('finish');
})

for (const i of gen(5)) {
    w.write(i)
}

// 再无数据写入流时，需要调用`end`方法
w.end();
