var context = null;// 使用 wx.createContext 获取绘图上下文 context
var isButtonDown = false;//是否在绘制中
var arrx = [];//动作横坐标
var arry = [];//动作纵坐标
var arrz = [];//总做状态，标识按下到抬起的一个组合
var canvasw = 0;//画布宽度
var canvash = 0;//画布高度
Page({
  data: {
    canvasw: '',
    canvash: '',
    imgUrl: '',
    info: {},
    signBase64: '',
    sysType: '' // 判断机型
  },
 
  onLoad: function (options) {
    let that = this
    let res = wx.getSystemInfoSync()
    const system = res.system.split(' ')
    that.setData({
      sysType: system[0],
    })
    // let params = JSON.parse(options.params)
    // that.setData({
    //   info: params,
    // })
    that.startCanvas();
    that.initCanvas()
  },
  /**
  * 以下 - 手写签名 / 上传签名
  */
  startCanvas() {//画布初始化执行
    var that = this;
    //获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        canvasw = res.windowWidth;
        canvash = res.windowHeight;
        that.setData({ canvasw: canvasw });
        that.setData({ canvash: canvash });
      }
    });
    this.initCanvas();
    this.cleardraw();
  },
 
  //初始化函数
  initCanvas() {
    context = wx.createCanvasContext('canvas');
    context.beginPath()
    if(this.data.sysType === 'iOS') {
      context.fillStyle = 'rgba(255, 255, 255, 1)';
      context.setStrokeStyle('#444');
    } else {
      context.fillStyle = 'rgba(0, 0, 0, 1)';
      context.setStrokeStyle('#aaa');
    }
    context.setLineWidth(4);
    context.setLineCap('round');
    context.setLineJoin('round');
  },
  canvasStart(event) {
    isButtonDown = true;
    arrz.push(0);
    arrx.push(event.changedTouches[0].x);
    arry.push(event.changedTouches[0].y);
  },
  canvasMove(event) {
    if (isButtonDown) {
      arrz.push(1);
      arrx.push(event.changedTouches[0].x);
      arry.push(event.changedTouches[0].y);
    }
    for (var i = 0; i < arrx.length; i++) {
      if (arrz[i] == 0) {
        context.moveTo(arrx[i], arry[i])
      } else {
        context.lineTo(arrx[i], arry[i])
      }
    }
    context.clearRect(0, 0, canvasw, canvash);
    if(this.data.sysType === 'iOS') {
      context.fillStyle = 'rgba(255, 255, 255, 1)';
      context.setStrokeStyle('#444');
    } else {
      context.fillStyle = 'rgba(0, 0, 0, 1)';
      context.setStrokeStyle('#aaa');
    }
    context.setLineWidth(3);
    context.setLineCap('round');
    context.setLineJoin('round');
    context.stroke();
    context.draw(false);
  },
  canvasEnd(event) {
    isButtonDown = false;
  },
  //清除画布
  cleardraw() {
    arrx = [];
    arry = [];
    arrz = [];
    context.clearRect(0, 0, canvasw, canvash);
    if(this.data.sysType === 'iOS') {
      context.fillStyle = 'rgba(255, 255, 255, 1)';
      context.setStrokeStyle('#444');
    } else {
      context.fillStyle = 'rgba(0, 0, 0, 1)';
      context.setStrokeStyle('#aaa');
    }
    context.draw(true);
  },
  uploadImg() {
    var that = this
    //生成图片
    // context.draw(true,()=> {
    setTimeout(() => {
      wx.canvasToTempFilePath({
        canvasId: 'canvas',
        //设置输出图片的宽高
        fileType: 'jpg',
        quality: 1,
        success: function (res) {
          // canvas图片地址 res.tempFilePath
          let imgBase64 = wx.getFileSystemManager().readFileSync(res.tempFilePath, 'base64')
          that.setData({
            imgUrl: res.tempFilePath,
            signBase64: imgBase64
          })
          that.submitSign()
          console.log('imgBase64', 'data:image/jpeg;base64,' + imgBase64)
          // wx.saveImageToPhotosAlbum({
          //   filePath: res.tempFilePath,
          //   success(res4) { 
          //     console.log(res,'保存res4');
          //     wx.showToast( {
          //       title: '已成功保存到相册',
          //       duration: 2000
          //     } );
          //   }
          // })
        },
        fail: function () {
          wx.showModal({
            title: '提示',
            content: 'canvas生成图片失败。微信当前版本不支持，请更新到最新版本！',
            showCancel: false
          });
        },
        complete: function () { }
      }, 5000)
 
    })
    // })
  },
  // 提交签名
  submitSign() {
    let that = this
    wx.showLoading({
      title: '正在提交...',
      mask: true
    })
    let type = '1'
    if(that.data.sysType === 'iOS') {
      type = '0'
    } else {
      type = '1'
    }
    debugger
    wx.$getWxLoginCode(resp => {
      const params = {
        qmbase64: that.data.signBase64,
       
      }
      console.info("入参", params)
      wx.kservice.yyyurl(params, res => {
        wx.hideLoading()
        if (res.statusCode === '200') {
          wx.showModal({
            title: '提示',
            content: res.message,
            showCancel: false,
            confirmText: '返回首页',
            success(res) {
              if (res.confirm) {
                wx.reLaunch({
                  url: '/pages/index/index'
                })
              }
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.message,
            showCancel: true,
            cancelText: '返回首页',
            confirmText: '重新提交',
            success: (result) => {
              if (result.cancel) {
                // 取消停留
                wx.reLaunch({
                  url: '/pages/index/index'
                })
              } else if (result.confirm) {
                //重新提交
                that.submitSign()
              }
            },
          });
        }
      }, {}, true, true)
    })
  },
 
  /**
  * 生命周期函数--监听页面卸载
  */
  onUnload: function () {
 
  },
 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
 
  },
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
 
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
 
  }
})