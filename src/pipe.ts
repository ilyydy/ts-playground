import { Readable, Writable } from 'stream';

function* gen(max: number) {
    for (let i = 0; i < max; i++) {
        yield `${i}`;
    }
}

const g5 = gen(5);

const readable = new Readable({
    highWaterMark: 2,  // 字节数
    read() {
        setTimeout(() => {
            const v = g5.next();
            if (v.done) {
                this.push(null);
            } else {
                this.push(v.value);
                console.log('push ', v.value);
            }
        }, 1000);
    }
})

const writable = new Writable({
    highWaterMark: 2,   // 字节数
    write(this, chunk, encoding, callback) {
        console.log('write ' + chunk);
        // callback()
    }
})

readable.pipe(writable)

/**
write 0
push  0
push  1
push  2
push  3
*/
