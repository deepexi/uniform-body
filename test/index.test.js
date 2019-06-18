/* eslint-disable no-undef */
'use strict'

const Wrapper = require('../index')
const wrapper = new Wrapper()
const assert = require('assert')

describe('index.test.js', () => {
  it('should defined', () => {
    assert(wrapper.success)
  })

  describe('success()', () => {
    it('should success true', () => {
      assert(wrapper.success().success === true)
    })

    it('should data on field payload', () => {
      assert(wrapper.success({ foo: 'bar' }).payload.foo === 'bar')
    })

    it('should msg on field message', () => {
      assert(wrapper.success(undefined, 'hhh').message === 'hhh')
    })
  })

  describe('fail', () => {
    it('should success false', () => {
      assert(wrapper.fail().success === false)
    })

    it('should code on field code is -1 by default', () => {
      assert(wrapper.fail().code === -1)
    })

    it('should display code and msg if spec', () => {
      const body = wrapper.fail(101, 'wrong args')
      assert(body.code === 101)
      assert(body.message === 'wrong args')
    })
  })

  describe('error', () => {
    it('should success false', () => {
      assert(wrapper.error().success === false)
    })

    it('should code on field code is -2 by default', () => {
      assert(wrapper.error().code === -2)
    })

    it('should display msg and stack if spec', () => {
      const body = wrapper.error('system error', 'stack trace')
      assert(body.message === 'system error')
      assert(body.stack === 'stack trace')
    })
  })

  describe('_setField()', () => {
    it('should set field success if exists', () => {
      const body = {}
      wrapper._setField(body, 'success', true)
      assert(body.success, true)
    })

    it('should set field success if val is false', () => {
      const body = {}
      wrapper._setField(body, 'success', false)
      assert(body['success'] === false)
    })

    it('should set field fail if val undefined', () => {
      const body = {}
      wrapper._setField(body, 'success')
      assert(body['success'] === undefined)
    })

    it('should set field fail if not exists', () => {
      const body = {}
      wrapper._setField(body, 'not_exist_field', false)
      assert(body['not_exist_field'] === undefined)
    })
  })

  describe('field rewrite', () => {
    it('should rewrite field name if spec', () => {
      const wrapper = new Wrapper({
        field: {
          data: 'data'
        }
      })
      const body = wrapper.success({ foo: 'bar' })
      assert(body.data.foo === 'bar')
    })
  })
})
