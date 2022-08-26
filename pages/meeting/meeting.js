// pages/home/meeting/meeting.js
import http from '../../utils/http';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    meetingCode: '',
    showAlert: true,
  },

  changeCode(event) {
      this.setData({
        meetingCode: event.detail.value
      })
  },

  getItemList() {
    http._get('item/getItemList', {
        meetingCode: this.data.meetingCode,
    }).then((res) => {
      this.setData({
        showAlert: true
      })
    });
  },

  getItemResult(){
    wx.navigateTo({
      url: '../meetingRes/meetingRes'
    })
  },

  postCode() {
    this.setData({
      showAlert: false
    })
  },

  enterSign() {
    if(!this.data.meetingCode){
      wx.showToast({
        title: '请输入会议号',
        icon: 'error'
      });
      return false
    }
    http._post('survey/getSurveyID', {
      meetingCode: this.data.meetingCode,
    }).then((res) => {
      wx.navigateTo({
        url: '../sign/sign'
      })
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