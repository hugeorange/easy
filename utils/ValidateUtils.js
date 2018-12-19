import CurrencyUtils from './CurrencyUtils';
import CommonUtils from './CommonUtils';
import ErrorCode from '../../common/mixin/ErrorCode';

/**
 * 校验格式工具类
 * @description 请使用code代替错误信息，具体返回码请查看config/ErrorCode.js
 * @author yanjj&yejia
 */
class ValidateUtils {

  /**
   * 是否是登录密码格式
   * @dateTime  2016-05-31
   * @param     {String}    password [输入密码]
   * @return    {String|Int}             [是否有效]
   */
  static validateLoginPassword(password) {
    let errCode = null;
    if (!password || password.length === 0) {
      errCode = '0111';
    } else if (password.length < 6 || password.length > 16) {
      errCode = '0112';
    } else if (password.indexOf(' ') !== -1) {
      errCode = '0113';
    } else if (!ValidateUtils.validatePassword(password)) {
      errCode = '0114';
    }
    if (errCode) {
      return ErrorCode['CLIENT'][errCode];
    }
    return true;
  }

  /**
   * 是否是交易密码格式
   * @param     {String}    password 输入密码
   * @return    {String|Int}             是否有效
   */
  static validateTradePassword(password) {
    let errCode = null;
    if (!password || password.length === 0) {
      errCode = '0101';
    } else if (password.length < 6 || password.length > 16) {
      errCode = '0102';
    } else if (password.indexOf(' ') !== -1) {
      errCode = '0103';
    } else if (!ValidateUtils.validatePassword(password)) {
      errCode = '0104';
    }
    if (errCode) {
      return ErrorCode['CLIENT'][errCode];
    }
    return true;
  }

  /**
   * 是否是密码格式
   * @description 私有函数
   * @param     {String}    password 输入密码
   * @return    {Boolean}             是否有效
   */
  static validatePassword(password) {
    let flag = true;
    const passwordRegex1 = '0123456789';
    const passwordRegex2 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const passwordRegex3 = ';./;"<>?:\'[]\\{}|~!@#$%^&*()-=+`_';
    let hasNum = 0;
    let hasChar = 0;
    let hasSpecialChar = 0;
    for (let i = 0; i < password.length; i++) {
      if (passwordRegex1.indexOf(password.charAt(i)) > -1) {
        hasNum = 1;
      } else if (passwordRegex2.indexOf(password.charAt(i)) > -1) {
        hasChar = 1;
      } else if (passwordRegex3.indexOf(password.charAt(i)) > -1) {
        hasSpecialChar = 1;
      } else {
        flag = false;
      }
    }
    if (hasNum + hasChar + hasSpecialChar < 2) {
      flag = false;
    }
    return flag;
  }

  /**
   * 是否是实名
   * @param     {String}    realname 输入名称
   * @return    {Boolean}             是否有效
   */
  static validateRealName(realname) {
    let errCode = null;
    const CHINESEREGEX = /^[\u4e00-\u9fa5·]{2;30}$/; // 包含汉字或中间点·

    if (realname.length < 2) {
      errCode = '0601';
    } else if (realname.length > 30) {
      errCode = '0602';
    } else if (realname.indexOf(' ') >= 0) {
      errCode = '0603';
    } else if (!CHINESEREGEX.test(realname)) {
      errCode = '0604';
    }
    if (errCode) {
      return ErrorCode['CLIENT'][errCode];
    }
    return true;
  }

