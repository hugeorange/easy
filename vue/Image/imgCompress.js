/**
 * 图片自动裁剪·压缩
 * 默认目标尺寸 1280*800
 * 
 * 如图片尺寸大于上述尺寸则按比例压缩并居中裁剪
 * 如图片小于目标尺寸则保持现有尺寸不做处理
 */


export default class CompressImg {
    constructor(imgfile, targetW=1280, targetH=800) {
        this.file = imgfile
        this.targetW = targetW
        this.targetH = targetH
    }
    // 供实例调用方法，返回裁剪压缩后的图片: base64 & blob
    excuteCompressImg() {
        const img = this.drawImage()
        return {
            base64: img,
            blob: this.createBlob(img)
        }
    }
    // 将base64字符出转成blob二级制格式利用 formData ajax 传到后台
    createBlob(base64) {
        var data = base64.split(',')[1];
        var data = window.atob(data);
        var ia = new Uint8Array(data.length);
        for (var i = 0; i < data.length; i++) {
            ia[i] = data.charCodeAt(i);
        };
        var blob = new Blob([ia], {type:"image/jpeg"});
        return blob
    }
    // 图片绘制到指定区域的 canvas 上
    drawImage() {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (this.file.width >= this.targetW && this.file.height >= this.targetH ) {
            return this.clipBigSizeImg(this.file, ctx, canvas)
        } else {
            return this.clipSmallSizeImg(this.file, ctx, canvas)
        }
    }

    // 裁剪小图片
    // 图片宽或高某一边或两边均小于目标尺寸
    clipSmallSizeImg(file, ctx, canvas) {
        const obj = this.calcSmallSize(file.width, file.height)
        canvas.width = obj.dw
        canvas.height = obj.dh
        canvas.style.width = obj.dw / 2 + 'px'
        canvas.style.height = obj.dh / 2 + 'px'
        
        ctx.drawImage(file, obj.sw, obj.sh, obj.dw, obj.dh, 0, 0, obj.dw, obj.dh)
        return canvas.toDataURL('image/jpeg')
    }

    // 裁剪大图片
    // 图片宽高均大于目标宽高特殊处理
    clipBigSizeImg(file, ctx, canvas) {
        const obj = this.calcBigSize(file.width, file.height)
        canvas.width = obj.resultW
        canvas.height = obj.resultH
        // 防止 canvas 绘制的图片变得模糊
        canvas.style.width = obj.resultW / 2 + 'px'
        canvas.style.height = obj.resultH / 2 + 'px'
    
        ctx.beginPath()
        ctx.rect(obj.sw, obj.sh, obj.targetW, obj.targetH)
        ctx.clip()
        ctx.closePath()
        ctx.drawImage(file, 0, 0, obj.resultW, obj.resultH)
    
        const clipCanvas = this.getBase64Image(ctx, obj)
    
        return clipCanvas.toDataURL('image/jpeg')
    }

    // 获取并返回指定区域内 canvas 图像
    getBase64Image(ctx, obj) {
        const dataImg = ctx.getImageData(obj.sw, obj.sh, obj.targetW, obj.targetH)
        const canvas2 = document.createElement('canvas')
        canvas2.width = obj.targetW
        canvas2.height = obj.targetH
        canvas2.style.width = obj.targetW / 2 + 'px'
        canvas2.style.height = obj.targetH / 2 + 'px'
        const ctx2 = canvas2.getContext('2d')
        ctx2.putImageData(dataImg, 0, 0, 0, 0, obj.targetW, obj.targetH)
        return canvas2
    }


    /**
     * 图片某一边或两边均小于目标宽高
     * @param {*} w 
     * @param {*} h 
     * @return {object} 裁剪尺寸、图片尺寸
     */
    calcSmallSize(w, h) {
        const targetW = this.targetW
        const targetH = this.targetH
        let sw = 0
        let sh = 0
        if (w > targetW) {
            sw = (w - targetW) / 2
        }
        if (h > targetH) {
            sh = (h - targetH) / 2
        }
        let dw = w - sw * 2
        let dh = h - sh * 2
        return {
            sw,
            sh,
            dw,
            dh
        }
    }

    /**
     * 宽高均大于目标尺寸
     * @param {*} w 图片原始宽
     * @param {*} h 图片原始高
     * @returns {object} 裁剪尺寸、结果尺寸、目标尺寸
     */
    calcBigSize(w, h) {
        const targetW = this.targetW
        const targetH = this.targetH
        const targetRate = targetW / targetH
        const rate = w / h
        // 裁剪后宽高
        let resultW 
        let resultH 
        // 需裁减尺寸
        let sw = 0
        let sh = 0
    
        if (rate > targetRate) { // 宽 大
            const resultR = targetH / h
            resultW = Math.round(w * resultR)
            resultH = targetH
        } else {                 // 高 大
            const resultR =  targetW / w
            resultW = targetW
            resultH = Math.round(h * resultR)
        }
        sw = (resultW - targetW) / 2
        sh = (resultH - targetH) / 2
        return {
            sw,
            sh,
            resultW,
            resultH,
            targetW,
            targetH,
        }
    }
}


/**
 * 分成两种情况计算canvas及图片尺寸的原因
 * 
 * 1. 当图片某一边或两边都小于目标宽高
 *    这种情况不需要对图片进行缩放，直接用 drawImage 九参数 直接在画布上进行裁剪
 * 
 * 2. 图片宽高均大于 目标宽高尺寸 
 *    受限于 drawImage 九参数时只可以在图片原始尺寸上裁剪，不可在缩放后的尺寸上裁剪
 * 
 *    若非要使用 drawImage 九参数就需要创建一个和图片原始尺寸等大的canvas画布，这样有可能绘制的canvas尺寸特别大，因而产生性能问题
 * 
 *    故采用第二种方案
 *    drawImage 五参数将图片缩放放在画布内，然后用 clip 裁剪，getImageData ==> putImageData 绘制在新画布内 
 */