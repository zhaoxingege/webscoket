class PCMProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.buffer = new Float32Array(128);  // 与ESP32的缓冲区大小匹配
        this.port.onmessage = this.handleMessage.bind(this);
    }

    handleMessage(event) {
        const audioData = event.data;

        for (let i = 0; i < audioData.length; i++) {
            const int16 = audioData[i];
            this.buffer[i] = int16 / 32768.0;  // 将16位PCM数据转换为浮点数
        }
    }

    process(inputs, outputs, parameters) {
        const output = outputs[0];
        output[0].set(this.buffer);
        return true;
    }
}

registerProcessor('pcm-processor', PCMProcessor);
