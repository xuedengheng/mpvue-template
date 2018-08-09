import Vue from 'vue'
import Page from './example'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: '栗子'
  }
}
