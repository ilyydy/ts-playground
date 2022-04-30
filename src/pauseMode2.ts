import { Readable } from 'stream';

// 底层数据
const dataSource = ['a', 'b', 'c'];

const readable = new Readable({
    read(this) {
        setTimeout(() => {
            if (dataSource.length) {
                this.push(dataSource.shift());
            } else {
                this.push(null);
            }
        }, 1000);
    }
})


// 进入暂停模式
readable.pause();
readable.on('data', data => console.log('data: ' + data));

let data = readable.read();
while (data !== null) {
    data = readable.read();
}
