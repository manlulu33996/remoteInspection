// pages/home/meeting/meeting.js
import http from '../../utils/http';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    upLoadImage: [],
    resType: 2, // 0；不通过；1：通过；2：待整改
  },

  upLoadImage() {
    let _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为 img 标签的 src 属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        _this.setData({
          upLoadImage: [..._this.data.upLoadImage,...tempFilePaths]
        })
        console.log(_this.data.upLoadImage)
      }
    })
  },

  removeImage(event){
    let _index = event.target.dataset.index;
    let newArr = this.data.upLoadImage.map((item,index)=>{
      if(index != _index){
        return item
      }
    })
    this.setData({
      upLoadImage: newArr
    })
  },

  saveImage(){
    http._post('reform/uploadReformPic', {
      MultipartFile: [],
      int: '',
  }).then((res) => {
    debugger
  });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})