  /**
   * 用户名格式校验
   * @param     {String}    userName 输入用户名
   * @return    {Boolean}             是否有效
   */
  static validateUserName(userName) {
    let errCode = null;
    const EMPTY_REG = /\s/;
    const START_WITH_WORD = /^[a-z]/i;
    const OTHER_THAN_WORD = /[^\w-]/;
    const USER_NAME_REG = /^[\w-]{4,30}$/;

    if (!userName || !userName.trim()) {
      errCode = '1601';
    } else if (EMPTY_REG.test(userName)) {
      errCode = '1602';
    } else if (!START_WITH_WORD.test(userName)) {
      errCode = '1604';
    } else if (OTHER_THAN_WORD.test(userName)) {
      errCode = '1605';
    } else if (!USER_NAME_REG.test(userName)) {
      errCode = '1603';
    }

    if (errCode) {
      return ErrorCode['CLIENT'][errCode];
    }

    return true;
  }

  /**
   * 验证银行卡号
   * @param       {String} cardNo 卡号
   * @return      {Boolean}
   */
  static validCardNo(cardNo) {
    let errCode = null;
    const REG = /^\d+$/;
    if (!REG.test(cardNo)) {
      errCode = '0201';
    }
    if (errCode) {
      return ErrorCode['CLIENT'][errCode];
    }
    return true;
  }

