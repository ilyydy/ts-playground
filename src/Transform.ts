import { Transform } from 'stream';

const t = new Transform({
    transform(this, chunk, encoding, callback) {
        setTimeout(() => {
            this.push(`transform ${chunk}`);
            callback()
        }, 1000);
    }
});

t.on('data', (data) => {
    console.log(`${data}`);
});

t.on('end', () => {
    console.log('end');
});

t.on('finish', () => {
    console.log('finish');
})

t.write('a');
t.write('b');
t.write('c');

t.end();
