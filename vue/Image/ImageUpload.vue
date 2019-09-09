<template>
    <div class="img-clip-compress-upload">
        <div class="img-li-box" v-for="(item,index) in imgList" :key="index">
            <img class="p-img" :src="item.url">
            <div class="img-operate">
                <i @click="handleFileEnlarge(item)" class="el-icon-view"/>
                <i @click="handleFileRemove(item,index)" class="el-icon-delete"/>
            </div>
            <div class="error-tips" v-if="item.status !== 'success'">
                <div class="tips">上传失败</div>
                <div>{{item.errorTips}}</div>
            </div>
        </div>
        <el-upload
            v-if="isShowAddBtn"
            class="upload-img"
            list-type="picture-card"
            action="#"
            :multiple="multiple"
            :accept="accept"
            :before-upload="beforeUpload"
            :http-request="uploadSectionFile"
            :show-file-list="false"
        >
            <i class="el-icon-plus" v-loading="btnLoading"></i>
        </el-upload>
        <el-dialog 
            title=""
            custom-class="img-layer" 
        	:visible.sync="layerVisible" 
        	:modal-append-to-body="false" 
        	top="8%" 
            width="800px" 
        >
            <img @click="layerVisible = false" style="max-width: 700px;" :src="imglayer">
        </el-dialog>
    </div>
</template>
<script>
/**
 * 图片上传
 * 含裁剪压缩功能
 * 预览功能
 */
import CompressImg from 'utils/imgCompress'
import { API_UPLOAD_PICTURES } from 'constant/API'
import { getActionUrl} from 'utils/strUtil'
import axios from 'axios/dist/axios'
import get from 'lodash/get'
export default {
    name: 'ImgUpload',
    props: {
        accept: {
            type: String,
            default: "image/jpeg,image/png,image/bmp"
        },
        action: { // 上传接口
            type: String,
            default: getActionUrl(`dishes/${API_UPLOAD_PICTURES}`)
        },
        multiple: { // 是否支持多选
            type: Boolean,
            default: false
        },
        maxSize: {  // 文件最大尺寸
            type: Number,
            default: 30 * 1024
        },
        // 需裁减目标宽高，预览图展示宽高如需修改请在使用处复写此组件样式
        targetWidth: {
            type: Number,
            default: 1280
        },
        targetHeight: {
            type: Number,
            default: 800
        },
        isNeedCompress: { // 是否需要裁剪压缩
            type: Boolean,
            default: true,
        },
        fileKey: { // 二进制文件的 key
            type: String,
            default: 'file'
        },
        imgNameKey: { // 是否需要原图片名字，如需要则传入名字所需的key，默认不需要
            type: String,
            default: ''
        },
        extraParam: { // 额外参数 {key: value}
            type: Object,
            default: function() {
                return {}
            } 
        },
        onComplete: { // 上传结果回调
            type: Function,
            default: function() {}
        },
        errorTips: { // 上传失败错误提示
            type: String,
            default: "对应的菜品不存在"
        }
    },
    data() {
        return {
            imgList: [],
            layerVisible: false,
            imglayer: '',
            btnLoading: false,
        }
    },
    computed: {
        isShowAddBtn() {
            if (this.multiple) return true
            if (!this.multiple && !this.imgList.length) return true
            else return false
        }
    },
    methods: {
        handleFileRemove(item, index) {
            this.imgList.splice(index, 1)
        },
        handleFileEnlarge(item) {
            this.imglayer = item.url
            this.layerVisible = true
        },

        beforeUpload (file) {
            const isFileSize = (file.size / 1024) > this.maxSize
            if (isFileSize) {
                this.$message.error('图片大小不可超过' + this.maxSize + 'KB')
                return false
            }
            return true
        },

        async uploadSectionFile(param) {
            this.btnLoading = true
            const formData = new FormData()
            let imgName = param.file.name
            let base64Url
            if (this.isNeedCompress) {
                const file = await this.compressImg(param.file)
                formData.append(this.fileKey, file.blob)
                base64Url = file.base64
            } else {
                formData.append(this.fileKey, param.file)
                base64Url = URL.createObjectURL(param.file) // URL 对象
            }
            // 原图片名字
            if (this.imgNameKey) {
                formData.append(this.imgNameKey, imgName)
            }

            Object.keys(this.extraParam).forEach(v => {
                formData.append(v, this.extraParam[v])
            })
            this.upLoadFile(formData, base64Url, imgName)
        },

        async upLoadFile(formData, base64Url, imgName) {
            const response = await axios.request({
                url: this.action,
                method: 'post',
                data: formData
            })
            const data = get(response, 'data.data', {})
            this.onComplete(data)
            const imgObj = {
                name: imgName,
                url: base64Url,
            }
            if (data.err.errNo == 0) {
                imgObj.status = 'success'
            } else {
                imgObj.status = 'error'
                imgObj.errorTips = this.errorTips
            }
            this.btnLoading = false
            this.imgList.push(imgObj)
        },
        // 压缩方法
        compressImg(file) {
            const self = this
            return new Promise((resolve, reject) => {
                var reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = function(e) {
                    var img = new Image()
                    img.src = e.target.result
                    img.onload = function() {
                        const excuteImg = new CompressImg(this, self.targetWidth, self.targetHeight)
                        const file = excuteImg.excuteCompressImg()
                        resolve(file)
                    }
                    img.onerror = function() {
                        reject('图片裁剪压缩失败')
                    }
                }
            })
        }
    }
}
</script>
<style lang="scss">
    .img-clip-compress-upload {
        .img-li-box {
            float: left;
            position: relative;
            width: 240px;
            height: 150px;
            margin: 0 10px 10px 0;
            border-radius: 4px;
            text-align: left;
            overflow: hidden;
            .p-img {
                width: 100%;
                height: auto;
            }
            &:hover .img-operate {
                background-color: rgba(0, 0, 0, 0.5);
                transition: all .3s;
                visibility: visible;
            }
            .img-operate {
                position: absolute;
                display: flex;
                visibility: hidden;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                align-items: center;
                justify-content: center;
                z-index: 99;
                opacity: 1;
                color: #fff;
                i {
                    margin: 8px;
                    font-size: 18px;
                    cursor: pointer;
                }
            }
            .error-tips {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                text-align: center;
                background-color: rgba(0, 0, 0, 0.5);
                color: #fff;
                .tips {
                    margin-top: 50px;
                }
            }
        }
        .upload-img {
            .el-upload.el-upload--picture-card {
                width: 240px;
                height: 150px;
            }
            .el-upload-list--picture-card {
                .el-upload-list__item {
                    width: 240px;
                    height: 150px;
                }
            }
        }
        .img-layer {
            text-align: center;
        }
    }
</style>