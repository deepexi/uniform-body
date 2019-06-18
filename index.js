class BodyWrapper {
  constructor (opt) {
    const o = {
      field: {
        success: 'success',
        data: 'payload',
        code: 'code',
        msg: 'message',
        stack: 'stack'
      },
      code: {
        success: 1,
        fail: -1,
        error: -2
      }
    }
    Object.assign(o, opt)
    this.opt = o
  }

  body (success, data, code, msg, stack) {
    const body = {}
    this._setField(body, 'success', success)
    this._setField(body, 'data', data)
    this._setField(body, 'code', code)
    this._setField(body, 'msg', msg)
    this._setField(body, 'stack', stack)
    return body
  }

  success (data, msg) {
    return this.body(true, data, this.opt.code.success, msg, undefined)
  }

  fail (code, msg) {
    return this.body(false, undefined, code || this.opt.code.fail, msg, undefined)
  }

  error (msg, stack) {
    return this.body(false, undefined, this.opt.code.error, msg, stack)
  }

  _setField (body, fieldName, val) {
    if (val !== undefined && val !== null) {
      const realName = this.opt.field[fieldName]
      body[realName] = val
    }
  }
}

module.exports = BodyWrapper
