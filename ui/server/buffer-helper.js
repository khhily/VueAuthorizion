/**
 * 该模块将处理Buffer相关的功能
 */
module.exports = {
    mergeBuffers: function(buffers) {
        var nread = 0;
        for (var i = 0; i < buffers.length; i++) {
            nread += buffers[i].length;
        }

        var buffer = null;
        switch (buffers.length) {
            case 0:
                buffer = new Buffer(0);
                break;
            case 1:
                buffer = buffers[0];
                break;
            default:
                buffer = new Buffer(nread);
                for (var i = 0, pos = 0, l = buffers.length; i < l; i++) {
                    var chunk = buffers[i];
                    chunk.copy(buffer, pos);
                    pos += chunk.length;
                }
                break;
        }

        return buffer;
    }
}