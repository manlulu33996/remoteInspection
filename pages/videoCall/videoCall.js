// pages/videoCall.js
import http from '../../utils/http';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    surveyID: '',
  },

  getLocation(){
    let _this = this
    wx.getLocation({
      type: 'gcj02', //wgs84/gcj02
      gltitude: true,
      isHighAccuracy: true,
      success: function (res) {
        console.log('纬度' + res.latitude);
        console.log('经度' + res.longitude);
        wx.setStorageSync('latitude', res.latitude)
        wx.setStorageSync('longitude', res.longitude)

        http._post('survey/saveLngAndLat', {
          surveyID: _this.data.surveyID,
          lng: res.longitude,
          lat: res.latitude,
        }).then((res) => {
          debugger
          wx.showToast({
            title: '获取位置成功',
          });
        });
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getLocation()
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