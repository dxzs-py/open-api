<template>
    <div class="logo-setting">
        <div class="logo-body">
            <div class="logo-img">
                <img :src="'data:image/png;base64,' + defaultLogo" height="68" width="68" :alt="name">
                <bk-upload :theme="'button'" :accept="'image/png,image/jpeg,image/jpg,image/svg+xml'" :with-credentials="withCredentials"
                    :multiple="false" :url="url" :size="size" :header="header" :name="name" :delay-time="delayTime"
                    :handle-res-code="handleRes" @on-done="handleOnDone" @on-progress="handleOnProgress" @on-success="handleOnSuccess"
                    @on-error="handleOnError" ext-cls="logo-upload"></bk-upload>
            </div>
            <div style="position: relative;">
                <bk-button :theme="'primary'" :title="'确定上传'" @click="handleSubmit" style="margin: 0 8px 0 40px;">
                    确定上传
                </bk-button>
            </div>
            <div>
                <bk-button :theme="'default'" :title="'恢复默认'" @click="restoreDefault">
                    恢复默认
                </bk-button>
            </div>
            <div class="logo-info">
                <i class="iconfont icon-mianxingtubiao-tishi"></i>
                <span>仅支持上传png、jpg、svg或jpeg格式的图片，图片宽高比接近1:1最佳</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'logo-setting',
        props: {
            defaultLogo: {
                type: String,
                default: 'iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE0ODgxRkUxQjFFQTExRTZBODU1OURGOTMzOEE5Mjc0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE0ODgxRkUyQjFFQTExRTZBODU1OURGOTMzOEE5Mjc0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTQ4ODFGREZCMUVBMTFFNkE4NTU5REY5MzM4QTkyNzQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTQ4ODFGRTBCMUVBMTFFNkE4NTU5REY5MzM4QTkyNzQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6nJ5T2AAAGI0lEQVR42uRb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'
            },
            url: {
                type: String,
                default: ''
            },
            // array object
            header: {
                type: [Array, Object],
                // type 为数组时才需要 defaultVals 配置
                default: () => ([
                    [], {}
                ])
            },
            name: {
                type: String,
                default: 'default_img'
            },
            // Number, Object 限制上传文件体积 { maxFileSize: 1, maxImgSize: 1 }
            size: {
                type: Number || Object,
                default: () => {
                    return 5
                }
            },
            delayTime: {
                type: Number,
                default: 0
            },
            withCredentials: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                currentUrl: ''
            }
        },
        watch: {
            defaultLogo: {
                handler(val) {
                    this.currentUrl = val
                },
                immediate: true
            }
        },
        methods: {
            restoreDefault() {
                this.currentUrl = this.defaultLogo
            },
            handleSubmit() {
                console.log('上传')
            },
            handleRes(response) {
                return !!response.id
            },
            handleOnDone(fileList) {
                this.$emit('on-done', fileList)
            },
            handleOnProgress(e, file, fileList) {
                this.$emit('on-progress', e, file, fileList)
            },
            handleOnSuccess(file, fileList) {
                this.currentUrl = file.url
                this.$emit('on-success', file, fileList)
            },
            handleOnError(file, fileList) {
                this.$emit('on-error', file, fileList)
                this.$error(file.errorMsg)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .logo-setting {
        width: 100%;
    }

    .logo-header {
        font-size: 14px;
        font-weight: 600;
        color: #63656E;
    }

    .logo-body {
        width: 100%;
        margin-top: 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .logo-img {
        width: 80px;
        height: 80px;
        margin-left: 20px;
        border-radius: 2px;
        border: 1px solid #C4C6CC;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .logo-upload {
        position: absolute !important;
        left: 48px;
        top: 71px;
        opacity: 0;
    }

    /deep/ .bk-upload.button .file-wrapper {
        width: 80px;
        height: 80px;
    }

    .logo-info {
        margin-left: 20px;
        font-size: 12px;

        i {
            color: #3A84FF;
        }

        span {
            color: #979BA5;
            margin-left: 8px;
        }
    }
</style>