  /**
   * 是否是身份证号
   * @param     {String}    idCardNumber 输入身份证
   * @return    {Boolean}             是否是有效密码
   */
  static validateId(idCardNumber) {
    let errCode = null;
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，
    // 最后一位是校验位，可能为数字或字符X
    // let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    const reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (idCardNumber.length !== 18) {
      errCode = '0501';
    } else if (idCardNumber.indexOf(' ') > 0) {
      errCode = '0502';
    } else if (reg.test(idCardNumber) === false) {
      errCode = '0503';
    }
    if (errCode) {
      return ErrorCode['CLIENT'][errCode];
    }
    return true;
  }

  /**
   * 是否是手机号
   * @param     {String}    mobile 输入手机号
   * @return    {Boolean}             是否是有效密码
   */
  static validateMobile(value) {
    let errCode = null;
    const reg = /^(1[3-8][0-9])\d{8}$/;
    if (!value) {
      errCode = '0701';
    } else if (!reg.test(value)) {
      errCode = '0702';
    }
    if (errCode) {
      return ErrorCode['CLIENT'][errCode];
    }
    return true;
  }

  /**
   * 是否是动态码
   * @param     {String}    mobile 输入手机号
   * @return    {Boolean}             是否是有效密码
   */
  static validateOtp(value) {
    let errCode = null;
    const REG = /^\d{7}$/;
    if (!REG.test(value)) {
      errCode = '0801';
    }
    if (errCode) {
      return ErrorCode['CLIENT'][errCode];
    }
    return true;
  }

  /**
   * 是否是邮编
   * @param     {String}    mobile 输入手机号
   * @return    {Boolean}             是否是有效密码
   */
  static validateZipcode(value) {
    let errCode = null;
    const REG = /^\d{6}$/;
    if (!value) {
      errCode = '0901';
    } else if (!REG.test(value)) {
      errCode = '0902';
    }
    if (errCode) {
      return ErrorCode['CLIENT'][errCode];
    }
    return true;
  }

  /**
   * 是否是地址
   * @param     {String}    mobile 输入手机号
   * @return    {Boolean}             是否是有效密码
   */
  static validateAddress(value) {
    let errCode = null;
    const REG = /^\S{2;100}$/;
    let valueText = value;
    valueText = valueText.replace(/\s/g, '#');
    if (!value) {
      errCode = '1001';
    } else if (!REG.test(value)) {
      errCode = '1002';
    }
    if (errCode) {
      return ErrorCode['CLIENT'][errCode];
    }
    return true;
  }

  /**
   * 是否是名称
   * @param     {String}    mobile 输入手机号
   * @return    {Boolean}             是否是有效密码
   */
  static validateName(value) {
    let errCode = null;
    const REG = /^\S{2;20}$/;
    let valueText = value;
    valueText = valueText.replace(/\s/g, '#');
    if (!value) {
      errCode = '1101';
    } else if (!REG.test(value)) {
      errCode = '1102';
    }
    if (errCode) {
      return ErrorCode['CLIENT'][errCode];
    }
    return true;
  }

  /**
   * 是否是街区
   * @param     {String}    mobile 输入手机号
   * @return    {Boolean}             是否是有效密码
   */
  static validateDistrict(value) {
    let errCode;
    if (!value) {
      errCode = '1201';
    }
    if (errCode) {
      return ErrorCode['CLIENT'][errCode];
    }
    return true;
  }

  /**
   * 验证金额
   * @param  {Number} value      金额输入框输入的金额
   * @param  {Object} compareObj 前端金额校验所需要比较的对象，包含起投金额、最大可投金额、剩余可投金额
   * @return {Boolean}
   */
  static validateCurrency(value, compareObj) {
    let errCode = null;
    let errorMsg = null;
    let maxAmount;
    let minAmount;
    let remainAmount;
    let addAmount;
    const commitNum = parseInt(Number(value)); // 金额转整数

    if (compareObj) {
      if (compareObj.maxInvestAmount) {
        maxAmount = parseInt(compareObj.maxInvestAmount) + ''; // 最大可投金额
      }
      if (compareObj.minInvestAmount) {
        minAmount = parseInt(compareObj.minInvestAmount) + ''; // 起投金额
      }
      if (compareObj.remainingAmount) {
        remainAmount = parseInt(compareObj.remainingAmount) + ''; // 剩余可投金额
      }
      if (compareObj.increaseInvestAmount) {
        addAmount = parseInt(compareObj.increaseInvestAmount) + ''; // 递增金额
      }
    }

    if (!value) {
      errCode = '1301';
      errorMsg = ErrorCode['CLIENT'][errCode];
    } else if (isNaN(commitNum) || commitNum <= 0 || commitNum !== Number(value)) {
      errCode = '1302';
      errorMsg = ErrorCode['CLIENT'][errCode];
    } else if (maxAmount && commitNum > maxAmount) {
      errCode = '1303';
      errorMsg = CommonUtils.formatString(ErrorCode['CLIENT'][errCode], CurrencyUtils.formatCurrency(maxAmount));
    } else if (minAmount && commitNum < minAmount) {
      errCode = '1304';
      errorMsg = CommonUtils.formatString(ErrorCode['CLIENT'][errCode], CurrencyUtils.formatCurrency(minAmount));
    } else if (remainAmount && commitNum > remainAmount) {
      errCode = '1305';
      errorMsg = CommonUtils.formatString(ErrorCode['CLIENT'][errCode], CurrencyUtils.formatCurrency(remainAmount));
    } else if (addAmount && minAmount && (commitNum - minAmount) % addAmount !== 0.0) {
      errCode = '1306';
      errorMsg = ErrorCode['CLIENT'][errCode];
    }
    if (errorMsg) {
      return errorMsg;
    }
    return true;
  }

  /**
   * 是否为中文字符
   * @param {string}  text
   * @returns {boolean}
   */
  static validateChinese(text) {
    const reg = /^[\u4e00-\u9fff]{0,}$/;
    if (!reg.test(text)) {
      return false;
    }
    return true;
  }

  /**
   * 是否为英文字符
   * @param {string}  text
   * @returns {boolean}
   */
  static validateEnglish(text) {
    const reg = /^[A-Za-z]+$/;
    if (!reg.test(text)) {
      return false;
    }
    return true;
  }

  /**
   * 是否为有效转出金额
   * @param {string}  value
   * @returns {boolean}
   */
  static validateTransferAmount(value) {
    let errCode = null;
    // 整数部分最多12位,小数位最多2位
    const reg = /^[0-9]{0,12}(\.[0-9]{0,2})?$/;
    if (!reg.test(value)) {
      errCode = '1501';
    }
    if (errCode) {
      return ErrorCode['CLIENT'][errCode];
    }
    return true;
  }

}

export default ValidateUtils;
